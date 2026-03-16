import data from '@/../product/sections/public-website/data.json'
import { SchedulesFares } from './components/SchedulesFares'
import type { ScheduleInfo } from '@/../product/sections/public-website/types'

export default function SchedulesFaresPreview() {
  return (
    <SchedulesFares
      scheduleInfo={data.scheduleInfo as ScheduleInfo}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
