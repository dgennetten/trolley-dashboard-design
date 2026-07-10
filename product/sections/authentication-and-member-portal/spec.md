# Authentication & Member Portal Specification

## Overview
The authentication and member portal section handles passwordless login/registration and provides authenticated members with a personal dashboard. Members can view and edit their profile, renew their membership via integrated payment, see their volunteer group roster with certification statuses and lead contact, and send messages to admins or role leads. Login and registration are standalone pages; all portal views render inside the sidebar shell.

## User Flows
- Log in with a one-time code (OTP): enter email, receive a 6-digit code by email, and enter it to verify — no password required; resend the code (with a short cooldown) or switch to a different email
- Register for a new account (self-service), then wait for admin approval linking the account to a membership record
- View personal profile showing membership level, payment status, expiry date, volunteer roles, and certification statuses
- Edit contact information (name, email, phone, mailing address)
- Renew membership — handles both annual renewal and past-due renewal — choosing a payment method from a radio list: Card, PayPal, or Venmo (PayPal Braintree Drop-in UI) or Zelle (no processing fee)
- When paying by card/PayPal/Venmo, optionally check a box to cover the processing fee; the label shows the exact added amount and resulting total (e.g. "Add $1.75 so the Society receives the full $50.00")
- When paying by Zelle, see the Society's recipient details, the amount, and a unique reference code to include in the memo; after tapping "I've sent it," see a pending-verification confirmation (the renewal is recorded as pending until a Membership Admin reconciles it)
- Optionally upgrade membership tier through the same integrated payment flow
- View "My Volunteer Group" for each active role: read-only roster of fellow volunteers with certification statuses, plus the group lead's name and contact info
- Message the lead directly from the volunteer group view
- Send a message to the membership admin or a role lead via a simple compose form
- View sent messages with status indicators (sent, read, replied)
- Log out of the portal

## UI Requirements
- Login page: centered card, two steps — (1) email entry with a "Send code" button; (2) code-entry step with a 6-digit segmented code input, "Verify" button, a "Resend code" action with a countdown cooldown, and a "Use a different email" option — plus a "Register" link — standalone page (no shell)
- Registration page: centered card with first name, last name, email, phone, and a submit button — standalone page (no shell) with a success state showing "Pending admin approval" confirmation
- Profile page: card-based layout inside portal shell showing member info summary (name, level, status badge, member-since date), editable contact section, volunteer role badges with certification status, payment history table, and a prominent "Renew Membership" button when due
- Renewal modal: shows current tier with price, optional upgrade selector, then a payment step with a radio list of methods (Card, PayPal, Venmo, Zelle); Braintree methods reveal the Drop-in UI plus a "cover the processing fee" checkbox showing the exact fee and total, while Zelle reveals recipient details, the amount, a copyable reference code, and an "I've sent it" action leading to a pending-verification confirmation
- My Volunteer Group page: one section per active role showing role name header, lead contact card, and a member roster table (name, certification status, certified date) with the current user highlighted
- Messages page: list of sent messages with recipient, subject, date, and status badge — plus a "Compose" button opening a compose form with recipient type selector (admin or lead), subject, and body
- All portal pages use the portal sidebar shell with emerald/amber/stone design tokens
- Mobile responsive with Tailwind breakpoints
- Light and dark mode support

## Configuration
- shell: true
