# Fort Collins Trolley — Full Implementation Instructions

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

## Testing

Each section in `product-plan/sections/` may include a `tests.md` file with UI behavior test specs. These describe **what** to test (user-facing behavior), not **how**. Adapt them to your testing framework. For best results, read the test specs before implementing each section and write tests alongside your implementation.

---

## Product Overview

### Fort Collins Trolley

A web application for the Fort Collins Municipal Railway Society that serves as both an attractive public-facing website for trolley events, schedules, and services, and a membership and volunteer management platform for administrators and members — powered by Supabase for authentication, data, and automated notifications.

### Planned Sections

1. **Public Website** — Hero landing page with configurable notices and photos, plus pages for Events, History, Schedules & Fares, Charters (request form), Support Us (donate + new member signup), and About.
2. **Authentication & Member Portal** — Supabase auth with role-based access, member login, profile view, membership renewal (annual and past-due), and messaging to admins/role managers.
3. **Membership Admin Dashboard** — Filterable and exportable member list, member detail view, volunteer role and certification tracking, a recent-activity feed, and a lead view scoped to subordinates.
4. **Content Management** — Admin-facing CMS for managing hero content, notices, events, and other public page content.
5. **Notifications & Automation** — Supabase Edge Functions for automated membership fee reminders, welcome emails, payment confirmations, certification alerts, and charter confirmations, plus configurable notification preferences.

### Product Entities

- **Member** — Contact info, mailing address, membership level, payment status, last login, volunteer role(s) with certification status.
- **MembershipLevel** — Depot ($20/year), Mountain Barn ($50/year), Howes Barn ($100/year), Lifetime ($500 one-time).
- **VolunteerRole** — Board Member, Motorman, Conductor, Depot Staff, Mechanic. Tracks certification status and lead designation.
- **Event** — Public-facing event with title, date, description, and photos.
- **CharterRequest** — Public submission with contact info, preferred/secondary dates, and event details.
- **ContentBlock** — Configurable piece of public website content managed through the CMS.
- **ActivityLog** — Timestamped record of membership data changes.
- **Payment** — Record of membership payment or donation (amount, method, date, status).
- **Message** — Communication between a member and an admin or role lead.
- **UserRole** — Access control: member, lead, cms_admin, membership_admin, super_admin.

### Design System

**Colors (Tailwind built-in palettes):**
- Primary: `emerald` — Buttons, links, key accents
- Secondary: `amber` — Tags, highlights, secondary elements
- Neutral: `stone` — Backgrounds, text, borders

**Typography (Google Fonts):**
- Heading: DM Sans
- Body: Inter
- Mono: IBM Plex Mono

See `product-plan/design-system/` for `tokens.css`, `tailwind-colors.md`, and `fonts.md`.

### Implementation Sequence

Build in milestones:

1. **Shell** — Design tokens + dual-shell architecture
2. **Public Website** — Landing page and content pages
3. **Authentication & Member Portal** — Login, profile, volunteer group, messaging
4. **Membership Admin Dashboard** — Dashboard, members, activity log, messaging, lead team
5. **Content Management** — Tabbed CMS with draft/publish workflow
6. **Notifications & Automation** — Configuration, delivery log, Supabase Edge Functions

---

## Milestone 1: Shell

### Goal

Set up the design system tokens and dual-shell architecture — a public top-navigation shell for the informational website, and an authenticated sidebar-plus-header shell for the member and admin portal.

### Design Tokens

**Colors (Tailwind built-in palettes):**
- **Primary:** `emerald` — Buttons, links, key accents, active navigation states
- **Secondary:** `amber` — Tags, highlights, secondary elements, hover accents
- **Neutral:** `stone` — Backgrounds, text, borders, cards

**Typography (Google Fonts):**
- **Heading:** DM Sans — Page titles, section headings, card titles, navigation items
- **Body:** Inter — Paragraphs, form labels, table content, descriptions, general UI text
- **Mono:** IBM Plex Mono — Code snippets, technical identifiers, monospaced content

