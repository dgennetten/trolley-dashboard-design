import type {
  DashboardStats,
  ActivityLogEntry,
} from '@/../product/sections/membership-admin-dashboard/types'
import {
  Users,
  UserCheck,
  Clock,
  UserPlus,
  RefreshCw,
  CreditCard,
  Shield,
  Award,
  Pencil,
  ArrowUpRight,
  Bell,
  ChevronRight,
} from 'lucide-react'

interface DashboardProps {
  stats: DashboardStats
  recentActivity: ActivityLogEntry[]
  onViewMember?: (memberId: string) => void
  onNavigate?: (path: string) => void
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

function formatRelativeTime(iso: string) {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const STAT_CARDS: {
  key: keyof DashboardStats
  label: string
  icon: typeof Users
  color: string
  bgColor: string
}[] = [
  {
    key: 'totalMembers',
    label: 'Total Members',
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    key: 'activeVolunteers',
    label: 'Active Volunteers',
    icon: UserCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    key: 'pendingRenewals',
    label: 'Pending Renewals',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    key: 'newSignupsThisMonth',
    label: 'New This Month',
    icon: UserPlus,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
  },
]

export function Dashboard({ stats, recentActivity, onViewMember, onNavigate }: DashboardProps) {
  const sortedActivity = [...recentActivity].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Membership overview and recent activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.key}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${card.color}`} strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {stats[card.key].toLocaleString()}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            Recent Activity
          </h2>
          <button
            onClick={() => onNavigate?.('/portal/activity')}
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            View all
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <ul className="divide-y divide-stone-100 dark:divide-stone-800">
          {sortedActivity.slice(0, 12).map((entry) => {
            const Icon = activityIcons[entry.type] || Pencil
            const colorClass = activityColors[entry.type] || activityColors.edit
            return (
              <li key={entry.id} className="flex items-start gap-3 px-5 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-800 dark:text-stone-200">
                    <span className="font-medium">{entry.description}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
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
                <div className="shrink-0 text-right">
                  <span className="text-xs text-stone-400 dark:text-stone-500" title={formatDate(entry.timestamp)}>
                    {formatRelativeTime(entry.timestamp)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
