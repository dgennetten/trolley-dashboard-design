# Data Shape

## Entities

### Member
A person who has joined the Fort Collins Municipal Railway Society. Holds contact information (name, email, phone), full mailing address, membership level, date paid, payment status, and optional volunteer role with certification status.

### MembershipLevel
A tier of membership with an associated annual cost and set of benefits. The four levels are Depot ($20/year), Mountain Barn ($50/year), Howes Barn ($100/year), and Lifetime ($500 one-time).

### VolunteerRole
A role a member can hold as an active volunteer. Roles include Board Member, Motorman, Conductor, Depot Staff, and Mechanic. Each role tracks certification status and whether the member serves as a supervisor for that role. Supervisors see an admin view of all volunteers in their same role category and can bulk-reset all subordinates to "needs recertification" (typically at the start of each season) or individually mark a subordinate as recertified.

### Event
A public-facing event managed through the admin CMS. Includes a title, date, description, and photos displayed on the public Events page.

### CharterRequest
A submission from the public requesting a private trolley charter. Captures contact name, email, day-of-event phone number, preferred and secondary date/time, and a message describing the event.

### ContentBlock
A configurable piece of content on the public website — hero images, temporary notices, or page sections — managed through the admin CMS without requiring code changes.

### ActivityLog
A timestamped record of a change made to membership data. Displayed in the admin dashboard's recent-activity feed to track additions, edits, renewals, and status changes.

### Payment
A record of a membership payment or donation. Tracks the amount, payment method (Venmo, PayPal, or check), date, and whether it has been received and applied to the member's account.

### Message
A communication sent between a member and a membership admin or their volunteer role manager. Supports the in-app messaging feature available from the member portal.

### UserRole
A role assigned to a user for access control purposes. Roles are flexible and configurable per user, enabling granular permissions for admin, content management, and member-level access.

## Relationships

- Member has one MembershipLevel
- Member has zero or one VolunteerRole
- Member has many Payments
- Member has many Messages (sent)
- Member has many ActivityLog entries (as subject)
- Member has one or more UserRoles
- Event is managed by users with an admin UserRole
- ContentBlock is managed by users with an admin UserRole
- CharterRequest is standalone (public submission, not tied to a Member)
