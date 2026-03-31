export type PaymentStatus = 'current' | 'past_due' | 'lifetime'
export type PaymentMethod = 'card' | 'paypal' | 'venmo'
export type CertificationStatus = 'certified' | 'needs_recertification' | 'not_applicable'
export type ActivityType = 'new_member' | 'renewal' | 'payment' | 'role_change' | 'certification' | 'edit' | 'level_change' | 'payment_reminder'
export type MessageDirection = 'sent' | 'received'
export type MessageStatus = 'read' | 'unread'
export type MembershipLevelName = 'Depot' | 'Mountain Barn' | 'Howes Barn' | 'Lifetime'
export type VolunteerRoleName = 'Board Member' | 'Motorman' | 'Conductor' | 'Depot Staff' | 'Mechanic'

export interface MemberAddress {
  line1: string
  line2: string
  city: string
  state: string
  zip: string
}

export interface MemberVolunteerRole {
  role: VolunteerRoleName
  certificationStatus: CertificationStatus
  certifiedDate: string | null
  isLead: boolean
}

export interface MemberListItem {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: MemberAddress
  membershipLevel: MembershipLevelName
  datePaid: string
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  volunteerRoles: MemberVolunteerRole[]
  lastLogin: string | null
  joinDate: string
}

export interface DashboardStats {
  totalMembers: number
  activeVolunteers: number
  pendingRenewals: number
  newSignupsThisMonth: number
}

export interface ActivityLogEntry {
  id: string
  type: ActivityType
  description: string
  memberName: string
  memberId: string | null
  timestamp: string
  performedBy: string | null
}

export interface AdminMessage {
  id: string
  direction: MessageDirection
  fromMemberId: string | null
  fromMemberName: string | null
  toMemberId: string | null
  toMemberName: string | null
  subject: string
  body: string
  status: MessageStatus
  timestamp: string
}

export interface LeadSubordinate {
  memberId: string
  name: string
  certificationStatus: CertificationStatus
  certifiedDate: string | null
}

export interface LeadGroupStats {
  totalInGroup: number
  certified: number
  needsRecertification: number
}

export interface LeadDashboard {
  leadName: string
  role: VolunteerRoleName
  stats: LeadGroupStats
  subordinates: LeadSubordinate[]
}

export interface MemberUpdateData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: MemberAddress
  membershipLevel?: MembershipLevelName
  datePaid?: string
  paymentStatus?: PaymentStatus
  paymentMethod?: PaymentMethod
}

export interface NewMessageData {
  toMemberId: string
  subject: string
  body: string
}

export interface MemberFilters {
  membershipLevel?: MembershipLevelName | null
  volunteerRole?: VolunteerRoleName | null
  certificationStatus?: CertificationStatus | null
  paymentStatus?: PaymentStatus | null
}

export interface MembershipAdminDashboardProps {
  dashboardStats: DashboardStats
  members: MemberListItem[]
  activityLog: ActivityLogEntry[]
  adminMessages: AdminMessage[]
  leadDashboard: LeadDashboard | null

  /** Navigate to member detail */
  onViewMember?: (memberId: string) => void
  /** Update a member's data */
  onUpdateMember?: (memberId: string, updates: MemberUpdateData) => void
  /** Add a volunteer role to a member */
  onAddVolunteerRole?: (memberId: string, role: VolunteerRoleName) => void
  /** Remove a volunteer role from a member */
  onRemoveVolunteerRole?: (memberId: string, role: VolunteerRoleName) => void
  /** Mark a member's payment as received */
  onMarkPaymentReceived?: (memberId: string) => void
  /** Export the current filtered member list as CSV */
  onExportCsv?: (filters: MemberFilters) => void

  /** Send a message to a member */
  onSendMessage?: (message: NewMessageData) => void
  /** Mark a message as read */
  onMarkMessageRead?: (messageId: string) => void

  /** Individually recertify a subordinate (lead action) */
  onRecertifyMember?: (memberId: string, role: VolunteerRoleName) => void
  /** Bulk reset all subordinates to "needs recertification" (lead action) */
  onBulkResetCertification?: (role: VolunteerRoleName) => void

  /** Navigate to a section/page */
  onNavigate?: (path: string) => void
}
