# Fort Collins Trolley — Product Overview

## Summary

A web application for the Fort Collins Municipal Railway Society that serves as both an attractive public-facing website for trolley events, schedules, and services, and a membership and volunteer management platform for administrators and members — powered by Supabase for authentication, data, and automated notifications.

## Planned Sections

1. **Public Website** — Hero landing page with configurable notices and photos, plus pages for Events, History, Schedules & Fares, Charters (request form), Support Us (donate + new member signup), and About.
2. **Authentication & Member Portal** — Supabase auth with role-based access, member login, profile view, membership renewal (annual and past-due), and messaging to admins/role managers.
3. **Membership Admin Dashboard** — Filterable and exportable member list, member detail view, volunteer role and certification tracking, a recent-activity feed, and a lead view that gives each lead an admin dashboard scoped to their subordinates in the same role category.
4. **Content Management** — Admin-facing CMS for managing hero content, notices, events (CRUD with dates/descriptions/photos), and other public page content.
5. **Notifications & Automation** — Supabase Edge Functions for automated membership fee reminders, welcome emails, payment confirmations, certification alerts, and charter request confirmations, plus configurable notification preferences.

## Product Entities

- **Member** — A person who has joined the Society. Holds contact information, mailing address, membership level, payment status, last login timestamp, and optional volunteer role(s) with certification status.
- **MembershipLevel** — A tier of membership: Depot ($20/year), Mountain Barn ($50/year), Howes Barn ($100/year), and Lifetime ($500 one-time).
- **VolunteerRole** — A role a member can hold (Board Member, Motorman, Conductor, Depot Staff, Mechanic). Tracks certification status and whether the member serves as a lead.
- **Event** — A public-facing event managed through the CMS with title, date, description, and photos.
- **CharterRequest** — A public submission requesting a private trolley charter with contact info, preferred/secondary dates, and event details.
- **ContentBlock** — A configurable piece of public website content (hero images, notices, page sections) managed through the CMS.
- **ActivityLog** — A timestamped record of membership data changes displayed in the admin activity feed.
- **Payment** — A record of a membership payment or donation tracking amount, method, date, and status.
- **Message** — A communication between a member and an admin or role lead.
- **UserRole** — Access control role: member, lead, cms_admin, membership_admin, or super_admin.

## Design System

**Colors:**
- Primary: `emerald` — Buttons, links, key accents
- Secondary: `amber` — Tags, highlights, secondary elements
- Neutral: `stone` — Backgrounds, text, borders

**Typography:**
- Heading: DM Sans
- Body: Inter
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and dual-shell architecture (public top nav + authenticated sidebar portal)
2. **Public Website** — Landing page, Events, History, Schedules & Fares, Charters, Support Us, About
3. **Authentication & Member Portal** — Login/register, member profile, volunteer group view, messaging
4. **Membership Admin Dashboard** — Dashboard overview, member list, member detail, activity log, admin messages, lead team view
5. **Content Management** — Tabbed CMS for hero/banner, events, and pages with draft/publish workflow
6. **Notifications & Automation** — Notification configuration and delivery log with manual trigger capability

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
