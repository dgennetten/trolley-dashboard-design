import { useState } from 'react'
import type {
  MemberProfile,
  PaymentRecord,
  AvailableLevel,
  ProfileUpdateData,
  MemberAddress,
  PaymentMethod,
  ProcessingFeeConfig,
  ZelleConfig,
  RenewalFormData,
} from '@/../product/sections/authentication-and-member-portal/types'
import { PaymentMethods } from './PaymentMethods'
import { computeProcessingFee, formatUsd } from './paymentUtils'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  CalendarDays,
  Pencil,
  X,
  Check,
  Award,
  RefreshCw,
  Landmark,
  Clock,
} from 'lucide-react'

export interface ProfilePageProps {
  profile: MemberProfile
  paymentHistory: PaymentRecord[]
  availableLevels: AvailableLevel[]
  processingFeeConfig: ProcessingFeeConfig
  zelleConfig: ZelleConfig
  onUpdateProfile?: (data: ProfileUpdateData) => void
  onRenew?: (data: RenewalFormData) => void
  onUpgradeMembership?: (data: RenewalFormData) => void
  onNavigate?: (href: string) => void
}

// ── Payment method display label ──────────────────────────────────────────

const METHOD_LABELS: Record<string, string> = {
  card: 'Credit Card',
  paypal: 'PayPal',
  venmo: 'Venmo',
  zelle: 'Zelle',
}

function methodLabel(method: string) {
  return METHOD_LABELS[method] ?? method
}

