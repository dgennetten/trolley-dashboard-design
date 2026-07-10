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

export interface Event {
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
  /** Charter Lead contact number shown in the request modal (day-of coordination). */
  charterLeadPhone?: string
}

/** Stops on the line for charter pick-up or drop-off. */
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
  /** Empty until user selects pick-up stop (can match or differ from drop-off). */
  pickupLocation: CharterRouteEndpoint | ''
  /** Empty until user selects drop-off stop. */
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

/** Payment methods processed through the Braintree Drop-in UI. */
export type BraintreePaymentMethod = 'card' | 'paypal' | 'venmo'

/** All payer-selectable payment methods: the Braintree methods plus fee-free Zelle. */
export type PaymentMethod = BraintreePaymentMethod | 'zelle'

/** Config for computing the exact processing fee a payer can opt to cover (Braintree methods only). */
export interface ProcessingFeeConfig {
  /** Percentage rate applied to the base amount, e.g. 0.029 for 2.9%. */
  percentRate: number
  /** Fixed per-transaction fee added on top, in dollars, e.g. 0.3. */
  fixedFee: number
}

/** Zelle recipient details shown to the payer. Zelle has no API, so payments are reconciled manually by an admin. */
export interface ZelleConfig {
  /** Zelle-enrolled recipient name shown to the payer. */
  recipientName: string
  /** Zelle-enrolled email address the payer sends to. */
  recipientEmail: string
  /** Optional Zelle-enrolled phone alternative. */
  recipientPhone?: string
  /** Short instructions shown above the Zelle recipient details. */
  instructions: string
}

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
  /** Method chosen from the payment radio group. */
  paymentMethod: PaymentMethod
  /** Whether the payer opted to cover the Braintree processing fee. Always false for Zelle. */
  coverProcessingFee: boolean
  /** Total charged in dollars: membership price, plus the processing fee when coverProcessingFee is true. */
  amountCharged: number
  /** Braintree payment nonce from the Drop-in UI. Present for card/paypal/venmo, omitted for Zelle. */
  braintreeNonce?: string
  /** Reference code the payer includes in the Zelle memo. Present for Zelle only. */
  zelleReferenceCode?: string
}

export interface DonationFormData {
  /** Base donation amount the payer chose, in dollars. */
  amount: number
  /** Method chosen from the payment radio group. */
  paymentMethod: PaymentMethod
  /** Whether the payer opted to cover the Braintree processing fee. Always false for Zelle. */
  coverProcessingFee: boolean
  /** Total charged in dollars: the donation amount, plus the processing fee when coverProcessingFee is true. */
  amountCharged: number
  /** Braintree payment nonce from the Drop-in UI. Present for card/paypal/venmo, omitted for Zelle. */
  braintreeNonce?: string
  /** Reference code the payer includes in the Zelle memo. Present for Zelle only. */
  zelleReferenceCode?: string
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

export interface BraintreeConfig {
  /** Client token from Braintree server SDK (used to initialize Drop-in UI) */
  clientToken: string
}

export interface PublicWebsiteProps {
  heroContent: HeroContent
  events: Event[]
  scheduleInfo: ScheduleInfo
  charterInfo: CharterInfo
  membershipLevels: MembershipLevel[]
  supportOptions: SupportOption[]
  aboutContent: AboutContent
  braintreeConfig: BraintreeConfig
  /** Rates used to compute the optional "cover the processing fee" amount. */
  processingFeeConfig: ProcessingFeeConfig
  /** Zelle recipient details shown when the payer selects Zelle. */
  zelleConfig: ZelleConfig

  /** Navigate to an internal route */
  onNavigate?: (href: string) => void
  /** Open the member login flow */
  onLogin?: () => void
  /** Submit a charter request form */
  onSubmitCharterRequest?: (data: CharterRequestFormData) => void
  /** Submit a new member signup form (Braintree nonce or a pending Zelle payment) */
  onSubmitMemberSignup?: (data: MemberSignupFormData) => void
  /** Submit a donation (Braintree nonce or a pending Zelle payment) */
  onDonate?: (data: DonationFormData) => void
}
