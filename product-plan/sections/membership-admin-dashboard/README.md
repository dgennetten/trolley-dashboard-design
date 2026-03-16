# Membership Admin Dashboard

## Overview

Admin interface for managing the Fort Collins Trolley's membership program. Provides a stats dashboard, a searchable and filterable member list, detailed member records, an activity log of recent changes, admin messaging, and a lead team view that scopes the experience to a lead's subordinates within their volunteer role. Accessible to Membership Admin and Super Admin roles. Renders inside the portal sidebar shell.

## User Flows

1. **Dashboard** — At-a-glance stat cards (total members, active volunteers, pending renewals, new signups this month) and a recent activity feed.
2. **Member List** — Searchable, sortable table of all members. Filter by membership level, volunteer role, certification status, and payment status. Export the current filtered view as CSV. Click a row to navigate to the member's detail view.
3. **Member Detail** — Full member record with personal info, membership details, volunteer roles, and payment history. Edit personal info and membership fields inline. Add or remove volunteer roles. Mark a payment as received.
4. **Activity Log** — Chronological feed of membership-related events (new members, renewals, payments, role changes, certifications, edits, payment reminders). Each entry shows type icon, description, member name (linked), timestamp, and who performed the action.
5. **Admin Messages** — List of messages sent to/from members. Compose new messages to a specific member. Mark messages as read.
6. **Lead Team View** — For volunteer role leads only. Shows group stats (total in group, certified count, needs recertification count), a subordinate roster with certification badges, individual recertify action, and a bulk "reset all to needs recertification" action (typically used at season start).

## Components

| Component | Description |
|-----------|-------------|
| `Dashboard` | Stat cards and recent activity feed |
| `MemberList` | Searchable, sortable, filterable member table with CSV export |
| `MemberDetail` | Full member record with inline editing, role management, and payment actions |
| `ActivityLog` | Chronological feed of membership data changes with type icons and member links |
| `AdminMessages` | Message list with compose form and read/unread status |
| `LeadTeamView` | Lead-scoped view with group stats, subordinate roster, recertify actions, and bulk reset |

## Callback Props

| Callback | Type Signature | Triggered When |
|----------|---------------|----------------|
| `onViewMember` | `(memberId: string) => void` | Admin clicks a member row in the list |
| `onUpdateMember` | `(memberId: string, updates: MemberUpdateData) => void` | Admin saves edits to a member's record |
| `onAddVolunteerRole` | `(memberId: string, role: VolunteerRoleName) => void` | Admin adds a volunteer role to a member |
| `onRemoveVolunteerRole` | `(memberId: string, role: VolunteerRoleName) => void` | Admin removes a volunteer role from a member |
| `onMarkPaymentReceived` | `(memberId: string) => void` | Admin marks a member's payment as received |
| `onExportCsv` | `(filters: MemberFilters) => void` | Admin exports the filtered member list as CSV |
| `onSendMessage` | `(message: NewMessageData) => void` | Admin sends a message to a member |
| `onMarkMessageRead` | `(messageId: string) => void` | Admin clicks an unread message |
| `onRecertifyMember` | `(memberId: string, role: VolunteerRoleName) => void` | Lead marks an individual subordinate as recertified |
| `onBulkResetCertification` | `(role: VolunteerRoleName) => void` | Lead resets all subordinates to "needs recertification" |
| `onNavigate` | `(path: string) => void` | User clicks an internal navigation link |

## Data Dependencies

See `types.ts` for full interface definitions. Key entities:

- `DashboardStats` — Total members, active volunteers, pending renewals, new signups
- `MemberListItem` — Member info with level, roles, payment status, last login
- `ActivityLogEntry` — Type, description, member name/ID, timestamp, performer
- `AdminMessage` — Direction, sender/receiver, subject, body, read/unread status
- `LeadDashboard` — Lead name, role, group stats, subordinate roster
- `MemberUpdateData` — Partial member update fields
- `MemberFilters` — Filter criteria for the member list
- `NewMessageData` — Compose message fields
