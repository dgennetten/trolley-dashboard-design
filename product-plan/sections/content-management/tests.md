# Content Management — Test Specs

These specs describe **what to test** (user-facing behavior), not how. Adapt to your testing framework.

---

## Tab Navigation

- [ ] Renders three tabs: "Hero & Banner", "Events", "Pages"
- [ ] Default tab is "Hero & Banner"
- [ ] Clicking a tab switches the visible content
- [ ] Active tab has a distinct visual indicator

---

## Hero & Banner Tab

### Hero Content Editing

- [ ] Displays current headline and subtitle in editable fields
- [ ] Displays CTA buttons with label, href, and variant
- [ ] Editing the headline and clicking "Save Draft" calls `onSaveHeroDraft` with updated config
- [ ] Clicking "Publish" calls `onPublishHero` with the current config

### Hero Images

- [ ] Displays all hero images from `heroConfig.heroImages` in order
- [ ] "Add Image" action calls `onAddHeroImage` with the new image data
- [ ] Each image has a "Remove" button; clicking calls `onRemoveHeroImage` with the image ID
- [ ] Images can be reordered (drag or arrow buttons); reorder calls `onReorderHeroImages` with new ID order

### Notice Banner

- [ ] Toggle switch controls `noticeBanner.enabled`
- [ ] When enabled, text and link fields are editable
- [ ] When disabled, text and link fields are hidden or greyed out
- [ ] Changes to the banner are included in the draft/publish save

### Status Badge

- [ ] Draft status renders an amber badge
- [ ] Published status renders an emerald badge

### Sample Test Data

```typescript
const heroConfig: HeroConfig = {
  id: "hero-1",
  status: "draft",
  headline: "Ride the Historic Fort Collins Trolley",
  subtitle: "A journey through time on original 1919 Birney streetcars",
  heroImages: [
    { id: "img-1", url: "/photos/trolley-summer.jpg", alt: "Trolley in summer", position: 0 },
    { id: "img-2", url: "/photos/trolley-depot.jpg", alt: "Trolley at depot", position: 1 },
  ],
  ctaButtons: [
    { label: "View Schedule", href: "/schedules", variant: "primary" },
    { label: "Plan a Charter", href: "/charters", variant: "secondary" },
  ],
  noticeBanner: {
    enabled: true,
    text: "2025 season opens May 3!",
    linkText: "See schedule",
    linkHref: "/schedules",
  },
  updatedAt: "2025-01-15T10:00:00Z",
  updatedBy: "admin@fortcollinstrolley.org",
};
```

---

## Events Tab

### Event List

- [ ] Renders a list/table of events from the `events` array
- [ ] Each event row shows: featured photo thumbnail (or placeholder), title, date, and status badge
- [ ] Status badges: draft (amber), published (emerald), past (stone/gray)
- [ ] "Add Event" button is visible at the top

### Create Event

- [ ] Clicking "Add Event" opens an inline form or slide-out panel
- [ ] Form contains: title, date picker, time picker, description textarea, excerpt textarea, photo upload
- [ ] Submitting with all required fields calls `onCreateEvent` with correct data
- [ ] Submitting with missing title or date shows validation errors

### Edit Event

- [ ] Clicking an event's edit button opens the form pre-filled with the event's data
- [ ] Saving changes calls `onUpdateEvent` with the event ID and updated fields

### Delete Event

- [ ] Clicking delete shows a confirmation modal ("Are you sure you want to delete this event?")
- [ ] Confirming calls `onDeleteEvent` with the event ID
- [ ] Cancelling the confirmation dismisses the modal without deleting

### Publish / Unpublish

- [ ] Draft events show a "Publish" button; clicking calls `onPublishEvent` with the event ID
- [ ] Published events show an "Unpublish" button; clicking calls `onUnpublishEvent` with the event ID

### Empty State

- [ ] When `events` is empty, displays a message like "No events yet" with an "Add Event" prompt

### Sample Test Data

```typescript
const eventItem: EventItem = {
  id: "evt-001",
  title: "Independence Day Trolley Rides",
  date: "2025-07-04",
  time: "12:00 PM - 5:00 PM",
  description: "Celebrate the 4th with a ride on the historic trolley. Free flags for kids!",
  excerpt: "Celebrate the 4th with a trolley ride.",
  featuredPhoto: { url: "/photos/july4th.jpg", alt: "July 4th trolley" },
  status: "published",
  createdAt: "2025-01-10T08:00:00Z",
  updatedAt: "2025-01-12T15:30:00Z",
  updatedBy: "admin@fortcollinstrolley.org",
};
```

---

## Pages Tab

### Page List

- [ ] Renders a card for each page in the `pages` array
- [ ] Each card shows page name, last-edited date (formatted), and status badge
- [ ] Clicking a page card opens the editor view for that page

### Page Editor

- [ ] Displays content blocks grouped by section
- [ ] `TextBlock`: editable text area with label
- [ ] `ListBlock`: editable list of items with add/remove controls
- [ ] `OfficersBlock`: editable officer entries (name + title) and directors list
- [ ] `ContactBlock`: editable organization name, address, email, hours
- [ ] "Save Draft" calls `onSavePageDraft` with the page ID and updated blocks
- [ ] "Publish" calls `onPublishPage` with the page ID and blocks
- [ ] "Unpublish" button (visible when published) calls `onUnpublishPage` with the page ID

### Sample Test Data

```typescript
const pageContent: PageContent = {
  id: "page-about",
  slug: "about",
  name: "About",
  status: "published",
  updatedAt: "2025-01-14T09:00:00Z",
  updatedBy: "admin@fortcollinstrolley.org",
  blocks: [
    { id: "blk-1", type: "text", label: "Description", content: "The Fort Collins Municipal Railway Society..." },
    { id: "blk-2", type: "list", label: "Mission Points", items: ["Preserve", "Educate", "Operate"] },
    { id: "blk-3", type: "officers", label: "Officers & Directors", officers: [{ name: "John Doe", title: "President" }], directors: ["Jane Smith"] },
    { id: "blk-4", type: "contact", label: "Contact", organization: "FCMRS", address: "PO Box 635", email: "info@ftcollinstrolley.org", hours: "Weekends 12-5 PM" },
  ],
};
```

---

## Toast Notifications

- [ ] Saving a draft shows a success toast (e.g., "Draft saved")
- [ ] Publishing shows a success toast (e.g., "Published successfully")
- [ ] Deleting an event shows a success toast (e.g., "Event deleted")
- [ ] Toasts auto-dismiss after a few seconds

---

## Edge Cases

- [ ] Rapid tab switching does not cause stale data display
- [ ] Saving with no changes still calls the callback (idempotent)
- [ ] Very long page names or event titles do not break layout
- [ ] Hero with zero images shows an "Add your first image" prompt

---

## Accessibility

- [ ] Tabs are navigable via keyboard (arrow keys between tabs, Enter/Space to select)
- [ ] Tab panels use `role="tabpanel"` with proper `aria-labelledby`
- [ ] Form fields have associated labels
- [ ] Confirmation modals trap focus and are dismissable with Escape
- [ ] Status badges include accessible text (not color-only)
- [ ] Image reorder controls have descriptive `aria-label` (e.g., "Move image up")

---

## Responsive Behavior

- [ ] Tabs stack or scroll horizontally on narrow screens
- [ ] Event list adapts from table to card layout on mobile
- [ ] Page editor form fields are full-width on mobile
- [ ] Image management area wraps images on smaller screens
