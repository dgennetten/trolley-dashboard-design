import { useState, useRef } from 'react'
import type {
  BraintreeConfig,
  BraintreePaymentMethod,
  MembershipLevel,
  MemberSignupFormData,
  SupportOption,
  SupportOptionIcon,
} from '@/../product/sections/public-website/types'
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
  ChevronDown,
} from 'lucide-react'

export interface SupportUsPageProps {
  membershipLevels: MembershipLevel[]
  supportOptions: SupportOption[]
  braintreeConfig: BraintreeConfig
  onSubmitMemberSignup?: (data: MemberSignupFormData) => void
  onDonate?: (nonce: string, amount: number) => void
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

interface BraintreeDropInMockProps {
  /** Selected method in the mock — purely visual for design prototype */
  selected: BraintreePaymentMethod | null
  onSelect: (method: BraintreePaymentMethod) => void
}

/** Visual mock of the PayPal Braintree Drop-in UI for design prototype purposes.
 *  In production, replace this container with the Braintree SDK Drop-in UI. */
function BraintreeDropInMock({ selected, onSelect }: BraintreeDropInMockProps) {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden bg-white dark:bg-stone-900">
      {/* PayPal button */}
      <button
        type="button"
        onClick={() => onSelect('paypal')}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3.5 transition-all border-b border-stone-100 dark:border-stone-800 font-semibold text-sm
          ${selected === 'paypal'
            ? 'bg-[#FFC439] text-[#003087] ring-inset ring-2 ring-[#FFC439]'
            : 'bg-[#FFC439]/90 hover:bg-[#FFC439] text-[#003087]'
          }
        `}
      >
        {/* PayPal wordmark */}
        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" aria-label="PayPal">
          <text x="0" y="16" fontSize="14" fontWeight="700" fill="#003087" fontFamily="Arial">Pay</text>
          <text x="24" y="16" fontSize="14" fontWeight="700" fill="#009CDE" fontFamily="Arial">Pal</text>
        </svg>
        {selected === 'paypal' && <Check className="w-4 h-4 ml-1" strokeWidth={2.5} />}
      </button>

      {/* Venmo button */}
      <button
        type="button"
        onClick={() => onSelect('venmo')}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3.5 transition-all border-b border-stone-100 dark:border-stone-800 font-semibold text-sm
          ${selected === 'venmo'
            ? 'bg-[#008CFF] text-white ring-inset ring-2 ring-[#0074D4]'
            : 'bg-[#008CFF]/90 hover:bg-[#008CFF] text-white'
          }
        `}
      >
        {/* Venmo wordmark */}
        <svg width="72" height="20" viewBox="0 0 72 20" aria-label="Venmo">
          <text x="0" y="16" fontSize="14" fontWeight="700" fill="white" fontFamily="Arial">Venmo</text>
        </svg>
        {selected === 'venmo' && <Check className="w-4 h-4 ml-1" strokeWidth={2.5} />}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-stone-50 dark:bg-stone-800/60">
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
        <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">or pay with card</span>
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
      </div>

      {/* Card option */}
      <button
        type="button"
        onClick={() => onSelect('card')}
        className={`
          w-full px-4 pt-3 pb-4 transition-all text-left
          ${selected === 'card' ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40'}
        `}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Credit / Debit Card</span>
          </div>
          {selected === 'card'
            ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
            : <ChevronDown className="w-4 h-4 text-stone-300 dark:text-stone-600" strokeWidth={1.5} />
          }
        </div>

        {selected === 'card' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <input
              type="text"
              placeholder="Card number"
              maxLength={19}
              className="dropin-card-field"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                className="dropin-card-field"
                onClick={(e) => e.stopPropagation()}
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength={4}
                className="dropin-card-field"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <input
              type="text"
              placeholder="Name on card"
              className="dropin-card-field"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </button>

      {/* Secure badge */}
      <div className="flex items-center justify-center gap-1.5 py-2 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800">
        <Lock className="w-3 h-3 text-stone-400" strokeWidth={1.5} />
        <span className="text-[11px] text-stone-400 dark:text-stone-500">Secured by PayPal Braintree</span>
      </div>
    </div>
  )
}

