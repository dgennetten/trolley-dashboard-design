# Milestone 1: Shell

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

Set up the design system tokens and dual-shell architecture — a public top-navigation shell for the informational website, and an authenticated sidebar-plus-header shell for the member and admin portal.

## Design Tokens

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

## Application Shell

Copy and integrate the components from `product-plan/shell/components/`:

| Component | Purpose |
|-----------|---------|
| **AppShell.tsx** | Dual-mode layout — renders the public top-nav shell or the portal sidebar+header shell based on authentication state and current route |
| **MainNav.tsx** | Public navigation bar with logo, text links, and a "Member Login" button |
| **Sidebar.tsx** | Portal sidebar with icon navigation, responsive collapse (full → icons-only → hamburger drawer) |
| **UserMenu.tsx** | Avatar dropdown (initials fallback) with profile link and logout action |

## Navigation to Wire Up

### Public Shell (Top Navigation)

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

### Portal Shell (Sidebar Navigation)

Navigation items are role-based. Show items according to the authenticated user's role(s):

**All Members:**
| Label | Route |
|-------|-------|
| My Profile | `/portal/profile` |
| My Volunteer Group | `/portal/volunteer-group` |
| Messages | `/portal/messages` |

**Leads** (in addition to member items):
| Label | Route |
|-------|-------|
| My Team | `/portal/team` |

**CMS Admins** (content only):
| Label | Route |
|-------|-------|
| Content Management | `/portal/content` |

**Membership Admins** (membership management, no content):
| Label | Route |
|-------|-------|
| Dashboard | `/portal/dashboard` |
| Members | `/portal/members` |
| Messages | `/portal/messages` |
| Activity Log | `/portal/activity` |
| Notifications | `/portal/notifications` |

**Super Admins** (all navigation):
| Label | Route |
|-------|-------|
| Dashboard | `/portal/dashboard` |
| Members | `/portal/members` |
| Messages | `/portal/messages` |
| Activity Log | `/portal/activity` |
| Content Management | `/portal/content` |
| Notifications | `/portal/notifications` |
| Settings | `/portal/settings` |

## Responsive Behavior

- **Desktop (lg+):** Full sidebar visible in portal; full top nav on public site
- **Tablet (md):** Sidebar collapses to icons-only (64px) in portal; top nav items remain visible
- **Mobile (< md):** Both shells collapse navigation into a hamburger menu with a slide-out drawer

## Design Notes

- `emerald-600` for active/primary actions, `amber-500` for hover highlights and secondary accents, `stone` for all neutral surfaces
- Icons from `lucide-react`, stroke width 1.5, sized at `w-5 h-5` in navigation
- All components support light and dark mode via Tailwind `dark:` variants
- The public shell has a transparent-to-solid nav bar transition on the hero landing page (optional enhancement)

## Done When

- [ ] Design tokens are configured (colors, fonts loaded, Tailwind set up)
- [ ] Shell renders and switches between public and portal modes
- [ ] All navigation links route correctly
- [ ] Role-based sidebar items show/hide appropriately
- [ ] User menu opens, shows profile link and logout
- [ ] Responsive behavior works across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
