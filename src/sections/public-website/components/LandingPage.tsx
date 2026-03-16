import type { HeroContent, Event, ScheduleInfo } from '@/../product/sections/public-website/types'
import { HeroSection } from './HeroSection'
import { InfoCards } from './InfoCards'
import { EventsPreview } from './EventsPreview'

export interface LandingPageProps {
  heroContent: HeroContent
  events: Event[]
  scheduleInfo: ScheduleInfo
  onNavigate?: (href: string) => void
  onViewEvent?: (eventId: string) => void
}

export function LandingPage({
  heroContent,
  events,
  scheduleInfo,
  onNavigate,
  onViewEvent,
}: LandingPageProps) {
  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <HeroSection content={heroContent} onNavigate={onNavigate} />
      <InfoCards scheduleInfo={scheduleInfo} onNavigate={onNavigate} />
      <EventsPreview
        events={events}
        onNavigate={onNavigate}
        onViewEvent={onViewEvent}
      />
    </div>
  )
}
