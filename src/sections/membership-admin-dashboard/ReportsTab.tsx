import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type {
  GroupContactList,
  LeadsContactListEntry,
  MonthlyFinancials,
} from '@/../product/sections/membership-admin-dashboard/types'
import { ReportsTab } from './components/ReportsTab'

export default function ReportsTabPreview() {
  return (
    <ReportsTab
      groupContactLists={data.reports.groupContactLists as GroupContactList[]}
      leadsContactList={data.reports.leadsContactList as LeadsContactListEntry[]}
      monthlyFinancials={data.reports.monthlyFinancials as MonthlyFinancials}
      onExportGroupContactList={(group) => console.log('Export group PDF:', group)}
      onExportLeadsContactList={() => console.log('Export leads PDF')}
    />
  )
}
