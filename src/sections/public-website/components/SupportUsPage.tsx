import { useState, useRef } from 'react'
import type {
  BraintreeConfig,
  DonationFormData,
  MembershipLevel,
  MemberSignupFormData,
  PaymentMethod,
  ProcessingFeeConfig,
  SignupContact,
  SupportOption,
  SupportOptionIcon,
  ZelleConfig,
} from '@/../product/sections/public-website/types'
import { PaymentMethods } from './PaymentMethods'
import { computeProcessingFee, formatUsd } from './paymentUtils'
import {
  Heart,
  Users,
  Megaphone,
  PartyPopper,
  Check,
  X,
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Send,
  Lock,
  Clock,
  Landmark,
  UserPlus,
} from 'lucide-react'

export interface SupportUsPageProps {
  membershipLevels: MembershipLevel[]
  supportOptions: SupportOption[]
  braintreeConfig: BraintreeConfig
  processingFeeConfig: ProcessingFeeConfig
  zelleConfig: ZelleConfig
  onSubmitMemberSignup?: (data: MemberSignupFormData) => void
  onDonate?: (data: DonationFormData) => void
  onNavigate?: (href: string) => void
}

const ICON_MAP: Record<SupportOptionIcon, typeof Heart> = {
  heart: Heart,
  users: Users,
  megaphone: Megaphone,
  partyPopper: PartyPopper,
}

const DONATE_PRESETS = [10, 25, 50, 100]

type ModalView = 'signup' | 'donate' | null

/** Generate a short reference code for the payer to include in a Zelle memo. */
function genReferenceCode(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `${prefix}-${rand}`
}

const EMPTY_FORM: Omit<
  MemberSignupFormData,
  'paymentMethod' | 'coverProcessingFee' | 'amountCharged' | 'braintreeNonce' | 'zelleReferenceCode'
> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  membershipLevelId: '',
}

