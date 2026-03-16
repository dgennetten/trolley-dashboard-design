import type { VolunteerGroup } from '../types'
import {
  Users,
  Mail,
  Phone,
  Check,
  RefreshCw,
  MessageSquare,
  Shield,
} from 'lucide-react'

export interface VolunteerGroupPageProps {
  volunteerGroups: VolunteerGroup[]
  onSendMessage?: (data: { recipientType: 'lead'; subject: string; body: string }) => void
  onNavigate?: (href: string) => void
}

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function VolunteerGroupPage({
  volunteerGroups,
  onNavigate,
}: VolunteerGroupPageProps) {
  if (volunteerGroups.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-12 text-center">
          <Users className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" strokeWidth={1} />
          <h2 className="text-lg font-semibold text-stone-700 dark:text-stone-300 font-['DM_Sans']">
            No Volunteer Roles
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            You don&apos;t currently hold any volunteer roles. Contact the membership admin to get involved.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {volunteerGroups.map((group) => {
        const certified = group.members.filter((m) => m.certificationStatus === 'certified').length
        const total = group.members.length

        return (
          <div
            key={group.roleName}
            className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden"
          >
            {/* Role header */}
            <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/40">
                  <Shield className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                    {group.roleName}s
                  </h2>
                  <p className="text-xs text-stone-400 dark:text-stone-500">
                    {certified} of {total} certified
                  </p>
                </div>
              </div>
              <div className="w-24 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all"
                  style={{ width: `${(certified / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Lead contact card */}
            <div className="px-6 py-4 bg-stone-50/50 dark:bg-stone-800/30 border-b border-stone-100 dark:border-stone-800">
              <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
                Group Lead
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-sm font-bold text-amber-700 dark:text-amber-400">
                    {group.lead.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">{group.lead.name}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" strokeWidth={1.5} />
                        {group.lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" strokeWidth={1.5} />
                        {group.lead.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate?.('/portal/messages')}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                  Message
                </button>
              </div>
            </div>

            {/* Roster table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100 dark:border-stone-800">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider hidden sm:table-cell">Certified</th>
                  </tr>
                </thead>
                <tbody>
                  {group.members.map((member) => (
                    <tr
                      key={member.id}
                      className={`border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${
                        member.isCurrentUser ? 'bg-emerald-50/50 dark:bg-emerald-950/10' : ''
                      }`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            member.isCurrentUser
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                          }`}>
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                            {member.name}
                            {member.isCurrentUser && (
                              <span className="ml-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">(You)</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        {member.certificationStatus === 'certified' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Certified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                            <RefreshCw className="w-3.5 h-3.5" strokeWidth={2} /> Needs Recert
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-stone-500 dark:text-stone-400 hidden sm:table-cell">
                        {formatDate(member.certifiedDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
