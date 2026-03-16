# Authentication & Member Portal — Test Specs

These specs describe **what to test** (user-facing behavior), not how. Adapt to your testing framework.

---

## Login Page

### Email/Password Login

- [ ] Renders email and password input fields
- [ ] Submitting with valid credentials calls `onLogin` with `{ email, password }`
- [ ] Submitting with empty email shows validation error
- [ ] Submitting with empty password shows validation error
- [ ] Invalid credentials scenario: callback is called, and the component can display an error message passed via props or state

### Magic Link

- [ ] "Sign in with magic link" option is visible
- [ ] Entering an email and requesting a magic link calls `onMagicLink` with the email
- [ ] After requesting, shows a confirmation message ("Check your email")

### Forgot Password

- [ ] "Forgot Password?" link is visible on the login form
- [ ] Clicking it reveals an email input for password reset
- [ ] Submitting calls `onForgotPassword` with the email address

### Sample Test Data

```typescript
const loginCredentials: LoginCredentials = {
  email: "member@fortcollinstrolley.org",
  password: "SecurePass123!",
};
```

---

## Registration

- [ ] Registration form has fields: first name, last name, email, phone
- [ ] Submitting with all fields filled calls `onRegister` with correct `RegisterData`
- [ ] Submitting with missing required fields shows validation errors
- [ ] Email field validates format
- [ ] After successful submission, displays a "pending admin approval" confirmation message
- [ ] User cannot access portal features while in pending state

### Sample Test Data

```typescript
const registerData: RegisterData = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah@example.com",
  phone: "970-555-4321",
};
```

---

## Profile Page

### Profile Display

- [ ] Renders member's full name, email, phone, and address
- [ ] Displays membership level name and price
- [ ] Shows payment status badge (current = emerald, due = amber, past_due = red, lifetime = emerald)
- [ ] Shows `memberSince` and `expiresOn` dates
- [ ] Lists volunteer roles with certification status badges
- [ ] Displays payment history records

### Edit Contact Info

- [ ] "Edit" button switches contact fields to editable mode
- [ ] User can modify first name, last name, email, phone, address
- [ ] Saving calls `onUpdateProfile` with updated `ProfileUpdateData`
- [ ] "Cancel" reverts to the original values without calling the callback

### Change Password

- [ ] "Change Password" section has current password, new password, and confirm password fields
- [ ] Submitting with matching new/confirm passwords calls `onChangePassword`
- [ ] Submitting with mismatched passwords shows a validation error ("Passwords do not match")
- [ ] Submitting with empty current password shows validation error

### Membership Renewal

- [ ] "Renew Membership" button is visible when payment status is `due` or `past_due`
- [ ] Clicking opens a renewal flow showing available tiers from `availableLevels`
- [ ] Selecting a tier and confirming calls `onRenew` with the selected `membershipLevelId`
- [ ] Lifetime members do not see a renewal option

### Membership Upgrade

- [ ] "Upgrade" option is available for non-Lifetime members
- [ ] Shows higher tiers than the current level
- [ ] Confirming calls `onUpgradeMembership` with the new level ID

### Sample Test Data

```typescript
const memberProfile: MemberProfile = {
  id: "m-001",
  firstName: "Robert",
  lastName: "Chen",
  email: "robert@example.com",
  phone: "970-555-8888",
  address: {
    line1: "456 Elm St",
    city: "Fort Collins",
    state: "CO",
    zipCode: "80521",
  },
  membershipLevel: { id: "mountain-barn", name: "Mountain Barn", price: 50, period: "year" },
  memberSince: "2021-03-15",
  datePaid: "2024-03-15",
  paymentStatus: "current",
  expiresOn: "2025-03-15",
  lastLogin: "2025-01-10T14:30:00Z",
  volunteerRoles: [
    { role: "Motorman", certificationStatus: "certified", isLead: false, certifiedDate: "2024-05-01" },
  ],
};
```

---

## Volunteer Group Page

- [ ] Renders a group section for each `VolunteerGroup` the member belongs to
- [ ] Each group shows the role name as a heading
- [ ] Lead contact info (name, email, phone) is displayed prominently
- [ ] Member roster lists each member with name and certification status badge
- [ ] Current user's row is visually highlighted (`isCurrentUser: true`)
- [ ] "Message Lead" button calls `onSendMessage` or navigates to compose

### Empty State

- [ ] When `volunteerGroups` is empty, displays "You are not assigned to any volunteer groups" or similar message

### Sample Test Data

```typescript
const volunteerGroup: VolunteerGroup = {
  roleName: "Motorman",
  lead: { name: "Jim Torres", email: "jim@example.com", phone: "970-555-1111" },
  members: [
    { id: "m-001", name: "Robert Chen", certificationStatus: "certified", certifiedDate: "2024-05-01", isCurrentUser: true },
    { id: "m-002", name: "Emily Park", certificationStatus: "needs_recertification", certifiedDate: "2023-04-15", isCurrentUser: false },
    { id: "m-003", name: "David Kim", certificationStatus: "certified", certifiedDate: "2024-06-10", isCurrentUser: false },
  ],
};
```

---

## Messages Page

### Message List

- [ ] Renders a list of messages from the `messages` array
- [ ] Each message shows recipient name, subject, sent date, and status badge
- [ ] Status badges: sent (amber), read (stone), replied (emerald)
- [ ] Messages are sorted with most recent first

### Compose Message

- [ ] "New Message" button opens a compose form
- [ ] Form has recipient type selector (admin or lead), subject, and body fields
- [ ] Submitting with all fields filled calls `onSendMessage` with correct `NewMessageData`
- [ ] Submitting with empty subject or body shows validation errors
- [ ] Cancel dismisses the compose form

### Empty State

- [ ] When `messages` is empty, displays "No messages yet" or similar

### Sample Test Data

```typescript
const message: Message = {
  id: "msg-001",
  recipientType: "admin",
  recipientName: "Membership Admin",
  subject: "Question about renewal",
  body: "Hi, I'd like to know when my renewal is due. Thanks!",
  sentAt: "2025-01-08T10:00:00Z",
  status: "read",
};
```

---

## Edge Cases

- [ ] Password change with mismatched new/confirm passwords shows clear error
- [ ] Very long member names or addresses do not break layout
- [ ] Member with no volunteer roles sees empty state on group page
- [ ] Member with multiple volunteer roles sees all groups
- [ ] Payment history with many entries is scrollable or paginated

---

## Accessibility

- [ ] Login form fields have associated labels
- [ ] Password fields use `type="password"`
- [ ] Error messages are associated with their fields via `aria-describedby`
- [ ] Status badges have accessible text (not color-only)
- [ ] Tab order follows logical flow on all pages
- [ ] Modal/inline edit forms are keyboard-navigable
- [ ] Focus moves to the first field when entering edit mode
- [ ] "Pending approval" state is announced to screen readers

---

## Responsive Behavior

- [ ] Login page centers the form on all screen sizes
- [ ] Profile page stacks sections vertically on mobile
- [ ] Volunteer group roster is readable on narrow screens
- [ ] Message list adapts to mobile with condensed card layout
- [ ] Compose form is full-width on mobile
