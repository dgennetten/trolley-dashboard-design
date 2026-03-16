# Notifications & Automation Specification

## Overview
Admin-facing configuration and monitoring for all automated notifications powered by Supabase Edge Functions. Membership Admins and Super Admins can toggle notification types on/off, view a log of all sent notifications, and manually trigger reminders to specific members. The system automatically sends renewal reminders on a fixed schedule, plus welcome emails, payment confirmations, certification expiry alerts, and charter request confirmations.

## User Flows
- View the Notifications page with two tabs: Configuration and Log
- Configuration tab: see all notification types listed as toggleable cards, each showing its name, description, current enabled/disabled status, and timing details (where applicable)
- Toggle any notification type on or off
- View the fixed renewal reminder schedule (30 days before expiry, 7 days before, and day-of expiry)
- Log tab: browse a chronological list of all sent notifications with type, recipient, subject, sent date, and delivery status
- Filter the log by notification type and date range
- Manually trigger a renewal reminder to one or more specific members from the configuration tab
- View delivery status for each notification (sent, delivered, failed)

## UI Requirements
- Tabbed layout with two tabs: Configuration and Log
- Configuration tab: vertical list of notification type cards, each with an icon, title, description, enabled/disabled toggle, and timing info displayed as a subtle detail row; a "Send Manual Reminder" button in the renewal card that opens a modal with member search/multi-select and a send button
- Log tab: data table with columns for type icon, recipient name, subject line, sent date/time, and delivery status badge (sent/delivered/failed); filter row above the table with a notification type dropdown and date range picker
- Delivery status badges: emerald for delivered, amber for sent/pending, red for failed
- All content rendered inside the portal sidebar shell
- Emerald/amber/stone design tokens, DM Sans headings, Inter body text
- Mobile responsive with stacked cards and horizontally scrollable table on small screens
- Light and dark mode support

## Configuration
- shell: true
