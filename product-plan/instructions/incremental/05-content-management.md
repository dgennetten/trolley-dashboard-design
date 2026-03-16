# Milestone 5: Content Management

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Build the admin CMS for managing public website content, available to CMS Admin and Super Admin roles.

## Overview

CMS and Super Admins manage the hero section, events, and page content through a tabbed interface with a draft/publish workflow. Changes can be saved as drafts and previewed before going live. All content management happens inside the portal shell (sidebar + header from Milestone 1).

## Components

Copy and integrate the component from `product-plan/sections/content-management/components/`:

| Component | Purpose |
|-----------|---------|
| **ContentManagement** | Single tabbed component with three tabs: Hero & Banner, Events, and Pages — includes all CRUD operations and draft/publish workflow |

**Reference files:**
- `product-plan/sections/content-management/types.ts` — TypeScript interfaces for all component props
- `product-plan/sections/content-management/sample-data.json` — Sample data matching the expected prop shapes

## Key Functionality

### Hero & Banner Tab
- Edit hero images (add, remove, reorder)
- Update headline, subtitle, and CTA button configuration
- Toggle and edit the notice banner (text and link)
- Save as draft or publish immediately
- Status badge shows Draft (amber) or Published (emerald)

### Events Tab
- Table or card list showing all events with: photo thumbnail, title, date, status badge (Draft/Published/Past), and action buttons
- "Add Event" button opens a form with: title, date picker, time picker, description textarea, excerpt textarea, and photo upload
- Edit existing events
- Publish a draft event or unpublish a live event back to draft
- Delete an event (with confirmation modal)

### Pages Tab
- List of editable public pages as cards: Schedules & Fares, Charters, Support Us, About, History
- Each card shows the page name, last-edited date, and current status
- Clicking a page opens an editor with content fields grouped by section (text blocks, lists, officer/director entries, contact info)
- Save as draft or publish
- Unpublish a page back to draft

### Cross-Cutting
- Draft/publish workflow on all content types
- Confirmation modal for destructive actions (delete event, unpublish content)
- Toast notifications on save, publish, and delete success

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onSaveHeroDraft` | Admin saves hero changes as a draft |
| `onPublishHero` | Admin publishes the hero section |
| `onAddHeroImage` | Admin adds a new hero image |
| `onRemoveHeroImage` | Admin removes a hero image |
| `onReorderHeroImages` | Admin reorders hero images |
| `onCreateEvent` | Admin creates a new event |
| `onUpdateEvent` | Admin updates an existing event |
| `onDeleteEvent` | Admin deletes an event (after confirmation) |
| `onPublishEvent` | Admin publishes a draft event |
| `onUnpublishEvent` | Admin unpublishes a live event |
| `onSavePageDraft` | Admin saves page content as a draft |
| `onPublishPage` | Admin publishes a page |
| `onUnpublishPage` | Admin unpublishes a page |

## User Flows

1. **Edit hero** — Navigate to `/portal/content`, open the Hero & Banner tab, update the headline and subtitle, adjust CTA buttons, save as draft, review, then publish
2. **Manage hero images** — On the Hero & Banner tab, add new images, remove old ones, drag to reorder, save
3. **Edit notice banner** — Toggle the notice banner on, enter banner text and optional link, save draft, publish
4. **Create an event** — Switch to the Events tab, click "Add Event", fill in title, date, time, description, excerpt, and photo, save as draft or publish directly
5. **Edit an event** — On the Events tab, click edit on an existing event, modify fields, save
6. **Publish/unpublish an event** — Click the publish or unpublish action on an event row, confirm if unpublishing
7. **Delete an event** — Click delete on an event, confirm in the modal, event is removed
8. **Edit a page** — Switch to the Pages tab, click a page card, modify content blocks in the editor, save as draft or publish
9. **Unpublish a page** — On a published page, click unpublish, confirm, page reverts to draft status

## Done When

- [ ] All three tabs (Hero & Banner, Events, Pages) are functional
- [ ] Hero editing works (images, headline, subtitle, CTAs, notice banner)
- [ ] Events CRUD works (create, read, update, delete)
- [ ] Draft/publish workflow works on all content types
- [ ] Status badges show correctly (Draft in amber, Published in emerald)
- [ ] Page editing works with grouped content blocks
- [ ] Confirmation modals appear for destructive actions
- [ ] Toast notifications show on success
- [ ] Role-based access is enforced (CMS Admin and Super Admin only)
- [ ] All views are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
