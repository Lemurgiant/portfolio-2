# VetDesk — Application Description

## Overview

VetDesk is a veterinary clinic management web application. It gives clinic staff a single interface to track patients (pets and their owners), schedule and manage appointments, maintain vaccination records, and handle billing through invoices. The app is built with **Next.js** (App Router), **TypeScript**, **Mantine UI**, and **Tabler Icons**. All data is currently mock/in-memory — there is no backend or database. Currency is displayed in **Philippine Peso (₱)** and phone numbers follow the Philippine mobile format, establishing the clinic's locale.

The logged-in user shown throughout the app is **Dr. Maria Santos** (teal avatar, top-right of the header). There is no authentication system; the identity is hardcoded in the shell.

---

## Layout & Navigation

The app uses a persistent **AppShell** layout with:

- **Header (60 px)** — shows the current page title on the left and a color-scheme toggle + the logged-in vet's avatar and name on the right. On mobile, a burger button collapses/expands the sidebar.
- **Sidebar / Navbar (220 px, collapses on mobile)** — contains the VetDesk logo (paw icon + teal wordmark) and four navigation links:
  1. Dashboard (`/dashboard`)
  2. Appointments (`/appointments`)
  3. Patients (`/patients`)
  4. Invoices (`/invoices`)
- **Light / Dark mode** — toggled via a sun/moon icon button in the header; the theme is managed by Mantine's color scheme system with custom CSS variable overrides for page and card backgrounds.

The root path `/` redirects to `/dashboard`.

---

## Data Model

### Owner
| Field | Type | Notes |
|-------|------|-------|
| id | string | e.g. `"o1"` |
| name | string | Full name |
| email | string | |
| phone | string | Philippine mobile format |

### Pet
| Field | Type | Notes |
|-------|------|-------|
| id | string | e.g. `"p1"` |
| name | string | Pet's name |
| species | `'dog' \| 'cat' \| 'rabbit' \| 'bird' \| 'other'` | |
| breed | string | |
| dateOfBirth | string | ISO date |
| weight | number | Kilograms |
| ownerId | string | Foreign key → Owner |
| photoUrl | string? | Optional |
| vaccinations | Vaccination[] | Embedded array |
| notes | string | Vet notes |

### Vaccination
| Field | Type | Notes |
|-------|------|-------|
| id | string | |
| name | string | Vaccine name (e.g. "Rabies") |
| date | string | Date administered (ISO date) |
| nextDueDate | string | ISO date |
| administeredBy | string | Vet's name |

### Appointment
| Field | Type | Notes |
|-------|------|-------|
| id | string | e.g. `"a1"` |
| petId | string | Foreign key → Pet |
| vetName | string | One of the three clinic vets |
| date | string | ISO datetime |
| duration | number | Minutes |
| reason | string | e.g. "Annual vaccination" |
| status | `'scheduled' \| 'completed' \| 'cancelled' \| 'no-show'` | |
| notes | string? | Optional post-visit notes |

### Invoice
| Field | Type | Notes |
|-------|------|-------|
| id | string | e.g. `"INV-1001"` |
| petId | string | Foreign key → Pet |
| appointmentId | string? | Optional link to an appointment |
| date | string | ISO date |
| items | InvoiceItem[] | Line items |
| status | `'draft' \| 'sent' \| 'paid' \| 'overdue'` | |

### InvoiceItem
| Field | Type |
|-------|------|
| description | string |
| quantity | number |
| unitPrice | number (₱) |

---

## Mock Data

The application ships with seed data representing a small clinic:

**Vets**: Dr. Maria Santos, Dr. James Reyes, Dr. Anna Cruz

**Owners (4)**:
- Mariel Santos, Carlo Reyes, Liza Garcia, Noel Cruz

**Pets (7)**:
| Name | Species | Breed | Owner |
|------|---------|-------|-------|
| Bantay | Dog | Aspin | Mariel Santos |
| Mochi | Cat | Persian | Mariel Santos |
| Snowy | Rabbit | Holland Lop | Carlo Reyes |
| Buddy | Dog | Shih Tzu | Carlo Reyes |
| Whiskers | Cat | Domestic Shorthair | Liza Garcia |
| Luna | Dog | Beagle | Liza Garcia |
| Tweety | Bird | Cockatiel | Noel Cruz |

**Appointments (12)**: ranging from late May 2026 through late June 2026 — a mix of completed, scheduled, cancelled, and no-show statuses.

**Invoices (8)**: `INV-1001` through `INV-1008`, linked to appointments where applicable, covering services like consultations, vaccines, grooming, flea treatment, and supplements.

---

## Pages & Features

### 1. Dashboard (`/dashboard`)

The dashboard is the clinic's at-a-glance summary screen.

**Stat cards (4 colored tiles):**
- **Total patients** — count of all pets on record (teal).
- **Appointments today** — count of appointments whose date matches the current day (blue).
- **Outstanding invoices** — combined total (₱) of all invoices in `sent` or `overdue` status (purple).
- **Vaccinations due** — count of individual vaccinations whose `nextDueDate` falls within the next 7 days (orange).

