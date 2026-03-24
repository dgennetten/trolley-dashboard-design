# Public Website — Test Specs

These specs describe **what to test** (user-facing behavior), not how. Adapt to your testing framework.

---

## Landing Page

### Hero Section

- [ ] Renders headline text from `heroContent.headline`
- [ ] Renders subtitle text from `heroContent.subtitle`
- [ ] Displays CTA buttons with correct labels and variants
- [ ] Clicking a CTA button calls `onNavigate` with the button's `href`
- [ ] Hero images rotate automatically (more than one image visible over time)
- [ ] When `noticeBanner.enabled` is `true`, notice banner is visible with correct text
- [ ] When `noticeBanner.enabled` is `false`, notice banner is not rendered
- [ ] Notice banner link is clickable when `linkText` and `linkHref` are provided

### Info Cards

- [ ] Renders a card for each key offering
- [ ] Each card has a title and description
- [ ] Clicking a card calls `onNavigate` with the appropriate route

### Events Preview

- [ ] Renders up to 3 upcoming events from the `events` array
- [ ] Each event card shows title and formatted date
- [ ] "View All Events" link calls `onNavigate` with `/events`
- [ ] When `events` is empty, shows a "No upcoming events" message or hides the section

### Composition

- [ ] LandingPage renders HeroSection, InfoCards, and EventsPreview in order

---

## Events Page

- [ ] Renders an event card for each item in the `events` array
- [ ] Each card displays the event title, formatted date badge, and description
- [ ] Events with a `photoUrl` display the photo; events without show a placeholder or no image
- [ ] Events are displayed in chronological order

### Empty State

- [ ] When `events` is an empty array, displays "No upcoming events" message

### Edge Cases

- [ ] Long event titles are truncated or wrapped without breaking layout
- [ ] A large number of events (20+) renders without performance issues or layout breakage

---

## Schedules & Fares Page

- [ ] Displays season, operating days, hours, and frequency from `scheduleInfo`
- [ ] Displays route description
- [ ] Renders a fare table with one row per `FareTier`
- [ ] Each row shows category, price (formatted as currency), and note (if present)

### Sample Test Data

```typescript
const scheduleInfo: ScheduleInfo = {
  season: "May – September 2025",
  operatingDays: "Weekends & Holidays",
  hours: "12:00 PM – 5:00 PM",
  frequency: "Every 30 minutes",
  route: "City Park loop along Mountain Avenue",
  fares: [
    { category: "Adults (13+)", price: 5, note: null },
    { category: "Children (3–12)", price: 3, note: null },
    { category: "Seniors (65+)", price: 3, note: null },
    { category: "Under 3", price: 0, note: "Free" },
    { category: "Family Pack (2 adults + up to 3 kids)", price: 15, note: "Best value" },
  ],
};
```

---

## Charters Page

### Content Display

- [ ] Renders charter title and description from `charterInfo`
- [ ] Displays each policy from the `policies` array

### Charter Request Modal

- [ ] "Request a Charter" button opens the modal
- [ ] Modal shows operating copy (sunrise–sunset, 1-hour minimum, two round trips vs one slow trip)
- [ ] Separate **Pick up location** and **Drop off location** radio pairs (each: City Park depot **or** Howes St. / St. Joseph’s); submit blocked until both are selected; same stop may be chosen for both or opposite ends
- [ ] Modal contains fields: first name, last name, email, phone, preferred date, preferred time, secondary date (optional), secondary time (optional), message
- [ ] Four required acknowledgment checkboxes (no drink/eat/smoke; ADA/steps; blue painter’s tape decorations; weather/trolley motorman may call)
- [ ] Submitting with all required fields and acknowledgments calls `onSubmitCharterRequest` with correct `CharterRequestFormData` (including booleans)
- [ ] Submitting with missing required fields shows validation errors (e.g., "Email is required")
- [ ] Phone field validates format
- [ ] Cancel / close button dismisses the modal without calling the callback
- [ ] After successful submit, modal closes (or shows a success message)

### Sample Test Data

```typescript
const charterRequest: CharterRequestFormData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "970-555-1234",
  preferredDate: "2025-07-04",
  preferredTime: "14:00",
  secondaryDate: "2025-07-05",
  secondaryTime: "10:00",
  message: "Birthday party for 25 guests, would love the full loop.",
  pickupLocation: "city_park_depot",
  dropoffLocation: "howes_st_joseph",
  ackNoDrinkEatSmoke: true,
  ackNotAdaCompliant: true,
  ackDecorationsBluePaintersTape: true,
  ackWeatherOrTrolleyCoordination: true,
};
```

---

## Support Us Page

### Support Options

- [ ] Renders support option cards with title, description, and button
- [ ] Clicking a donation button calls `onDonate` with the corresponding payment method

### Membership Signup Modal

- [ ] "Become a Member" (or similar) button opens the signup modal
- [ ] Modal displays membership tiers from `membershipLevels` for selection
- [ ] Each tier shows name, price, period, tagline, and benefits
- [ ] User selects a tier, fills in personal info (first name, last name, email, phone, address), and picks a payment method
- [ ] Submitting with all required fields calls `onSubmitMemberSignup` with correct `MemberSignupFormData`
- [ ] Submitting with missing required fields shows validation errors
- [ ] Email field validates format
- [ ] Zip code field validates format
- [ ] Cancel / close button dismisses the modal without calling the callback

### Sample Test Data

```typescript
const memberSignup: MemberSignupFormData = {
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
  phone: "970-555-9876",
  addressLine1: "123 Mountain Ave",
  city: "Fort Collins",
  state: "CO",
  zipCode: "80521",
  membershipLevelId: "depot",
  paymentMethod: "venmo",
};
```

---

## History Page

- [ ] Renders heritage content about the trolley's history
- [ ] Content is readable and well-formatted with headings and paragraphs

---

## About Page

- [ ] Displays organization description from `aboutContent.orgDescription`
- [ ] Renders mission points as a list
- [ ] Renders volunteer roles
- [ ] Renders recognition items
- [ ] Displays officers with name and title
- [ ] Displays newsletters with clickable links
- [ ] Displays contact information (org name, address, email, city liaison)
- [ ] Displays operating hours

---

## Accessibility

- [ ] All interactive elements (buttons, links, form inputs) are keyboard-focusable
- [ ] Tab order follows visual layout (hero → info cards → events preview, etc.)
- [ ] Modal forms trap focus when open and return focus to trigger button on close
- [ ] Form fields have associated `<label>` elements or `aria-label` attributes
- [ ] Images have meaningful `alt` text (from `HeroImage.alt` or event photo alt)
- [ ] Fare table uses `<table>` with `<thead>` and `<th>` for proper semantics
- [ ] Color contrast meets WCAG AA for all text on both light and dark backgrounds
- [ ] Error messages in forms are associated with their fields via `aria-describedby`

---

## Responsive Behavior

- [ ] Landing hero is full-width on all screen sizes
- [ ] Info cards stack to a single column on mobile, multi-column on tablet+
- [ ] Event cards stack vertically on mobile
- [ ] Fare table scrolls horizontally on narrow screens if needed
- [ ] Modal forms are scrollable on small screens
- [ ] Text remains readable at all breakpoints (no overflow or clipping)
