import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type {
  AdminMessage,
  MemberListItem,
} from '@/../product/sections/membership-admin-dashboard/types'
import { AdminMessages } from './components/AdminMessages'

export default function AdminMessagesPreview() {
  return (
    <AdminMessages
      messages={data.adminMessages as AdminMessage[]}
      members={data.members as MemberListItem[]}
      onSendMessage={(msg) => console.log('Send message:', msg)}
      onMarkMessageRead={(id) => console.log('Mark read:', id)}
    />
  )
}