**Reference files:**
- `product-plan/design-system/tokens.css` — CSS custom properties
- `product-plan/design-system/tailwind-colors.md` — Color usage examples with dark mode variants
- `product-plan/design-system/fonts.md` — Google Fonts import snippet and weight usage

### Application Shell

Copy and integrate the components from `product-plan/shell/components/`:

| Component | Purpose |
|-----------|---------|
| **AppShell.tsx** | Dual-mode layout — renders the public top-nav shell or the portal sidebar+header shell based on authentication state and current route |
| **MainNav.tsx** | Public navigation bar with logo, text links, and a "Member Login" button |
| **Sidebar.tsx** | Portal sidebar with icon navigation, responsive collapse (full → icons-only → hamburger drawer) |
| **UserMenu.tsx** | Avatar dropdown (initials fallback) with profile link and logout action |

### Navigation to Wire Up

**Public Shell (Top Navigation):**

| Label | Route |
|-------|-------|
| Events | `/events` |
| History | `/history` |
| Schedules & Fares | `/schedules` |
| Charters | `/charters` |
| Support Us | `/support` |
| About | `/about` |
| Member Login (button) | `/login` |

Logo click navigates to `/` (home / landing page).

**Portal Shell (Sidebar Navigation):**

Navigation items are role-based. Show items according to the authenticated user's role(s):

*All Members:*
| Label | Route |
|-------|-------|
| My Profile | `/portal/profile` |
| My Volunteer Group | `/portal/volunteer-group` |
| Messages | `/portal/messages` |

*Leads (in addition to member items):*
| Label | Route |
|-------|-------|
| My Team | `/portal/team` |

*CMS Admins (content only):*
| Label | Route |
|-------|-------|
| Content Management | `/portal/content` |

*Membership Admins (membership management, no content):*
| Label | Route |
|-------|-------|
| Dashboard | `/portal/dashboard` |
| Members | `/portal/members` |
| Messages | `/portal/messages` |
| Activity Log | `/portal/activity` |
| Notifications | `/portal/notifications` |

*Super Admins (all navigation):*
| Label | Route |
|-------|-------|
| Dashboard | `/portal/dashboard` |
| Members | `/portal/members` |
| Messages | `/portal/messages` |
| Activity Log | `/portal/activity` |
| Content Management | `/portal/content` |
| Notifications | `/portal/notifications` |
| Settings | `/portal/settings` |

### Responsive Behavior

- **Desktop (lg+):** Full sidebar visible in portal; full top nav on public site
- **Tablet (md):** Sidebar collapses to icons-only (64px) in portal; top nav items remain visible
- **Mobile (< md):** Both shells collapse navigation into a hamburger menu with a slide-out drawer

### Design Notes

- `emerald-600` for active/primary actions, `amber-500` for hover highlights and secondary accents, `stone` for all neutral surfaces
- Icons from `lucide-react`, stroke width 1.5, sized at `w-5 h-5` in navigation
- All components support light and dark mode via Tailwind `dark:` variants
- The public shell has a transparent-to-solid nav bar transition on the hero landing page (optional enhancement)

### Done When

- [ ] Design tokens are configured (colors, fonts loaded, Tailwind set up)
- [ ] Shell renders and switches between public and portal modes
- [ ] All navigation links route correctly
- [ ] Role-based sidebar items show/hide appropriately
- [ ] User menu opens, shows profile link and logout
- [ ] Responsive behavior works across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly

---

## Milestone 2: Public Website

### Goal

Build the public-facing landing page and content pages that visitors see before logging in.

### Overview

Visitors can browse the hero landing page, events, history, schedules & fares, submit charter requests, sign up for memberships, donate, and learn about the organization. All pages render inside the public shell (top navigation from Milestone 1).

### Components

Copy and integrate the components from `product-plan/sections/public-website/components/`:

