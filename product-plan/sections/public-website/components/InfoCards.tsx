import type { ScheduleInfo } from '../types'
import { Calendar, Clock, Ticket } from 'lucide-react'

interface InfoCardsProps {
  scheduleInfo: ScheduleInfo
  onNavigate?: (href: string) => void
}

export function InfoCards({ scheduleInfo, onNavigate }: InfoCardsProps) {
  const routeShort = scheduleInfo.route.split('(')[0].trim()

  const cards = [
    {
      icon: Calendar,
      title: scheduleInfo.season,
      description: scheduleInfo.operatingDays,
      accentClass: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        icon: 'text-emerald-600 dark:text-emerald-400',
        ring: 'ring-emerald-100 dark:ring-emerald-900/40',
      },
    },
    {
      icon: Clock,
      title: scheduleInfo.hours,
      description: `${scheduleInfo.frequency} · ${routeShort}`,
      accentClass: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        icon: 'text-emerald-600 dark:text-emerald-400',
        ring: 'ring-emerald-100 dark:ring-emerald-900/40',
      },
    },
    {
      icon: Ticket,
      title: 'Become a Member',
      description: 'Support the trolley starting at $20/year',
      accentClass: {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        icon: 'text-amber-600 dark:text-amber-400',
        ring: 'ring-amber-100 dark:ring-amber-900/40',
      },
      action: () => onNavigate?.('/support'),
    },
  ]

  return (
    <div className="relative z-20 -mt-6 sm:-mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {cards.map((card, i) => {
          const Tag = card.action ? 'button' : 'div'
          return (
            <Tag
              key={i}
              onClick={card.action}
              className={`
                bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800
                p-6 shadow-lg shadow-stone-950/[0.04] dark:shadow-stone-950/30
                text-left transition-all duration-200
                ${card.action ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-800/50' : ''}
              `}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ring-1 ${card.accentClass.bg} ${card.accentClass.icon} ${card.accentClass.ring}`}
              >
                <card.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                {card.description}
              </p>
            </Tag>
          )
        })}
      </div>
    </div>
  )
}
