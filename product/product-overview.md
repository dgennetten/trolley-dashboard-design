# Fort Collins Trolley

## Description
A web application for the Fort Collins Municipal Railway Society that serves as both an attractive public-facing website for trolley events, schedules, and services, and a membership and volunteer management platform for administrators and members — powered by Supabase for authentication, data, and automated notifications.

## Problems & Solutions

### Problem 1: Scattered Public Information
Consolidates events, schedules, fares, history, charters, and donation/membership options into a single, modern public site with a configurable hero and CMS-managed content.

### Problem 2: Manual Membership Administration
Provides an admin dashboard with a filterable, exportable member list, detailed member records, and an activity feed for tracking changes.

### Problem 3: No Member Self-Service
Gives members a portal to view their profile, renew memberships (including past-due), and communicate with admins or their volunteer role manager.

### Problem 4: Forgotten Payment Reminders
Automates membership fee due notifications via Supabase Edge Functions, reducing manual follow-up.

### Problem 5: Content Update Bottleneck
A built-in CMS lets authorized admins update public-facing content (hero, notices, events, pages) without developer involvement.

## Key Features
- Public website: hero with configurable notices, events, history, schedules & fares, charters, support/donate, about
- Supabase authentication with flexible role-based access control
- Membership admin dashboard: filterable list (level, role, cert status, payment status), exports (.doc, .pdf, .csv), activity log
- Member self-service portal: profile view, annual/past-due renewal, messaging to admin or role manager
- New member application form with Venmo/PayPal/check payment options
- Charter request form (name, email, phone, preferred/secondary dates & times, message)
- Volunteer role tracking (Board Member, Motorman, Conductor, Depot Staff, Mechanic, plus Supervisors for each) with certification status
- Supervisor view: supervisors see an admin dashboard scoped to their subordinates (volunteers in the same role category), with bulk "needs recertification" reset (typically at season start) and individual recertification marking
- Four membership tiers: Depot ($20), Mountain Barn ($50), Howes Barn ($100), Lifetime ($500)
- Admin CMS for events (dates, descriptions, photos) and site content
- Automated payment-due notifications via Supabase Edge Functions
