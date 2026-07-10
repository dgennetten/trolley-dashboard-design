export type PaymentStatus = 'current' | 'past_due' | 'lifetime'
/** All recorded payment methods, including offline ones (check/cash) an admin logs manually. */
export type PaymentMethod = 'card' | 'paypal' | 'venmo' | 'zelle' | 'check' | 'cash'
export type CertificationStatus = 'certified' | 'needs_recertification' | 'not_applicable'
export type ActivityType = 'new_member' | 'renewal' | 'payment' | 'role_change' | 'certification' | 'edit' | 'level_change' | 'payment_reminder'
export type MessageDirection = 'sent' | 'received'
export type MessageStatus = 'read' | 'unread'
export type MembershipLevelName = 'Trolley 2' | 'Trolley 4' | 'Trolley 8' | 'Life' | 'Car Card 1' | 'Car Card 2'
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
  isAssistantLead: boolean
}

/** An optional second person named on the membership (household/joint). */
export interface SecondContact {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface MemberListItem {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  secondContact?: SecondContact
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
  assistantLeadName: string | null
  role: VolunteerRoleName
  stats: LeadGroupStats
  subordinates: LeadSubordinate[]
}

export type ContactRoleTitle = 'Lead' | 'Assistant Lead' | 'Member'
export type FinancialRowType = 'income' | 'expense'

export interface ContactListEntry {
  memberId: string
  name: string
  roleTitle: ContactRoleTitle
  cell: string
  email: string
}

export interface GroupContactList {
  group: VolunteerRoleName
  members: ContactListEntry[]
}

export interface LeadsContactListEntry {
  group: VolunteerRoleName
  roleTitle: 'Lead' | 'Assistant Lead'
  name: string
  cell: string
  email: string
}

export interface MonthlyFinancialRow {
  category: string
  type: FinancialRowType
  monthlyAmounts: number[]
}

export interface MonthlyFinancials {
  months: string[]
  rows: MonthlyFinancialRow[]
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

  groupContactLists: GroupContactList[]
  leadsContactList: LeadsContactListEntry[]
  monthlyFinancials: MonthlyFinancials | null

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

  /** Export a group's contact list as PDF */
  onExportGroupContactList?: (group: VolunteerRoleName) => void
  /** Export the all-leads contact list as PDF */
  onExportLeadsContactList?: () => void

  /** Navigate to a section/page */
  onNavigate?: (path: string) => void
}
