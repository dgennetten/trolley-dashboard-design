import { useState, useMemo } from 'react'
import type {
  NotificationsPageProps,
  NotificationType,
  DeliveryStatus,
} from '@/../product/sections/notifications-and-automation/types'
import {
  Bell,
  Clock,
  UserPlus,
  CreditCard,
  Award,
  TramFront,
  ToggleLeft,
  ToggleRight,
  Send,
  X,
  Search,
  Check,
  CheckCircle,
  AlertCircle,
  CircleDot,
  CalendarDays,
  ChevronDown,
  Filter,
  Zap,
} from 'lucide-react'

const ICON_MAP: Record<string, typeof Bell> = {
  clock: Clock,
  'user-plus': UserPlus,
  'credit-card': CreditCard,
  award: Award,
  'tram-front': TramFront,
}

const STATUS_STYLES: Record<DeliveryStatus, { label: string; classes: string; icon: typeof Check }> = {
  delivered: {
    label: 'Delivered',
    classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: CheckCircle,
  },
  sent: {
    label: 'Sent',
    classes: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: CircleDot,
  },
  failed: {
    label: 'Failed',
    classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: AlertCircle,
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatRelativeDate(iso: string | null) {
  if (!iso) return 'Never'
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffDay = Math.floor(diffMs / 86400000)
  if (diffDay < 1) return 'Today'
  if (diffDay === 1) return 'Yesterday'
  if (diffDay < 7) return `${diffDay} days ago`
  return formatDate(iso)
}

export function NotificationsPage({
  notificationTypes,
  log,
  memberRecipients,
  onToggle,
  onSendManualReminder,
}: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'log'>('config')
  const [showManualModal, setShowManualModal] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [memberSearch, setMemberSearch] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const [logTypeFilter, setLogTypeFilter] = useState<string>('all')
  const [logDateFrom, setLogDateFrom] = useState('')
  const [logDateTo, setLogDateTo] = useState('')
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filteredLog = useMemo(() => {
    let entries = [...log].sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    )
    if (logTypeFilter !== 'all') {
      entries = entries.filter((e) => e.typeId === logTypeFilter)
    }
    if (logDateFrom) {
      const from = new Date(logDateFrom)
      entries = entries.filter((e) => new Date(e.sentAt) >= from)
    }
    if (logDateTo) {
      const to = new Date(logDateTo)
      to.setHours(23, 59, 59)
      entries = entries.filter((e) => new Date(e.sentAt) <= to)
    }
    return entries
  }, [log, logTypeFilter, logDateFrom, logDateTo])

  const filteredRecipients = memberSearch
    ? memberRecipients.filter((m) =>
        m.name.toLowerCase().includes(memberSearch.toLowerCase())
      )
    : memberRecipients

  function handleSendManual() {
    if (selectedMembers.length === 0) return
    onSendManualReminder?.(selectedMembers)
    setShowManualModal(false)
    setSelectedMembers([])
    setMemberSearch('')
    showToastMsg(`Reminder sent to ${selectedMembers.length} member${selectedMembers.length > 1 ? 's' : ''}`)
  }

  function toggleMemberSelection(id: string) {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const selectedTypeLabel =
    logTypeFilter === 'all'
      ? 'All types'
      : notificationTypes.find((t) => t.id === logTypeFilter)?.name ?? logTypeFilter

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <Zap className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
            Notifications
          </h1>
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-400 ml-[46px]">
          Configure automated notifications and view delivery history
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'config'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          Configuration
        </button>
        <button
          onClick={() => setActiveTab('log')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'log'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          Log
          <span className="ml-1.5 text-xs text-stone-400 dark:text-stone-500">
            ({log.length})
          </span>
        </button>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'config' && (
        <div className="space-y-3">
          {notificationTypes.map((nt) => (
            <NotificationTypeCard
              key={nt.id}
              notificationType={nt}
              onToggle={onToggle}
              onManualTrigger={
                nt.supportsManualTrigger ? () => setShowManualModal(true) : undefined
              }
            />
          ))}
        </div>
      )}

      {/* Log Tab */}
      {activeTab === 'log' && (
        <div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {/* Type filter */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-500 transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                {selectedTypeLabel}
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>
              {showTypeDropdown && (
                <div className="absolute z-20 top-full left-0 mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg min-w-[200px] py-1">
                  <button
                    onClick={() => { setLogTypeFilter('all'); setShowTypeDropdown(false) }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors ${
                      logTypeFilter === 'all'
                        ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    All types
                  </button>
                  {notificationTypes.map((nt) => (
                    <button
                      key={nt.id}
                      onClick={() => { setLogTypeFilter(nt.id); setShowTypeDropdown(false) }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors ${
                        logTypeFilter === nt.id
                          ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                          : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {nt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <input
                type="date"
                value={logDateFrom}
                onChange={(e) => setLogDateFrom(e.target.value)}
                className="px-2.5 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
              />
              <span className="text-xs text-stone-400">to</span>
              <input
                type="date"
                value={logDateTo}
                onChange={(e) => setLogDateTo(e.target.value)}
                className="px-2.5 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
              />
            </div>

            {(logTypeFilter !== 'all' || logDateFrom || logDateTo) && (
              <button
                onClick={() => { setLogTypeFilter('all'); setLogDateFrom(''); setLogDateTo('') }}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors self-center"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Log Table */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50">
                    <th className="text-left px-5 py-3 font-medium text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide">
                      Type
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide">
                      Recipient
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide hidden md:table-cell">
                      Subject
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide">
                      Sent
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {filteredLog.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <Bell className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          No notifications match your filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredLog.map((entry) => {
                      const statusStyle = STATUS_STYLES[entry.status]
                      const StatusIcon = statusStyle.icon
                      const TypeIcon = ICON_MAP[
                        notificationTypes.find((t) => t.id === entry.typeId)?.icon ?? ''
                      ] ?? Bell

                      return (
                        <tr
                          key={entry.id}
                          className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-md bg-stone-100 dark:bg-stone-700 flex items-center justify-center shrink-0">
                                <TypeIcon className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" strokeWidth={1.5} />
                              </div>
                              <span className="text-stone-600 dark:text-stone-300 whitespace-nowrap hidden sm:inline">
                                {entry.typeName}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-stone-800 dark:text-stone-200 whitespace-nowrap">
                              {entry.recipientName}
                            </p>
                            <p className="text-xs text-stone-400 dark:text-stone-500">
                              {entry.recipientEmail}
                            </p>
                          </td>
                          <td className="px-5 py-3 text-stone-600 dark:text-stone-300 hidden md:table-cell max-w-xs truncate">
                            {entry.subject}
                          </td>
                          <td className="px-5 py-3 text-stone-500 dark:text-stone-400 whitespace-nowrap">
                            {formatDateTime(entry.sentAt)}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.classes}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusStyle.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-stone-400 dark:text-stone-500 mt-3 text-right">
            Showing {filteredLog.length} of {log.length} entries
          </p>
        </div>
      )}

      {/* Manual Reminder Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                Send Renewal Reminder
              </h3>
              <button
                onClick={() => {
                  setShowManualModal(false)
                  setSelectedMembers([])
                  setMemberSearch('')
                }}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Select members to send a renewal reminder email now.
              </p>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Member List */}
              <div className="border border-stone-200 dark:border-stone-700 rounded-lg max-h-52 overflow-y-auto">
                {filteredRecipients.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
                    No members found
                  </p>
                ) : (
                  filteredRecipients.map((member) => {
                    const isSelected = selectedMembers.includes(member.id)
                    return (
                      <button
                        key={member.id}
                        onClick={() => toggleMemberSelection(member.id)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors border-b border-stone-100 dark:border-stone-800 last:border-b-0 ${
                          isSelected ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600 dark:border-emerald-500 dark:bg-emerald-500'
                              : 'border-stone-300 dark:border-stone-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                            {member.name}
                          </p>
                          <p className="text-xs text-stone-400 dark:text-stone-500">
                            {member.email}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded ${
                            member.paymentStatus === 'past_due'
                              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                              : member.paymentStatus === 'expiring_soon'
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                          }`}
                        >
                          {member.paymentStatus === 'past_due'
                            ? 'Past due'
                            : member.paymentStatus === 'expiring_soon'
                            ? 'Expiring'
                            : 'Current'}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>

              {selectedMembers.length > 0 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 rounded-b-xl">
              <button
                onClick={() => {
                  setShowManualModal(false)
                  setSelectedMembers([])
                  setMemberSearch('')
                }}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendManual}
                disabled={selectedMembers.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white disabled:text-stone-500 text-sm font-medium transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Notification Type Card ─── */

interface NotificationTypeCardProps {
  notificationType: NotificationType
  onToggle?: (typeId: string, enabled: boolean) => void
  onManualTrigger?: () => void
}

function NotificationTypeCard({ notificationType: nt, onToggle, onManualTrigger }: NotificationTypeCardProps) {
  const Icon = ICON_MAP[nt.icon] ?? Bell

  return (
    <div
      className={`bg-white dark:bg-stone-900 border rounded-xl transition-all ${
        nt.enabled
          ? 'border-stone-200 dark:border-stone-700'
          : 'border-stone-200 dark:border-stone-700 opacity-60'
      }`}
    >
      <div className="px-5 py-4 flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            nt.enabled
              ? 'bg-emerald-50 dark:bg-emerald-900/20'
              : 'bg-stone-100 dark:bg-stone-800'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              nt.enabled
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-stone-400 dark:text-stone-500'
            }`}
            strokeWidth={1.5}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
              {nt.name}
            </h3>
            <button
              onClick={() => onToggle?.(nt.id, !nt.enabled)}
              className="shrink-0"
              aria-label={nt.enabled ? `Disable ${nt.name}` : `Enable ${nt.name}`}
            >
              {nt.enabled ? (
                <ToggleRight className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              ) : (
                <ToggleLeft className="w-8 h-8 text-stone-300 dark:text-stone-600" strokeWidth={1.5} />
              )}
            </button>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
            {nt.description}
          </p>

          {/* Schedule details */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {nt.schedule.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500"
              >
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span className="font-medium text-stone-500 dark:text-stone-400">{s.label}:</span>{' '}
                {s.timing}
              </span>
            ))}
          </div>

          {/* Footer row: last triggered + manual trigger */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              Last triggered: {formatRelativeDate(nt.lastTriggered)}
            </span>
            {nt.supportsManualTrigger && onManualTrigger && (
              <button
                onClick={onManualTrigger}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium transition-colors border border-amber-200 dark:border-amber-800/50"
              >
                <Send className="w-3 h-3" />
                Send Manual Reminder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
