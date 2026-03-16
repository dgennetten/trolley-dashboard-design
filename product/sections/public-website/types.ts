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
}

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

export type PaymentMethod = 'venmo' | 'paypal' | 'check'

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
  paymentMethod: PaymentMethod
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

export interface PublicWebsiteProps {
  heroContent: HeroContent
  events: Event[]
  scheduleInfo: ScheduleInfo
  charterInfo: CharterInfo
  membershipLevels: MembershipLevel[]
  supportOptions: SupportOption[]
  aboutContent: AboutContent
  paymentOptions: PaymentOptions

  /** Navigate to an internal route */
  onNavigate?: (href: string) => void
  /** Open the member login flow */
  onLogin?: () => void
  /** Submit a charter request form */
  onSubmitCharterRequest?: (data: CharterRequestFormData) => void
  /** Submit a new member signup form */
  onSubmitMemberSignup?: (data: MemberSignupFormData) => void
  /** Open an external donation link (Venmo or PayPal) */
  onDonate?: (method: PaymentMethod) => void
}