const EMPTY_FORM: MemberSignupFormData = {
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
  braintreeNonce: '',
  paymentMethod: 'card',
}

export function SupportUsPage({
  membershipLevels,
  supportOptions,
  braintreeConfig: _braintreeConfig,
  onSubmitMemberSignup,
  onDonate,
  onNavigate,
}: SupportUsPageProps) {
  const [modal, setModal] = useState<ModalView>(null)
  const [form, setForm] = useState<MemberSignupFormData>({ ...EMPTY_FORM })
  const [signupPayMethod, setSignupPayMethod] = useState<BraintreePaymentMethod | null>(null)
  const [hoveredTierId, setHoveredTierId] = useState<string | null>(null)

  // Donate modal state
  const [donateAmount, setDonateAmount] = useState<number | null>(25)
  const [donateCustom, setDonateCustom] = useState('')
  const [donatePayMethod, setDonatePayMethod] = useState<BraintreePaymentMethod | null>(null)
  const customInputRef = useRef<HTMLInputElement>(null)

  const update = (field: keyof MemberSignupFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const openSignup = (levelId?: string) => {
    setForm({ ...EMPTY_FORM, membershipLevelId: levelId ?? '' })
    setSignupPayMethod(null)
    setModal('signup')
  }

  const openDonate = () => {
    setDonateAmount(25)
    setDonateCustom('')
    setDonatePayMethod(null)
    setModal('donate')
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, braintreeNonce comes from dropin.requestPaymentMethod()
    onSubmitMemberSignup?.({ ...form, braintreeNonce: 'mock-nonce', paymentMethod: signupPayMethod ?? 'card' })
    setModal(null)
    setForm({ ...EMPTY_FORM })
    setSignupPayMethod(null)
  }

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = donateCustom ? parseFloat(donateCustom) : donateAmount ?? 0
    if (!amount || amount <= 0) return
    // In production, nonce comes from dropin.requestPaymentMethod()
    onDonate?.('mock-nonce', amount)
    setModal(null)
  }

  const effectiveDonateAmount = donateCustom
    ? parseFloat(donateCustom) || 0
    : donateAmount ?? 0

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
            Your tax-deductible donation helps preserve the history of the Fort Collins Municipal Railway Society. Pay securely with card, PayPal, or Venmo.
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
            <span>Secured by PayPal Braintree &mdash; card, PayPal, or Venmo accepted</span>
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
        <ModalOverlay onClose={() => setModal(null)}>
          <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                Become a Member
              </h2>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                Join the Fort Collins Trolley family
              </p>
            </div>
            <CloseButton onClick={() => setModal(null)} />
          </div>

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

            {/* Braintree Drop-in UI */}
            <div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                <CreditCard className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                Payment
                <span className="text-red-500">*</span>
              </span>
              <BraintreeDropInMock selected={signupPayMethod} onSelect={setSignupPayMethod} />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
                Submit Membership
              </button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {/* ── Donate Modal ── */}
      {modal === 'donate' && (
        <ModalOverlay onClose={() => setModal(null)}>
          <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                Make a Donation
              </h2>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                Your gift is tax-deductible · Fort Collins Municipal Railway Society
              </p>
            </div>
            <CloseButton onClick={() => setModal(null)} />
          </div>

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

            {/* Braintree Drop-in UI */}
            <div>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Payment Method</p>
              <BraintreeDropInMock selected={donatePayMethod} onSelect={setDonatePayMethod} />
            </div>

            <button
              type="submit"
              disabled={effectiveDonateAmount <= 0}
              className="w-full px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" strokeWidth={2} />
              {effectiveDonateAmount > 0
                ? `Donate $${effectiveDonateAmount}`
                : 'Enter an amount'}
            </button>
          </form>
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
