import type { Event } from '../types'
import { Calendar, ArrowRight } from 'lucide-react'

export interface EventsPageProps {
  events: Event[]
  onViewEvent?: (eventId: string) => void
  onNavigate?: (href: string) => void
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleString('en-US', { weekday: 'long' }),
    time: d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    full: d.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  }
}

function isPast(dateStr: string) {
  return new Date(dateStr) < new Date()
}

export function EventsPage({ events, onViewEvent }: EventsPageProps) {
  const upcoming = events.filter((e) => !isPast(e.date))
  const past = events.filter((e) => isPast(e.date))

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              What&apos;s Happening
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            Events
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            Join us for special rides, celebrations, and community events throughout the season.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
              <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
                Upcoming
              </h2>
              <span className="ml-1 text-xs text-stone-400 dark:text-stone-500">
                ({upcoming.length})
              </span>
            </div>

            {/* Featured first event */}
            {upcoming.length > 0 && (
              <FeaturedEventCard
                event={upcoming[0]}
                onView={() => onViewEvent?.(upcoming[0].id)}
              />
            )}

            {/* Remaining events grid */}
            {upcoming.length > 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {upcoming.slice(1).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onView={() => onViewEvent?.(event.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <section className={upcoming.length > 0 ? 'mt-16' : ''}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-stone-300 dark:bg-stone-600" />
              <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 tracking-[0.2em] uppercase">
                Past Events
              </h2>
              <span className="ml-1 text-xs text-stone-400 dark:text-stone-500">
                ({past.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {past.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onView={() => onViewEvent?.(event.id)}
                  muted
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {events.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" strokeWidth={1} />
            <h2 className="text-lg font-semibold text-stone-700 dark:text-stone-300 font-['DM_Sans']">
              No events scheduled
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Check back soon for upcoming trolley events and celebrations.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Sub-components ─── */

interface FeaturedEventCardProps {
  event: Event
  onView?: () => void
}

function FeaturedEventCard({ event, onView }: FeaturedEventCardProps) {
  const date = formatEventDate(event.date)

  return (
    <article
      onClick={onView}
      className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-stone-950/[0.06] dark:hover:shadow-stone-950/40 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Photo */}
        <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden">
          {event.photoUrl ? (
            <img
              src={event.photoUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full min-h-[14rem] bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 dark:from-emerald-950/30 dark:via-stone-900 dark:to-amber-950/20 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-emerald-200 dark:text-emerald-800" strokeWidth={0.5} />
            </div>
          )}

          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white dark:bg-stone-900 rounded-lg shadow-lg px-3 py-2 text-center min-w-[3.75rem] border border-stone-100 dark:border-stone-800">
            <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider leading-none">
              {date.month}
            </div>
            <div className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight font-['DM_Sans']">
              {date.day}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800/40">
              Featured
            </span>
          </div>

          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>

          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
            {date.weekday} &middot; {date.time}
          </p>

          <p className="mt-4 text-stone-600 dark:text-stone-300 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-6">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:gap-2.5 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

interface EventCardProps {
  event: Event
  onView?: () => void
  muted?: boolean
}

function EventCard({ event, onView, muted }: EventCardProps) {
  const date = formatEventDate(event.date)

  return (
    <article
      onClick={onView}
      className={`
        group bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800
        overflow-hidden cursor-pointer transition-all duration-300
        hover:shadow-lg hover:shadow-stone-950/[0.04] dark:hover:shadow-stone-950/30 hover:-translate-y-0.5
        ${muted ? 'opacity-75 hover:opacity-100' : ''}
      `}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden">
        {event.photoUrl ? (
          <img
            src={event.photoUrl}
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${muted ? 'grayscale-[30%] group-hover:grayscale-0' : ''}`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/50 dark:from-emerald-950/20 dark:via-stone-900 dark:to-amber-950/10 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-emerald-200 dark:text-emerald-800" strokeWidth={0.75} />
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

        {muted && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-800/70 text-stone-200">
            Past
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-1.5">
          {date.weekday} &middot; {date.time}
        </p>
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans'] text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </div>
    </article>
  )
}