export function SupportUsPage({
  membershipLevels,
  supportOptions,
  processingFeeConfig,
  zelleConfig,
  onSubmitMemberSignup,
  onDonate,
  onNavigate,
}: SupportUsPageProps) {
  const [modal, setModal] = useState<ModalView>(null)
  const [hoveredTierId, setHoveredTierId] = useState<string | null>(null)

  // Signup state
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [secondContact, setSecondContact] = useState<SignupContact | null>(null)
  const [signupMethod, setSignupMethod] = useState<PaymentMethod | null>(null)
  const [signupCoverFee, setSignupCoverFee] = useState(false)
  const [signupReference, setSignupReference] = useState('')

  // Donate state
  const [donateAmount, setDonateAmount] = useState<number | null>(25)
  const [donateCustom, setDonateCustom] = useState('')
  const [donateMethod, setDonateMethod] = useState<PaymentMethod | null>(null)
  const [donateCoverFee, setDonateCoverFee] = useState(false)
  const [donateReference, setDonateReference] = useState('')
  const customInputRef = useRef<HTMLInputElement>(null)

  // Zelle pending confirmation (shown in place of the form after submit)
  const [pending, setPending] = useState<{ kind: ModalView; reference: string; amount: number } | null>(null)

  const update = (field: keyof typeof EMPTY_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const updateSecond = (field: keyof SignupContact, value: string) =>
    setSecondContact((prev) => ({
      ...(prev ?? { firstName: '', lastName: '', email: '', phone: '' }),
      [field]: value,
    }))

  const closeModal = () => {
    setModal(null)
    setPending(null)
    setForm({ ...EMPTY_FORM })
    setSecondContact(null)
    setSignupMethod(null)
    setSignupCoverFee(false)
    setDonateMethod(null)
    setDonateCoverFee(false)
  }

  const openSignup = (levelId?: string) => {
    setForm({ ...EMPTY_FORM, membershipLevelId: levelId ?? '' })
    setSecondContact(null)
    setSignupMethod(null)
    setSignupCoverFee(false)
    setSignupReference(genReferenceCode('FCT'))
    setPending(null)
    setModal('signup')
  }

  const openDonate = () => {
    setDonateAmount(25)
    setDonateCustom('')
    setDonateMethod(null)
    setDonateCoverFee(false)
    setDonateReference(genReferenceCode('FCTD'))
    setPending(null)
    setModal('donate')
  }

  const signupLevel = membershipLevels.find((l) => l.id === form.membershipLevelId)
  const signupBase = signupLevel?.price ?? 0
  const signupFee = computeProcessingFee(signupBase, processingFeeConfig)
  const signupIsZelle = signupMethod === 'zelle'
  const signupTotal = !signupIsZelle && signupCoverFee ? signupBase + signupFee : signupBase

  const effectiveDonateAmount = donateCustom ? parseFloat(donateCustom) || 0 : donateAmount ?? 0
  const donateFee = computeProcessingFee(effectiveDonateAmount, processingFeeConfig)
  const donateIsZelle = donateMethod === 'zelle'
  const donateTotal = !donateIsZelle && donateCoverFee ? effectiveDonateAmount + donateFee : effectiveDonateAmount

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupMethod) return
    onSubmitMemberSignup?.({
      ...form,
      secondContact: secondContact ?? undefined,
      paymentMethod: signupMethod,
      coverProcessingFee: signupIsZelle ? false : signupCoverFee,
      amountCharged: signupTotal,
      // In production, braintreeNonce comes from dropin.requestPaymentMethod()
      braintreeNonce: signupIsZelle ? undefined : 'mock-nonce',
      zelleReferenceCode: signupIsZelle ? signupReference : undefined,
    })
    if (signupIsZelle) {
      setPending({ kind: 'signup', reference: signupReference, amount: signupBase })
    } else {
      closeModal()
    }
  }

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (effectiveDonateAmount <= 0 || !donateMethod) return
    onDonate?.({
      amount: effectiveDonateAmount,
      paymentMethod: donateMethod,
      coverProcessingFee: donateIsZelle ? false : donateCoverFee,
      amountCharged: donateTotal,
      braintreeNonce: donateIsZelle ? undefined : 'mock-nonce',
      zelleReferenceCode: donateIsZelle ? donateReference : undefined,
    })
    if (donateIsZelle) {
      setPending({ kind: 'donate', reference: donateReference, amount: effectiveDonateAmount })
    } else {
      closeModal()
    }
  }

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Keep the Trolleys on Track
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            Support Us
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            Your support preserves Fort Collins&apos; electric railway heritage for future generations.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Membership section */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
            <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
              Memberships
            </h2>
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-xl">
            Becoming a member is a great way to support the trolleys. All levels include rides and help fund our preservation mission.
          </p>

          {/* Tier cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {membershipLevels.map((level, i) => {
              const isPopular = i === 1
              const isLifetime = level.period === 'one-time'
              const isHovered = hoveredTierId === level.id

              return (
                <div
                  key={level.id}
                  onMouseEnter={() => setHoveredTierId(level.id)}
                  onMouseLeave={() => setHoveredTierId(null)}
                  className={`
                    relative bg-white dark:bg-stone-900 rounded-xl border overflow-hidden
                    transition-all duration-200 flex flex-col
                    ${isPopular
                      ? 'border-emerald-300 dark:border-emerald-700 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-800/40'
                      : 'border-stone-200/80 dark:border-stone-800'
                    }
                    ${isHovered ? '-translate-y-1 shadow-xl' : 'shadow-sm'}
                  `}
                >
                  {isPopular && (
                    <div className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                      Most Popular
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {isLifetime && (
                      <Star className="w-5 h-5 text-amber-500 mb-2" strokeWidth={1.5} />
                    )}
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                      {level.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {level.tagline}
                    </p>

                    <div className="mt-4 mb-5">
                      <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                        ${level.price}
                      </span>
                      <span className="text-sm text-stone-400 dark:text-stone-500 ml-1">
                        /{level.period === 'year' ? 'yr' : 'once'}
                      </span>
                    </div>

                    <ul className="space-y-2.5 flex-1">
                      {level.benefits.map((benefit, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                          <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => openSignup(level.id)}
                      className={`
                        mt-5 w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.98]
                        ${isPopular
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-600/25'
                          : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }
                      `}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Donate section */}
        <section className="mt-16 lg:mt-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber-500 dark:bg-amber-400" />
            <h2 className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-[0.2em] uppercase">
              Donate
            </h2>
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-xl">
            Your tax-deductible donation helps preserve the history of the Fort Collins Municipal Railway Society. Pay by card, PayPal, or Venmo — or send fee-free via Zelle.
          </p>

          <button
            onClick={openDonate}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
          >
            <Heart className="w-4 h-4" strokeWidth={2} />
            Donate Now
          </button>

          {/* Accepted payment methods indicator */}
          <div className="mt-4 flex items-center gap-2.5 text-xs text-stone-400 dark:text-stone-500">
            <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Card, PayPal, or Venmo via PayPal Braintree — or Zelle (no processing fee)</span>
          </div>
        </section>

        {/* Other support options */}
        <section className="mt-16 lg:mt-20 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
            <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
              Other Ways to Support
            </h2>
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-xl">
            Beyond memberships and donations, there are many ways to help keep the trolleys running.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supportOptions.map((option) => {
              const Icon = ICON_MAP[option.icon] || Heart
              return (
                <div
                  key={option.id}
                  className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6 hover:shadow-lg hover:shadow-stone-950/[0.04] dark:hover:shadow-stone-950/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/40 mb-4">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    {option.description}
                  </p>
                  <button
                    onClick={() => onNavigate?.(option.href)}
                    className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {option.buttonLabel} →
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* ── Membership Signup Modal ── */}
      {modal === 'signup' && (
        <ModalOverlay onClose={closeModal}>
          <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {pending ? 'Almost Done' : 'Become a Member'}
              </h2>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                Join the Fort Collins Trolley family
              </p>
            </div>
            <CloseButton onClick={closeModal} />
          </div>

          {pending && pending.kind === 'signup' ? (
            <ZellePendingPanel
              reference={pending.reference}
              amount={pending.amount}
              message="Once our treasurer confirms your Zelle transfer, your membership will be activated. We'll email you a confirmation."
              onDone={closeModal}
            />
          ) : (
            <form onSubmit={handleSignupSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <FormField icon={<User className="w-4 h-4" strokeWidth={1.5} />} label="First Name" required>
                  <input type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className="form-input-support" placeholder="Jane" />
                </FormField>
                <FormField label="Last Name" required>
                  <input type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className="form-input-support" placeholder="Smith" />
                </FormField>
              </div>

              {/* Contact */}
              <FormField icon={<Mail className="w-4 h-4" strokeWidth={1.5} />} label="Email" required>
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="form-input-support" placeholder="jane@example.com" />
              </FormField>
              <FormField icon={<Phone className="w-4 h-4" strokeWidth={1.5} />} label="Phone" required>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input-support" placeholder="(970) 555-0123" />
              </FormField>

              {/* Optional second contact */}
              {secondContact === null ? (
                <button
                  type="button"
                  onClick={() => setSecondContact({ firstName: '', lastName: '', email: '', phone: '' })}
                  className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <UserPlus className="w-4 h-4" strokeWidth={1.5} />
                  Add a second contact
                </button>
              ) : (
                <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                      Second Contact
                    </p>
                    <button
                      type="button"
                      onClick={() => setSecondContact(null)}
                      className="flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2} />
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" required>
                      <input type="text" required value={secondContact.firstName} onChange={(e) => updateSecond('firstName', e.target.value)} className="form-input-support" placeholder="John" />
                    </FormField>
                    <FormField label="Last Name" required>
                      <input type="text" required value={secondContact.lastName} onChange={(e) => updateSecond('lastName', e.target.value)} className="form-input-support" placeholder="Smith" />
                    </FormField>
                  </div>
                  <FormField icon={<Mail className="w-4 h-4" strokeWidth={1.5} />} label="Email" required>
                    <input type="email" required value={secondContact.email} onChange={(e) => updateSecond('email', e.target.value)} className="form-input-support" placeholder="john@example.com" />
                  </FormField>
                  <FormField icon={<Phone className="w-4 h-4" strokeWidth={1.5} />} label="Phone" required>
                    <input type="tel" required value={secondContact.phone} onChange={(e) => updateSecond('phone', e.target.value)} className="form-input-support" placeholder="(970) 555-0124" />
                  </FormField>
                </div>
              )}

              {/* Address */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-5">
                <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
                  Mailing Address
                </p>
              </div>
              <FormField icon={<MapPin className="w-4 h-4" strokeWidth={1.5} />} label="Address Line 1" required>
                <input type="text" required value={form.addressLine1} onChange={(e) => update('addressLine1', e.target.value)} className="form-input-support" />
              </FormField>
              <FormField label="Address Line 2">
                <input type="text" value={form.addressLine2} onChange={(e) => update('addressLine2', e.target.value)} className="form-input-support" />
              </FormField>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <FormField label="City" required>
                    <input type="text" required value={form.city} onChange={(e) => update('city', e.target.value)} className="form-input-support" />
                  </FormField>
                </div>
                <div className="col-span-1">
                  <FormField label="State" required>
                    <input type="text" required value={form.state} onChange={(e) => update('state', e.target.value)} className="form-input-support" placeholder="CO" maxLength={2} />
                  </FormField>
                </div>
                <div className="col-span-2">
                  <FormField label="ZIP" required>
                    <input type="text" required value={form.zipCode} onChange={(e) => update('zipCode', e.target.value)} className="form-input-support" placeholder="80521" />
                  </FormField>
                </div>
              </div>

              {/* Membership level */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-5">
                <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
                  Membership &amp; Payment
                </p>
              </div>
              <FormField icon={<Star className="w-4 h-4" strokeWidth={1.5} />} label="Membership Level" required>
                <select
                  required
                  value={form.membershipLevelId}
                  onChange={(e) => update('membershipLevelId', e.target.value)}
                  className="form-input-support"
                >
                  <option value="">Select a level...</option>
                  {membershipLevels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name} — ${lvl.price}/{lvl.period === 'year' ? 'yr' : 'once'}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Payment method selection */}
              <div>
                <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 mb-2.5">
                  <CreditCard className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                  Payment Method
                  <span className="text-red-500">*</span>
                </span>
                <PaymentMethods
                  baseAmount={signupBase}
                  method={signupMethod}
                  onMethodChange={setSignupMethod}
                  coverFee={signupCoverFee}
                  onCoverFeeChange={setSignupCoverFee}
                  processingFeeConfig={processingFeeConfig}
                  zelleConfig={zelleConfig}
                  zelleReferenceCode={signupReference}
                  accent="emerald"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!signupMethod || !form.membershipLevelId}
                  className="w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {signupIsZelle ? (
                    <>
                      <Landmark className="w-4 h-4" strokeWidth={1.5} />
                      I&apos;ve Sent My Zelle Payment
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                      {signupCoverFee && signupBase > 0
                        ? `Pay ${formatUsd(signupTotal)} & Join`
                        : 'Submit Membership'}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </ModalOverlay>
      )}

      {/* ── Donate Modal ── */}
      {modal === 'donate' && (
        <ModalOverlay onClose={closeModal}>
          <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {pending ? 'Almost Done' : 'Make a Donation'}
              </h2>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                Your gift is tax-deductible · Fort Collins Municipal Railway Society
              </p>
            </div>
            <CloseButton onClick={closeModal} />
          </div>

          {pending && pending.kind === 'donate' ? (
            <ZellePendingPanel
              reference={pending.reference}
              amount={pending.amount}
              message="Once our treasurer confirms your Zelle transfer, your donation will be recorded. Thank you for supporting the trolleys!"
              onDone={closeModal}
            />
          ) : (
            <form onSubmit={handleDonateSubmit} className="p-6 space-y-6">
              {/* Amount presets */}
              <div>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Donation Amount</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {DONATE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => { setDonateAmount(preset); setDonateCustom('') }}
                      className={`
                        py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150
                        ${donateAmount === preset && !donateCustom
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                        }
                      `}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">$</span>
                  <input
                    ref={customInputRef}
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Other amount"
                    value={donateCustom}
                    onChange={(e) => { setDonateCustom(e.target.value); setDonateAmount(null) }}
                    className="form-input-support pl-7"
                  />
                </div>
              </div>

              {/* Payment method selection */}
              <div>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Payment Method</p>
                <PaymentMethods
                  baseAmount={effectiveDonateAmount}
                  method={donateMethod}
                  onMethodChange={setDonateMethod}
                  coverFee={donateCoverFee}
                  onCoverFeeChange={setDonateCoverFee}
                  processingFeeConfig={processingFeeConfig}
                  zelleConfig={zelleConfig}
                  zelleReferenceCode={donateReference}
                  accent="amber"
                />
              </div>

              <button
                type="submit"
                disabled={effectiveDonateAmount <= 0 || !donateMethod}
                className="w-full px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {donateIsZelle ? (
                  <>
                    <Landmark className="w-4 h-4" strokeWidth={1.5} />
                    I&apos;ve Sent My Zelle Payment
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" strokeWidth={2} />
                    {effectiveDonateAmount > 0 ? `Donate ${formatUsd(donateTotal)}` : 'Enter an amount'}
                  </>
                )}
              </button>
            </form>
          )}
        </ModalOverlay>
      )}

      <style>{`
        .form-input-support {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          border-color: var(--color-stone-200);
          background: var(--color-stone-50);
          color: var(--color-stone-900);
        }
        .dark .form-input-support {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .form-input-support:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1);
        }
        .dark .form-input-support:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
        }
        .form-input-support::placeholder {
          color: var(--color-stone-400);
        }
        .dark .form-input-support::placeholder {
          color: var(--color-stone-500);
        }
        .dropin-card-field {
          width: 100%;
          padding: 0.5rem 0.625rem;
          border-radius: 0.375rem;
          border: 1px solid;
          font-size: 0.8125rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          border-color: var(--color-stone-200);
          background: var(--color-stone-50);
          color: var(--color-stone-900);
        }
        .dark .dropin-card-field {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .dropin-card-field:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 2px rgb(16 185 129 / 0.15);
        }
        .dropin-card-field::placeholder {
          color: var(--color-stone-400);
        }
      `}</style>
    </div>
  )
}

// ── Shared sub-components ──────────────────────────────────────────────────

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
        {children}
      </div>
    </div>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
    >
      <X className="w-5 h-5" strokeWidth={1.5} />
    </button>
  )
}

