import data from '@/../product/sections/authentication-and-member-portal/data.json'
import { VolunteerGroupPage } from './components/VolunteerGroupPage'
import type { VolunteerGroup } from '@/../product/sections/authentication-and-member-portal/types'

export default function VolunteerGroupPagePreview() {
  return (
    <VolunteerGroupPage
      volunteerGroups={data.volunteerGroups as VolunteerGroup[]}
      onSendMessage={(d) => console.log('Send message:', d)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
