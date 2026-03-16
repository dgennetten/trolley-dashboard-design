import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type { MemberListItem } from '@/../product/sections/membership-admin-dashboard/types'
import { MemberList } from './components/MemberList'

export default function MemberListPreview() {
  return (
    <MemberList
      members={data.members as MemberListItem[]}
      onViewMember={(id) => console.log('View member:', id)}
      onExportCsv={(filters) => console.log('Export CSV:', filters)}
    />
  )
}
