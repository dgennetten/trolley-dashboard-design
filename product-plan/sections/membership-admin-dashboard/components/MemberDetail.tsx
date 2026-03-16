import { useState } from 'react'
import type {
  MemberListItem,
  MemberUpdateData,
  VolunteerRoleName,
  MembershipLevelName,
  PaymentStatus,
} from '../types'
import {
  ChevronLeft,
  Pencil,
  X,
  Check,
  Save,
  Plus,
  Trash2,
  CreditCard,
  Shield,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

interface MemberDetailProps {
  member: MemberListItem
  onUpdateMember?: (memberId: string, updates: MemberUpdateData) => void
  onAddVolunteerRole?: (memberId: string, role: VolunteerRoleName) => void
  onRemoveVolunteerRole?: (memberId: string, role: VolunteerRoleName) => void
  onMarkPaymentReceived?: (memberId: string) => void
  onNavigateBack?: () => void
}

const ALL_ROLES: VolunteerRoleName[] = ['Board Member', 'Motorman', 'Conductor', 'Depot Staff', 'Mechanic']
const ALL_LEVELS: MembershipLevelName[] = ['Depot', 'Mountain Barn', 'Howes Barn', 'Lifetime']

function certBadge(status: string) {
  const styles: Record<string, string> = {
    certified: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    needs_recertification: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    not_applicable: 'bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400',
  }
  const labels: Record<string, string> = {
    certified: 'Certified',
    needs_recertification: 'Needs Recert.',
    not_applicable: 'N/A',
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[status] || styles.not_applicable}`}>
      {labels[status] || status}
    </span>
  )
}

function payBadge(status: PaymentStatus) {
  const styles: Record<PaymentStatus, string> = {
    current: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    past_due: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    lifetime: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  }
  const labels: Record<PaymentStatus, string> = {
    current: 'Current',
    past_due: 'Past Due',
    lifetime: 'Lifetime',
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function MemberDetail({
  member,
  onUpdateMember,
  onAddVolunteerRole,
  onRemoveVolunteerRole,
  onMarkPaymentReceived,
  onNavigateBack,
}: MemberDetailProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const [firstName, setFirstName] = useState(member.firstName)
  const [lastName, setLastName] = useState(member.lastName)
  const [email, setEmail] = useState(member.email)
  const [phone, setPhone] = useState(member.phone)
  const [addr1, setAddr1] = useState(member.address.line1)
  const [addr2, setAddr2] = useState(member.address.line2)
  const [city, setCity] = useState(member.address.city)
  const [state, setState] = useState(member.address.state)
  const [zip, setZip] = useState(member.address.zip)
  const [level, setLevel] = useState(member.membershipLevel)
  const [datePaid, setDatePaid] = useState(member.datePaid)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function savePersonalInfo() {
    onUpdateMember?.(member.id, {
      firstName,
      lastName,
      email,
      phone,
      address: { line1: addr1, line2: addr2, city, state, zip },
    })
    setEditingSection(null)
    showToast('Personal info updated')
  }

  function saveMembership() {
    onUpdateMember?.(member.id, {
      membershipLevel: level,
      datePaid,
    })
    setEditingSection(null)
    showToast('Membership info updated')
  }

  function cancelEdit() {
    setFirstName(member.firstName)
    setLastName(member.lastName)
    setEmail(member.email)
    setPhone(member.phone)
    setAddr1(member.address.line1)
    setAddr2(member.address.line2)
    setCity(member.address.city)
    setState(member.address.state)
    setZip(member.address.zip)
    setLevel(member.membershipLevel)
    setDatePaid(member.datePaid)
    setEditingSection(null)
  }

  const availableRoles = ALL_ROLES.filter(
    (r) => !member.volunteerRoles.some((vr) => vr.role === r)
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onNavigateBack}
          className="p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400">
            {member.firstName[0]}{member.lastName[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Member since {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Personal Info */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              Personal Information
            </h2>
            {editingSection !== 'personal' ? (
              <button
                onClick={() => setEditingSection('personal')}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={cancelEdit} className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={savePersonalInfo}
                  className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="p-5">
            {editingSection === 'personal' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Phone</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Address Line 1</label>
                  <input type="text" value={addr1} onChange={(e) => setAddr1(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Address Line 2</label>
                  <input type="text" value={addr2} onChange={(e) => setAddr2(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">State</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">ZIP</label>
                    <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <Mail className="w-4 h-4 text-stone-400" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <Phone className="w-4 h-4 text-stone-400" />
                  {member.phone}
                </div>
                <div className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                  <span>
                    {member.address.line1}
                    {member.address.line2 && <>, {member.address.line2}</>}
                    <br />
                    {member.address.city}, {member.address.state} {member.address.zip}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Membership Info */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              Membership
            </h2>
            {editingSection !== 'membership' ? (
              <button
                onClick={() => setEditingSection('membership')}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={cancelEdit} className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <button onClick={saveMembership} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">
                  <Save className="w-3 h-3" />
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="p-5">
            {editingSection === 'membership' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as MembershipLevelName)}
                    className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                  >
                    {ALL_LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Date Paid</label>
                  <input type="date" value={datePaid} onChange={(e) => setDatePaid(e.target.value)} className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{member.membershipLevel}</span>
                    {payBadge(member.paymentStatus)}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 ml-7">
                    Paid {new Date(member.datePaid).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    {' · '}via {member.paymentMethod}
                  </p>
                </div>
                {member.paymentStatus === 'past_due' && (
                  <button
                    onClick={() => {
                      onMarkPaymentReceived?.(member.id)
                      showToast('Payment marked as received')
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Mark Paid
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Volunteer Roles */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              Volunteer Roles
            </h2>
          </div>
          <div className="p-5">
            {member.volunteerRoles.length === 0 ? (
              <p className="text-sm text-stone-500 dark:text-stone-400">No volunteer roles assigned.</p>
            ) : (
              <div className="space-y-3">
                {member.volunteerRoles.map((vr) => (
                  <div
                    key={vr.role}
                    className="flex items-center justify-between p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{vr.role}</span>
                          {vr.isLead && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 uppercase tracking-wider">
                              Lead
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {certBadge(vr.certificationStatus)}
                          {vr.certifiedDate && (
                            <span className="text-[11px] text-stone-400">
                              {new Date(vr.certifiedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveVolunteerRole?.(member.id, vr.role)}
                      className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {availableRoles.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-stone-400" />
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      onAddVolunteerRole?.(member.id, e.target.value as VolunteerRoleName)
                      showToast(`${e.target.value} role added`)
                      e.target.value = ''
                    }
                  }}
                  className="px-2 py-1 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                >
                  <option value="" disabled>Add a role...</option>
                  {availableRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Last Login
            </p>
            <p className="text-sm text-stone-800 dark:text-stone-200">
              {member.lastLogin
                ? new Date(member.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
                : 'Never'}
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Member Since
            </p>
            <p className="text-sm text-stone-800 dark:text-stone-200">
              {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
