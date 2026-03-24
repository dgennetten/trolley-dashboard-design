// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/public-website
// -----------------------------------------------------------------------------

export interface HeroImage {
  url: string
  alt: string
}

export interface CtaButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface NoticeBanner {
  enabled: boolean
  text: string
  linkText?: string
  linkHref?: string
}

export interface HeroContent {
  headline: string
  subtitle: string
  heroImages: HeroImage[]
  ctaButtons: CtaButton[]
  noticeBanner: NoticeBanner
}

export interface PublicEvent {
  id: string
  title: string
  date: string
  description: string
  photoUrl: string | null
}

export interface FareTier {
  category: string
  price: number
  note: string | null
}

export interface ScheduleInfo {
  season: string
  operatingDays: string
  hours: string
  frequency: string
  route: string
  fares: FareTier[]
}

export interface CharterInfo {
  title: string
  description: string
  policies: string[]
  charterLeadPhone?: string
}

export type CharterRouteEndpoint = 'city_park_depot' | 'howes_st_joseph'

export interface CharterRequestFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  secondaryDate?: string
  secondaryTime?: string
  message: string
  pickupLocation: CharterRouteEndpoint | ''
  dropoffLocation: CharterRouteEndpoint | ''
  ackNoDrinkEatSmoke: boolean
  ackNotAdaCompliant: boolean
  ackDecorationsBluePaintersTape: boolean
  ackWeatherOrTrolleyCoordination: boolean
}

export type MembershipPeriod = 'year' | 'one-time'

export interface MembershipLevel {
  id: string
  name: string
  price: number
  period: MembershipPeriod
  tagline: string
  benefits: string[]
}

export type PublicPaymentMethod = 'venmo' | 'paypal' | 'check'

export interface MemberSignupFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  membershipLevelId: string
  paymentMethod: PublicPaymentMethod
}

export type SupportOptionIcon = 'heart' | 'users' | 'megaphone' | 'partyPopper'

export interface SupportOption {
  id: string
  title: string
  description: string
  buttonLabel: string
  href: string
  icon: SupportOptionIcon
}

export interface Officer {
  name: string
  title: string
}

export interface Newsletter {
  title: string
  url: string
}

export interface ContactInfo {
  orgName: string
  address: string
  email: string
  cityLiaison: string
}

export interface AboutContent {
  orgDescription: string
  missionPoints: string[]
  volunteerRoles: string[]
  recognition: string[]
  newsletters: Newsletter[]
  officers: Officer[]
  contact: ContactInfo
  hours: string
}

export interface PaymentOptions {
  venmoUrl: string
  paypalUrl: string
  checkPayableTo: string
  checkMailTo: string
}

// -----------------------------------------------------------------------------
// From: sections/authentication-and-member-portal
// -----------------------------------------------------------------------------

export type PortalPaymentStatus = 'current' | 'due' | 'past_due' | 'lifetime'
export type CertificationStatus = 'certified' | 'needs_recertification'
export type MessageStatus = 'sent' | 'read' | 'replied'
export type MessageRecipientType = 'admin' | 'lead'
export type PortalPaymentMethod = 'venmo' | 'paypal' | 'check' | 'stripe'
export type PaymentRecordStatus = 'pending' | 'confirmed' | 'failed'

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
  paymentStatus: PortalPaymentStatus
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

export interface PortalMessage {
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
  method: PortalPaymentMethod
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

// -----------------------------------------------------------------------------
// From: sections/content-management
// -----------------------------------------------------------------------------

export type ContentStatus = 'draft' | 'published'
export type EventStatus = 'draft' | 'published' | 'past'
export type ContentBlockType = 'text' | 'list' | 'officers' | 'contact'

export interface CmsHeroImage {
  id: string
  url: string
  alt: string
  position: number
}

export interface HeroConfig {
  id: string
  status: ContentStatus
  headline: string
  subtitle: string
  heroImages: CmsHeroImage[]
  ctaButtons: CtaButton[]
  noticeBanner: NoticeBanner
  updatedAt: string
  updatedBy: string
}

export interface EventPhoto {
  url: string
  alt: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  time: string
  description: string
  excerpt: string
  featuredPhoto: EventPhoto | null
  status: ContentStatus
  createdAt: string
  updatedAt: string
  updatedBy: string
}

export interface TextBlock {
  id: string
  type: 'text'
  label: string
  content: string
}

export interface ListBlock {
  id: string
  type: 'list'
  label: string
  items: string[]
}

export interface OfficersBlock {
  id: string
  type: 'officers'
  label: string
  officers: Officer[]
  directors: string[]
}

export interface ContactBlock {
  id: string
  type: 'contact'
  label: string
  organization: string
  address: string
  email: string
  hours: string
}

export type ContentBlock = TextBlock | ListBlock | OfficersBlock | ContactBlock

export interface PageContent {
  id: string
  slug: string
  name: string
  status: ContentStatus
  updatedAt: string
  updatedBy: string
  blocks: ContentBlock[]
}

// -----------------------------------------------------------------------------
// From: sections/membership-admin-dashboard
// -----------------------------------------------------------------------------

export type AdminPaymentStatus = 'current' | 'past_due' | 'lifetime'
export type AdminPaymentMethod = 'venmo' | 'paypal' | 'check'
export type AdminCertificationStatus = 'certified' | 'needs_recertification' | 'not_applicable'
export type ActivityType = 'new_member' | 'renewal' | 'payment' | 'role_change' | 'certification' | 'edit' | 'level_change' | 'payment_reminder'
export type MessageDirection = 'sent' | 'received'
export type AdminMessageStatus = 'read' | 'unread'
export type MembershipLevelName = 'Depot' | 'Mountain Barn' | 'Howes Barn' | 'Lifetime'
export type VolunteerRoleName = 'Board Member' | 'Motorman' | 'Conductor' | 'Depot Staff' | 'Mechanic'

export interface AdminMemberAddress {
  line1: string
  line2: string
  city: string
  state: string
  zip: string
}

export interface AdminMemberVolunteerRole {
  role: VolunteerRoleName
  certificationStatus: AdminCertificationStatus
  certifiedDate: string | null
  isLead: boolean
}

export interface MemberListItem {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: AdminMemberAddress
  membershipLevel: MembershipLevelName
  datePaid: string
  paymentStatus: AdminPaymentStatus
  paymentMethod: AdminPaymentMethod
  volunteerRoles: AdminMemberVolunteerRole[]
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
  status: AdminMessageStatus
  timestamp: string
}

export interface LeadSubordinate {
  memberId: string
  name: string
  certificationStatus: AdminCertificationStatus
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

// -----------------------------------------------------------------------------
// From: sections/notifications-and-automation
// -----------------------------------------------------------------------------

export interface NotificationScheduleItem {
  label: string
  timing: string
}

export interface NotificationType {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: string
  schedule: NotificationScheduleItem[]
  supportsManualTrigger: boolean
  lastTriggered: string | null
}

export type DeliveryStatus = 'sent' | 'delivered' | 'failed'

export interface NotificationLogEntry {
  id: string
  typeId: string
  typeName: string
  recipientName: string
  recipientEmail: string
  subject: string
  sentAt: string
  status: DeliveryStatus
}

export interface MemberRecipient {
  id: string
  name: string
  email: string
  paymentStatus: 'current' | 'past_due' | 'expiring_soon'
}
