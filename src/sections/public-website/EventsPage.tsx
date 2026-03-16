import data from '@/../product/sections/public-website/data.json'
import { EventsPage } from './components/EventsPage'
import type { Event } from '@/../product/sections/public-website/types'

export default function EventsPagePreview() {
  return (
    <EventsPage
      events={data.events as Event[]}
      onViewEvent={(id) => console.log('View event:', id)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
