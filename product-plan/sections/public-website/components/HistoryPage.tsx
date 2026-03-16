import { TramFront, Calendar, Wrench, Award } from 'lucide-react'

export interface HistorySection {
  title: string
  body: string
  icon?: 'tram' | 'calendar' | 'wrench' | 'award'
}

export interface HistoryPageProps {
  sections: HistorySection[]
  onNavigate?: (href: string) => void
}

const ICON_MAP = {
  tram: TramFront,
  calendar: Calendar,
  wrench: Wrench,
  award: Award,
}

export function HistoryPage({ sections }: HistoryPageProps) {
  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            History
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            Over 40 years of preserving Fort Collins&apos; electric railway heritage.
          </p>
        </div>
      </div>

      {/* Editorial content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Timeline / sections */}
        <div className="space-y-0">
          {sections.map((section, i) => {
            const Icon = section.icon ? ICON_MAP[section.icon] : null
            const isLast = i === sections.length - 1

            return (
              <div key={i} className="relative flex gap-6">
                {/* Timeline line */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10
                    ${i === 0
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 ring-2 ring-emerald-200 dark:ring-emerald-800/40'
                      : 'bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700'
                    }
                  `}>
                    {Icon ? (
                      <Icon className={`w-4.5 h-4.5 ${i === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`} strokeWidth={1.5} />
                    ) : (
                      <span className="text-xs font-bold text-stone-400 dark:text-stone-500">{i + 1}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-stone-200 dark:bg-stone-800 my-0" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${!isLast ? 'pb-10' : 'pb-0'}`}>
                  {/* Mobile icon */}
                  {Icon && (
                    <div className="sm:hidden w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                    </div>
                  )}

                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight mb-4">
                    {section.title}
                  </h2>

                  <div className="prose-stone">
                    {section.body.split('\n\n').map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-stone-600 dark:text-stone-400 leading-relaxed text-[15px] mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Decorative bottom element */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-30">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <TramFront className="w-5 h-5 text-amber-400" strokeWidth={1} />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
      </div>
    </div>
  )
}
