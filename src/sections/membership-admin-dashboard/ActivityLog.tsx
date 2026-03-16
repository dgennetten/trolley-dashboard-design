import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type { ActivityLogEntry } from '@/../product/sections/membership-admin-dashboard/types'
import { ActivityLog } from './components/ActivityLog'

export default function ActivityLogPreview() {
  return (
    <ActivityLog
      entries={data.activityLog as ActivityLogEntry[]}
      onViewMember={(id) => console.log('View member:', id)}
    />
  )
}