| Component | Purpose |
|-----------|---------|
| **HeroSection** | Configurable hero with rotating images, headline/subtitle, CTA buttons, and an optional notice banner |
| **InfoCards** | Feature highlight cards displayed below the hero |
| **EventsPreview** | Upcoming events summary for the landing page |
| **LandingPage** | Full landing page composing HeroSection, InfoCards, and EventsPreview |
| **EventsPage** | Full events listing with date badges, photos, and details |
| **SchedulesFares** | Operating hours, fare table, and schedule information |
| **ChartersPage** | Charter information with a request modal form |
| **SupportUsPage** | Membership tiers, signup modal, and donation links (Venmo/PayPal) |
| **HistoryPage** | Organization history and heritage information |
| **AboutPage** | Organization info, awards, officers/directors, and contact details |

**Reference files:**
- `product-plan/sections/public-website/types.ts` — TypeScript interfaces
- `product-plan/sections/public-website/sample-data.json` — Sample data

### Key Functionality

- **Hero section:** Rotating images with configurable headline, subtitle, CTA buttons, and a dismissible notice banner
- **Events listing:** Date badges, event photos, descriptions; clicking an event shows full details
- **Schedules & Fares:** Operating hours by season and a fare table with all ticket types
- **Charter request:** Modal form collecting name, email, day-of-event phone, preferred/secondary dates & times, and a message
- **Membership signup:** Tier comparison (Depot $20, Mountain Barn $50, Howes Barn $100, Lifetime $500), signup modal with contact info and payment method selection
- **Donation links:** Direct links to Venmo and PayPal
- **About page:** Organization description, awards, officers/directors list, and contact information

### Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onNavigate` | User clicks an internal link |
| `onLogin` | User clicks "Member Login" |
| `onSubmitCharterRequest` | Charter request form is submitted |
| `onSubmitMemberSignup` | Membership signup form is submitted |
| `onDonate` | User clicks a Venmo or PayPal donation link |

### User Flows

1. **Browse landing page** — Visitor arrives at `/`, sees the hero section with rotating images, info cards highlighting key features, and a preview of upcoming events
2. **View events** — Navigate to `/events`, browse the events list, click an event to expand details
3. **Check schedules** — Navigate to `/schedules`, view operating hours by season and the fare table
4. **Request a charter** — Navigate to `/charters`, click "Request a Charter", fill out the modal form, submit
5. **Join as a member** — Navigate to `/support`, view tier comparison, click "Join", fill out signup modal, submit
6. **Donate** — Navigate to `/support`, click the Venmo or PayPal link
7. **Learn about the organization** — Navigate to `/about`, read organization info, awards, officers, and contact details

### Done When

- [ ] All public pages render with data from the backend
- [ ] Hero section displays with rotating images, headline, subtitle, and CTA buttons
- [ ] Events page shows events with date badges and photos
- [ ] Schedules & Fares page shows operating hours and fare table
- [ ] Charter request modal opens, validates inputs, and submits
- [ ] Membership signup modal shows tier comparison, collects info, and submits
- [ ] Donation links work
- [ ] About page shows org info, awards, officers, and contact
- [ ] All pages are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly

---

## Milestone 3: Authentication & Member Portal

### Goal

Implement Supabase authentication and the member self-service portal.

### Overview

Members log in with email/password or magic link, view and edit their profile, renew their membership (including past-due), see their volunteer group roster with certification statuses, and message admins or their volunteer role lead. New users can self-register (pending admin approval). All portal pages render inside the portal shell (sidebar + header from Milestone 1).

### Components

Copy and integrate the components from `product-plan/sections/authentication-and-member-portal/components/`:

| Component | Purpose |
|-----------|---------|
| **LoginPage** | Email/password login, magic link option, registration link, forgot password |
| **ProfilePage** | Member profile with editable contact info, membership details, payment history, renewal, and password change |
| **VolunteerGroupPage** | Volunteer group roster showing members in the same role, certification statuses, and lead contact info |
| **MessagesPage** | Messaging interface for communicating with admins or role leads |

