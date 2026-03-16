# Milestone 3: Authentication & Member Portal

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

Implement Supabase authentication and the member self-service portal.

## Overview

Members log in with email/password or magic link, view and edit their profile, renew their membership (including past-due), see their volunteer group roster with certification statuses, and message admins or their volunteer role lead. New users can self-register (pending admin approval). All portal pages render inside the portal shell (sidebar + header from Milestone 1).

## Components

Copy and integrate the components from `product-plan/sections/authentication-and-member-portal/components/`:

| Component | Purpose |
|-----------|---------|
| **LoginPage** | Email/password login, magic link option, registration link, forgot password |
| **ProfilePage** | Member profile with editable contact info, membership details, payment history, renewal, and password change |
| **VolunteerGroupPage** | Volunteer group roster showing members in the same role, certification statuses, and lead contact info |
| **MessagesPage** | Messaging interface for communicating with admins or role leads |

**Reference files:**
- `product-plan/sections/authentication-and-member-portal/types.ts` — TypeScript interfaces for all component props
- `product-plan/sections/authentication-and-member-portal/sample-data.json` — Sample data matching the expected prop shapes

## Key Functionality

- **Login:** Email/password authentication or passwordless magic link via Supabase Auth
- **Registration:** Self-service signup form; new accounts are set to "pending" until approved by a Membership Admin
- **Forgot password:** Password reset flow via email
- **Profile:** Displays membership level, payment status, volunteer roles, and contact info; members can edit their contact details and change their password
- **Membership renewal:** Members can renew their membership (annual or past-due), including selecting a different tier and choosing a payment method
- **Upgrade membership:** Members can upgrade to a higher tier
- **Volunteer group:** Shows a roster of all members in the same volunteer role, their certification statuses, and the lead's contact info; members can message their lead directly
- **Messaging:** Compose and send messages to admins or role leads; view conversation history

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onLogin` | User submits email/password credentials |
| `onMagicLink` | User requests a magic link |
| `onRegister` | User submits the registration form |
| `onLogout` | User clicks logout |
| `onUpdateProfile` | User saves contact info changes |
| `onChangePassword` | User submits a new password |
| `onRenew` | User initiates membership renewal |
| `onUpgradeMembership` | User upgrades to a higher membership tier |
| `onSendMessage` | User sends a message |
| `onForgotPassword` | User requests a password reset |

## User Flows

1. **Login** — Navigate to `/login`, enter email and password (or request magic link), submit, get redirected to portal
2. **Register** — Click "Register" on login page, fill out registration form (name, email, password, contact info), submit, see "pending approval" confirmation message
3. **Forgot password** — Click "Forgot password" on login page, enter email, receive reset link, set new password
4. **View profile** — After login, navigate to `/portal/profile`, see membership info (level, status, expiry), volunteer roles, and payment history
5. **Edit profile** — On profile page, click edit, update contact info fields, save changes
6. **Renew membership** — On profile page, click "Renew", select membership tier, choose payment method (Venmo/PayPal/check), submit
7. **View volunteer group** — Navigate to `/portal/volunteer-group`, see roster of group members, their certification statuses, and the lead's contact info
8. **Message lead or admin** — Navigate to `/portal/messages`, compose a new message, select recipient (admin or role lead), write message, send

## Done When

- [ ] Supabase Auth is configured and working (email/password and magic link)
- [ ] Login page renders with both auth options
- [ ] Registration creates a new user with "pending" status
- [ ] Forgot password flow sends reset email and allows password change
- [ ] Profile page displays membership info, volunteer roles, and payment history
- [ ] Contact info is editable and saves correctly
- [ ] Password change works
- [ ] Membership renewal flow works (tier selection, payment method, submission)
- [ ] Volunteer group page shows roster with certification statuses
- [ ] Messages page allows composing and sending messages
- [ ] Role-based access controls are enforced (members only see their own data)
- [ ] All pages are responsive across desktop, tablet, and mobile
- [ ] Light and dark mode both render correctly
