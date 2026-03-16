import { useState } from 'react'
import type {
  CharterInfo,
  CharterRequestFormData,
} from '../types'
import {
  TramFront,
  AlertCircle,
  X,
  Send,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react'

export interface ChartersPageProps {
  charterInfo: CharterInfo
  onSubmitCharterRequest?: (data: CharterRequestFormData) => void
  onNavigate?: (href: string) => void
}

const EMPTY_FORM: CharterRequestFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  secondaryDate: '',
  secondaryTime: '',
  message: '',
}

export function ChartersPage({
  charterInfo,
  onSubmitCharterRequest,
}: ChartersPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<CharterRequestFormData>({ ...EMPTY_FORM })

  const update = (field: keyof CharterRequestFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitCharterRequest?.(form)
    setForm({ ...EMPTY_FORM })
    setModalOpen(false)
  }

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Private Events
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            Charter the Trolley
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            Make your special occasion unforgettable with a private trolley ride.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
              <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
                About Charters
              </h2>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center ring-1 ring-amber-100 dark:ring-amber-900/40">
                  <TramFront className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                    {charterInfo.title}
                  </h3>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {charterInfo.description}
              </p>

              {/* Policies */}
              <div className="mt-8 space-y-3">
                <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  Please Note
                </h4>
                {charterInfo.policies.map((policy, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm text-stone-600 dark:text-stone-400">
                      {policy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40 p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-5 ring-1 ring-emerald-200 dark:ring-emerald-800/40">
                  <CalendarDays className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.25} />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 font-['DM_Sans']">
                  Ready to book?
                </h3>
                <p className="mt-2 text-sm text-emerald-700/70 dark:text-emerald-300/60 leading-relaxed">
                  Submit your preferred dates and we&apos;ll get back to you to confirm availability.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  Request a Charter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charter Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                  Request a Charter
                </h2>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                  We&apos;ll confirm availability within 2 business days
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  icon={<User className="w-4 h-4" strokeWidth={1.5} />}
                  label="First Name"
                  required
                >
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    className="form-input"
                    placeholder="Jane"
                  />
                </FormField>
                <FormField label="Last Name" required>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    className="form-input"
                    placeholder="Smith"
                  />
                </FormField>
              </div>

              {/* Email */}
              <FormField
                icon={<Mail className="w-4 h-4" strokeWidth={1.5} />}
                label="Email"
                required
                hint="We will not share your contact information"
              >
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="form-input"
                  placeholder="jane@example.com"
                />
              </FormField>

              {/* Phone */}
              <FormField
                icon={<Phone className="w-4 h-4" strokeWidth={1.5} />}
                label="Day-of-Event Cell Phone"
                required
                hint="For coordination on the day of your charter"
              >
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="form-input"
                  placeholder="(970) 555-0123"
                />
              </FormField>

              {/* Divider */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-5">
                <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
                  Preferred Schedule
                </p>
              </div>

              {/* Preferred date/time */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  icon={<CalendarDays className="w-4 h-4" strokeWidth={1.5} />}
                  label="Preferred Date"
                  required
                >
                  <input
                    type="date"
                    required
                    value={form.preferredDate}
                    onChange={(e) => update('preferredDate', e.target.value)}
                    className="form-input"
                  />
                </FormField>
                <FormField
                  icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
                  label="Preferred Time"
                  required
                >
                  <input
                    type="time"
                    required
                    value={form.preferredTime}
                    onChange={(e) => update('preferredTime', e.target.value)}
                    className="form-input"
                  />
                </FormField>
              </div>

              {/* Secondary date/time */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Secondary Date">
                  <input
                    type="date"
                    value={form.secondaryDate}
                    onChange={(e) => update('secondaryDate', e.target.value)}
                    className="form-input"
                  />
                </FormField>
                <FormField label="Secondary Time">
                  <input
                    type="time"
                    value={form.secondaryTime}
                    onChange={(e) => update('secondaryTime', e.target.value)}
                    className="form-input"
                  />
                </FormField>
              </div>

              {/* Message */}
              <FormField
                icon={<MessageSquare className="w-4 h-4" strokeWidth={1.5} />}
                label="Message"
                hint="Tell us about your event and any questions"
              >
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="form-input resize-none"
                  placeholder="Please tell us about your event..."
                />
              </FormField>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoped form styles */}
      <style>{`
        .form-input {
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
        .dark .form-input {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .form-input:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1);
        }
        .dark .form-input:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
        }
        .form-input::placeholder {
          color: var(--color-stone-400);
        }
        .dark .form-input::placeholder {
          color: var(--color-stone-500);
        }
      `}</style>
    </div>
  )
}

/* ─── Form Field wrapper ─── */

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
        {icon && (
          <span className="text-stone-400 dark:text-stone-500">{icon}</span>
        )}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && (
        <span className="block mt-1 text-xs text-stone-400 dark:text-stone-500">
          {hint}
        </span>
      )}
    </label>
  )
}