**Reference files:**
- `product-plan/sections/authentication-and-member-portal/types.ts` — TypeScript interfaces
- `product-plan/sections/authentication-and-member-portal/sample-data.json` — Sample data

### Key Functionality

- **Login:** Email/password authentication or passwordless magic link via Supabase Auth
- **Registration:** Self-service signup; new accounts set to "pending" until approved by a Membership Admin
- **Forgot password:** Password reset flow via email
- **Profile:** Displays membership level, payment status, volunteer roles, and contact info; editable contact details and password change
- **Membership renewal:** Renew annual or past-due membership, select tier and payment method
- **Upgrade membership:** Upgrade to a higher tier
- **Volunteer group:** Roster of all members in the same volunteer role, certification statuses, lead contact info
- **Messaging:** Compose and send messages to admins or role leads; view conversation history

### Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onLogin` | User submits email/password credentials |
| `onMagicLink` | User requests a magic link |
| `onRegister` | User submits the registration form |
| `onLogout` | User clicks logout |
| `onUpdateProfile` | User saves contact info changes |
| `onChangePassword` | User submits a new password |
| `onRenew` | User initiates membership renewal |
| `onUpgradeMembership` | User upgrades to a higher tier |
| `onSendMessage` | User sends a message |
| `onForgotPassword` | User requests a password reset |

### User Flows

1. **Login** — Navigate to `/login`, enter email and password (or request magic link), submit, redirect to portal
2. **Register** — Click "Register" on login page, fill form, submit, see "pending approval" confirmation
3. **Forgot password** — Click "Forgot password", enter email, receive reset link, set new password
4. **View profile** — Navigate to `/portal/profile`, see membership info, volunteer roles, payment history
5. **Edit profile** — Click edit, update contact info, save
6. **Renew membership** — Click "Renew", select tier, choose payment method, submit
7. **View volunteer group** — Navigate to `/portal/volunteer-group`, see roster and certification statuses
8. **Message lead or admin** — Navigate to `/portal/messages`, compose, select recipient, send

### Done When

- [ ] Supabase Auth is configured (email/password and magic link)
- [ ] Login page renders with both auth options
- [ ] Registration creates a user with "pending" status
- [ ] Forgot password flow works
- [ ] Profile displays membership info and allows editing
- [ ] Password change works
- [ ] Membership renewal flow works
- [ ] Volunteer group page shows roster with certifications
- [ ] Messages page allows composing and sending
- [ ] Role-based access is enforced
- [ ] Responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly

---

## Milestone 4: Membership Admin Dashboard

### Goal

Build the admin tools for membership management, available to Membership Admin and Super Admin roles.

### Overview

Membership Admins manage members through a dashboard with key statistics, a filterable and sortable member list, detailed member editing, chronological activity tracking, admin messaging, and a lead team view with certification controls. All pages render inside the portal shell.

### Components

Copy and integrate the components from `product-plan/sections/membership-admin-dashboard/components/`:

| Component | Purpose |
|-----------|---------|
| **Dashboard** | Overview with 4 stat cards and recent activity feed |
| **MemberList** | Searchable, filterable, sortable member table with CSV export |
| **MemberDetail** | Full member record editing — personal info, membership, volunteer roles, payment history |
| **ActivityLog** | Chronological log of all membership data changes |
| **AdminMessages** | Admin messaging interface with compose modal |
| **LeadTeamView** | Lead-specific view showing subordinates with certification controls |

**Reference files:**
- `product-plan/sections/membership-admin-dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/membership-admin-dashboard/sample-data.json` — Sample data

### Key Functionality

