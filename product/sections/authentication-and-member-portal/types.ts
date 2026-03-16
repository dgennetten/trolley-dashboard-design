export type PaymentStatus = 'current' | 'due' | 'past_due' | 'lifetime'

export type CertificationStatus = 'certified' | 'needs_recertification'

export type MessageStatus = 'sent' | 'read' | 'replied'

export type MessageRecipientType = 'admin' | 'lead'

export type PaymentMethod = 'venmo' | 'paypal' | 'check' | 'stripe'

export type PaymentRecordStatus = 'pending' | 'confirmed' | 'failed'

export type MembershipPeriod = 'year' | 'one-time'

export interface MemberAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zipCode: string
}

export interface MemberMembershipLevel {
  id: string
  name: string
  price: number
  period: MembershipPeriod
}

export interface MemberVolunteerRole {
  role: string
  certificationStatus: CertificationStatus
  isLead: boolean
  certifiedDate: string | null
}

export interface MemberProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: MemberAddress
  membershipLevel: MemberMembershipLevel
  memberSince: string
  datePaid: string
  paymentStatus: PaymentStatus
  expiresOn: string
  lastLogin: string
  volunteerRoles: MemberVolunteerRole[]
}

export interface VolunteerGroupLead {
  name: string
  email: string
  phone: string
}

export interface VolunteerGroupMember {
  id: string
  name: string
  certificationStatus: CertificationStatus
  certifiedDate: string | null
  isCurrentUser: boolean
}

export interface VolunteerGroup {
  roleName: string
  lead: VolunteerGroupLead
  members: VolunteerGroupMember[]
}

export interface Message {
  id: string
  recipientType: MessageRecipientType
  recipientName: string
  subject: string
  body: string
  sentAt: string
  status: MessageStatus
}

export interface PaymentRecord {
  id: string
  amount: number
  method: PaymentMethod
  date: string
  description: string
  status: PaymentRecordStatus
}

export interface AvailableLevel {
  id: string
  name: string
  price: number
  period: MembershipPeriod
}

export interface ProfileUpdateData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: MemberAddress
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
}

export interface NewMessageData {
  recipientType: MessageRecipientType
  subject: string
  body: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface AuthMemberPortalProps {
  memberProfile: MemberProfile
  volunteerGroups: VolunteerGroup[]
  messages: Message[]
  paymentHistory: PaymentRecord[]
  availableLevels: AvailableLevel[]

  /** Authenticate with email and password */
  onLogin?: (credentials: LoginCredentials) => void
  /** Send a magic link to the given email address */
  onMagicLink?: (email: string) => void
  /** Register a new member account (pending admin approval) */
  onRegister?: (data: RegisterData) => void
  /** Log out of the portal */
  onLogout?: () => void
  /** Update the member's contact information */
  onUpdateProfile?: (data: ProfileUpdateData) => void
  /** Change the member's password */
  onChangePassword?: (data: PasswordChangeData) => void
  /** Initiate membership renewal via integrated payment */
  onRenew?: (membershipLevelId: string) => void
  /** Upgrade membership to a different tier via integrated payment */
  onUpgradeMembership?: (newLevelId: string) => void
  /** Send a message to admin or role lead */
  onSendMessage?: (data: NewMessageData) => void
  /** Request a password reset email */
  onForgotPassword?: (email: string) => void
  /** Navigate to an internal route */
  onNavigate?: (href: string) => void
}
