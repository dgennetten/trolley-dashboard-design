import { useState } from 'react'
import type {
  MemberProfile,
  PaymentRecord,
  AvailableLevel,
  ProfileUpdateData,
  PasswordChangeData,
  MemberAddress,
  PaymentMethod,
} from '@/../product/sections/authentication-and-member-portal/types'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Pencil,
  X,
  Check,
  Lock,
  Award,
  RefreshCw,
} from 'lucide-react'

export interface ProfilePageProps {
  profile: MemberProfile
  paymentHistory: PaymentRecord[]
  availableLevels: AvailableLevel[]
  onUpdateProfile?: (data: ProfileUpdateData) => void
  onChangePassword?: (data: PasswordChangeData) => void
  onRenew?: (membershipLevelId: string) => void
  onUpgradeMembership?: (newLevelId: string) => void
  onNavigate?: (href: string) => void
}

// ── Payment method display label ──────────────────────────────────────────

const METHOD_LABELS: Record<string, string> = {
  card: 'Credit Card',
  paypal: 'PayPal',
  venmo: 'Venmo',
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

// ── Braintree Drop-in UI Mock ─────────────────────────────────────────────
// Visual representation of the PayPal Braintree Drop-in UI.
// In production, replace this container with the Braintree SDK Drop-in UI
// initialized with: dropin.create({ authorization: clientToken, container: '#dropin-container' })

interface BraintreeDropInMockProps {
  selected: PaymentMethod | null
  onSelect: (method: PaymentMethod) => void
}

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
            ? 'bg-[#FFC439] text-[#003087] ring-inset ring-2 ring-[#e6b034]'
            : 'bg-[#FFC439]/90 hover:bg-[#FFC439] text-[#003087]'
          }
        `}
      >
        <svg width="72" height="18" viewBox="0 0 72 18" fill="none" aria-label="PayPal">
          <text x="0" y="14" fontSize="13" fontWeight="700" fill="#003087" fontFamily="Arial">Pay</text>
          <text x="22" y="14" fontSize="13" fontWeight="700" fill="#009CDE" fontFamily="Arial">Pal</text>
        </svg>
        {selected === 'paypal' && <Check className="w-4 h-4 ml-1" strokeWidth={2.5} />}
      </button>

      {/* Venmo button */}
      <button
        type="button"
        onClick={() => onSelect('venmo')}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3.5 transition-all border-b border-stone-100 dark:border-stone-800
          ${selected === 'venmo'
            ? 'bg-[#008CFF] text-white ring-inset ring-2 ring-[#0074D4]'
            : 'bg-[#008CFF]/90 hover:bg-[#008CFF] text-white'
          }
        `}
      >
        <svg width="60" height="18" viewBox="0 0 60 18" aria-label="Venmo">
          <text x="0" y="14" fontSize="13" fontWeight="700" fill="white" fontFamily="Arial">Venmo</text>
        </svg>
        {selected === 'venmo' && <Check className="w-4 h-4 ml-1" strokeWidth={2.5} />}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 px-4 py-2 bg-stone-50 dark:bg-stone-800/60">
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
          ${selected === 'card'
            ? 'bg-emerald-50/60 dark:bg-emerald-950/20'
            : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40'
          }
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
          <div className="space-y-2 animate-in fade-in duration-150">
            <input
              type="text"
              placeholder="Card number"
              maxLength={19}
              className="dropin-card-input"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                className="dropin-card-input"
                onClick={(e) => e.stopPropagation()}
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength={4}
                className="dropin-card-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <input
              type="text"
              placeholder="Name on card"
              className="dropin-card-input"
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

// ── Main component ────────────────────────────────────────────────────────

export function ProfilePage({
  profile,
  paymentHistory,
  availableLevels,
  onUpdateProfile,
  onChangePassword,
  onRenew,
  onUpgradeMembership,
}: ProfilePageProps) {
  const [editing, setEditing] = useState(false)
  const [pwOpen, setPwOpen] = useState(false)
  const [renewOpen, setRenewOpen] = useState(false)
  const [editForm, setEditForm] = useState<ProfileUpdateData>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    address: { ...profile.address },
  })
  const [pwForm, setPwForm] = useState<PasswordChangeData & { confirm: string }>({
    currentPassword: '',
    newPassword: '',
    confirm: '',
  })
  const [selectedUpgradeId, setSelectedUpgradeId] = useState(profile.membershipLevel.id)
  const [renewPayMethod, setRenewPayMethod] = useState<PaymentMethod | null>(null)

  const updateAddr = (field: keyof MemberAddress, value: string) =>
    setEditForm((p) => ({ ...p, address: { ...p.address, [field]: value } }))

  const handleSaveProfile = () => {
    onUpdateProfile?.(editForm)
    setEditing(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwForm.newPassword === pwForm.confirm) {
      onChangePassword?.({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      setPwOpen(false)
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
    }
  }

  const handleRenewConfirm = () => {
    // In production, braintreeNonce comes from dropin.requestPaymentMethod()
    if (selectedUpgradeId !== profile.membershipLevel.id) {
      onUpgradeMembership?.(selectedUpgradeId)
    } else {
      onRenew?.(selectedUpgradeId)
    }
    setRenewOpen(false)
    setRenewPayMethod(null)
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
              onClick={() => setRenewOpen(true)}
              className="shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
            >
              Renew Membership
            </button>
          )}
          {!isDue && !isLifetime && (
            <button
              onClick={() => setRenewOpen(true)}
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

        {/* Password change */}
        <div className="mt-5 pt-5 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => setPwOpen(!pwOpen)}
            className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
          >
            <Lock className="w-4 h-4" strokeWidth={1.5} />
            Change Password
            {pwOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {pwOpen && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3 max-w-sm">
              <EditField label="Current Password" value={pwForm.currentPassword} onChange={(v) => setPwForm((p) => ({ ...p, currentPassword: v }))} type="password" />
              <EditField label="New Password" value={pwForm.newPassword} onChange={(v) => setPwForm((p) => ({ ...p, newPassword: v }))} type="password" />
              <EditField label="Confirm New Password" value={pwForm.confirm} onChange={(v) => setPwForm((p) => ({ ...p, confirm: v }))} type="password" />
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
                Update Password
              </button>
            </form>
          )}
        </div>
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRenewOpen(false)} />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-stone-900 px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {isDue ? 'Renew Membership' : 'Upgrade Membership'}
              </h2>
              <button
                onClick={() => setRenewOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

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
                          onChange={() => setSelectedUpgradeId(lvl.id)}
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

              {/* Braintree Drop-in UI */}
              <div>
                <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">Payment</p>
                <BraintreeDropInMock selected={renewPayMethod} onSelect={setRenewPayMethod} />
              </div>

              <button
                onClick={handleRenewConfirm}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
              >
                {selectedUpgradeId !== profile.membershipLevel.id ? 'Upgrade & Pay' : 'Renew & Pay'}
              </button>
            </div>
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
