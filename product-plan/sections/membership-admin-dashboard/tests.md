# Membership Admin Dashboard — Test Specs

These specs describe **what to test** (user-facing behavior), not how. Adapt to your testing framework.

---

## Dashboard

### Stat Cards

- [ ] Renders four stat cards: Total Members, Active Volunteers, Pending Renewals, New Signups This Month
- [ ] Each card displays the correct numeric value from `dashboardStats`
- [ ] Cards have appropriate icons and labels

### Activity Feed

- [ ] Renders recent activity entries from `activityLog` (most recent first)
- [ ] Each entry shows a type icon, description, and formatted timestamp
- [ ] Member name in each entry is a clickable link (calls `onViewMember` or `onNavigate`)
- [ ] Feed shows a limited number of entries with a "View All" link to the full activity log

### Sample Test Data

```typescript
const dashboardStats: DashboardStats = {
  totalMembers: 142,
  activeVolunteers: 38,
  pendingRenewals: 12,
  newSignupsThisMonth: 5,
};

const activityEntry: ActivityLogEntry = {
  id: "act-001",
  type: "renewal",
  description: "Renewed Mountain Barn membership",
  memberName: "Robert Chen",
  memberId: "m-001",
  timestamp: "2025-01-15T14:30:00Z",
  performedBy: null,
};
```

---

## Member List

### Search

- [ ] Search input filters members by name or email as the user types
- [ ] Clearing the search restores the full list

### Filters

- [ ] Filter dropdown for membership level (Depot, Mountain Barn, Howes Barn, Lifetime)
- [ ] Filter dropdown for volunteer role (Board Member, Motorman, Conductor, Depot Staff, Mechanic)
- [ ] Filter dropdown for certification status (certified, needs recertification, not applicable)
- [ ] Filter dropdown for payment status (current, past_due, lifetime)
- [ ] Filters compose — applying multiple filters narrows the results
- [ ] Clearing filters restores the full list

### Table Display

- [ ] Renders a table row for each member in the filtered results
- [ ] Columns include: name, email, membership level, payment status, volunteer roles, last login
- [ ] Clicking a column header sorts by that column
- [ ] Clicking the same header toggles sort direction
- [ ] Payment status renders as a colored badge (current = emerald, past_due = red, lifetime = emerald)

### Row Navigation

- [ ] Clicking a member row calls `onViewMember` with the member's ID

### CSV Export

- [ ] "Export CSV" button calls `onExportCsv` with the currently active filters

### Empty State

- [ ] When no members match the search/filters, displays "No members found" message

### Sample Test Data

```typescript
const memberItem: MemberListItem = {
  id: "m-001",
  firstName: "Robert",
  lastName: "Chen",
  email: "robert@example.com",
  phone: "970-555-8888",
  address: { line1: "456 Elm St", line2: "", city: "Fort Collins", state: "CO", zip: "80521" },
  membershipLevel: "Mountain Barn",
  datePaid: "2024-03-15",
  paymentStatus: "current",
  paymentMethod: "venmo",
  volunteerRoles: [
    { role: "Motorman", certificationStatus: "certified", certifiedDate: "2024-05-01", isLead: false },
  ],
  lastLogin: "2025-01-10T14:30:00Z",
  joinDate: "2021-03-15",
};
```

---

## Member Detail

### Personal Info

- [ ] Displays full name, email, phone, and address
- [ ] "Edit" button enables inline editing of all personal fields
- [ ] Saving calls `onUpdateMember` with the member ID and updated `MemberUpdateData`
- [ ] "Cancel" reverts changes without calling the callback

### Membership Info

- [ ] Displays membership level, date paid, payment status, and payment method
- [ ] Admin can change membership level; saving calls `onUpdateMember`
- [ ] "Mark Payment Received" button calls `onMarkPaymentReceived` with the member ID
- [ ] Button is disabled or hidden when payment status is already `current` or `lifetime`

### Volunteer Roles

- [ ] Lists all volunteer roles with certification status badges
- [ ] "Add Role" dropdown shows available roles; selecting calls `onAddVolunteerRole`
- [ ] Each role has a "Remove" button; clicking calls `onRemoveVolunteerRole`
- [ ] Roles that the member already has are excluded from the "Add Role" dropdown

### Sample Test Data

```typescript
const memberDetail: MemberListItem = {
  id: "m-002",
  firstName: "Emily",
  lastName: "Park",
  email: "emily@example.com",
  phone: "970-555-2222",
  address: { line1: "789 Oak Ave", line2: "Apt 4", city: "Fort Collins", state: "CO", zip: "80524" },
  membershipLevel: "Depot",
  datePaid: "2024-01-10",
  paymentStatus: "past_due",
  paymentMethod: "check",
  volunteerRoles: [
    { role: "Conductor", certificationStatus: "needs_recertification", certifiedDate: "2023-06-01", isLead: false },
  ],
  lastLogin: "2024-12-20T09:15:00Z",
  joinDate: "2023-01-10",
};
```

