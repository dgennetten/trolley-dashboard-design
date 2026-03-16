# Application Shell

## Overview

The Fort Collins Trolley uses a dual-shell architecture:

1. **Public Shell** — Top navigation bar for the public-facing website with logo, nav links, and a "Member Login" button
2. **Portal Shell** — Sidebar + header layout for the authenticated member/admin portal

Both shells share the same design tokens (emerald primary, amber secondary, stone neutrals) and responsive patterns.

## Components

- **`AppShell.tsx`** — Main layout wrapper that switches between public (top nav) and portal (sidebar + header) variants based on the `variant` prop
- **`MainNav.tsx`** — Public-facing sticky top navigation with logo, desktop nav links, mobile hamburger dropdown, and "Member Login" button
- **`Sidebar.tsx`** — Portal sidebar with logo, icon-based navigation items, responsive collapse (icons-only on tablet, slide-out drawer on mobile)
- **`UserMenu.tsx`** — User avatar/initials dropdown with profile link and logout action
- **`index.ts`** — Barrel export

## Navigation Structure

### Public Shell
- Events → /events
- History → /history
- Schedules & Fares → /schedules
- Charters → /charters
- Support Us → /support
- About → /about
- Member Login (button) → /login

### Portal Shell (role-based)

**All Members:** My Profile, My Volunteer Group, Messages
**Leads:** + My Team
**CMS Admins:** Content Management
**Membership Admins:** Dashboard, Members, Messages, Activity Log, Notifications
**Super Admins:** All navigation items + Settings

## Responsive Behavior

- **Desktop (lg+):** Full sidebar visible in portal; full top nav on public site
- **Tablet (md):** Sidebar collapses to icons-only (64px); top nav items remain visible
- **Mobile (< md):** Both shells use a hamburger menu with slide-out drawer

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onNavigate` | User clicks a nav item or logo |
| `onLogin` | User clicks "Member Login" (public shell) |
| `onLogout` | User clicks "Log Out" in user menu |
