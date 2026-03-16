import type { Event } from '@/../product/sections/public-website/types'
import { ArrowRight, Calendar } from 'lucide-react'

interface EventsPreviewProps {
  events: Event[]
  maxEvents?: number
  onNavigate?: (href: string) => void
  onViewEvent?: (eventId: string) => void
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    full: d.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  }
}

export function EventsPreview({
  events,
  maxEvents = 3,
  onNavigate,
  onViewEvent,
}: EventsPreviewProps) {
  const displayed = events.slice(0, maxEvents)

  return (
    <section className="py-20 lg:py-24 bg-stone-50 dark:bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">
                What&apos;s Coming Up
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
              Upcoming Events
            </h2>
          </div>
          <button
            onClick={() => onNavigate?.('/events')}
            className="hidden sm:inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm transition-colors group"
          >
            View All Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {displayed.map((event) => {
            const date = formatEventDate(event.date)
            return (
              <article
                key={event.id}
                onClick={() => onViewEvent?.(event.id)}
                className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden hover:shadow-lg hover:shadow-stone-950/[0.04] dark:hover:shadow-stone-950/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Photo area */}
                <div className="relative h-44 overflow-hidden">
                  {event.photoUrl ? (
                    <img
                      src={event.photoUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 dark:from-emerald-950/30 dark:via-stone-900 dark:to-amber-950/20 flex items-center justify-center">
                      <Calendar
                        className="w-12 h-12 text-emerald-200 dark:text-emerald-800"
                        strokeWidth={0.75}
                      />
                    </div>
                  )}

                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-white dark:bg-stone-900 rounded-lg shadow-md px-2.5 py-1.5 text-center min-w-[3.25rem] border border-stone-100 dark:border-stone-800">
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider leading-none">
                      {date.month}
                    </div>
                    <div className="text-xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight font-['DM_Sans']">
                      {date.day}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  <span className="mt-3 text-xs text-stone-400 dark:text-stone-500">
                    {date.full}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-10 sm:hidden text-center">
          <button
            onClick={() => onNavigate?.('/events')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors text-sm"
          >
            View All Events
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}
