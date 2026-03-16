# Authentication & Member Portal Specification

## Overview
The authentication and member portal section handles login/registration and provides authenticated members with a personal dashboard. Members can view and edit their profile, renew their membership via integrated payment, see their volunteer group roster with certification statuses and lead contact, and send messages to admins or role leads. Login and registration are standalone pages; all portal views render inside the sidebar shell.

## User Flows
- Log in with email/password or request a magic link (passwordless login via email)
- Register for a new account (self-service), then wait for admin approval linking the account to a membership record
- View personal profile showing membership level, payment status, expiry date, volunteer roles, and certification statuses
- Edit contact information (name, email, phone, mailing address) and change password
- Renew membership via integrated payment (Stripe or similar) with automatic confirmation — handles both annual renewal and past-due renewal
- Optionally upgrade membership tier through the same integrated payment flow
- View "My Volunteer Group" for each active role: read-only roster of fellow volunteers with certification statuses, plus the group lead's name and contact info
- Message the lead directly from the volunteer group view
- Send a message to the membership admin or a role lead via a simple compose form
- View sent messages with status indicators (sent, read, replied)
- Log out of the portal
- Reset forgotten password via email link

## UI Requirements
- Login page: centered card with email/password fields, "Send Magic Link" alternative button, "Forgot Password" link, and "Register" link — standalone page (no shell)
- Registration page: centered card with first name, last name, email, phone, and a submit button — standalone page (no shell) with a success state showing "Pending admin approval" confirmation
- Profile page: card-based layout inside portal shell showing member info summary (name, level, status badge, member-since date), editable contact section, volunteer role badges with certification status, payment history table, and a prominent "Renew Membership" button when due
- Renewal modal: shows current tier with price, optional upgrade selector, integrated payment form, and confirmation state
- Password change: inline expandable section on the profile page with current/new/confirm password fields
- My Volunteer Group page: one section per active role showing role name header, lead contact card, and a member roster table (name, certification status, certified date) with the current user highlighted
- Messages page: list of sent messages with recipient, subject, date, and status badge — plus a "Compose" button opening a compose form with recipient type selector (admin or lead), subject, and body
- All portal pages use the portal sidebar shell with emerald/amber/stone design tokens
- Mobile responsive with Tailwind breakpoints
- Light and dark mode support

## Configuration
- shell: true
