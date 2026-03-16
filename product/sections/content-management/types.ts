export type ContentStatus = 'draft' | 'published'
export type EventStatus = 'draft' | 'published' | 'past'
export type ContentBlockType = 'text' | 'list' | 'officers' | 'contact'

export interface HeroImage {
  id: string
  url: string
  alt: string
  position: number
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

export interface HeroConfig {
  id: string
  status: ContentStatus
  headline: string
  subtitle: string
  heroImages: HeroImage[]
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

export interface Officer {
  name: string
  title: string
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

export interface ContentManagementProps {
  heroConfig: HeroConfig
  events: EventItem[]
  pages: PageContent[]

  /** Save the hero configuration as a draft */
  onSaveHeroDraft?: (config: Omit<HeroConfig, 'id' | 'updatedAt' | 'updatedBy'>) => void
  /** Publish the hero configuration to the live site */
  onPublishHero?: (config: Omit<HeroConfig, 'id' | 'updatedAt' | 'updatedBy'>) => void

  /** Add a hero image */
  onAddHeroImage?: (image: Omit<HeroImage, 'id'>) => void
  /** Remove a hero image */
  onRemoveHeroImage?: (imageId: string) => void
  /** Reorder hero images */
  onReorderHeroImages?: (imageIds: string[]) => void

  /** Create a new event */
  onCreateEvent?: (event: Omit<EventItem, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>) => void
  /** Update an existing event */
  onUpdateEvent?: (eventId: string, updates: Partial<Omit<EventItem, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>>) => void
  /** Delete an event */
  onDeleteEvent?: (eventId: string) => void
  /** Publish a draft event */
  onPublishEvent?: (eventId: string) => void
  /** Unpublish a live event back to draft */
  onUnpublishEvent?: (eventId: string) => void

  /** Save page content as a draft */
  onSavePageDraft?: (pageId: string, blocks: ContentBlock[]) => void
  /** Publish page content to the live site */
  onPublishPage?: (pageId: string, blocks: ContentBlock[]) => void
  /** Unpublish a live page back to draft */
  onUnpublishPage?: (pageId: string) => void
}
