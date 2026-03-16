import data from '@/../product/sections/public-website/data.json'
import { LandingPage } from './components/LandingPage'

export default function LandingPagePreview() {
  return (
    <LandingPage
      heroContent={data.heroContent as import('@/../product/sections/public-website/types').HeroContent}
      events={data.events as import('@/../product/sections/public-website/types').Event[]}
      scheduleInfo={data.scheduleInfo as import('@/../product/sections/public-website/types').ScheduleInfo}
      onNavigate={(href) => console.log('Navigate:', href)}
      onViewEvent={(id) => console.log('View event:', id)}
    />
  )
}
