# Authentication & Member Portal

## Overview

Authentication and member self-service portal for the Fort Collins Trolley application. Uses Supabase for authentication (email/password and magic link). Once logged in, members can view and edit their profile, renew or upgrade their membership, view their volunteer group roster, and send messages to admins or their role lead. The login and registration pages are standalone (no shell chrome); portal pages render inside the portal sidebar shell.

## User Flows

1. **Login** — Email/password authentication or magic link. Includes a "Forgot Password" link for password reset.
2. **Registration** — New member signup form (first name, last name, email, phone). After submission, the user sees a "pending admin approval" confirmation.
3. **Profile** — View personal info, membership level, payment status, volunteer roles, and payment history. Edit contact details, change password, renew membership (select tier, confirm payment), or upgrade to a higher tier.
4. **Volunteer Group** — View the roster of members sharing the same volunteer role, see the lead's contact info, and message the lead directly.
5. **Messages** — View a list of sent messages with status indicators, compose new messages to admin or role lead.

## Components

| Component | Description |
|-----------|-------------|
| `LoginPage` | Login form (email + password), magic link option, registration form, forgot password link. Standalone layout (no shell). |
| `ProfilePage` | Member profile display with contact info, membership details, volunteer roles, payment history. Inline editing for contact details and password change. Renewal and upgrade flows. |
| `VolunteerGroupPage` | Volunteer group roster organized by role. Shows lead contact info with email/phone. Members listed with certification status. |
| `MessagesPage` | Message list with status badges (sent, read, replied). Compose form with recipient type selection, subject, and body. |

## Callback Props

| Callback | Type Signature | Triggered When |
|----------|---------------|----------------|
| `onLogin` | `(credentials: LoginCredentials) => void` | User submits login form with email and password |
| `onMagicLink` | `(email: string) => void` | User requests a magic link |
| `onRegister` | `(data: RegisterData) => void` | User submits the registration form |
| `onLogout` | `() => void` | User clicks "Log Out" |
| `onUpdateProfile` | `(data: ProfileUpdateData) => void` | User saves updated contact information |
| `onChangePassword` | `(data: PasswordChangeData) => void` | User submits a password change |
| `onRenew` | `(membershipLevelId: string) => void` | User confirms membership renewal |
| `onUpgradeMembership` | `(newLevelId: string) => void` | User confirms an upgrade to a higher tier |
| `onSendMessage` | `(data: NewMessageData) => void` | User sends a message |
| `onForgotPassword` | `(email: string) => void` | User requests a password reset email |
| `onNavigate` | `(href: string) => void` | User clicks an internal navigation link |

## Data Dependencies

See `types.ts` for full interface definitions. Key entities:

- `MemberProfile` — Personal info, membership level, payment status, volunteer roles
- `VolunteerGroup` — Role name, lead contact, member roster with certification status
- `Message` — Recipient type, subject, body, status, timestamp
- `PaymentRecord` — Payment history entries
- `AvailableLevel` — Membership tiers available for renewal/upgrade
- `LoginCredentials` / `RegisterData` — Auth form data
- `ProfileUpdateData` / `PasswordChangeData` — Profile edit form data
- `NewMessageData` — Compose message form data
