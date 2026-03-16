# Content Management Specification

## Overview
An admin-facing CMS for managing all public website content, accessible to CMS Admin and Super Admin roles. Organized as a single tabbed interface with sections for the hero/banner, events, and static page content. All content supports a draft/publish workflow so admins can prepare changes before making them live.

## User Flows
- View the CMS dashboard with tabs for Hero & Banner, Events, and Pages
- Edit the hero section: swap or reorder hero images, update headline, subtitle, and CTA buttons, toggle and edit the notice banner
- Save hero changes as draft or publish immediately
- Browse the events list showing title, date, status (draft/published/past), and a featured photo thumbnail
- Create a new event with title, date, time, description, excerpt, and a featured photo
- Edit an existing event's details, photo, or status
- Delete an event with confirmation
- Publish a draft event or unpublish a live event back to draft
- Browse the Pages tab listing all editable public pages (Schedules & Fares, Charters, Support Us, About, History)
- Edit a page's content blocks (text sections, lists, contact info, officer/director entries) and save as draft or publish
- Preview content changes before publishing (view as it would appear on the public site)

## UI Requirements
- Tabbed layout with three tabs: Hero & Banner, Events, Pages
- Hero tab: image upload/reorder area, form fields for headline/subtitle/CTA config, notice banner toggle with text and link fields, draft/publish status badge and action buttons
- Events tab: table or card list with columns for photo thumbnail, title, date, status badge (draft/published/past), and action buttons (edit, publish/unpublish, delete); "Add Event" button opens an inline form or slide-out panel with title, date picker, time picker, description textarea, excerpt textarea, and photo upload
- Pages tab: list of editable pages as cards, each showing page name, last-edited date, and current status; clicking a page opens an editor view with the page's content fields grouped by section
- Draft/publish controls: each content area shows a status badge (Draft in amber, Published in emerald) and provides Save Draft and Publish buttons
- Confirmation modal for destructive actions (delete event, unpublish content)
- Toast notifications for save/publish/delete success
- All content rendered inside the portal sidebar shell
- Emerald/amber/stone design tokens, DM Sans headings, Inter body text
- Mobile responsive with stacked layout on small screens
- Light and dark mode support

## Configuration
- shell: true
