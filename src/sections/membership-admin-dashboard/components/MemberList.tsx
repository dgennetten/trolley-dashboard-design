import { useState, useMemo } from 'react'
import type {
  MemberListItem,
  MemberFilters,
  MembershipLevelName,
  VolunteerRoleName,
  CertificationStatus,
  PaymentStatus,
} from '@/../product/sections/membership-admin-dashboard/types'
import {
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
} from 'lucide-react'

interface MemberListProps {
  members: MemberListItem[]
  onViewMember?: (memberId: string) => void
  onExportCsv?: (filters: MemberFilters) => void
}

type SortKey = 'name' | 'email' | 'membershipLevel' | 'paymentStatus' | 'lastLogin'
type SortDir = 'asc' | 'desc'

const LEVELS: MembershipLevelName[] = ['Depot', 'Mountain Barn', 'Howes Barn', 'Lifetime']
const ROLES: VolunteerRoleName[] = ['Board Member', 'Motorman', 'Conductor', 'Depot Staff', 'Mechanic']
const CERT_STATUSES: CertificationStatus[] = ['certified', 'needs_recertification', 'not_applicable']
const PAY_STATUSES: PaymentStatus[] = ['current', 'past_due', 'lifetime']

function paymentBadge(status: PaymentStatus) {
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

function levelBadge(level: MembershipLevelName) {
  const styles: Record<MembershipLevelName, string> = {
    Depot: 'bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300',
    'Mountain Barn': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Howes Barn': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Lifetime: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[level]}`}>
      {level}
    </span>
  )
}

function formatRelativeDate(iso: string | null) {
  if (!iso) return '—'
  const date = new Date(iso)
  const now = new Date()
  const diffDay = Math.floor((now.getTime() - date.getTime()) / 86400000)
  if (diffDay === 0) return 'Today'
  if (diffDay === 1) return 'Yesterday'
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function MemberList({ members, onViewMember, onExportCsv }: MemberListProps) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [filterLevel, setFilterLevel] = useState<MembershipLevelName | ''>('')
  const [filterRole, setFilterRole] = useState<VolunteerRoleName | ''>('')
  const [filterCert, setFilterCert] = useState<CertificationStatus | ''>('')
  const [filterPay, setFilterPay] = useState<PaymentStatus | ''>('')

  const activeFilterCount = [filterLevel, filterRole, filterCert, filterPay].filter(Boolean).length

  const filtered = useMemo(() => {
    let result = [...members]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (m) =>
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
      )
    }
    if (filterLevel) result = result.filter((m) => m.membershipLevel === filterLevel)
    if (filterRole) result = result.filter((m) => m.volunteerRoles.some((r) => r.role === filterRole))
    if (filterCert)
      result = result.filter((m) =>
        m.volunteerRoles.some((r) => r.certificationStatus === filterCert)
      )
    if (filterPay) result = result.filter((m) => m.paymentStatus === filterPay)

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name':
          cmp = `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`)
          break
        case 'email':
          cmp = a.email.localeCompare(b.email)
          break
        case 'membershipLevel':
          cmp = LEVELS.indexOf(a.membershipLevel) - LEVELS.indexOf(b.membershipLevel)
          break
        case 'paymentStatus':
          cmp = a.paymentStatus.localeCompare(b.paymentStatus)
          break
        case 'lastLogin':
          cmp = (a.lastLogin || '').localeCompare(b.lastLogin || '')
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [members, search, filterLevel, filterRole, filterCert, filterPay, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ChevronUp className="w-3 h-3 opacity-0 group-hover:opacity-30" />
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    )
  }

  function clearFilters() {
    setFilterLevel('')
    setFilterRole('')
    setFilterCert('')
    setFilterPay('')
  }

  const currentFilters: MemberFilters = {
    membershipLevel: filterLevel || null,
    volunteerRole: filterRole || null,
    certificationStatus: filterCert || null,
    paymentStatus: filterPay || null,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
          Members
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          {filtered.length} of {members.length} member{members.length !== 1 ? 's' : ''}
          {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active)`}
        </p>
      </div>

      {/* Search + Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                : 'border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onExportCsv?.(currentFilters)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 p-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl">
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Level
            </label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as MembershipLevelName | '')}
              className="w-full px-2 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
            >
              <option value="">All levels</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Volunteer Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as VolunteerRoleName | '')}
              className="w-full px-2 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
            >
              <option value="">All roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Certification
            </label>
            <select
              value={filterCert}
              onChange={(e) => setFilterCert(e.target.value as CertificationStatus | '')}
              className="w-full px-2 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
            >
              <option value="">Any status</option>
              {CERT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === 'certified' ? 'Certified' : s === 'needs_recertification' ? 'Needs Recert.' : 'N/A'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              Payment
            </label>
            <select
              value={filterPay}
              onChange={(e) => setFilterPay(e.target.value as PaymentStatus | '')}
              className="w-full px-2 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
            >
              <option value="">Any status</option>
              {PAY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === 'current' ? 'Current' : s === 'past_due' ? 'Past Due' : 'Lifetime'}
                </option>
              ))}
            </select>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="col-span-2 lg:col-span-4 inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors justify-center"
            >
              <X className="w-3 h-3" />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                {([
                  { key: 'name' as SortKey, label: 'Name' },
                  { key: 'email' as SortKey, label: 'Email' },
                  { key: 'membershipLevel' as SortKey, label: 'Level' },
                  { key: 'paymentStatus' as SortKey, label: 'Payment' },
                ] as const).map(({ key, label }) => (
                  <th
                    key={key}
                    className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => toggleSort(key)}
                      className="group inline-flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                    >
                      {label}
                      <SortIcon column={key} />
                    </button>
                  </th>
                ))}
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider hidden lg:table-cell">
                  Roles
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider hidden md:table-cell">
                  <button
                    onClick={() => toggleSort('lastLogin')}
                    className="group inline-flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                  >
                    Last Login
                    <SortIcon column="lastLogin" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => onViewMember?.(m.id)}
                  className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                        {m.firstName[0]}{m.lastName[0]}
                      </div>
                      <span className="font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">
                        {m.firstName} {m.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400 hidden sm:table-cell">
                    {m.email}
                  </td>
                  <td className="px-4 py-3">{levelBadge(m.membershipLevel)}</td>
                  <td className="px-4 py-3">{paymentBadge(m.paymentStatus)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {m.volunteerRoles.length === 0 ? (
                      <span className="text-xs text-stone-400 dark:text-stone-500">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {m.volunteerRoles.map((r) => (
                          <span
                            key={r.role}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                          >
                            {r.role}
                            {r.isLead && (
                              <span className="text-amber-600 dark:text-amber-400">★</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-500 dark:text-stone-400 hidden md:table-cell whitespace-nowrap">
                    {formatRelativeDate(m.lastLogin)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-stone-500 dark:text-stone-400">
                    No members match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
