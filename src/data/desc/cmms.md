# CMMS — Computerized Maintenance Management System
## Application Description

---

## Overview

This application is a **Computerized Maintenance Management System (CMMS)** — a web-based platform built to help organizations track, manage, and maintain a fleet of vehicles and heavy equipment. It provides a centralized database for asset profiles, maintenance history, inspection records, and supporting documentation including images and files.

The system is designed for organizations that operate mixed fleets (vehicles and heavy equipment) across multiple project sites. It enables maintenance teams to log service activities, monitor operational status, and track asset certifications, while giving administrators control over data integrity through role-based access.

---

## Target Users

| Role | Capabilities |
|------|-------------|
| **Admin** | Full access: create, read, update, and delete all records and assets |
| **Viewer** | Read-only access: browse assets, view maintenance history, and filter records |

Admin status is tied to a specific authenticated user ID (UID) in Firebase Auth, making the permission model simple and auditable.

---

## Technology Stack

### Frontend
- **React 18** — component-based UI framework
- **TypeScript 5** — static typing throughout the codebase
- **Vite 5** — fast build tooling with hot module replacement
- **React Router DOM 6** — client-side routing between pages
- **React Hook Form 7** — efficient, validated form management

### Styling
- **Styled Components 6** — CSS-in-JS for scoped, themeable styles
- **Ant Design (antd) 5** — primary component library (Tables, Modals, Forms, Tabs, etc.)
- **Material UI (MUI) 5** — supplementary UI components
- **Ant Design Icons / React Icons** — icon libraries

### Backend & Cloud Services
- **Firebase Firestore** — real-time NoSQL document database
- **Firebase Authentication** — email/password login and session management
- **Firebase Storage** — file and image storage with resumable uploads
- **Firebase Performance Monitoring** — runtime performance telemetry

### Utilities
- **dayjs** — date parsing, formatting, and comparison
- **uuid** — unique ID generation for records
- **dotenv / Vite env** — environment variable management

---

## Application Structure

```
cmms/
├── src/
│   ├── App.tsx                      # Root router and route definitions
│   ├── main.tsx                     # App entry point
│   ├── assets/Theme.ts              # Centralized design tokens (colors, spacing)
│   ├── components/                  # Shared, reusable UI components
│   ├── config/firebase.ts           # Firebase SDK initialization
│   ├── data/                        # Data layer: types, hooks, helpers, filters
│   ├── features/                    # Feature-specific components and logic
│   │   ├── Login/
│   │   ├── MaintenanceTable/
│   │   ├── MaintenanceDataEntry/
│   │   └── VehiclesPage/
│   ├── hooks/                       # Shared custom React hooks
│   ├── Layout/                      # App shell: sidebar, toolbar
│   └── pages/                       # Top-level routed page components
├── architecture/                    # Interface and data model definitions
├── dockerfile                       # Docker container configuration
└── package.json
```

---

## Pages and Navigation

The app uses a persistent sidebar layout with the following routes:

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Email/password authentication form |
| Vehicles | `/vehicles` | Browse and manage vehicle assets |
| Equipments | `/equipments` | Browse and manage equipment assets |
| Maintenance | `/maintenance` | Log and review maintenance records |
| Inspection | `/inspection` | Log and review inspection records |
| 404 | `*` | Not Found fallback page |

Protected routes redirect unauthenticated users to the login page. The sidebar navigation provides quick access to all sections.

---

## Features

### 1. Authentication

- Email and password login via Firebase Authentication
- Persistent session management (users stay logged in across browser refreshes)
- Logout button in the sidebar
- Admin role is determined by matching the authenticated user's UID against a configured admin UID
- Non-admin users see a read-only version of the UI (buttons disabled, edit/delete options hidden)

---

### 2. Vehicle Management

The Vehicles page displays all vehicle assets in a card grid layout.

**Asset Card:**
- Shows the vehicle's primary image (or a placeholder), unit name, and plate number
- Red border if the asset's expiration date has passed or is within 7 days
- Hover overlay reveals a delete button (admin only)
- Click opens the full Asset Profile Modal

**Asset Profile Modal:**
- Displays all profile fields: Unit, Year Model, Plate No, Series, Engine Number, Chassis No, Maker, Status, Project Engaged
- Supports adding custom profile fields beyond the standard set
- Editable fields inline (admin only) with save confirmation
- Expiration date display and editing
- Inspection date range (start and end dates)
- Tabbed image/document management organized into named folders

**Adding a Vehicle (Admin):**
- "Add Vehicle" button opens the Add Asset Modal
- Fields: Unit name, plate number, year model, status, project engaged, and more
- After creation the asset appears immediately in the grid via Firestore real-time sync

**Image & Document Management:**
- Multiple images per asset, each stored in Firebase Storage
- Images organized into labeled folders (e.g., "OR/CR", "Insurance", "LTO")
- New folders can be created with custom labels
- Individual image deletion or folder-level bulk operations
- Documents follow the same folder structure

**Filtering (Vehicles):**
- Filter button opens a Filter Modal
- Filter by any profile field value (case-insensitive match)
- Filter by expiration status (expired, expiring soon, or all)
- Filters compose — multiple criteria applied simultaneously

**Search:**
- Live search bar filters assets by plate number as the user types

---

### 3. Equipment Management

The Equipments page mirrors the Vehicles page in structure and functionality but targets heavy equipment assets (backhoes, generators, etc.).

