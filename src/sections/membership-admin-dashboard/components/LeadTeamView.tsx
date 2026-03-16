import { useState } from 'react'
import type {
  LeadDashboard,
  VolunteerRoleName,
} from '@/../product/sections/membership-admin-dashboard/types'
import {
  Users,
  Award,
  AlertTriangle,
  Check,
  RefreshCw,
  Shield,
} from 'lucide-react'

interface LeadTeamViewProps {
  leadDashboard: LeadDashboard
  onRecertifyMember?: (memberId: string, role: VolunteerRoleName) => void
  onBulkResetCertification?: (role: VolunteerRoleName) => void
  onViewMember?: (memberId: string) => void
}

function certBadge(status: string) {
  if (status === 'certified') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        <Check className="w-3 h-3" />
        Certified
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
      <AlertTriangle className="w-3 h-3" />
      Needs Recert.
    </span>
  )
}

export function LeadTeamView({
  leadDashboard,
  onRecertifyMember,
  onBulkResetCertification,
  onViewMember,
}: LeadTeamViewProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const { stats, subordinates, role, leadName } = leadDashboard
  const certPercent = stats.totalInGroup > 0 ? Math.round((stats.certified / stats.totalInGroup) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Lead View
          </span>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
          {role} Team
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Managed by {leadName}
        </p>
      </div>

      {/* Group Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
            <Users className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            {stats.totalInGroup}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Total in Group</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-3">
            <Award className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            {stats.certified}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Certified</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
          <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            {stats.needsRecertification}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Needs Recert.</p>
        </div>
      </div>

      {/* Certification Progress Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Certification Progress
          </span>
          <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {certPercent}%
          </span>
        </div>
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${certPercent}%` }}
          />
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">
          {stats.certified} of {stats.totalInGroup} team members certified for the current season
        </p>
      </div>

      {/* Bulk Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
          Team Roster
        </h2>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset All to Needs Recert.
        </button>
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider hidden sm:table-cell">
                  Certified Date
                </th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {subordinates.map((sub) => (
                <tr
                  key={sub.memberId}
                  className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewMember?.(sub.memberId)}
                      className="flex items-center gap-2.5 text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-stone-400 shrink-0">
                        {sub.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      {sub.name}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {certBadge(sub.certificationStatus)}
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-500 dark:text-stone-400 hidden sm:table-cell">
                    {sub.certifiedDate
                      ? new Date(sub.certifiedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {sub.certificationStatus === 'needs_recertification' ? (
                      <button
                        onClick={() => {
                          onRecertifyMember?.(sub.memberId, role)
                          showToastMsg(`${sub.name} recertified`)
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                      >
                        <Award className="w-3 h-3" />
                        Recertify
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 dark:text-stone-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Reset All Certifications?
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              This will mark all {stats.totalInGroup} {role.toLowerCase()}s as "needs recertification."
              This is typically done at the start of each season.
            </p>
            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onBulkResetCertification?.(role)
                  setShowResetConfirm(false)
                  showToastMsg(`All ${role.toLowerCase()}s reset to needs recertification`)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors shadow-sm"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
