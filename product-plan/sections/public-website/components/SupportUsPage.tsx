import { useState } from 'react'
import type {
  MembershipLevel,
  MemberSignupFormData,
  PaymentMethod,
  PaymentOptions,
  SupportOption,
  SupportOptionIcon,
} from '../types'
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
} from 'lucide-react'

export interface SupportUsPageProps {
  membershipLevels: MembershipLevel[]
  supportOptions: SupportOption[]
  paymentOptions: PaymentOptions
  onSubmitMemberSignup?: (data: MemberSignupFormData) => void
  onDonate?: (method: PaymentMethod) => void
  onNavigate?: (href: string) => void
}

const ICON_MAP: Record<SupportOptionIcon, typeof Heart> = {
  heart: Heart,
  users: Users,
  megaphone: Megaphone,
  partyPopper: PartyPopper,
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
  paymentMethod: 'venmo',
}

export function SupportUsPage({
  membershipLevels,
  supportOptions,
  paymentOptions,
  onSubmitMemberSignup,
  onDonate,
  onNavigate,
}: SupportUsPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<MemberSignupFormData>({ ...EMPTY_FORM })
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null)

  const update = (field: keyof MemberSignupFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const openSignup = (levelId?: string) => {
    if (levelId) {
      setForm((prev) => ({ ...prev, membershipLevelId: levelId }))
    }
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitMemberSignup?.(form)
    setForm({ ...EMPTY_FORM })
    setModalOpen(false)
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
              const isHovered = selectedTierId === level.id

              return (
                <div
                  key={level.id}
                  onMouseEnter={() => setSelectedTierId(level.id)}
                  onMouseLeave={() => setSelectedTierId(null)}
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
            Your tax-deductible donation helps preserve the history of the Fort Collins Municipal Railway Society.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onDonate?.('venmo')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#008CFF] hover:bg-[#0074D4] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#008CFF]/25 active:scale-[0.98]"
            >
              <span className="text-lg font-bold">Venmo</span>
            </button>
            <button
              onClick={() => onDonate?.('paypal')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#003087] hover:bg-[#002670] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#003087]/25 active:scale-[0.98]"
            >
              <span className="text-lg font-bold">PayPal</span>
            </button>
          </div>

          <div className="mt-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg px-4 py-3 text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Or mail a check payable to <strong className="text-stone-700 dark:text-stone-300">{paymentOptions.checkPayableTo}</strong> at{' '}
            <span className="text-stone-600 dark:text-stone-300">{paymentOptions.checkMailTo}</span>
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

      {/* Signup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                  Become a Member
                </h2>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                  Join the Fort Collins Trolley family
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

              <FormField icon={<CreditCard className="w-4 h-4" strokeWidth={1.5} />} label="Payment Method" required>
                <div className="flex gap-3 mt-1">
                  {(['venmo', 'paypal', 'check'] as const).map((method) => (
                    <label
                      key={method}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all
                        ${form.paymentMethod === method
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={(e) => update('paymentMethod', e.target.value)}
                        className="sr-only"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </FormField>

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
          </div>
        </div>
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
      `}</style>
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