- Same card grid layout, profile modal, add/edit/delete workflow
- Same image and document folder management
- Same filtering and expiration tracking
- Asset type is stored as `"Equipment"` in Firestore to distinguish from `"Vehicle"`

---

### 4. Maintenance Records

The Maintenance page displays all maintenance service records in an editable table.

**Table Columns:**
| Column | Description |
|--------|-------------|
| Plate No | Links the record to a specific vehicle/equipment |
| Service | Type of service performed (e.g., oil change, tire replacement) |
| Cost | Monetary cost of the service |
| Mileage | Vehicle mileage at the time of service |
| Status | Operational or Non-operational |
| Project Engaged | Which project the asset is assigned to |
| Notes | Free-text notes |
| Actions | Edit / Delete buttons (admin only) |

**Adding a Record:**
- "Add Maintenance" opens the Maintenance Data Entry form
- Fields validated before submission
- Record saved to Firestore and appears in the table immediately

**Inline Editing:**
- Each row has an Edit button that switches the row to edit mode
- Fields become input controls within the table row
- Save confirms changes; Cancel reverts

**Deletion:**
- Delete button triggers a confirmation modal before removal

---

### 5. Inspection Records

The Inspection page is structurally identical to the Maintenance page but stores records with an `isInspection: true` flag in Firestore, keeping the two datasets logically separated while sharing the same component architecture.

- Same table columns and inline editing behavior
- Same add/edit/delete workflow
- Separate route and navigation entry

---

## Data Models

### Asset

```typescript
{
  uid: string;                        // Firestore document ID
  type: "Vehicle" | "Equipment";
  profile: {
    Unit: string;
    Year_Model: string;
    Plate_No: string;
    Series: string;
    Engine_Number: string;
    Maker: string;
    Status: string;
    Chassis_No: string;
    Project_Engaged: {
      firstOption: "PGPC" | "APRI";
      secondOption: "TIWI" | "MAKBAN";
    };
    [key: string]: any;               // Custom extensible fields
  };
  images: Array<{
    downloadURL: string;
    createdAt: Timestamp;
  }>;
  imageFolders: Array<{
    label: string;
    images: Array<{ downloadURL: string; createdAt: Timestamp }>;
  }>;
  docs: any[];
  expirationDate: Timestamp | null;
  inspectionStart: Timestamp | null;
  inspectionEnd: Timestamp | null;
}
```

### Maintenance Record

```typescript
{
  uid: string;                        // Firestore document ID
  AssetUid: string;                   // Reference to the related asset
  Plate_No: string;
  Service: string;
  Cost: number;
  Mileage: number;
  Status: "Operational" | "Non-operational";
  Project_Engaged: {
    firstOption: "PGPC" | "APRI";
    secondOption: "TIWI" | "MAKBAN";
  };
  Notes: string;
  isInspection: boolean;
  createdAt: Timestamp;
}
```

---

## Project Engaged Field

Assets and maintenance records track which project engagement they belong to via a paired dropdown:

| First Option | Second Option |
|-------------|--------------|
| PGPC | TIWI |
| APRI | TIWI |
| APRI | MAKBAN |

This reflects the organization's project structure across geographically distinct sites (Tiwi and Makban) under different project entities (PGPC, APRI).

---

## Architecture Patterns

### Custom Hooks
- `useData()` — centralized Firestore subscriptions for assets and records; exposes CRUD operations
- `useAuth()` — wraps Firebase Auth, exposes `user`, `isAdmin`, `logout`
- `useVehiclesPage()` — page-scoped state (selected asset, modal visibility, filters, search query) exposed via React Context
- `useAssetProfileModal()` — manages all state and operations within the asset detail modal
- `useModal()` — generic modal open/close state
- `usePlateSearch()` — debounced search over plate numbers

### Context API
The `VehiclesPageContext` wraps the vehicles and equipment pages, making shared state (selected asset, filter state, modal toggles) available to deeply nested child components without prop drilling.

### Real-time Sync
Firestore `onSnapshot` listeners update UI state automatically whenever data changes in the database. Listeners are cleaned up on component unmount to prevent memory leaks.

### Form Management
React Hook Form `Controller` wraps custom input components (dropdowns, number inputs, date pickers) to integrate them with the form's validation and submission lifecycle.

### Filtering Architecture
Filters are composed as plain objects and applied in `dataFilters.ts`. Each filter criterion checks a profile field with case-insensitive string matching. Expiration filters apply date arithmetic using `dayjs`. Multiple active filters are ANDed together.

---

## Deployment

The project includes a `dockerfile` for containerized deployment. Environment variables for Firebase configuration are injected at build time via Vite's `import.meta.env` mechanism:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Build output is a static SPA that can be served from any static host or container.

---

## Key UX Behaviors

- **Expiration warnings**: Asset cards show a red border when the expiration date is within 7 days or already past, giving immediate visual feedback without opening the asset.
- **Optimistic UI**: Firestore real-time listeners mean the UI reflects changes instantly after writes without manual refresh.
- **Role-aware UI**: Admin-only controls (Add, Edit, Delete buttons) are hidden or disabled for viewer accounts — the same components render for both roles, keeping the codebase unified.
- **Inline table editing**: Maintenance and inspection records are edited in-place within the table row, reducing context switching.
- **Folder-based media organization**: Images and documents per asset are grouped into named folders (e.g., LTO documents, insurance certificates), making it easy to locate specific paperwork.
- **Message feedback**: Success, error, and info toasts appear after data operations to confirm outcomes without blocking the UI.