/** Confirmation shown after a Zelle "I've sent it" submission — payment is pending admin verification. */
function ZellePendingPanel({
  reference,
  amount,
  message,
  onDone,
}: {
  reference: string
  amount: number
  message: string
  onDone: () => void
}) {
  return (
    <div className="p-6 sm:p-8 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center ring-1 ring-amber-200 dark:ring-amber-900/60">
        <Clock className="w-7 h-7 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
        Payment Pending Verification
      </h3>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
        {message}
      </p>

      <div className="mt-5 inline-flex flex-col gap-1 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 px-6 py-4">
        <span className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider">Reference code</span>
        <span className="font-mono text-lg font-semibold text-stone-900 dark:text-stone-100">{reference}</span>
        {amount > 0 && (
          <span className="text-xs text-stone-400 dark:text-stone-500 mt-1">
            Amount to send: {formatUsd(amount)}
          </span>
        )}
      </div>

      <button
        onClick={onDone}
        className="mt-6 w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.98]"
      >
        Done
      </button>
    </div>
  )
}

interface FormFieldProps {
  label: string
  required?: boolean
  hint?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

function FormField({ label, required, hint, icon, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
        {icon && <span className="text-stone-400 dark:text-stone-500">{icon}</span>}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1 text-xs text-stone-400 dark:text-stone-500">{hint}</span>}
    </label>
  )
}
