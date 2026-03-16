# Content Management

## Overview

Admin-facing CMS for managing all public website content, accessible to CMS Admin and Super Admin roles. Organized as a single tabbed interface with three tabs: Hero & Banner, Events, and Pages. All content supports a draft/publish workflow so admins can prepare changes before making them live. Renders inside the portal sidebar shell.

## User Flows

1. **Hero & Banner Tab** — Edit the hero headline, subtitle, and CTA buttons. Upload, remove, and reorder hero images. Toggle the notice banner on/off and edit its text and link. Save changes as draft or publish immediately.
2. **Events Tab** — Browse events in a table/card list with status badges (draft, published, past). Create a new event with title, date, time, description, excerpt, and featured photo. Edit existing events. Delete events with confirmation. Publish draft events or unpublish live events back to draft.
3. **Pages Tab** — Browse editable public pages (Schedules & Fares, Charters, Support Us, About, History) as cards showing page name, last-edited date, and status. Click a page to open an editor with content blocks grouped by section. Save page content as draft or publish.

## Components

| Component | Description |
|-----------|-------------|
| `ContentManagement` | Single component with a tabbed interface for Hero & Banner, Events, and Pages management. Handles all CMS functionality including draft/publish workflow, CRUD operations, and content editing. |

## Callback Props

| Callback | Type Signature | Triggered When |
|----------|---------------|----------------|
| `onSaveHeroDraft` | `(config: Omit<HeroConfig, 'id' \| 'updatedAt' \| 'updatedBy'>) => void` | Admin saves hero changes as a draft |
| `onPublishHero` | `(config: Omit<HeroConfig, 'id' \| 'updatedAt' \| 'updatedBy'>) => void` | Admin publishes hero changes to the live site |
| `onAddHeroImage` | `(image: Omit<HeroImage, 'id'>) => void` | Admin adds a new hero image |
| `onRemoveHeroImage` | `(imageId: string) => void` | Admin removes a hero image |
| `onReorderHeroImages` | `(imageIds: string[]) => void` | Admin reorders hero images via drag or arrows |
| `onCreateEvent` | `(event: Omit<EventItem, 'id' \| 'createdAt' \| 'updatedAt' \| 'updatedBy'>) => void` | Admin creates a new event |
| `onUpdateEvent` | `(eventId: string, updates: Partial<...>) => void` | Admin updates an existing event |
| `onDeleteEvent` | `(eventId: string) => void` | Admin confirms event deletion |
| `onPublishEvent` | `(eventId: string) => void` | Admin publishes a draft event |
| `onUnpublishEvent` | `(eventId: string) => void` | Admin unpublishes a live event |
| `onSavePageDraft` | `(pageId: string, blocks: ContentBlock[]) => void` | Admin saves page content as a draft |
| `onPublishPage` | `(pageId: string, blocks: ContentBlock[]) => void` | Admin publishes page content |
| `onUnpublishPage` | `(pageId: string) => void` | Admin unpublishes a live page |

## Data Dependencies

See `types.ts` for full interface definitions. Key entities:

- `HeroConfig` — Hero images, headline, subtitle, CTAs, notice banner, draft/publish status
- `EventItem` — Event title, date, time, description, excerpt, featured photo, status
- `PageContent` — Page slug, name, status, content blocks
- `ContentBlock` — Union type: `TextBlock | ListBlock | OfficersBlock | ContactBlock`
