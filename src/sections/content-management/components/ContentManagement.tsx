import { useState, useMemo } from 'react'
import type {
  ContentManagementProps,
  HeroConfig,
  EventItem,
  PageContent,
  ContentBlock,
  ContentStatus,
} from '@/../product/sections/content-management/types'
import {
  Image,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Calendar,
  Clock,
  FileText,
  LayoutDashboard,
  Globe,
  AlertTriangle,
  X,
  ChevronLeft,
  Check,
  Save,
  Send,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon,
  Type,
  List,
  Users,
  MapPin,
  ImageIcon,
} from 'lucide-react'

type TabId = 'hero' | 'events' | 'pages'

function StatusBadge({ status }: { status: ContentStatus }) {
  if (status === 'published') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        <Globe className="w-3 h-3" />
        Published
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
      <FileText className="w-3 h-3" />
      Draft
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── Hero Tab ──────────────────────────────────────────────────────

function HeroTab({
  heroConfig,
  onSaveHeroDraft,
  onPublishHero,
  onRemoveHeroImage,
}: {
  heroConfig: HeroConfig
  onSaveHeroDraft?: ContentManagementProps['onSaveHeroDraft']
  onPublishHero?: ContentManagementProps['onPublishHero']
  onRemoveHeroImage?: ContentManagementProps['onRemoveHeroImage']
}) {
  const [headline, setHeadline] = useState(heroConfig.headline)
  const [subtitle, setSubtitle] = useState(heroConfig.subtitle)
  const [bannerEnabled, setBannerEnabled] = useState(heroConfig.noticeBanner.enabled)
  const [bannerText, setBannerText] = useState(heroConfig.noticeBanner.text)
  const [bannerLinkText, setBannerLinkText] = useState(heroConfig.noticeBanner.linkText || '')
  const [bannerLinkHref, setBannerLinkHref] = useState(heroConfig.noticeBanner.linkHref || '')
  const [cta1Label, setCta1Label] = useState(heroConfig.ctaButtons[0]?.label || '')
  const [cta1Href, setCta1Href] = useState(heroConfig.ctaButtons[0]?.href || '')
  const [cta2Label, setCta2Label] = useState(heroConfig.ctaButtons[1]?.label || '')
  const [cta2Href, setCta2Href] = useState(heroConfig.ctaButtons[1]?.href || '')
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function buildConfig() {
    return {
      status: heroConfig.status,
      headline,
      subtitle,
      heroImages: heroConfig.heroImages,
      ctaButtons: [
        { label: cta1Label, href: cta1Href, variant: 'primary' as const },
        { label: cta2Label, href: cta2Href, variant: 'secondary' as const },
      ],
      noticeBanner: {
        enabled: bannerEnabled,
        text: bannerText,
        linkText: bannerLinkText || undefined,
        linkHref: bannerLinkHref || undefined,
      },
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            Hero & Banner
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Configure the landing page hero section and notice banner
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={heroConfig.status} />
          <span className="text-xs text-stone-400 dark:text-stone-500">
            Last updated {formatDate(heroConfig.updatedAt)} by {heroConfig.updatedBy}
          </span>
        </div>
      </div>

      {/* Hero Images */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
            Hero Images
          </h3>
          <button className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Image
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {heroConfig.heroImages.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-video rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-stone-300 dark:text-stone-600" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-1 rounded bg-white/80 dark:bg-stone-800/80 cursor-grab">
                  <GripVertical className="w-3.5 h-3.5 text-stone-500" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{img.alt}</p>
              </div>
              <button
                onClick={() => onRemoveHeroImage?.(img.id)}
                className="absolute top-2 right-2 p-1 rounded bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-stone-900/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                #{img.position}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Headline & Subtitle */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
          Hero Content
        </h3>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
            Headline
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
            Subtitle
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors resize-none"
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
          Call-to-Action Buttons
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Primary
            </span>
            <input
              type="text"
              value={cta1Label}
              onChange={(e) => setCta1Label(e.target.value)}
              placeholder="Button label"
              className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
            />
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={cta1Href}
                onChange={(e) => setCta1Href(e.target.value)}
                placeholder="/path"
                className="flex-1 px-2 py-1 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Secondary
            </span>
            <input
              type="text"
              value={cta2Label}
              onChange={(e) => setCta2Label(e.target.value)}
              placeholder="Button label"
              className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
            />
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={cta2Href}
                onChange={(e) => setCta2Href(e.target.value)}
                placeholder="/path"
                className="flex-1 px-2 py-1 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
            Notice Banner
          </h3>
          <button
            onClick={() => setBannerEnabled(!bannerEnabled)}
            className="flex items-center gap-2 text-sm"
          >
            {bannerEnabled ? (
              <ToggleRight className="w-6 h-6 text-emerald-600" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-stone-400" />
            )}
            <span className={bannerEnabled ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-stone-400'}>
              {bannerEnabled ? 'Active' : 'Inactive'}
            </span>
          </button>
        </div>
        {bannerEnabled && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Banner Text
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Link Text (optional)
                </label>
                <input
                  type="text"
                  value={bannerLinkText}
                  onChange={(e) => setBannerLinkText(e.target.value)}
                  placeholder="e.g. View Schedule"
                  className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Link URL (optional)
                </label>
                <input
                  type="text"
                  value={bannerLinkHref}
                  onChange={(e) => setBannerLinkHref(e.target.value)}
                  placeholder="/schedules"
                  className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            {/* Banner preview */}
            <div className="mt-2 bg-amber-400 dark:bg-amber-500 rounded-lg px-4 py-2 flex items-center justify-center gap-2">
              <span className="text-xs font-medium text-amber-950">{bannerText}</span>
              {bannerLinkText && (
                <span className="text-xs font-bold text-amber-800 underline">{bannerLinkText}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={() => {
            onSaveHeroDraft?.(buildConfig())
            showToast('Hero saved as draft')
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>
        <button
          onClick={() => {
            onPublishHero?.(buildConfig())
            showToast('Hero published')
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
          Publish
        </button>
      </div>
    </div>
  )
}

// ─── Events Tab ────────────────────────────────────────────────────

function EventsTab({
  events,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onPublishEvent,
  onUnpublishEvent,
}: {
  events: EventItem[]
  onCreateEvent?: ContentManagementProps['onCreateEvent']
  onUpdateEvent?: ContentManagementProps['onUpdateEvent']
  onDeleteEvent?: ContentManagementProps['onDeleteEvent']
  onPublishEvent?: ContentManagementProps['onPublishEvent']
  onUnpublishEvent?: ContentManagementProps['onUnpublishEvent']
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const [formTitle, setFormTitle] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formTime, setFormTime] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formExcerpt, setFormExcerpt] = useState('')

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [events]
  )

  function openCreateForm() {
    setEditingEvent(null)
    setFormTitle('')
    setFormDate('')
    setFormTime('')
    setFormDescription('')
    setFormExcerpt('')
    setShowForm(true)
  }

  function openEditForm(evt: EventItem) {
    setEditingEvent(evt)
    setFormTitle(evt.title)
    setFormDate(evt.date)
    setFormTime(evt.time)
    setFormDescription(evt.description)
    setFormExcerpt(evt.excerpt)
    setShowForm(true)
  }

  function handleSubmit() {
    const data = {
      title: formTitle,
      date: formDate,
      time: formTime,
      description: formDescription,
      excerpt: formExcerpt,
      featuredPhoto: editingEvent?.featuredPhoto || null,
      status: 'draft' as const,
    }
    if (editingEvent) {
      onUpdateEvent?.(editingEvent.id, data)
      showToastMsg('Event updated')
    } else {
      onCreateEvent?.(data)
      showToastMsg('Event created')
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            Events
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {events.length} event{events.length !== 1 ? 's' : ''} &middot;{' '}
            {events.filter((e) => e.status === 'published').length} published,{' '}
            {events.filter((e) => e.status === 'draft').length} drafts
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[auto_1fr_100px_100px_120px] gap-4 px-5 py-2.5 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
          <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-12">
            Photo
          </span>
          <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Title
          </span>
          <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Date
          </span>
          <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Status
          </span>
          <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right">
            Actions
          </span>
        </div>
        <ul className="divide-y divide-stone-100 dark:divide-stone-800">
          {sortedEvents.map((evt) => {
            const isPast = new Date(evt.date) < new Date()
            return (
              <li
                key={evt.id}
                className={`group px-5 py-3 sm:grid sm:grid-cols-[auto_1fr_100px_100px_120px] sm:gap-4 sm:items-center flex flex-col gap-2 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors ${
                  isPast ? 'opacity-60' : ''
                }`}
              >
                {/* Photo thumbnail */}
                <div className="w-12 h-8 rounded bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden shrink-0">
                  {evt.featuredPhoto ? (
                    <Image className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                  )}
                </div>
                {/* Title + excerpt */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                    {evt.title}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate hidden sm:block">
                    {evt.excerpt}
                  </p>
                </div>
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <Calendar className="w-3 h-3 hidden sm:block" />
                  <span>{formatDate(evt.date)}</span>
                </div>
                {/* Status */}
                <div>
                  {isPast ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-400">
                      Past
                    </span>
                  ) : (
                    <StatusBadge status={evt.status} />
                  )}
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={() => openEditForm(evt)}
                    className="p-1.5 rounded-md text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {!isPast && evt.status === 'draft' && (
                    <button
                      onClick={() => {
                        onPublishEvent?.(evt.id)
                        showToastMsg('Event published')
                      }}
                      className="p-1.5 rounded-md text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
                      title="Publish"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {!isPast && evt.status === 'published' && (
                    <button
                      onClick={() => {
                        onUnpublishEvent?.(evt.id)
                        showToastMsg('Event unpublished')
                      }}
                      className="p-1.5 rounded-md text-stone-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:bg-amber-900/20 transition-colors"
                      title="Unpublish"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteConfirm(evt.id)}
                    className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {editingEvent ? 'Edit Event' : 'New Event'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Event name"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={4}
                  placeholder="Full event description..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Excerpt
                  <span className="ml-1 text-xs font-normal text-stone-400">
                    (shown on event cards)
                  </span>
                </label>
                <textarea
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  rows={2}
                  placeholder="Brief summary for the event card..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
              <div className="p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg text-center">
                <ImageIcon className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Drag & drop a featured photo or click to browse
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 rounded-b-xl">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <Check className="w-4 h-4" />
                {editingEvent ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Delete Event?
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              This action cannot be undone. The event will be permanently removed.
            </p>
            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteEvent?.(deleteConfirm)
                  setDeleteConfirm(null)
                  showToastMsg('Event deleted')
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Pages Tab ─────────────────────────────────────────────────────

function blockTypeIcon(type: string) {
  switch (type) {
    case 'text':
      return <Type className="w-3.5 h-3.5" />
    case 'list':
      return <List className="w-3.5 h-3.5" />
    case 'officers':
      return <Users className="w-3.5 h-3.5" />
    case 'contact':
      return <MapPin className="w-3.5 h-3.5" />
    default:
      return <FileText className="w-3.5 h-3.5" />
  }
}

function PagesTab({
  pages,
  onSavePageDraft,
  onPublishPage,
  onUnpublishPage,
}: {
  pages: PageContent[]
  onSavePageDraft?: ContentManagementProps['onSavePageDraft']
  onPublishPage?: ContentManagementProps['onPublishPage']
  onUnpublishPage?: ContentManagementProps['onUnpublishPage']
}) {
  const [editingPage, setEditingPage] = useState<PageContent | null>(null)
  const [editBlocks, setEditBlocks] = useState<ContentBlock[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [unpublishConfirm, setUnpublishConfirm] = useState<string | null>(null)

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function openEditor(page: PageContent) {
    setEditingPage(page)
    setEditBlocks(JSON.parse(JSON.stringify(page.blocks)))
  }

  function updateTextBlock(blockId: string, content: string) {
    setEditBlocks((prev) =>
      prev.map((b) => (b.id === blockId && b.type === 'text' ? { ...b, content } : b))
    )
  }

  function updateListItem(blockId: string, index: number, value: string) {
    setEditBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId && b.type === 'list') {
          const items = [...b.items]
          items[index] = value
          return { ...b, items }
        }
        return b
      })
    )
  }

  if (editingPage) {
    return (
      <div className="space-y-4">
        {toast && (
          <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
            <Check className="w-4 h-4" />
            {toast}
          </div>
        )}

        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingPage(null)}
              className="p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {editingPage.name}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Last updated {formatDate(editingPage.updatedAt)} by {editingPage.updatedBy}
              </p>
            </div>
          </div>
          <StatusBadge status={editingPage.status} />
        </div>

        {/* Block Editor */}
        <div className="space-y-4">
          {editBlocks.map((block) => (
            <div
              key={block.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                <span className="text-stone-400 dark:text-stone-500">
                  {blockTypeIcon(block.type)}
                </span>
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                  {block.label}
                </span>
                <span className="ml-auto text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                  {block.type}
                </span>
              </div>
              <div className="p-4">
                {block.type === 'text' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateTextBlock(block.id, e.target.value)}
                    rows={Math.max(3, Math.ceil(block.content.length / 80))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors resize-none"
                  />
                )}
                {block.type === 'list' && (
                  <div className="space-y-2">
                    {block.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-2 text-xs font-mono text-stone-400 w-5 text-right shrink-0">
                          {i + 1}.
                        </span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateListItem(block.id, i, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {block.type === 'officers' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
                        Officers
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {block.officers.map((o, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700"
                          >
                            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                              {o.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                                {o.name}
                              </p>
                              <p className="text-xs text-stone-500 dark:text-stone-400">{o.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
                        Directors
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {block.directors.map((d, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {block.type === 'contact' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        defaultValue={block.organization}
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={block.email}
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue={block.address}
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                        Hours
                      </label>
                      <input
                        type="text"
                        defaultValue={block.hours}
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Editor Actions */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {editingPage.status === 'published' && (
              <button
                onClick={() => setUnpublishConfirm(editingPage.id)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <EyeOff className="w-3.5 h-3.5" />
                Unpublish
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSavePageDraft?.(editingPage.id, editBlocks)
                showToastMsg('Page saved as draft')
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button
              onClick={() => {
                onPublishPage?.(editingPage.id, editBlocks)
                showToastMsg('Page published')
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>

        {/* Unpublish Confirmation */}
        {unpublishConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
            <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Unpublish Page?
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                This page will revert to draft and no longer be visible on the public website.
              </p>
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => setUnpublishConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onUnpublishPage?.(unpublishConfirm)
                    setUnpublishConfirm(null)
                    showToastMsg('Page unpublished')
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors shadow-sm"
                >
                  Unpublish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Page list view
  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
          Pages
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          Edit content for each public website page
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => openEditor(page)}
            className="group text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                <FileText className="w-4.5 h-4.5 text-stone-500 dark:text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </div>
              <StatusBadge status={page.status} />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
              {page.name}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {page.blocks.length} content block{page.blocks.length !== 1 ? 's' : ''} &middot;
              Updated {formatDate(page.updatedAt)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'hero', label: 'Hero & Banner', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'pages', label: 'Pages', icon: FileText },
]

export function ContentManagement({
  heroConfig,
  events,
  pages,
  onSaveHeroDraft,
  onPublishHero,
  onRemoveHeroImage,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onPublishEvent,
  onUnpublishEvent,
  onSavePageDraft,
  onPublishPage,
  onUnpublishPage,
}: ContentManagementProps) {
  const [activeTab, setActiveTab] = useState<TabId>('hero')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
          Content Management
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage your public website content — hero section, events, and page content.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-stone-200 dark:border-stone-700 mb-6">
        <nav className="flex gap-1 -mb-px" role="tablist">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors
                  ${
                    isActive
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400'
                      : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'events' && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                  }`}>
                    {events.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'hero' && (
        <HeroTab
          heroConfig={heroConfig}
          onSaveHeroDraft={onSaveHeroDraft}
          onPublishHero={onPublishHero}
          onRemoveHeroImage={onRemoveHeroImage}
        />
      )}
      {activeTab === 'events' && (
        <EventsTab
          events={events}
          onCreateEvent={onCreateEvent}
          onUpdateEvent={onUpdateEvent}
          onDeleteEvent={onDeleteEvent}
          onPublishEvent={onPublishEvent}
          onUnpublishEvent={onUnpublishEvent}
        />
      )}
      {activeTab === 'pages' && (
        <PagesTab
          pages={pages}
          onSavePageDraft={onSavePageDraft}
          onPublishPage={onPublishPage}
          onUnpublishPage={onUnpublishPage}
        />
      )}
    </div>
  )
}
