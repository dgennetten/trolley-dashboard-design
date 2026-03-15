# Application Shell Specification

## Overview
The Fort Collins Trolley application uses a dual-shell architecture: a public top-navigation shell for the informational website, and an authenticated sidebar-plus-header shell for the member and admin portal. Both shells share the same design tokens (emerald primary, amber secondary, stone neutrals) and responsive patterns.

## Navigation Structure

### Public Shell (Top Navigation)
- Logo (Fort Collins Trolley) → Home
- Events → /events
- History → /history
- Schedules & Fares → /schedules
- Charters → /charters
- Support Us → /support
- About → /about
- Member Login (button) → /login

### Portal Shell (Sidebar Navigation)

#### All Members
- My Profile → /portal/profile
- Messages → /portal/messages

#### Supervisors (in addition to member items)
- My Team → /portal/team

#### Admins (full navigation)
- Dashboard → /portal/dashboard
- Members → /portal/members
- Activity Log → /portal/activity
- Content Management → /portal/content
- Notifications → /portal/notifications

## User Menu
Located in the portal header bar, top-right corner. Displays user avatar (initials fallback), display name, and a dropdown with: My Profile, Settings (future), and Logout.

## Layout Pattern

### Public Shell
Top navigation bar with logo on the left and nav items on the right. Full-width content area below. The nav bar is sticky at the top on scroll. The "Member Login" button is visually distinct (emerald filled button) from the text nav links.

### Portal Shell
Fixed left sidebar (256px wide) with the Fort Collins Trolley logo at the top, navigation items below, and a slim horizontal header bar across the content area containing the page title area and user menu on the right. The main content area fills the remaining space with its own scroll context.

## Responsive Behavior
- **Desktop (lg+):** Full sidebar visible in portal; full top nav visible on public site
- **Tablet (md):** Sidebar collapses to icons-only (64px) in portal; top nav items remain visible on public site
- **Mobile (< md):** Both shells collapse navigation into a hamburger menu with a slide-out drawer from the left

## Design Notes
- Design tokens: emerald-600 for active/primary actions, amber-500 for hover highlights and secondary accents, stone for all neutral surfaces
- Typography: DM Sans for nav items and headings, Inter for body/UI text
- All components support light and dark mode via Tailwind `dark:` variants
- Icons from lucide-react, stroke width 1.5, sized consistently at w-5 h-5 in navigation
- The public shell has a transparent-to-solid nav bar transition on the hero landing page (optional enhancement)
