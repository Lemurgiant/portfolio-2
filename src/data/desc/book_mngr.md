# CaptiBook — Application Description

## Overview

CaptiBook is a full-stack reading tracker and personal learning management application. It helps users build consistent reading habits, measure their reading productivity, and capture knowledge from the books they read. The app targets students and avid readers who want to track how much they read, how fast they read, and what they learn — all in one place.

The application is deployed on Render with a React frontend (`captibookfinal-2.onrender.com`) and a Node.js/Express backend (`captibookfinal-1.onrender.com`) backed by MongoDB.

---

## Tech Stack

### Frontend
- **React 18.2** with **TypeScript** — component-based UI
- **Vite** — build tool and dev server
- **React Router DOM v6** — client-side routing with protected routes
- **Redux Toolkit** — global client state management
- **React Query (TanStack Query)** — server state, caching, and data fetching
- **Styled Components** — CSS-in-JS with theme injection
- **Material-UI** — pre-built UI components
- **Framer Motion & React Spring** — animations and transitions
- **Chart.js & D3.js** — data visualization and productivity charts
- **Axios** — HTTP client with credentials (cookies)

### Backend
- **Node.js** with **Express.js** — REST API server
- **MongoDB** with **Mongoose** — document database and ODM
- **Passport.js** — authentication middleware (Local + Google OAuth 2.0 strategies)
- **JWT & bcryptjs** — token generation and password hashing
- **Nodemailer** — transactional email for account verification
- **Express Session** — session management with secure cookies

---

## Authentication & User Management

### Sign-up Flow
1. User fills in name, email, and password on the Sign-Up page.
2. Input is validated on the frontend and backend.
3. The password is hashed with bcrypt and the user record is saved to MongoDB.
4. A unique email verification token is generated and emailed to the user via Nodemailer/SMTP.
5. The user must click the verification link before they can log in.

### Login Flow
- **Local (email + password):** Passport Local Strategy validates credentials and creates an authenticated session.
- **Google OAuth 2.0:** Users can sign in via Google. Passport Google Strategy handles the OAuth handshake and either creates a new user or links to an existing account by Google ID.

### Session & Security
- Sessions are managed with `express-session` and secure, HTTP-only cookies.
- A `GET /protected` endpoint is used by the frontend to check authentication state on app load.
- A `GET /logout` endpoint destroys the session and clears the cookie.

### Profile Management
- Users can update their **display name** at any time from the Settings page.
- Users can upload a **profile picture** (stored as a base64-encoded string in MongoDB).
- A default avatar is generated if no picture is uploaded.
- Users can select between **two visual themes** (original warm theme and a green theme), which is persisted per user.

---

## Core Features

### 1. Book Library

Users maintain a personal library of books they are reading or plan to read.

- Books are **searched and added** via the **Google Books API** — users browse results and add books by clicking.
- Each book entry stores: title, authors, Google Books ID, and cover image URL.
- Users can **delete books** from their library.
- The library page displays all saved books as a browsable collection.

### 2. Reading Session Tracker (Habit Tracker)

The Habit Tracker is where users log individual reading sessions to build a measurable reading habit.

**Session Recording:**
1. User selects a book from their library.
2. User enters the **starting page number** and **target ending page number**.
3. A **stopwatch/timer** tracks how long the session lasts.
4. When the session ends, the user saves or discards it.

**Calculated Metrics per Session:**
- **Duration** (seconds)
- **Pages read** (end page minus start page)
- **Pages per minute** (reading speed)

All sessions are stored in MongoDB with a reference to the book and the session date.

### 3. Productivity Dashboard (Home Page)

The Home Page is the central analytics dashboard showing reading productivity over time.

**What it displays:**
- **Charts and graphs** (Chart.js / D3.js) visualizing reading history across all books.
- **Per-book aggregate metrics:**
  - Total duration (seconds)
  - Total pages read
  - Average reading speed (pages per minute)
  - Most recent reading date
- **Session history** — a chronological list of all reading sessions across the library.

Data is fetched via a MongoDB aggregation pipeline that joins session records with their corresponding book entries.

### 4. Book Insights

After reading, users can capture and review knowledge from each book using three structured insight types.

**Insight Types:**
- **Summaries** — Freeform notes and key takeaways, with an optional page reference.
- **Quotes** — Verbatim quotes from the book, with source/page references.
- **Terms** — Key vocabulary or concepts with their definitions.

**Capabilities:**
- Create, edit, and delete insights for any book in the library.
- Each insight records a creation date.
- The UI uses a tab-based layout — one tab per insight type — for each book.

### 5. Settings & Personalization

The Settings page allows users to manage their account and personalize the app experience:
- **Display name** — update the name shown throughout the app.
- **Profile picture** — upload a custom avatar image.
- **Theme selection** — switch between the two color themes; the preference is saved server-side and persists across devices.
- Real-time success/error feedback is shown for each setting update.

---

## Data Models

