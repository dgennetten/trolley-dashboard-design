# Milestone 2: Public Website

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

Build the public-facing landing page and content pages that visitors see before logging in.

## Overview

Visitors can browse the hero landing page, events, history, schedules & fares, submit charter requests, sign up for memberships, donate, and learn about the organization. All pages render inside the public shell (top navigation from Milestone 1).

## Components

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
- `product-plan/sections/public-website/types.ts` — TypeScript interfaces for all component props
- `product-plan/sections/public-website/sample-data.json` — Sample data matching the expected prop shapes

## Key Functionality

- **Hero section:** Rotating images with configurable headline, subtitle, CTA buttons, and a dismissible notice banner
- **Events listing:** Date badges, event photos, descriptions; clicking an event shows full details
- **Schedules & Fares:** Operating hours by season and a fare table with all ticket types
- **Charter request:** Modal form collecting name, email, day-of-event phone, preferred/secondary dates & times, and a message
- **Membership signup:** Tier comparison (Depot $20, Mountain Barn $50, Howes Barn $100, Lifetime $500), signup modal with contact info and payment method selection (Venmo/PayPal/check)
- **Donation links:** Direct links to Venmo and PayPal
- **About page:** Organization description, awards, officers/directors list, and contact information

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onNavigate` | User clicks an internal link |
| `onLogin` | User clicks "Member Login" |
| `onSubmitCharterRequest` | Charter request form is submitted |
| `onSubmitMemberSignup` | Membership signup form is submitted |
| `onDonate` | User clicks a Venmo or PayPal donation link |

## User Flows

1. **Browse landing page** — Visitor arrives at `/`, sees the hero section with rotating images, info cards highlighting key features, and a preview of upcoming events
2. **View events** — Navigate to `/events`, browse the events list, click an event to expand details
3. **Check schedules** — Navigate to `/schedules`, view operating hours by season and the fare table
4. **Request a charter** — Navigate to `/charters`, click "Request a Charter", fill out the modal form (name, email, phone, dates, message), submit
5. **Join as a member** — Navigate to `/support`, view tier comparison, click "Join", fill out signup modal (contact info, tier selection, payment method), submit
6. **Donate** — Navigate to `/support`, click the Venmo or PayPal link
7. **Learn about the organization** — Navigate to `/about`, read organization info, awards, officers, and contact details

## Done When

- [ ] All public pages render with data from the backend (or sample data during development)
- [ ] Hero section displays with rotating images, headline, subtitle, and CTA buttons
- [ ] Events page shows a list of events with date badges and photos
- [ ] Schedules & Fares page shows operating hours and fare table
- [ ] Charter request modal opens, validates inputs, and submits
- [ ] Membership signup modal shows tier comparison, collects info, and submits
- [ ] Donation links work (Venmo/PayPal)
- [ ] About page shows org info, awards, officers, and contact
- [ ] All pages are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
