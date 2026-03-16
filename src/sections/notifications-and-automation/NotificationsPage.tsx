import data from '@/../product/sections/notifications-and-automation/data.json'
import type { NotificationLogEntry, MemberRecipient } from '@/../product/sections/notifications-and-automation/types'
import { NotificationsPage } from './components/NotificationsPage'

export default function NotificationsPagePreview() {
  return (
    <NotificationsPage
      notificationTypes={data.notificationTypes}
      log={data.notificationLog as NotificationLogEntry[]}
      memberRecipients={data.memberRecipients as MemberRecipient[]}
      onToggle={(typeId, enabled) => console.log('Toggle:', typeId, enabled)}
      onSendManualReminder={(memberIds) => console.log('Send manual reminder:', memberIds)}
    />
  )
}
