import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type { MemberListItem } from '@/../product/sections/membership-admin-dashboard/types'
import { MemberDetail } from './components/MemberDetail'

export default function MemberDetailPreview() {
  const member = data.members[1] as MemberListItem

  return (
    <MemberDetail
      member={member}
      onUpdateMember={(id, updates) => console.log('Update member:', id, updates)}
      onAddVolunteerRole={(id, role) => console.log('Add role:', id, role)}
      onRemoveVolunteerRole={(id, role) => console.log('Remove role:', id, role)}
      onMarkPaymentReceived={(id) => console.log('Mark paid:', id)}
      onNavigateBack={() => console.log('Navigate back')}
    />
  )
}
