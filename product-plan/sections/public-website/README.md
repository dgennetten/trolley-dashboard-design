# Public Website

## Overview

Public-facing portion of the Fort Collins Trolley web application. Visitors can browse upcoming events, the trolley's history, schedules and fares, charter information, membership and donation options, and general about information — all without authentication. The section delivers a heritage editorial aesthetic using emerald/amber/stone design tokens, DM Sans headings, and Inter body text.

## User Flows

1. **Landing Page** — Full-width hero with rotating images, headline, CTA buttons, and an optional notice banner. Below the hero: info cards highlighting key offerings and an events preview showing the next few upcoming events.
2. **Events Page** — Chronological listing of upcoming events, each displayed as a card with date badge, title, description, and optional photo.
3. **History Page** — Static heritage content about the Fort Collins Municipal Railway and its restoration.
4. **Schedules & Fares Page** — Operating season, days, hours, route, and a fare table broken down by category (adults, children, seniors, etc.).
5. **Charters Page** — Charter information with policies, plus a "Request a Charter" modal form collecting contact info, preferred/secondary dates and times, and a message.
6. **Support Us Page** — Support options (donate, volunteer, spread the word), a membership signup modal with tier selection and payment method, and external donation links for Venmo/PayPal.
7. **About Page** — Organization description, mission points, volunteer roles, recognition, officers/directors, newsletters, and contact information.

## Design Decisions

- **Heritage editorial aesthetic** — Warm, inviting tone reflecting the trolley's historic character
- **Emerald/amber/stone tokens** — Emerald for primary actions, amber for highlights and accents, stone for neutral backgrounds and text
- **DM Sans headings, Inter body** — Clean, modern typography that pairs well with the heritage theme
- **Full-width hero with rotating images** — Prominent visual showcase of the trolley experience; images cycle automatically
- **Modal forms** — Charter request and membership signup use modals to keep the user on the current page rather than navigating away
- **Responsive layout** — Full-width hero and stacked cards on mobile, multi-column grid on larger screens

## Components

| Component | Description |
|-----------|-------------|
| `HeroSection` | Full-width hero banner with rotating images, headline, subtitle, CTA buttons, and optional notice banner |
| `InfoCards` | Grid of cards highlighting key offerings (events, charters, membership, etc.) |
| `EventsPreview` | Compact preview of upcoming events for the landing page |
| `LandingPage` | Composes HeroSection, InfoCards, and EventsPreview into the complete landing experience |
| `EventsPage` | Full events listing with date badges and event cards |
| `HistoryPage` | Static heritage content about the trolley's history |
| `SchedulesFares` | Schedule details and fare table |
| `ChartersPage` | Charter information, policies, and charter request modal form |
| `SupportUsPage` | Support options grid, membership signup modal with tier selection and payment method, donation links |
| `AboutPage` | Organization info, mission, officers, newsletters, contact details |

## Callback Props

| Callback | Type Signature | Triggered When |
|----------|---------------|----------------|
| `onNavigate` | `(href: string) => void` | User clicks an internal navigation link |
| `onLogin` | `() => void` | User clicks "Member Login" |
| `onSubmitCharterRequest` | `(data: CharterRequestFormData) => void` | User submits the charter request modal form |
| `onSubmitMemberSignup` | `(data: MemberSignupFormData) => void` | User submits the membership signup modal form |
| `onDonate` | `(method: PaymentMethod) => void` | User clicks a Venmo or PayPal donation link |

## Data Dependencies

See `types.ts` for full interface definitions. Key entities:

- `HeroContent` — Hero images, headline, subtitle, CTAs, notice banner
- `Event` — Event title, date, description, photo
- `ScheduleInfo` — Season, operating days, hours, route, fare tiers
- `CharterInfo` / `CharterRequestFormData` — Charter details and form data
- `MembershipLevel` / `MemberSignupFormData` — Membership tiers and signup form data
- `AboutContent` — Organization description, officers, contact info
- `PaymentOptions` — Venmo/PayPal URLs, check mailing info
