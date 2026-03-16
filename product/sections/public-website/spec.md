# Public Website Specification

## Overview
The public-facing portion of the Fort Collins Trolley application, displayed inside the public shell (top navigation). Visitors can browse trolley events, history, schedules and fares, submit charter requests, sign up for memberships, donate, and learn about the organization — all without logging in.

## User Flows
- Browse the landing page: CMS-managed hero (images, headline, subtitle, CTA buttons), notice banner, key info cards (season dates, hours, membership CTA), and upcoming events
- View the Events page listing upcoming events (title, date/time, description, photo) and click into an event for more detail
- Read the static History page covering the Fort Collins Municipal Railway Society's founding, restoration, and recognition
- Check the Schedules & Fares page for operating hours, route description, and a fare table
- Visit the Charters page for charter information and open a charter request modal (name, email, day-of-event phone, preferred date/time, secondary date/time, message)
- Visit the Support Us page to view membership levels and benefits, open the new member signup modal (name, address, email, phone, membership level, payment method), donate via Venmo or PayPal links, learn about volunteering, and view car card advertising info
- Visit the About page for organization description, recognition awards, newsletter links, officers & directors, contact details, and operating hours
- Click "Member Login" in the top nav to enter the authenticated portal

## UI Requirements
- Hero section: full-width with gradient overlay, configurable headline/subtitle/CTA buttons, optional notice banner above or below
- Key info cards row below the hero (season opening, hours, membership CTA)
- Events list: card grid with photo, date badge, title, and short description
- Schedules & Fares: simple info layout with operating hours callout, route map placeholder, and fare comparison table
- Charters: descriptive content with a prominent "Request a Charter" button opening a charter request modal (matching the membership signup modal style) with date pickers, time pickers, and text inputs
- Support Us: membership tier comparison cards with benefits list, prominent "Join Now" button opening a signup modal, donation buttons (Venmo/PayPal) styled with brand icons, and additional support options (Volunteer, Advertise, Charter) as action cards
- About: long-form editorial layout with sections for organization info, photo, recognition awards list, newsletter links, officers & directors grid, and contact/hours footer block
- History: static editorial layout with text sections and inline photos
- All pages use the emerald/amber/stone design tokens with DM Sans headings and Inter body text
- Mobile responsive with Tailwind breakpoints
- Light and dark mode support

## Configuration
- shell: true
