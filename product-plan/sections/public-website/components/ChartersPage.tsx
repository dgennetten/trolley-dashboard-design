import { useState, useEffect, useCallback } from 'react'
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
  Info,
  MapPin,
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
  charterRouteEndpoint: '',
  ackNoDrinkEatSmoke: false,
  ackNotAdaCompliant: false,
  ackDecorationsBluePaintersTape: false,
  ackWeatherOrTrolleyCoordination: false,
}

const inputClass =
  'w-full px-3 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors'

export function ChartersPage({
  charterInfo,
  onSubmitCharterRequest,
}: ChartersPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<CharterRequestFormData>({ ...EMPTY_FORM })
  const [routeError, setRouteError] = useState(false)

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setForm({ ...EMPTY_FORM })
    setRouteError(false)
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [modalOpen, closeModal])

  const update = (field: keyof CharterRequestFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const patchForm = <K extends keyof CharterRequestFormData>(
    field: K,
    value: CharterRequestFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'charterRouteEndpoint') {
      setRouteError(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.charterRouteEndpoint) {
      setRouteError(true)
      return
    }
    setRouteError(false)
    onSubmitCharterRequest?.(form)
    setForm({ ...EMPTY_FORM })
    setModalOpen(false)
  }

  const schedulingPolicy =
    charterInfo.policies.find((p) =>
      /12.?5|noon|saturday|sunday|holiday/i.test(p)
    ) ?? 'Charter times cannot fall during regular public ride hours (see policies below).'

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
                  type="button"
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

      {/* Charter Request Modal — matches Support Us membership modal structure */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <div
            className="absolute inset-0 bg-stone-900/50 dark:bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="charter-modal-title"
            className="relative w-full max-w-2xl max-h-[min(92vh,800px)] flex flex-col overflow-hidden bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 ring-1 ring-stone-900/5 dark:ring-white/10"
          >
            {/* Accent rail */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 shrink-0" />

            {/* Header — same pattern as SupportUsPage modal */}
            <div className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  id="charter-modal-title"
                  className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']"
                >
                  Request a Charter
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  We&apos;ll confirm availability before scheduling and requesting payment to hold your date.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
                {/* Scheduling + Mountain Time callout */}
                <div className="flex gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="text-xs text-amber-900/90 dark:text-amber-100/90 leading-relaxed">
                    <p className="font-semibold text-amber-950 dark:text-amber-100 mb-1">
                      Preferred times
                    </p>
                    <p>{schedulingPolicy}</p>
                    <p className="mt-2 text-amber-800/80 dark:text-amber-200/70">
                      All times are in <span className="font-semibold">Mountain Time</span>.
                    </p>
                  </div>
                </div>

                {charterInfo.charterLeadPhone && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      Charter coordinator:
                    </span>
                    <a
                      href={`tel:${charterInfo.charterLeadPhone.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                      {charterInfo.charterLeadPhone}
                    </a>
                  </div>
                )}

                {/* Operating window & duration */}
                <div className="p-4 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/35 border border-emerald-200/70 dark:border-emerald-900/50">
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    The trolley can operate from <span className="font-semibold">sunrise to sunset</span>.
                    The minimum charter length is <span className="font-semibold">one hour</span>. In one hour we
                    can make <span className="font-semibold">two round trips</span> or{' '}
                    <span className="font-semibold">one slow trip</span>.
                  </p>
                </div>

                {/* Start / end — mutually exclusive (radio pair) */}
                <fieldset className="space-y-3 min-w-0">
                  <legend
                    id="charter-route-legend"
                    className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-1"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
                    Where would you like your charter to start and end?
                  </legend>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                    Choose one. This tells us which end of the line to prioritize for your charter.
                  </p>
                  <div
                    className="space-y-2"
                    role="radiogroup"
                    aria-labelledby="charter-route-legend"
                  >
                    <CharterRouteRadioRow
                      id="charter-route-city-park"
                      name="charterRouteEndpoint"
                      value="city_park_depot"
                      checked={form.charterRouteEndpoint === 'city_park_depot'}
                      onSelect={() => patchForm('charterRouteEndpoint', 'city_park_depot')}
                    >
                      Trolley Depot in City Park
                    </CharterRouteRadioRow>
                    <CharterRouteRadioRow
                      id="charter-route-howes"
                      name="charterRouteEndpoint"
                      value="howes_st_joseph"
                      checked={form.charterRouteEndpoint === 'howes_st_joseph'}
                      onSelect={() => patchForm('charterRouteEndpoint', 'howes_st_joseph')}
                    >
                      Howes Street in front of St. Joseph&apos;s Catholic Parish
                    </CharterRouteRadioRow>
                  </div>
                  {routeError && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                      Please choose one location for your charter.
                    </p>
                  )}
                </fieldset>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    icon={<User className="w-4 h-4" strokeWidth={1.5} />}
                    label="First Name"
                    required
                  >
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      className={inputClass}
                      placeholder="Jane"
                    />
                  </FormField>
                  <FormField label="Last Name" required>
                    <input
                      type="text"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      className={inputClass}
                      placeholder="Smith"
                    />
                  </FormField>
                </div>

                <FormField
                  icon={<Mail className="w-4 h-4" strokeWidth={1.5} />}
                  label="Email"
                  required
                  hint="We will not give your contact information to anyone."
                >
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                </FormField>

                <FormField
                  icon={<Phone className="w-4 h-4" strokeWidth={1.5} />}
                  label="Day of charter cell phone number"
                  required
                  hint="We will not give your contact information to anyone. This number is the point of contact for motormen and crew on the day of your event."
                >
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass}
                    placeholder="(970) 555-0123"
                  />
                </FormField>

                <div className="border-t border-stone-100 dark:border-stone-800 pt-5">
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
                    Preferred schedule
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                    Scheduling is limited — please pick a preferred date and time and a secondary option.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className={inputClass}
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
                      className={inputClass}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Secondary Date">
                    <input
                      type="date"
                      value={form.secondaryDate}
                      onChange={(e) => update('secondaryDate', e.target.value)}
                      className={inputClass}
                    />
                  </FormField>
                  <FormField label="Secondary Time">
                    <input
                      type="time"
                      value={form.secondaryTime}
                      onChange={(e) => update('secondaryTime', e.target.value)}
                      className={inputClass}
                    />
                  </FormField>
                </div>

                <FormField
                  icon={<MessageSquare className="w-4 h-4" strokeWidth={1.5} />}
                  label="Message"
                  hint="Tell us about your event and let us know if you have any questions we can answer."
                >
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${inputClass} resize-none min-h-[100px]`}
                    placeholder="Please tell us about your event and let us know if you have any more questions we can answer."
                  />
                </FormField>

                {/* Required acknowledgments */}
                <div className="border-t border-stone-100 dark:border-stone-800 pt-5 space-y-3">
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    Please confirm <span className="text-red-500">*</span>
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 -mt-1 mb-2">
                    All items below must be checked to submit your request.
                  </p>
                  <CharterCheckboxRow
                    id="charter-ack-no-consume"
                    checked={form.ackNoDrinkEatSmoke}
                    onChange={(v) => patchForm('ackNoDrinkEatSmoke', v)}
                    required
                  >
                    I understand that there is no drinking, eating or smoking on the trolley.
                  </CharterCheckboxRow>
                  <CharterCheckboxRow
                    id="charter-ack-ada"
                    checked={form.ackNotAdaCompliant}
                    onChange={(v) => patchForm('ackNotAdaCompliant', v)}
                    required
                  >
                    I understand that the trolley is not ADA compliant. Passengers will have to navigate 3
                    steps getting on and off the trolley.
                  </CharterCheckboxRow>
                  <CharterCheckboxRow
                    id="charter-ack-decor"
                    checked={form.ackDecorationsBluePaintersTape}
                    onChange={(v) => patchForm('ackDecorationsBluePaintersTape', v)}
                    required
                  >
                    I understand that decorations are permitted in the trolley but anything affixed to the
                    trolley must use blue painter&apos;s tape and that all decorations must be removed at the
                    end of the charter.
                  </CharterCheckboxRow>
                  <CharterCheckboxRow
                    id="charter-ack-weather"
                    checked={form.ackWeatherOrTrolleyCoordination}
                    onChange={(v) => patchForm('ackWeatherOrTrolleyCoordination', v)}
                    required
                  >
                    I understand that the trolley is old and weather changes. If the trolley or the weather
                    are misbehaving, the motorman will call you on the cell number you provided to coordinate
                    changes.
                  </CharterCheckboxRow>
                </div>
              </div>

              {/* Footer — cancel + submit (membership-style primary) */}
              <div className="shrink-0 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 px-5 sm:px-6 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-800/40">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
        {icon && (
          <span className="text-stone-400 dark:text-stone-500">{icon}</span>
        )}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && (
        <span className="block mt-1.5 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
          {hint}
        </span>
      )}
    </label>
  )
}

const checkboxClass =
  'mt-1 h-4 w-4 shrink-0 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 dark:border-stone-600 dark:bg-stone-800 dark:focus:ring-emerald-500 dark:focus:ring-offset-stone-900'

const radioClass =
  'mt-1 h-4 w-4 shrink-0 border-stone-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 dark:border-stone-600 dark:bg-stone-800 dark:focus:ring-emerald-500 dark:focus:ring-offset-stone-900'

function CharterRouteRadioRow({
  id,
  name,
  value,
  checked,
  onSelect,
  children,
}: {
  id: string
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={id}
      className={`flex gap-3 items-start p-3 rounded-xl border cursor-pointer transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-500/40 ${
        checked
          ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/35 ring-1 ring-emerald-200 dark:ring-emerald-800'
          : 'border-stone-200 dark:border-stone-700 bg-stone-50/90 dark:bg-stone-800/50 hover:border-emerald-300/60 dark:hover:border-emerald-700/50'
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className={radioClass}
      />
      <span className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{children}</span>
    </label>
  )
}

function CharterCheckboxRow({
  id,
  checked,
  onChange,
  required,
  children,
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={id}
      className="flex gap-3 items-start p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/90 dark:bg-stone-800/50 cursor-pointer hover:border-emerald-300/60 dark:hover:border-emerald-700/50 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-500/40"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
        className={checkboxClass}
      />
      <span className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{children}</span>
    </label>
  )
}
