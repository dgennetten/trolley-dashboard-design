# Membership Admin Dashboard Specification

## Overview
The primary administration interface for Membership Admins and Super Admins to manage the Society's membership. Includes a dashboard overview with summary stats and activity feed, a filterable/exportable member list, full member detail editing, an activity log, and admin messaging. Leads see a scoped mini-dashboard for their volunteer role group with certification controls.

## User Flows
- View the dashboard overview showing summary stat cards (total members, active volunteers, pending renewals, recent signups) and a recent activity feed
- Navigate to the Members list showing all members in a filterable, sortable table
- Filter the member list by membership level, volunteer role, certification status, and payment status
- Export the current filtered member list as CSV
- Click a member row to open their detail view
- Edit any member field in the detail view: name, email, phone, address, membership level, payment status, date paid, volunteer roles, and certification status
- Assign or remove volunteer roles from a member
- Mark a member's payment as received
- View the Activity Log page showing a chronological feed of all membership data changes (additions, edits, renewals, status changes)
- View the admin Messages page showing a flat list of all messages (sent and received) with the ability to compose a message to any member
- Reply to or compose messages to individual members
- Lead view: see a mini-dashboard scoped to the lead's volunteer role group with group-specific stats, a roster of subordinates with certification status, bulk "needs recertification" reset for all subordinates, and individual recertification marking

## UI Requirements
- Dashboard: 4 summary stat cards in a row (total members, active volunteers, pending renewals, new signups this month), followed by a recent activity feed (10-15 most recent entries) with timestamps, action descriptions, and member names
- Members list: data table with columns for name, email, membership level, payment status, volunteer role(s), and last login; sortable column headers; filter dropdowns above the table; "Export CSV" button; row click navigates to member detail
- Member detail: card-based layout with editable sections for personal info (name, email, phone, address), membership info (level, date paid, payment status), and volunteer roles (role name, certification status toggle); save/cancel buttons per section
- Activity Log: chronological list with icon indicators per action type (new member, renewal, edit, role change), timestamp, description, and a link to the affected member
- Messages: flat list showing subject, sender/recipient name, date, status badge (read/unread); "Compose" button opens a modal with member search/select, subject, and message body
- Lead view: same card layout as dashboard overview but stats are scoped to the role group; subordinate roster table with name, certification status badge, certified date, and individual recertify button; a prominent "Reset All to Needs Recertification" button with confirmation modal
- All views inside the portal sidebar shell
- Emerald/amber/stone design tokens, DM Sans headings, Inter body text
- Mobile responsive with stacked cards and horizontally scrollable tables on small screens
- Light and dark mode support

## Configuration
- shell: true