Each card features a large background icon at 12% opacity for visual texture.

**Recent appointments table** — the 5 most recent appointments sorted by date descending. Columns: Pet, Owner, Date, Status (colored badge).

**Upcoming appointments panel** — the next 5 scheduled appointments in chronological order. Each row shows pet name, owner, vet, date, and time. Empty state: "No upcoming appointments scheduled."

---

### 2. Appointments (`/appointments`)

Manages the clinic's schedule.

**Weekly calendar** — a 7-column grid (Sun–Sat) showing appointment blocks for the current week. Each block is color-coded by status:
- Blue = scheduled
- Green = completed
- Red = cancelled
- Purple = no-show

Each block shows the time, pet name, and owner name. Clicking a block opens the detail modal. Navigation arrows let staff move backward/forward by week; a "Today" button jumps back to the current week. Today's column header is highlighted in teal.

**Appointment detail modal** — opened by clicking any calendar block. Displays:
- Pet name + status badge
- Owner, vet, date & time, duration, reason, and notes
- A dropdown to update the appointment status in real time (changes are reflected immediately in the calendar without a page reload)

**New appointment modal** — opened via the "New Appointment" button (top-right). Form fields:
- Pet — searchable dropdown (shows pet name + owner name)
- Vet — dropdown of the three clinic vets
- Date & time — date-time picker
- Reason — text input (required)
- Notes — optional textarea

On submit, the appointment is added to the in-memory list, the calendar updates, and a teal toast notification confirms the action.

---

### 3. Patients (`/patients`)

Displays all registered pets as a card grid.

**Search & filter bar:**
- Text search field — filters by pet name, breed, or owner name (case-insensitive).
- Species segmented control — All / Dogs / Cats / Other (groups rabbit, bird, and `other` species together).

**Patient cards** — each card shows:
- Species emoji (🐶 🐱 🐰 🐦 🐾)
- Pet name and breed
- Owner avatar (initials) and name
- Next vaccination due badge — color-coded:
  - Red: overdue (date has passed)
  - Yellow: due within 30 days
  - Teal: due further out
- "View" button linking to the detail page

Empty state: "No patients match your search."

---

### 4. Patient Detail (`/patients/[id]`)

A full-detail view for a single pet, organized into three tabs.

**Header:** Pet name, breed, and owner name.

**Tab 1 — Overview:**
- A data grid showing species, breed, age (calculated live from date of birth as "X yr Y mo"), weight (kg), owner name, and owner phone.
- A read-only textarea showing the vet's notes for this patient.

**Tab 2 — Vaccinations:**
- A table of all vaccinations sorted by date descending. Columns: Vaccine name, Date given, Next due (shows a red "Overdue" badge if the date has passed), Administered by.
- An "Add Vaccination" button opens a modal with fields for vaccine name, date administered, next due date, and the administering vet. On submit, the new record is appended to the in-memory list and appears immediately in the table with a toast notification.

**Tab 3 — Visit history:**
- A table of all appointments linked to this pet, sorted newest first. Columns: Date, Vet, Reason, Status (colored badge), Duration (minutes).
- Empty state row if no visits exist.

---

### 5. Invoices (`/invoices`)

Manages the clinic's billing.

**Summary cards (3 tiles):**
- **Total paid** — sum of all `paid` invoices (green).
- **Total outstanding** — sum of all `sent` + `overdue` invoices (red).
- **Total draft** — sum of all `draft` invoices (gray).

**Status filter tabs:** All / Paid / Sent / Overdue / Draft — filters the table below.

**Invoice table** — columns: Invoice #, Pet, Owner, Date, Amount (₱), Status (colored badge), Actions (View button). Clicking a row or the View button opens the invoice drawer. Status badge colors:
- Green = paid
- Blue = sent
- Red = overdue
- Gray = draft

**Invoice drawer** (slides in from the right) — shows:
- Invoice ID in the drawer title
- Pet name, owner, and date
- Status badge
- Line-item table with description, quantity, unit price, and calculated amount per line
- Subtotal / Total
- "Print invoice" button (triggers `window.print()`)
- "Mark as Paid" button — disabled when the invoice is already paid; clicking it updates the invoice status in-memory immediately

---

## Theming

The app uses a **Mantine** theme configured in `src/theme.ts` and `src/theme.config.ts`:

- **Primary color**: teal
- **Default radius**: matches the design config
- **Paper / Card**: borderless, with a background from a CSS variable (`--surface-bg`) that switches between light (`#ffffff` area) and dark (`--mantine-color-dark-6`) modes
- **Modals / Drawers**: borderless with a custom box shadow
- **NavLink**: slightly rounded corners

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI library | Mantine v7 |
| Icons | Tabler Icons (`@tabler/icons-react`) |
| Date formatting | date-fns |
| State | React `useState` (no global state manager) |
| Data | In-memory mock (`src/data/mock.ts`) |
| Styling | Mantine CSS variables + `globals.css` |
| Fonts | Geist (via `next/font`) |