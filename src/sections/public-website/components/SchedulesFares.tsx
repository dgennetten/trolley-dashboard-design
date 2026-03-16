import type { ScheduleInfo } from '@/../product/sections/public-website/types'
import {
  Calendar,
  Clock,
  MapPin,
  RefreshCw,
  TramFront,
  Ticket,
} from 'lucide-react'

export interface SchedulesFaresProps {
  scheduleInfo: ScheduleInfo
  onNavigate?: (href: string) => void
}

export function SchedulesFares({ scheduleInfo, onNavigate }: SchedulesFaresProps) {
  const { season, operatingDays, hours, frequency, route, fares } = scheduleInfo
  const routeParts = route.split('(')
  const routeName = routeParts[0].trim()
  const routeDetail = routeParts[1]?.replace(')', '').trim()

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Plan Your Visit
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            Schedule &amp; Fares
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            {season}
          </p>
        </div>
      </div>

      {/* Operating schedule highlights */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Calendar,
              label: 'Operating Days',
              value: operatingDays,
            },
            {
              icon: Clock,
              label: 'Hours',
              value: hours,
            },
            {
              icon: RefreshCw,
              label: 'Frequency',
              value: frequency,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-5 shadow-lg shadow-stone-950/[0.04] dark:shadow-stone-950/30"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/40 mb-3">
                <item.icon className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Route section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
            Our Route
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden">
          {/* Map placeholder */}
          <div className="h-52 sm:h-64 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/50 dark:from-emerald-950/20 dark:via-stone-900 dark:to-amber-950/10 flex items-center justify-center relative">
            <div className="absolute inset-4 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" strokeWidth={1} />
                <p className="text-sm text-stone-400 dark:text-stone-500">Route map</p>
              </div>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center ring-1 ring-amber-100 dark:ring-amber-900/40">
              <TramFront className="w-5 h-5 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] text-lg">
                {routeName}
              </h3>
              {routeDetail && (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {routeDetail}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fare table */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16 pb-20 lg:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
            Fares
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    Fare
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider hidden sm:table-cell">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {fares.map((fare, i) => {
                  const isFree = fare.price === 0
                  return (
                    <tr
                      key={fare.category}
                      className={`
                        border-b border-stone-50 dark:border-stone-800/50 last:border-0
                        ${i % 2 === 1 ? 'bg-stone-50/50 dark:bg-stone-800/20' : ''}
                      `}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {isFree && (
                            <Ticket className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
                          )}
                          <span className="font-medium text-stone-900 dark:text-stone-100 text-sm">
                            {fare.category}
                          </span>
                        </div>
                        {fare.note && (
                          <p className="mt-1 text-xs text-stone-400 dark:text-stone-500 sm:hidden ml-7">
                            {fare.note}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isFree ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-100 dark:ring-emerald-900/40">
                            FREE
                          </span>
                        ) : (
                          <span className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] text-lg">
                            ${fare.price}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          {fare.note || '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Membership CTA */}
        <div className="mt-8 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 font-['DM_Sans']">
              Ride for free with a membership
            </h3>
            <p className="mt-1 text-sm text-emerald-700/70 dark:text-emerald-300/60">
              All membership levels include 6 free rides per season, starting at just $20/year.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('/support')}
            className="shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            View Memberships
          </button>
        </div>
      </div>
    </div>
  )
}
