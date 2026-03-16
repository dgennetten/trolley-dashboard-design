# Milestone 4: Membership Admin Dashboard

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

Build the admin tools for membership management, available to Membership Admin and Super Admin roles.

## Overview

Membership Admins manage the organization's members through a dashboard with key statistics, a filterable and sortable member list, detailed member editing, chronological activity tracking, admin messaging, and a lead team view with certification controls. All pages render inside the portal shell (sidebar + header from Milestone 1).

## Components

Copy and integrate the components from `product-plan/sections/membership-admin-dashboard/components/`:

| Component | Purpose |
|-----------|---------|
| **Dashboard** | Overview with 4 stat cards (total members, active, pending renewal, new this month) and a recent activity feed |
| **MemberList** | Searchable, filterable, sortable member table with CSV export |
| **MemberDetail** | Full member record editing — personal info, membership, volunteer roles, payment history |
| **ActivityLog** | Chronological log of all membership data changes |
| **AdminMessages** | Admin messaging interface with compose modal |
| **LeadTeamView** | Lead-specific view showing subordinates with certification controls |

**Reference files:**
- `product-plan/sections/membership-admin-dashboard/types.ts` — TypeScript interfaces for all component props
- `product-plan/sections/membership-admin-dashboard/sample-data.json` — Sample data matching the expected prop shapes

## Key Functionality

- **Dashboard:** 4 stat cards showing total members, active members, pending renewals, and new members this month; a recent activity feed showing the latest membership changes with "View all" link to the full activity log
- **Member list:** Search by name or email; filter by membership level, volunteer role, certification status, and payment status; sort by any column; CSV export of the current filtered view
- **Member detail:** View and edit all member fields — personal info (name, email, phone, address), membership (level, status, dates), volunteer roles (add/remove roles, change certification status), and payment history (mark payment received)
- **Activity log:** Chronological list of all changes to membership data (additions, edits, renewals, status changes) with timestamps and the admin who made the change
- **Admin messaging:** View message threads, compose new messages to specific members via a modal, mark messages as read
- **Lead team view:** Leads see only their subordinates (volunteers in the same role category); can mark individual members as recertified or bulk-reset all subordinates to "needs recertification" (typically at season start)

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onViewMember` | Admin clicks a member row in the list |
| `onUpdateMember` | Admin saves edits to a member record |
| `onAddVolunteerRole` | Admin assigns a volunteer role to a member |
| `onRemoveVolunteerRole` | Admin removes a volunteer role from a member |
| `onMarkPaymentReceived` | Admin marks a payment as received |
| `onExportCsv` | Admin clicks "Export CSV" |
| `onSendMessage` | Admin composes and sends a message |
| `onMarkMessageRead` | Admin opens/reads a message |
| `onRecertifyMember` | Lead marks a subordinate as recertified |
| `onBulkResetCertification` | Lead resets all subordinates to "needs recertification" |

## User Flows

1. **View dashboard** — Navigate to `/portal/dashboard`, see the 4 stat cards and recent activity feed, click "View all" to go to the full activity log
2. **Browse members** — Navigate to `/portal/members`, use search to find a member by name or email, apply filters (level, role, cert status, payment status), click a row to view the member's full record
3. **Edit a member** — On the member detail view, update fields (personal info, membership level, volunteer roles), save changes
4. **Add/remove volunteer role** — On the member detail view, add a new volunteer role or remove an existing one
5. **Mark payment received** — On the member detail view, find the payment in history, click "Mark received"
6. **Export filtered list** — On the member list, apply desired filters, click "Export CSV" to download
7. **Compose a message** — Navigate to `/portal/messages`, click "Compose", select a recipient member, write the message, send
8. **Read messages** — On the messages page, click a message thread to view, message is marked as read
9. **Lead: view team** — Navigate to `/portal/team`, see subordinates in your role category with their certification statuses
10. **Lead: recertify** — On the team view, click "Recertify" next to an individual member, or click "Reset All" to bulk-reset all subordinates to "needs recertification"

## Done When

- [ ] Dashboard shows 4 stat cards with live data and a recent activity feed
- [ ] Member list is searchable, filterable, and sortable
- [ ] CSV export works on the filtered member list
- [ ] Member detail view displays all member fields and allows editing
- [ ] Volunteer role add/remove works
- [ ] Payment marking works
- [ ] Activity log shows chronological entries with timestamps
- [ ] Admin messaging works (compose, send, read, mark as read)
- [ ] Lead team view shows only subordinates in the same role
- [ ] Individual recertification and bulk reset work
- [ ] Role-based access is enforced (Membership Admin and Super Admin only)
- [ ] All pages are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
