import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type { LeadDashboard } from '@/../product/sections/membership-admin-dashboard/types'
import { LeadTeamView } from './components/LeadTeamView'

export default function LeadTeamViewPreview() {
  return (
    <LeadTeamView
      leadDashboard={data.leadDashboard as LeadDashboard}
      onRecertifyMember={(id, role) => console.log('Recertify:', id, role)}
      onBulkResetCertification={(role) => console.log('Bulk reset:', role)}
      onViewMember={(id) => console.log('View member:', id)}
    />
  )
}
