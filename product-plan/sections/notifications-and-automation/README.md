# Notifications & Automation

## Overview

Admin interface for configuring automated notifications and viewing delivery history. Organized as a single component with two tabs: Configuration and Log. Admins can toggle notification types on/off, view schedule details for each type, manually trigger renewal reminders for selected members, and browse a filterable log of all sent notifications. Accessible to Membership Admin and Super Admin roles. Renders inside the portal sidebar shell.

## User Flows

1. **Configuration Tab** — View all 5 notification types as cards, each showing name, description, enabled/disabled toggle, schedule details, and last-triggered date. The "Membership Renewal Reminder" card includes a "Send Manual Reminder" button that opens a modal to search and select past-due members for an immediate reminder.
2. **Log Tab** — Browse a table of notification log entries with columns for type, recipient, subject, sent date, and delivery status. Filter by notification type and date range. Clear filters to restore the full log.

## Components

| Component | Description |
|-----------|-------------|
| `NotificationsPage` | Single component with Configuration and Log tabs. Handles notification type toggling, manual reminder sending, and log browsing with filters. |

## Callback Props

| Callback | Type Signature | Triggered When |
|----------|---------------|----------------|
| `onToggle` | `(typeId: string, enabled: boolean) => void` | Admin toggles a notification type on or off |
| `onSendManualReminder` | `(memberIds: string[]) => void` | Admin sends a manual renewal reminder to selected members |

## Data Dependencies

See `types.ts` for full interface definitions. Key entities:

- `NotificationType` — ID, name, description, enabled flag, icon, schedule items, manual trigger support, last triggered timestamp
- `NotificationLogEntry` — ID, type ID/name, recipient name/email, subject, sent timestamp, delivery status (sent/delivered/failed)
- `MemberRecipient` — ID, name, email, payment status (current/past_due/expiring_soon) — used for the manual reminder modal's member search