---

## Activity Log

- [ ] Renders all entries from `activityLog` in reverse chronological order
- [ ] Each entry shows an icon corresponding to its `type` (new_member, renewal, payment, role_change, certification, edit, level_change, payment_reminder)
- [ ] Entry shows description, member name, and formatted timestamp
- [ ] Member name is clickable and calls `onViewMember` or `onNavigate` with the member ID
- [ ] Entries with `performedBy` show who performed the action

### Empty State

- [ ] When `activityLog` is empty, displays "No recent activity"

---

## Admin Messages

### Message List

- [ ] Renders messages from `adminMessages` sorted by most recent
- [ ] Each message shows direction indicator (sent/received), member name, subject, and timestamp
- [ ] Unread messages are visually distinct (bold or badge)
- [ ] Clicking an unread message calls `onMarkMessageRead` with the message ID

### Compose Message

- [ ] "Compose" button opens a form with recipient (member) selector, subject, and body fields
- [ ] Submitting calls `onSendMessage` with correct `NewMessageData`
- [ ] Submitting with empty subject or body shows validation errors
- [ ] Cancel dismisses the form

### Empty State

- [ ] When `adminMessages` is empty, displays "No messages"

### Sample Test Data

```typescript
const adminMessage: AdminMessage = {
  id: "amsg-001",
  direction: "received",
  fromMemberId: "m-001",
  fromMemberName: "Robert Chen",
  toMemberId: null,
  toMemberName: null,
  subject: "Renewal question",
  body: "When is my renewal due?",
  status: "unread",
  timestamp: "2025-01-14T16:00:00Z",
};
```

---

## Lead Team View

### Group Stats

- [ ] Displays lead's name and role heading
- [ ] Stat cards show: total in group, certified count, needs recertification count
- [ ] Stats are derived from `leadDashboard.stats`

### Subordinate Roster

- [ ] Lists each subordinate from `leadDashboard.subordinates`
- [ ] Each row shows name, certification status badge, and certified date
- [ ] Certified members show an emerald badge; needs recertification shows an amber badge

### Individual Recertify

- [ ] Each subordinate with `needs_recertification` status has a "Recertify" button
- [ ] Clicking calls `onRecertifyMember` with the member ID and role
- [ ] Already-certified subordinates do not show the button (or it's disabled)

### Bulk Reset

- [ ] "Reset All Certifications" button is visible
- [ ] Clicking opens a confirmation dialog ("This will reset all subordinates to 'needs recertification'. Continue?")
- [ ] Confirming calls `onBulkResetCertification` with the role name
- [ ] Cancelling dismisses without calling the callback

### Sample Test Data

```typescript
const leadDashboard: LeadDashboard = {
  leadName: "Jim Torres",
  role: "Motorman",
  stats: { totalInGroup: 8, certified: 5, needsRecertification: 3 },
  subordinates: [
    { memberId: "m-001", name: "Robert Chen", certificationStatus: "certified", certifiedDate: "2024-05-01" },
    { memberId: "m-002", name: "Emily Park", certificationStatus: "needs_recertification", certifiedDate: "2023-04-15" },
    { memberId: "m-004", name: "Alex Rivera", certificationStatus: "needs_recertification", certifiedDate: null },
  ],
};
```

---

## Edge Cases

- [ ] Member list with 500+ members renders without performance issues
- [ ] Searching for a term with no matches shows empty state
- [ ] Adding all 5 volunteer roles to a member leaves the "Add Role" dropdown empty/disabled
- [ ] Removing the last volunteer role from a member shows an empty roles section
- [ ] Activity log with hundreds of entries is scrollable or paginated
- [ ] Lead team view with `leadDashboard: null` is not rendered (component handles missing data)

---

## Accessibility

- [ ] Table is properly structured with `<thead>`, `<th>`, and `scope` attributes
- [ ] Sort controls are keyboard-accessible and announce sort direction
- [ ] Filter dropdowns have associated labels
- [ ] Search input has a visible label or `aria-label`
- [ ] Status badges include accessible text (not color-only indicators)
- [ ] Confirmation dialogs trap focus and are dismissable with Escape
- [ ] "Mark Payment Received" button has clear accessible label
- [ ] Certification status is conveyed with text, not just color

---

## Responsive Behavior

- [ ] Dashboard stat cards wrap to 2×2 grid on tablet, stack on mobile
- [ ] Member list switches from table to card layout on mobile
- [ ] Member detail sections stack vertically on narrow screens
- [ ] Activity log entries condense on mobile (icon + description, timestamp below)
- [ ] Message compose form is full-width on mobile