- **Dashboard:** 4 stat cards (total members, active, pending renewal, new this month) + recent activity feed with "View all" link
- **Member list:** Search by name/email; filter by level, role, cert status, payment status; sort by any column; CSV export
- **Member detail:** Edit personal info, membership, volunteer roles (add/remove), payment history (mark received)
- **Activity log:** Chronological entries with timestamps and acting admin
- **Admin messaging:** View threads, compose new messages, mark as read
- **Lead team view:** Subordinates in the same role, individual recertification, bulk reset to "needs recertification"

### Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onViewMember` | Admin clicks a member row |
| `onUpdateMember` | Admin saves member edits |
| `onAddVolunteerRole` | Admin assigns a role |
| `onRemoveVolunteerRole` | Admin removes a role |
| `onMarkPaymentReceived` | Admin marks payment received |
| `onExportCsv` | Admin clicks "Export CSV" |
| `onSendMessage` | Admin composes and sends a message |
| `onMarkMessageRead` | Admin reads a message |
| `onRecertifyMember` | Lead recertifies a subordinate |
| `onBulkResetCertification` | Lead resets all subordinates |

### User Flows

1. **View dashboard** — See stats and recent activity, click "View all" for full log
2. **Browse members** — Search/filter the list, click a row for detail
3. **Edit a member** — Update fields, save
4. **Add/remove volunteer role** — On member detail, add or remove roles
5. **Mark payment received** — On member detail, mark a payment
6. **Export filtered list** — Apply filters, click "Export CSV"
7. **Compose a message** — Click compose, select recipient, write, send
8. **Lead: view team** — See subordinates and certification statuses
9. **Lead: recertify** — Recertify individually or bulk reset

### Done When

- [ ] Dashboard shows stats and activity feed
- [ ] Member list is searchable, filterable, sortable
- [ ] CSV export works
- [ ] Member detail view allows full editing
- [ ] Volunteer role add/remove works
- [ ] Payment marking works
- [ ] Activity log shows chronological entries
- [ ] Admin messaging works
- [ ] Lead team view shows subordinates with cert controls
- [ ] Role-based access enforced
- [ ] Responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly

---

## Milestone 5: Content Management

### Goal

Build the admin CMS for managing public website content, available to CMS Admin and Super Admin roles.

### Overview

CMS and Super Admins manage the hero section, events, and page content through a tabbed interface with a draft/publish workflow. All content management happens inside the portal shell.

### Components

Copy and integrate the component from `product-plan/sections/content-management/components/`:

| Component | Purpose |
|-----------|---------|
| **ContentManagement** | Single tabbed component with Hero & Banner, Events, and Pages tabs — includes all CRUD and draft/publish workflow |

**Reference files:**
- `product-plan/sections/content-management/types.ts` — TypeScript interfaces
- `product-plan/sections/content-management/sample-data.json` — Sample data

### Key Functionality

**Hero & Banner Tab:**
- Edit hero images (add, remove, reorder)
- Update headline, subtitle, CTA buttons
- Toggle and edit notice banner
- Save as draft or publish; status badge (Draft amber, Published emerald)

**Events Tab:**
- Event list with photo, title, date, status badge, actions
- Add Event form: title, date, time, description, excerpt, photo
- Edit, publish, unpublish, delete events
- Confirmation modal for destructive actions

**Pages Tab:**
- Editable public pages: Schedules & Fares, Charters, Support Us, About, History
- Content block editor grouped by section
- Save as draft or publish
- Toast notifications on success

### Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onSaveHeroDraft` | Admin saves hero as draft |
| `onPublishHero` | Admin publishes hero |
| `onAddHeroImage` | Admin adds hero image |
| `onRemoveHeroImage` | Admin removes hero image |
| `onReorderHeroImages` | Admin reorders images |
| `onCreateEvent` | Admin creates event |
| `onUpdateEvent` | Admin updates event |
| `onDeleteEvent` | Admin deletes event |
| `onPublishEvent` | Admin publishes event |
| `onUnpublishEvent` | Admin unpublishes event |
| `onSavePageDraft` | Admin saves page draft |
| `onPublishPage` | Admin publishes page |
| `onUnpublishPage` | Admin unpublishes page |

