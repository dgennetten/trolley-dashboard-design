# Milestone 6: Notifications & Automation

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

Build the notification configuration and monitoring interface, and set up automated notifications via Supabase Edge Functions. Available to Membership Admin and Super Admin roles.

## Overview

Membership Admins configure notification types, view delivery history, and manually trigger renewal reminders to specific members. Automated notifications are delivered via Supabase Edge Functions. The interface has two tabs: Configuration and Log. All content renders inside the portal shell (sidebar + header from Milestone 1).

## Components

Copy and integrate the component from `product-plan/sections/notifications-and-automation/components/`:

| Component | Purpose |
|-----------|---------|
| **NotificationsPage** | Single component with two tabs: Configuration (toggleable notification type cards) and Log (filterable delivery history table) |

**Reference files:**
- `product-plan/sections/notifications-and-automation/types.ts` — TypeScript interfaces for all component props
- `product-plan/sections/notifications-and-automation/sample-data.json` — Sample data matching the expected prop shapes

## Key Functionality

### Configuration Tab

Five toggleable notification type cards:

| Type | Description |
|------|-------------|
| **Renewal Reminders** | Automated reminders sent at 30 days, 7 days, and day-of before membership expiry. Fixed schedule (not configurable). Includes a manual trigger button. |
| **Welcome Email** | Sent when a new member is approved |
| **Payment Confirmation** | Sent when a payment is received and applied |
| **Certification Alert** | Sent when a member's certification status changes |
| **Charter Confirmation** | Sent when a charter request is received |

Each card shows the notification type name, description, and an on/off toggle. Disabled types are visually muted.

The Renewal Reminders card includes an additional "Send Manual Reminder" button that opens a modal where the admin can search for and select specific members to send a reminder to immediately.

### Log Tab

A filterable table showing delivery history for all notifications:

| Column | Description |
|--------|-------------|
| Type | The notification type (renewal, welcome, payment, etc.) |
| Recipient | Member name and email |
| Sent At | Timestamp of when the notification was sent |
| Status | Delivery status badge |

**Status badges:**
- **Delivered** — `emerald` badge (successfully received)
- **Sent** — `amber` badge (sent but delivery not confirmed)
- **Failed** — `red` badge (delivery failed)

**Filters:**
- Filter by notification type (dropdown)
- Filter by date range (date pickers)

### Supabase Edge Functions

Set up Edge Functions to handle the automated delivery:
- Renewal reminder function — runs on a schedule (e.g., daily cron), checks for members with upcoming expiry dates, sends reminders at the 30-day, 7-day, and day-of thresholds
- Event-triggered functions — fire on database changes (new member approved, payment received, cert status changed, charter request submitted)

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onToggle` | Admin enables or disables a notification type |
| `onSendManualReminder` | Admin sends a renewal reminder to selected members |

## User Flows

1. **View configuration** — Navigate to `/portal/notifications`, see the Configuration tab with all 5 notification type cards and their current on/off status
2. **Toggle a notification type** — Click the toggle on a notification card to enable or disable it
3. **Send manual reminder** — On the Renewal Reminders card, click "Send Manual Reminder", search for members in the modal, select one or more, click send
4. **View delivery log** — Switch to the Log tab, see the table of all sent notifications with type, recipient, timestamp, and status
5. **Filter the log** — Use the type dropdown to filter by notification type, use the date pickers to filter by date range

## Done When

- [ ] Configuration tab shows all 5 notification types with working toggles
- [ ] Manual reminder modal opens, allows member search/selection, and sends
- [ ] Log tab displays delivery history in a table with status badges
- [ ] Log filters work (by type and date range)
- [ ] Supabase Edge Functions are configured for automated delivery
- [ ] Renewal reminder function runs on schedule and sends at correct thresholds
- [ ] Event-triggered functions fire on the appropriate database changes
- [ ] Role-based access is enforced (Membership Admin and Super Admin only)
- [ ] All views are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
