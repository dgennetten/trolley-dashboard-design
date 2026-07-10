export type PaymentStatus = 'current' | 'due' | 'past_due' | 'lifetime'

export type CertificationStatus = 'certified' | 'needs_recertification'

export type MessageStatus = 'sent' | 'read' | 'replied'

export type MessageRecipientType = 'admin' | 'lead'

/** Payer-selectable online methods: Braintree methods plus fee-free Zelle. */
export type PaymentMethod = 'card' | 'paypal' | 'venmo' | 'zelle'

/** Any recorded payment method, including offline ones (check/cash) an admin logs. Used in payment history. */
export type RecordedPaymentMethod = PaymentMethod | 'check' | 'cash'

export type PaymentRecordStatus = 'pending' | 'confirmed' | 'failed'

/** Config for computing the exact processing fee a member can opt to cover (Braintree methods only). */
export interface ProcessingFeeConfig {
  /** Percentage rate applied to the base amount, e.g. 0.029 for 2.9%. */
  percentRate: number
  /** Fixed per-transaction fee added on top, in dollars, e.g. 0.3. */
  fixedFee: number
}

/** Zelle recipient details shown to the member. Zelle has no API, so payments are reconciled manually by an admin. */
export interface ZelleConfig {
  /** Zelle-enrolled recipient name shown to the member. */
  recipientName: string
  /** Zelle-enrolled email address the member sends to. */
  recipientEmail: string
  /** Optional Zelle-enrolled phone alternative. */
  recipientPhone?: string
  /** Short instructions shown above the Zelle recipient details. */
  instructions: string
}

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

/** A second person named on the membership, with their own contact details and volunteer roles. */
export interface ProfileContact {
  firstName: string
  lastName: string
  email: string
  phone: string
  volunteerRoles: MemberVolunteerRole[]
}

export interface MemberProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  /** Optional second contact on the membership (household/joint). */
  secondContact?: ProfileContact
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
  method: RecordedPaymentMethod
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

export interface RenewalFormData {
  /** The level being renewed or upgraded to. */
  membershipLevelId: string
  /** True when the selected level differs from the member's current level. */
  isUpgrade: boolean
  /** Method chosen from the payment radio group. */
  paymentMethod: PaymentMethod
  /** Whether the member opted to cover the Braintree processing fee. Always false for Zelle. */
  coverProcessingFee: boolean
  /** Total charged in dollars: the level price, plus the processing fee when coverProcessingFee is true. */
  amountCharged: number
  /** Braintree payment nonce from the Drop-in UI. Present for card/paypal/venmo, omitted for Zelle. */
  braintreeNonce?: string
  /** Reference code the member includes in the Zelle memo. Present for Zelle only. */
  zelleReferenceCode?: string
}

export interface ProfileUpdateData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: MemberAddress
}

export interface NewMessageData {
  recipientType: MessageRecipientType
  subject: string
  body: string
}

/** Email + one-time code submitted at the verification step. */
export interface OtpVerification {
  email: string
  code: string
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
  /** Rates used to compute the optional "cover the processing fee" amount. */
  processingFeeConfig: ProcessingFeeConfig
  /** Zelle recipient details shown when the member selects Zelle. */
  zelleConfig: ZelleConfig

  /** Request a one-time login code be emailed to this address */
  onRequestCode?: (email: string) => void
  /** Verify the one-time code the member entered */
  onVerifyCode?: (data: OtpVerification) => void
  /** Resend the one-time login code to the member's email */
  onResendCode?: (email: string) => void
  /** Register a new member account (pending admin approval) */
  onRegister?: (data: RegisterData) => void
  /** Log out of the portal */
  onLogout?: () => void
  /** Update the member's contact information */
  onUpdateProfile?: (data: ProfileUpdateData) => void
  /** Initiate membership renewal via integrated payment (Braintree nonce or a pending Zelle payment) */
  onRenew?: (data: RenewalFormData) => void
  /** Upgrade membership to a different tier via integrated payment (Braintree nonce or a pending Zelle payment) */
  onUpgradeMembership?: (data: RenewalFormData) => void
  /** Send a message to admin or role lead */
  onSendMessage?: (data: NewMessageData) => void
  /** Navigate to an internal route */
  onNavigate?: (href: string) => void
}
