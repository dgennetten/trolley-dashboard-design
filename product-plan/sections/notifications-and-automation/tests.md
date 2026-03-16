# Notifications & Automation — Test Specs

These specs describe **what to test** (user-facing behavior), not how. Adapt to your testing framework.

---

## Tab Navigation

- [ ] Renders two tabs: "Configuration" and "Log"
- [ ] Default tab is "Configuration"
- [ ] Clicking a tab switches the visible content
- [ ] Active tab has a distinct visual indicator

---

## Configuration Tab

### Notification Type Cards

- [ ] Renders a card for each of the 5 notification types from `notificationTypes`
- [ ] Each card displays: name, description, icon, enabled/disabled toggle, and schedule details
- [ ] Schedule details list each `NotificationScheduleItem` with label and timing
- [ ] Cards with `lastTriggered` show a formatted "Last triggered" date
- [ ] Cards without `lastTriggered` show "Never triggered" or similar

### Toggle On/Off

- [ ] Toggling a notification type calls `onToggle` with the `typeId` and the new `enabled` value
- [ ] Enabled types show an active toggle (emerald); disabled types show an inactive toggle (stone/gray)
- [ ] Toggle state reflects the current `enabled` value from props

### Manual Reminder Button

- [ ] The notification type with `supportsManualTrigger: true` (renewal reminder) shows a "Send Manual Reminder" button
- [ ] Types with `supportsManualTrigger: false` do not show the button

### Sample Test Data

```typescript
const notificationType: NotificationType = {
  id: "renewal-reminder",
  name: "Membership Renewal Reminder",
  description: "Automated email reminding members their annual dues are approaching or past due.",
  enabled: true,
  icon: "bell",
  schedule: [
    { label: "30 days before expiration", timing: "30d prior" },
    { label: "7 days before expiration", timing: "7d prior" },
    { label: "On expiration day", timing: "Day of" },
    { label: "Weekly after expiration", timing: "Weekly (past due)" },
  ],
  supportsManualTrigger: true,
  lastTriggered: "2025-01-10T08:00:00Z",
};
```

---

## Manual Reminder Modal

- [ ] Clicking "Send Manual Reminder" opens a modal
- [ ] Modal displays a search input to filter `memberRecipients` by name or email
- [ ] Renders a list of members matching the search query
- [ ] Each member row shows name, email, and payment status badge (past_due = red, expiring_soon = amber)
- [ ] Admin can select multiple members via checkboxes
- [ ] "Send" button is disabled when no members are selected
- [ ] Clicking "Send" with selected members calls `onSendManualReminder` with an array of member IDs
- [ ] After sending, modal closes (or shows a success confirmation)
- [ ] "Cancel" closes the modal without sending

### Empty State

- [ ] When no members match the search, displays "No members found"
- [ ] When `memberRecipients` is empty (no past-due or expiring-soon members), displays "No members currently eligible for reminders"

### Sample Test Data

```typescript
const memberRecipients: MemberRecipient[] = [
  { id: "m-002", name: "Emily Park", email: "emily@example.com", paymentStatus: "past_due" },
  { id: "m-005", name: "Carlos Mendez", email: "carlos@example.com", paymentStatus: "expiring_soon" },
  { id: "m-008", name: "Lisa Nguyen", email: "lisa@example.com", paymentStatus: "past_due" },
];
```

---

## Log Tab

### Log Table

- [ ] Renders a table of notification log entries from `log`
- [ ] Columns: notification type name, recipient name, recipient email, subject, sent date (formatted), status badge
- [ ] Status badges use color coding: delivered = emerald, sent = amber, failed = red
- [ ] Entries are sorted by most recent first

### Filters

- [ ] Filter dropdown for notification type (populated from `notificationTypes`)
- [ ] Date range filter with start and end date pickers
- [ ] Filters compose — applying type and date range narrows the results
- [ ] "Clear Filters" button resets all filters and restores the full log

### Empty State

- [ ] When `log` is empty, displays "No notifications sent yet"
- [ ] When filters produce no results, displays "No log entries match the current filters"

### Sample Test Data

```typescript
const logEntry: NotificationLogEntry = {
  id: "log-001",
  typeId: "renewal-reminder",
  typeName: "Membership Renewal Reminder",
  recipientName: "Emily Park",
  recipientEmail: "emily@example.com",
  subject: "Your Fort Collins Trolley membership expires in 30 days",
  sentAt: "2025-01-10T08:00:00Z",
  status: "delivered",
};

const failedLogEntry: NotificationLogEntry = {
  id: "log-002",
  typeId: "renewal-reminder",
  typeName: "Membership Renewal Reminder",
  recipientName: "Carlos Mendez",
  recipientEmail: "carlos@example.com",
  subject: "Your Fort Collins Trolley membership is past due",
  sentAt: "2025-01-10T08:01:00Z",
  status: "failed",
};
```

---

## Edge Cases

- [ ] All 5 notification types disabled — toggles all show inactive state, no errors
- [ ] Manual reminder modal with no past-due members — shows appropriate empty message
- [ ] Log with hundreds of entries renders without performance issues (scrollable or paginated)
- [ ] Filtering log to a date range with no entries shows the empty filter state
- [ ] Rapidly toggling a notification type on/off calls `onToggle` for each change
- [ ] Very long notification names or descriptions do not break card layout

---

## Accessibility

- [ ] Tabs are navigable via keyboard (arrow keys between tabs, Enter/Space to select)
- [ ] Tab panels use `role="tabpanel"` with proper `aria-labelledby`
- [ ] Toggle switches have accessible labels (e.g., "Enable Membership Renewal Reminder")
- [ ] Toggle state is conveyed to screen readers (checked/unchecked)
- [ ] Modal traps focus when open and is dismissable with Escape
- [ ] Checkboxes in the manual reminder modal have accessible labels (member name)
- [ ] Status badges in the log include accessible text (not color-only)
- [ ] Date pickers are keyboard-accessible
- [ ] Log table is properly structured with `<thead>`, `<th>`, and `scope` attributes

---

## Responsive Behavior

- [ ] Configuration cards stack to a single column on mobile
- [ ] Log table adapts to card layout on narrow screens
- [ ] Manual reminder modal is scrollable and full-width on mobile
- [ ] Filter controls stack vertically on small screens
- [ ] Tab labels remain readable at all breakpoints
