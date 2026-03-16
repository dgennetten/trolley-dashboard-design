# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **HeroContent** — Hero section configuration with images, headline, CTA buttons, and notice banner (used in: public-website, content-management)
- **Event / EventItem** — A public-facing event with title, date, description, and photo (used in: public-website, content-management)
- **ScheduleInfo** — Operating hours, route, and fare tiers (used in: public-website)
- **CharterInfo / CharterRequestFormData** — Charter information and request form data (used in: public-website)
- **MembershipLevel** — Membership tier with price and benefits (used in: public-website, authentication-and-member-portal)
- **MemberProfile / MemberListItem** — Member data with contact info, membership, volunteer roles (used in: authentication-and-member-portal, membership-admin-dashboard)
- **VolunteerGroup** — A volunteer role group with lead contact and member roster (used in: authentication-and-member-portal)
- **Message / AdminMessage** — Communication between members and admins (used in: authentication-and-member-portal, membership-admin-dashboard)
- **ContentBlock / PageContent** — CMS-managed content blocks and pages (used in: content-management)
- **ActivityLogEntry** — Timestamped membership data change record (used in: membership-admin-dashboard)
- **DashboardStats** — Summary statistics for the admin dashboard (used in: membership-admin-dashboard)
- **LeadDashboard** — Lead-scoped team view with group stats and subordinates (used in: membership-admin-dashboard)
- **NotificationType** — Configurable notification category with toggle and schedule (used in: notifications-and-automation)
- **NotificationLogEntry** — Record of a sent notification with delivery status (used in: notifications-and-automation)

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/public-website/types.ts`
- `sections/authentication-and-member-portal/types.ts`
- `sections/content-management/types.ts`
- `sections/membership-admin-dashboard/types.ts`
- `sections/notifications-and-automation/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
