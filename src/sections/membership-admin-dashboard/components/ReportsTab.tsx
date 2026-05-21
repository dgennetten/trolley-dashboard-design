import { useState } from 'react'
import type {
  GroupContactList,
  LeadsContactListEntry,
  MonthlyFinancials,
  VolunteerRoleName,
} from '@/../product/sections/membership-admin-dashboard/types'
import {
  Users,
  BookOpen,
  TrendingUp,
  Download,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'

type ReportView = 'landing' | 'group-contact' | 'leads-contact' | 'financials'

interface ReportsTabProps {
  groupContactLists: GroupContactList[]
  leadsContactList: LeadsContactListEntry[]
  monthlyFinancials: MonthlyFinancials | null
  onExportGroupContactList?: (group: VolunteerRoleName) => void
  onExportLeadsContactList?: () => void
}

function usd(amount: number): string {
  if (amount === 0) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function netUSD(amount: number): string {
  if (amount === 0) return '$0'
  const abs = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
  return amount > 0 ? `+${abs}` : `-${abs}`
}

function shortMonth(month: string): string {
  const [name, year] = month.split(' ')
  return `${name.slice(0, 3)} '${year.slice(2)}`
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'Lead') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        Lead
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400">
      Asst. Lead
    </span>
  )
}

export function ReportsTab({
  groupContactLists,
  leadsContactList,
  monthlyFinancials,
  onExportGroupContactList,
  onExportLeadsContactList,
}: ReportsTabProps) {
  const [view, setView] = useState<ReportView>('landing')
  const [selectedGroup, setSelectedGroup] = useState<VolunteerRoleName>(
    groupContactLists[0]?.group ?? 'Conductor'
  )

  const currentGroupList = groupContactLists.find(g => g.group === selectedGroup)
  const leadershipMembers = currentGroupList?.members.filter(m => m.roleTitle !== 'Member') ?? []
  const allMembers = currentGroupList?.members ?? []

  const incomeRows = monthlyFinancials?.rows.filter(r => r.type === 'income') ?? []
  const expenseRows = monthlyFinancials?.rows.filter(r => r.type === 'expense') ?? []
  const monthCount = monthlyFinancials?.months.length ?? 12

  const totalIncomeByMonth = Array.from({ length: monthCount }, (_, i) =>
    incomeRows.reduce((sum, row) => sum + row.monthlyAmounts[i], 0)
  )
  const totalExpensesByMonth = Array.from({ length: monthCount }, (_, i) =>
    expenseRows.reduce((sum, row) => sum + row.monthlyAmounts[i], 0)
  )
  const netBalanceByMonth = totalIncomeByMonth.map((inc, i) => inc - totalExpensesByMonth[i])
  const rowYTD = (amounts: number[]) => amounts.reduce((a, b) => a + b, 0)

  // ── LANDING ──
  if (view === 'landing') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Contact lists and financial summaries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setView('group-contact')}
            className="text-left p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Group Contact List
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Volunteer roster with cell and email for a specific group — leads and all members.
            </p>
            <p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              View report <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </button>

          <button
            onClick={() => setView('leads-contact')}
            className="text-left p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              Leads Contact List
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              All leads and assistant leads across every volunteer group in one list.
            </p>
            <p className="mt-3 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
              View report <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </button>

          {monthlyFinancials && (
            <button
              onClick={() => setView('financials')}
              className="text-left p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                Monthly Financials
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Rolling 12-month income and expense summary with net balance.
              </p>
              <p className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                View report <ChevronRight className="w-3.5 h-3.5" />
              </p>
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── GROUP CONTACT LIST ──
  if (view === 'group-contact') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <button
              onClick={() => setView('landing')}
              className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Reports
            </button>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
              Group Contact List
            </h1>
          </div>
          <button
            onClick={() => onExportGroupContactList?.(selectedGroup)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm shrink-0 mt-6"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>

        <div className="mb-5">
          <div className="relative inline-block">
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value as VolunteerRoleName)}
              className="appearance-none pl-3 pr-8 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {groupContactLists.map(g => (
                <option key={g.group} value={g.group}>{g.group}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-1/3">
                  Volunteer
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-1/4">
                  Cell
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {leadershipMembers.length > 0 && (
                <tr className="bg-emerald-50/60 dark:bg-emerald-900/15">
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider"
                  >
                    Leadership
                  </td>
                </tr>
              )}
              {leadershipMembers.map(m => (
                <tr
                  key={m.memberId}
                  className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-stone-900 dark:text-stone-100">{m.name}</span>
                      <RoleBadge role={m.roleTitle} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300 font-['IBM_Plex_Mono'] text-xs">
                    {m.cell}
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300 text-xs">
                    {m.email}
                  </td>
                </tr>
              ))}

              <tr className="bg-stone-50 dark:bg-stone-800/40 border-y border-stone-200 dark:border-stone-700">
                <td
                  colSpan={3}
                  className="px-4 py-2 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider"
                >
                  All Members
                </td>
              </tr>
              {allMembers.map(m => (
                <tr
                  key={`${m.memberId}-all`}
                  className="border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-stone-900 dark:text-stone-100">{m.name}</span>
                      {m.roleTitle !== 'Member' && <RoleBadge role={m.roleTitle} />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300 font-['IBM_Plex_Mono'] text-xs">
                    {m.cell}
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300 text-xs">
                    {m.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // ── LEADS CONTACT LIST ──
  if (view === 'leads-contact') {
    const grouped = leadsContactList.reduce<Record<string, LeadsContactListEntry[]>>((acc, entry) => {
      if (!acc[entry.group]) acc[entry.group] = []
      acc[entry.group].push(entry)
      return acc
    }, {})

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <button
              onClick={() => setView('landing')}
              className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Reports
            </button>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
              Leads Contact List
            </h1>
          </div>
          <button
            onClick={() => onExportLeadsContactList?.()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors shadow-sm shrink-0 mt-6"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-1/5">
                  Group
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Volunteer
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider hidden sm:table-cell">
                  Cell
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).flatMap(([group, entries]) =>
                entries.map((entry, idx) => (
                  <tr
                    key={`${group}-${entry.name}`}
                    className="border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {idx === 0 ? (
                        <span className="font-medium text-stone-700 dark:text-stone-300 text-xs">
                          {group}
                        </span>
                      ) : (
                        <span className="text-stone-300 dark:text-stone-600 text-xs pl-1">↳</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={entry.roleTitle} />
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100">
                      {entry.name}
                    </td>
                    <td className="px-4 py-3 text-stone-600 dark:text-stone-300 font-['IBM_Plex_Mono'] text-xs hidden sm:table-cell">
                      {entry.cell}
                    </td>
                    <td className="px-4 py-3 text-stone-600 dark:text-stone-300 text-xs hidden md:table-cell">
                      {entry.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // ── MONTHLY FINANCIALS ──
  if (view === 'financials' && monthlyFinancials) {
    const totalYTDIncome = totalIncomeByMonth.reduce((a, b) => a + b, 0)
    const totalYTDExpenses = totalExpensesByMonth.reduce((a, b) => a + b, 0)
    const totalYTDNet = totalYTDIncome - totalYTDExpenses

    return (
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setView('landing')}
            className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Reports
          </button>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
            Monthly Financials
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Rolling 12-month summary · {monthlyFinancials.months[0]} – {monthlyFinancials.months[monthlyFinancials.months.length - 1]}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
          <table className="text-xs whitespace-nowrap w-full">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-700">
                <th className="sticky left-0 z-10 bg-stone-50 dark:bg-stone-800 text-left px-4 py-3 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider min-w-[148px] border-r border-stone-200 dark:border-stone-700">
                  Category
                </th>
                {monthlyFinancials.months.map(m => (
                  <th
                    key={m}
                    className="px-3 py-3 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right min-w-[68px]"
                  >
                    {shortMonth(m)}
                  </th>
                ))}
                <th className="px-3 py-3 text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right min-w-[80px] border-l border-stone-200 dark:border-stone-700">
                  YTD
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Income section label */}
              <tr className="bg-emerald-50/40 dark:bg-emerald-900/10">
                <td
                  colSpan={monthlyFinancials.months.length + 2}
                  className="px-4 py-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider"
                >
                  Income
                </td>
              </tr>

              {incomeRows.map(row => (
                <tr
                  key={row.category}
                  className="border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 px-4 py-2.5 font-medium text-stone-700 dark:text-stone-300 border-r border-stone-100 dark:border-stone-800">
                    {row.category}
                  </td>
                  {row.monthlyAmounts.map((amt, i) => (
                    <td key={i} className="px-3 py-2.5 text-right text-stone-600 dark:text-stone-400 font-['IBM_Plex_Mono']">
                      {usd(amt)}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-medium text-stone-700 dark:text-stone-300 font-['IBM_Plex_Mono'] border-l border-stone-100 dark:border-stone-800">
                    {usd(rowYTD(row.monthlyAmounts))}
                  </td>
                </tr>
              ))}

              {/* Total Income */}
              <tr className="bg-emerald-50 dark:bg-emerald-900/20 border-y border-emerald-100 dark:border-emerald-900/40">
                <td className="sticky left-0 z-10 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 font-semibold text-emerald-800 dark:text-emerald-300 border-r border-emerald-100 dark:border-emerald-900/40">
                  Total Income
                </td>
                {totalIncomeByMonth.map((amt, i) => (
                  <td key={i} className="px-3 py-2.5 text-right font-semibold text-emerald-700 dark:text-emerald-400 font-['IBM_Plex_Mono']">
                    {usd(amt)}
                  </td>
                ))}
                <td className="px-3 py-2.5 text-right font-bold text-emerald-700 dark:text-emerald-400 font-['IBM_Plex_Mono'] border-l border-emerald-100 dark:border-emerald-900/40">
                  {usd(totalYTDIncome)}
                </td>
              </tr>

              {/* Expense section label */}
              <tr className="bg-amber-50/40 dark:bg-amber-900/10">
                <td
                  colSpan={monthlyFinancials.months.length + 2}
                  className="px-4 py-1.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider"
                >
                  Expenses
                </td>
              </tr>

              {expenseRows.map(row => (
                <tr
                  key={row.category}
                  className="border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 px-4 py-2.5 font-medium text-stone-700 dark:text-stone-300 border-r border-stone-100 dark:border-stone-800">
                    {row.category}
                  </td>
                  {row.monthlyAmounts.map((amt, i) => (
                    <td key={i} className="px-3 py-2.5 text-right text-stone-600 dark:text-stone-400 font-['IBM_Plex_Mono']">
                      {usd(amt)}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-medium text-stone-700 dark:text-stone-300 font-['IBM_Plex_Mono'] border-l border-stone-100 dark:border-stone-800">
                    {usd(rowYTD(row.monthlyAmounts))}
                  </td>
                </tr>
              ))}

              {/* Total Expenses */}
              <tr className="bg-amber-50 dark:bg-amber-900/20 border-y border-amber-100 dark:border-amber-900/40">
                <td className="sticky left-0 z-10 bg-amber-50 dark:bg-amber-900/20 px-4 py-2.5 font-semibold text-amber-800 dark:text-amber-300 border-r border-amber-100 dark:border-amber-900/40">
                  Total Expenses
                </td>
                {totalExpensesByMonth.map((amt, i) => (
                  <td key={i} className="px-3 py-2.5 text-right font-semibold text-amber-700 dark:text-amber-400 font-['IBM_Plex_Mono']">
                    {usd(amt)}
                  </td>
                ))}
                <td className="px-3 py-2.5 text-right font-bold text-amber-700 dark:text-amber-400 font-['IBM_Plex_Mono'] border-l border-amber-100 dark:border-amber-900/40">
                  {usd(totalYTDExpenses)}
                </td>
              </tr>

              {/* Net Balance */}
              <tr className="bg-stone-800 dark:bg-stone-200">
                <td className="sticky left-0 z-10 bg-stone-800 dark:bg-stone-200 px-4 py-3 font-bold text-white dark:text-stone-900 border-r border-stone-600 dark:border-stone-400">
                  Net Balance
                </td>
                {netBalanceByMonth.map((amt, i) => (
                  <td
                    key={i}
                    className={`px-3 py-3 text-right font-bold font-['IBM_Plex_Mono'] ${
                      amt >= 0
                        ? 'text-emerald-400 dark:text-emerald-600'
                        : 'text-red-400 dark:text-red-500'
                    }`}
                  >
                    {netUSD(amt)}
                  </td>
                ))}
                <td
                  className={`px-3 py-3 text-right font-bold font-['IBM_Plex_Mono'] border-l border-stone-600 dark:border-stone-400 ${
                    totalYTDNet >= 0
                      ? 'text-emerald-400 dark:text-emerald-600'
                      : 'text-red-400 dark:text-red-500'
                  }`}
                >
                  {netUSD(totalYTDNet)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return null
}
