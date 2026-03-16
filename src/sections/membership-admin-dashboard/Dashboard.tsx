import data from '@/../product/sections/membership-admin-dashboard/data.json'
import type {
  DashboardStats,
  ActivityLogEntry,
} from '@/../product/sections/membership-admin-dashboard/types'
import { Dashboard } from './components/Dashboard'

export default function DashboardPreview() {
  return (
    <Dashboard
      stats={data.dashboardStats as DashboardStats}
      recentActivity={data.activityLog as ActivityLogEntry[]}
      onViewMember={(id) => console.log('View member:', id)}
      onNavigate={(path) => console.log('Navigate:', path)}
    />
  )
}