### User
| Field | Type | Description |
|---|---|---|
| email | String (unique) | Login identifier |
| password | String | bcrypt-hashed |
| googleId | String | Google OAuth ID |
| name | Object | First name, last name |
| displayName | String | Shown in the UI |
| profileImage | String | Base64-encoded image |
| theme | Number (0 or 1) | Theme preference |
| emailVerificationToken | String | Token for verification email |
| emailVerificationExpires | Date | Token expiry |
| isVerified | Boolean | Whether email is confirmed |

### BookCollection (Library Entry)
| Field | Type | Description |
|---|---|---|
| bookId | String | Google Books API ID |
| title | String | Book title |
| authors | Array\<String\> | Author list |
| coverImageUrl | String | Book cover thumbnail |
| user | ObjectId → User | Owner reference |

### SessionCollection (Reading Session)
| Field | Type | Description |
|---|---|---|
| durationInSeconds | Number | Session length |
| pagesRead | Number | Pages completed |
| pagesReadPerMinute | Number | Reading speed |
| date | Date | Session timestamp |
| bookImageUrl | String | Cover image snapshot |
| bookCollection | ObjectId → BookCollection | Book reference |

### Summary / Quote / Term (Insights)
| Field | Type | Description |
|---|---|---|
| content | String | The insight text |
| definition | String | (Terms only) Definition |
| reference | String | Optional page/source ref |
| date | Date | Creation timestamp |
| bookCollection | ObjectId → BookCollection | Book reference |

---

## API Endpoints

### Authentication
| Method | Route | Description |
|---|---|---|
| POST | `/api/signup` | Register a new user |
| GET | `/api/verify-email` | Confirm email via token |
| POST | `/api/login` | Log in with email + password |
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/protected` | Check session auth status |
| GET | `/logout` | Destroy session |

### Book Library
| Method | Route | Description |
|---|---|---|
| GET | `/api/get-all-bookcollection-data` | Get all user books |
| POST | `/api/add-one-bookcollection-data` | Add a book |
| DELETE | `/api/delete-one-bookcollection-data/:id` | Remove a book |

### Reading Sessions
| Method | Route | Description |
|---|---|---|
| POST | `/api/record-productivity-data` | Save a reading session |
| GET | `/api/get-all-productivity-data` | Get all sessions (with book data via aggregation) |

### Insights
| Method | Route | Description |
|---|---|---|
| POST | `/api/add-one-summary-data` | Create a summary |
| PATCH | `/api/update-one-summary-data/:id` | Edit a summary |
| DELETE | `/api/delete-one-summary-data/:id` | Delete a summary |
| POST | `/api/add-one-quote-data` | Create a quote |
| PATCH | `/api/update-one-quote-data/:id` | Edit a quote |
| DELETE | `/api/delete-one-quote-data/:id` | Delete a quote |
| POST | `/api/add-one-term-data` | Create a term |
| PATCH | `/api/update-one-term-data/:id` | Edit a term |
| DELETE | `/api/delete-one-term-data/:id` | Delete a term |

### User Profile
| Method | Route | Description |
|---|---|---|
| POST | `/api/update-user-image` | Upload profile picture |
| POST | `/api/update-user-display-name` | Change display name |
| POST | `/api/update-user-theme` | Switch theme |

---

## Frontend Pages & Routing

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Productivity dashboard with charts and session history |
| `/library` | LibraryPage | Browse and manage personal book collection |
| `/habittracker` | HabitTrackerPage | Log reading sessions with timer |
| `/bookinsights` | BookInsightsPage | Manage summaries, quotes, and terms per book |
| `/settings` | SettingsPage | Account settings and theme selection |
| `/login` | LoginPage | Email/password login |
| `/signup` | SignUpPage | Account registration |

All pages except `/login` and `/signup` are wrapped in a `ProtectedRoute` component that redirects unauthenticated users to `/login`.

---

## Architecture Patterns

- **Protected Routes** — `ProtectedRoute` component gates all authenticated pages.
- **Custom Hooks** — API logic is encapsulated in dedicated hooks: `useAuthApi`, `useRegisterApi`, `useBookTrackingApi`, `useInsightsApi`, etc.
- **React Query** — Manages all server state: fetching, caching, and invalidating data on mutations.
- **Redux Toolkit** — Manages global client-side state (e.g., selected book in session tracker).
- **Context API** — Used for complex page-level state (e.g., `BookInsightsPage`, `SettingsInstance`).
- **Styled Components + ThemeProvider** — Theme object is injected globally; components read color values from the theme, enabling seamless theme switching.
- **Axios with `withCredentials: true`** — Ensures session cookies are sent on every request to the backend.
- **MongoDB Aggregation** — The productivity endpoint uses `$lookup` to join session documents with their book documents server-side.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app secret |
| `SESSION_SECRET` | Express session signing secret |
| `SMTP_*` | Nodemailer SMTP credentials for verification emails |
| `FRONTEND_URL` | Allowed CORS origin (frontend URL) |
| `BACKEND_URL` | Callback URL base for Google OAuth |

---

## Deployment

- **Frontend** — Deployed on Render as a static site: `captibookfinal-2.onrender.com`
- **Backend** — Deployed on Render as a web service: `captibookfinal-1.onrender.com`
- **Database** — MongoDB Atlas (cloud-hosted)
- CORS is configured on the backend to allow requests from the frontend origin with credentials.