// ── Status badges ─────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const map: Record<string, { label: string; classes: string }> = {
    current: { label: 'Current', classes: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-800/40' },
    due: { label: 'Due', classes: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-800/40' },
    past_due: { label: 'Past Due', classes: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 ring-red-200 dark:ring-red-800/40' },
    lifetime: { label: 'Lifetime', classes: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-800/40' },
  }
  const s = map[status] || map.current
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ${s.classes}`}>
      {s.label}
    </span>
  )
}

function certBadge(status: string) {
  return status === 'certified' ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800/40">
      <Check className="w-3 h-3" strokeWidth={2.5} /> Certified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800/40">
      <RefreshCw className="w-3 h-3" strokeWidth={2} /> Needs Recert
    </span>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Generate a short reference code for the member to include in a Zelle memo. */
function genReferenceCode(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `FCT-${rand}`
}

// ── Main component ────────────────────────────────────────────────────────

export function ProfilePage({
  profile,
  paymentHistory,
  availableLevels,
  processingFeeConfig,
  zelleConfig,
  onUpdateProfile,
  onRenew,
  onUpgradeMembership,
}: ProfilePageProps) {
  const [editing, setEditing] = useState(false)
  const [renewOpen, setRenewOpen] = useState(false)
  const [editForm, setEditForm] = useState<ProfileUpdateData>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    address: { ...profile.address },
  })
  const [selectedUpgradeId, setSelectedUpgradeId] = useState(profile.membershipLevel.id)
  const [renewMethod, setRenewMethod] = useState<PaymentMethod | null>(null)
  const [renewCoverFee, setRenewCoverFee] = useState(false)
  const [renewReference, setRenewReference] = useState('')
  const [renewPending, setRenewPending] = useState<{ reference: string; amount: number } | null>(null)

  const updateAddr = (field: keyof MemberAddress, value: string) =>
    setEditForm((p) => ({ ...p, address: { ...p.address, [field]: value } }))

  const handleSaveProfile = () => {
    onUpdateProfile?.(editForm)
    setEditing(false)
  }

  const openRenew = () => {
    setSelectedUpgradeId(profile.membershipLevel.id)
    setRenewMethod(null)
    setRenewCoverFee(false)
    setRenewReference(genReferenceCode())
    setRenewPending(null)
    setRenewOpen(true)
  }

  const closeRenew = () => {
    setRenewOpen(false)
    setRenewMethod(null)
    setRenewCoverFee(false)
    setRenewPending(null)
  }

  const selectedLevel = availableLevels.find((l) => l.id === selectedUpgradeId)
  const renewBase = selectedLevel?.price ?? 0
  const renewFee = computeProcessingFee(renewBase, processingFeeConfig)
  const renewIsUpgrade = selectedUpgradeId !== profile.membershipLevel.id
  const renewIsZelle = renewMethod === 'zelle'
  const renewTotal = !renewIsZelle && renewCoverFee ? renewBase + renewFee : renewBase

  const handleRenewConfirm = () => {
    if (!renewMethod) return
    const data: RenewalFormData = {
      membershipLevelId: selectedUpgradeId,
      isUpgrade: renewIsUpgrade,
      paymentMethod: renewMethod,
      coverProcessingFee: renewIsZelle ? false : renewCoverFee,
      amountCharged: renewTotal,
      // In production, braintreeNonce comes from dropin.requestPaymentMethod()
      braintreeNonce: renewIsZelle ? undefined : 'mock-nonce',
      zelleReferenceCode: renewIsZelle ? renewReference : undefined,
    }
    if (renewIsUpgrade) {
      onUpgradeMembership?.(data)
    } else {
      onRenew?.(data)
    }
    if (renewIsZelle) {
      setRenewPending({ reference: renewReference, amount: renewBase })
    } else {
      closeRenew()
    }
  }

  const isDue = profile.paymentStatus === 'due' || profile.paymentStatus === 'past_due'
  const isLifetime = profile.paymentStatus === 'lifetime'

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Member summary card */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {profile.firstName} {profile.lastName}
              </h1>
              {statusBadge(profile.paymentStatus)}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
                {profile.membershipLevel.name}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.5} />
                Member since {formatDate(profile.memberSince)}
              </span>
              {!isLifetime && (
                <span className="flex items-center gap-1.5">
                  Expires {formatDate(profile.expiresOn)}
                </span>
              )}
            </div>
          </div>

          {isDue && (
            <button
              onClick={openRenew}
              className="shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
            >
              Renew Membership
            </button>
          )}
          {!isDue && !isLifetime && (
            <button
              onClick={openRenew}
              className="shrink-0 px-4 py-2 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium text-sm rounded-lg transition-colors"
            >
              Upgrade
            </button>
          )}
        </div>

        {/* Volunteer roles */}
        {profile.volunteerRoles.length > 0 && (
          <div className="mt-5 pt-5 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
              Volunteer Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.volunteerRoles.map((vr) => (
                <div key={vr.role} className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 rounded-lg px-3 py-2">
                  <Award className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{vr.role}</span>
                  {vr.isLead && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">Lead</span>
                  )}
                  {certBadge(vr.certificationStatus)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact information */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            Contact Information
          </h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="p-1.5 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button onClick={handleSaveProfile} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
                <Check className="w-3.5 h-3.5" strokeWidth={2} /> Save
              </button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={<User className="w-4 h-4" />} label="Name" value={`${profile.firstName} ${profile.lastName}`} />
            <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={profile.email} />
            <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={profile.phone} />
            <InfoRow icon={<MapPin className="w-4 h-4" />} label="Address" value={`${profile.address.line1}${profile.address.line2 ? ', ' + profile.address.line2 : ''}, ${profile.address.city}, ${profile.address.state} ${profile.address.zipCode}`} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <EditField label="First Name" value={editForm.firstName} onChange={(v) => setEditForm((p) => ({ ...p, firstName: v }))} />
              <EditField label="Last Name" value={editForm.lastName} onChange={(v) => setEditForm((p) => ({ ...p, lastName: v }))} />
            </div>
            <EditField label="Email" value={editForm.email} onChange={(v) => setEditForm((p) => ({ ...p, email: v }))} type="email" />
            <EditField label="Phone" value={editForm.phone} onChange={(v) => setEditForm((p) => ({ ...p, phone: v }))} type="tel" />
            <EditField label="Address Line 1" value={editForm.address.line1} onChange={(v) => updateAddr('line1', v)} />
            <EditField label="Address Line 2" value={editForm.address.line2 || ''} onChange={(v) => updateAddr('line2', v)} />
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2"><EditField label="City" value={editForm.address.city} onChange={(v) => updateAddr('city', v)} /></div>
              <div className="col-span-1"><EditField label="State" value={editForm.address.state} onChange={(v) => updateAddr('state', v)} /></div>
              <div className="col-span-2"><EditField label="ZIP" value={editForm.address.zipCode} onChange={(v) => updateAddr('zipCode', v)} /></div>
            </div>
          </div>
        )}
      </div>

      {/* Payment history */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            Payment History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Description</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider hidden sm:table-cell">Method</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((pay) => (
                <tr key={pay.id} className="border-b border-stone-50 dark:border-stone-800/50 last:border-0">
                  <td className="px-3 py-3 text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap">{formatDate(pay.date)}</td>
                  <td className="px-3 py-3 text-sm text-stone-700 dark:text-stone-300">{pay.description}</td>
                  <td className="px-3 py-3 text-sm text-stone-500 dark:text-stone-400 hidden sm:table-cell">{methodLabel(pay.method)}</td>
                  <td className="px-3 py-3 text-sm text-stone-900 dark:text-stone-100 font-semibold text-right font-['DM_Sans']">${pay.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renewal / Upgrade modal */}
      {renewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeRenew} />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {renewPending ? 'Almost Done' : renewIsUpgrade ? 'Upgrade Membership' : 'Renew Membership'}
              </h2>
              <button
                onClick={closeRenew}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {renewPending ? (
              <ZellePendingPanel
                reference={renewPending.reference}
                amount={renewPending.amount}
                message="Once our treasurer confirms your Zelle transfer, your membership will be renewed. We'll email you a confirmation."
                onDone={closeRenew}
              />
            ) : (
              <div className="p-6 space-y-5">
                {/* Level selector */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">Select Level</p>
                  <div className="space-y-2">
                    {availableLevels.map((lvl) => (
                      <label
                        key={lvl.id}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                          selectedUpgradeId === lvl.id
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200 dark:ring-emerald-800'
                            : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="level"
                            value={lvl.id}
                            checked={selectedUpgradeId === lvl.id}
                            onChange={() => { setSelectedUpgradeId(lvl.id); setRenewCoverFee(false) }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedUpgradeId === lvl.id ? 'border-emerald-500' : 'border-stone-300 dark:border-stone-600'
                          }`}>
                            {selectedUpgradeId === lvl.id && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{lvl.name}</span>
                            {lvl.id === profile.membershipLevel.id && (
                              <span className="ml-2 text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase">Current</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] shrink-0">
                          ${lvl.price}<span className="text-xs font-normal text-stone-400">/{lvl.period === 'year' ? 'yr' : 'once'}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment method selection */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">Payment Method</p>
                  <PaymentMethods
                    baseAmount={renewBase}
                    method={renewMethod}
                    onMethodChange={setRenewMethod}
                    coverFee={renewCoverFee}
                    onCoverFeeChange={setRenewCoverFee}
                    processingFeeConfig={processingFeeConfig}
                    zelleConfig={zelleConfig}
                    zelleReferenceCode={renewReference}
                  />
                </div>

                <button
                  onClick={handleRenewConfirm}
                  disabled={!renewMethod}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {renewIsZelle ? (
                    <>
                      <Landmark className="w-4 h-4" strokeWidth={1.5} />
                      I&apos;ve Sent My Zelle Payment
                    </>
                  ) : (
                    <>{renewIsUpgrade ? 'Upgrade' : 'Renew'} — Pay {formatUsd(renewTotal)}</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .dropin-card-input {
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
        .dark .dropin-card-input {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .dropin-card-input:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 2px rgb(16 185 129 / 0.15);
        }
        .dropin-card-input::placeholder {
          color: var(--color-stone-400);
        }
      `}</style>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

/** Confirmation shown after a Zelle "I've sent it" submission — renewal is pending admin verification. */
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
        Renewal Pending Verification
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

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-stone-400 dark:text-stone-500 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-stone-400 dark:text-stone-500">{label}</p>
        <p className="text-sm text-stone-700 dark:text-stone-300">{value}</p>
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
      />
    </label>
  )
}
