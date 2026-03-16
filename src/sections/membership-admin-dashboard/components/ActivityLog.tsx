import type { ActivityLogEntry } from '@/../product/sections/membership-admin-dashboard/types'
import {
  UserPlus,
  RefreshCw,
  CreditCard,
  Shield,
  Award,
  Pencil,
  ArrowUpRight,
  Bell,
  Users,
} from 'lucide-react'

interface ActivityLogProps {
  entries: ActivityLogEntry[]
  onViewMember?: (memberId: string) => void
}

const activityIcons: Record<string, typeof Users> = {
  new_member: UserPlus,
  renewal: RefreshCw,
  payment: CreditCard,
  role_change: Shield,
  certification: Award,
  edit: Pencil,
  level_change: ArrowUpRight,
  payment_reminder: Bell,
}

const activityColors: Record<string, string> = {
  new_member: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  renewal: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  payment: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  role_change: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  certification: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  edit: 'bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400',
  level_change: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  payment_reminder: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
}

function groupByDate(entries: ActivityLogEntry[]): Record<string, ActivityLogEntry[]> {
  const groups: Record<string, ActivityLogEntry[]> = {}
  for (const entry of entries) {
    const date = new Date(entry.timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(entry)
  }
  return groups
}

export function ActivityLog({ entries, onViewMember }: ActivityLogProps) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  const grouped = groupByDate(sorted)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
          Activity Log
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Chronological record of all membership changes
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <div className="sticky top-0 z-10 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm py-2 mb-2">
              <h2 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {date}
              </h2>
            </div>
            <div className="relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-stone-200 dark:bg-stone-700" />

              <ul className="space-y-0">
                {items.map((entry) => {
                  const Icon = activityIcons[entry.type] || Pencil
                  const colorClass = activityColors[entry.type] || activityColors.edit
                  return (
                    <li key={entry.id} className="relative flex gap-3 pb-4">
                      {/* Timeline dot */}
                      <div className={`absolute -left-6 w-[22px] h-[22px] rounded-full ${colorClass} flex items-center justify-center ring-2 ring-white dark:ring-stone-950 z-10`}>
                        <Icon className="w-3 h-3" strokeWidth={2} />
                      </div>

                      <div className="flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm text-stone-800 dark:text-stone-200 font-medium">
                              {entry.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {entry.memberId ? (
                                <button
                                  onClick={() => onViewMember?.(entry.memberId!)}
                                  className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                >
                                  {entry.memberName}
                                </button>
                              ) : (
                                <span className="text-xs text-stone-500 dark:text-stone-400">
                                  {entry.memberName}
                                </span>
                              )}
                              {entry.performedBy && (
                                <span className="text-xs text-stone-400 dark:text-stone-500">
                                  by {entry.performedBy}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] text-stone-400 dark:text-stone-500 whitespace-nowrap shrink-0">
                            {new Date(entry.timestamp).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