### User Flows

1. **Edit hero** — Update headline/subtitle, adjust CTAs, save draft, publish
2. **Manage hero images** — Add, remove, reorder images
3. **Edit notice banner** — Toggle on, enter text/link, save, publish
4. **Create an event** — Fill form, save as draft or publish
5. **Edit/publish/unpublish an event** — Modify fields or change status
6. **Delete an event** — Confirm in modal, event removed
7. **Edit a page** — Modify content blocks, save draft or publish
8. **Unpublish a page** — Confirm, reverts to draft

### Done When

- [ ] All three tabs functional
- [ ] Hero editing works (images, headline, CTAs, banner)
- [ ] Events CRUD works
- [ ] Draft/publish workflow works on all content types
- [ ] Status badges show correctly
- [ ] Page editing works
- [ ] Confirmation modals for destructive actions
- [ ] Toast notifications on success
- [ ] Role-based access enforced
- [ ] Responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly

---

## Milestone 6: Notifications & Automation

### Goal

Build the notification configuration and monitoring interface, and set up automated notifications via Supabase Edge Functions. Available to Membership Admin and Super Admin roles.

### Overview

Membership Admins configure notification types, view delivery history, and manually trigger renewal reminders to specific members. Automated notifications are delivered via Supabase Edge Functions. The interface has two tabs: Configuration and Log. All content renders inside the portal shell.

### Components

Copy and integrate the component from `product-plan/sections/notifications-and-automation/components/`:

| Component | Purpose |
|-----------|---------|
| **NotificationsPage** | Two tabs: Configuration (toggleable notification type cards) and Log (filterable delivery history table) |

**Reference files:**
- `product-plan/sections/notifications-and-automation/types.ts` — TypeScript interfaces
- `product-plan/sections/notifications-and-automation/sample-data.json` — Sample data

### Key Functionality

**Configuration Tab — Five notification types:**

| Type | Description |
|------|-------------|
| **Renewal Reminders** | Automated at 30 days, 7 days, and day-of before expiry. Fixed schedule. Manual trigger button. |
| **Welcome Email** | Sent when a new member is approved |
| **Payment Confirmation** | Sent when a payment is received |
| **Certification Alert** | Sent when certification status changes |
| **Charter Confirmation** | Sent when a charter request is received |

Each card has a name, description, and on/off toggle. Renewal Reminders includes a "Send Manual Reminder" button with a member search modal.

**Log Tab:**

| Column | Description |
|--------|-------------|
| Type | Notification type |
| Recipient | Member name and email |
| Sent At | Timestamp |
| Status | Badge: Delivered (emerald), Sent (amber), Failed (red) |

Filters: type dropdown, date range pickers.

**Supabase Edge Functions:**
- Renewal reminder: daily cron, checks expiry dates, sends at 30-day / 7-day / day-of thresholds
- Event-triggered: fire on new member approved, payment received, cert status changed, charter request submitted

### Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onToggle` | Admin enables/disables a notification type |
| `onSendManualReminder` | Admin sends reminder to selected members |

### User Flows

1. **View configuration** — See all 5 notification type cards with on/off status
2. **Toggle a type** — Click toggle to enable or disable
3. **Send manual reminder** — Click button, search members, select, send
4. **View delivery log** — See table of sent notifications
5. **Filter the log** — Filter by type and/or date range

### Done When

- [ ] Configuration tab shows all 5 types with working toggles
- [ ] Manual reminder modal works (search, select, send)
- [ ] Log tab displays delivery history with status badges
- [ ] Log filters work (type and date range)
- [ ] Supabase Edge Functions configured for automated delivery
- [ ] Renewal reminder runs on schedule at correct thresholds
- [ ] Event-triggered functions fire on appropriate database changes
- [ ] Role-based access enforced
- [ ] Responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
