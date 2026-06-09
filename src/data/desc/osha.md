# SafeOps — OSHA Compliance Dashboard: Full App Description

## Overview

SafeOps is a web-based workplace safety and OSHA compliance management dashboard. It is designed for construction and industrial environments where organizations must track, document, and analyze safety activity across multiple work sites. The application gives safety officers and site managers a single interface to submit compliance forms, monitor performance trends, receive AI-generated safety reports, and respond to compliance alerts — all without a backend server or database, using the browser's local storage for persistence.

---

## Purpose and Target Users

The app targets organizations that operate under OSHA regulations and need a structured, auditable record of:

- Daily safety walkthroughs
- Incident and near-miss events
- Toolbox training sessions held with workers
- Equipment inspection results
- Hazard identification and risk ratings

Users are safety officers, site supervisors, and compliance managers who need quick data entry, visibility into compliance health across sites, and AI-assisted narrative reporting for internal or external audits.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19.2.6 with TypeScript |
| Build Tool | Vite 8.0.12 |
| Styling | CSS-in-JS (inline style objects) |
| Charts | Recharts 3.8.1 |
| Icons | Lucide-react 1.17.0 |
| State Management | React hooks (useState, useContext, useCallback) |
| Persistence | Browser LocalStorage (custom wrapper) |
| AI Integration | OpenAI GPT-4.1 via Vite dev proxy |
| Testing | Playwright 1.60.0 |
| Linting | ESLint with TypeScript plugin |

---

## Core Features

### 1. Five Compliance Form Types

The app supports five distinct form schemas, each representing a real-world OSHA compliance workflow:

#### Daily Safety Inspection (prefix: DSI)
A structured walkthrough checklist for verifying site safety at the start or end of a workday. Contains 6 pass/fail checklist items (e.g., PPE availability, hazard marking, fire extinguisher accessibility). The score is the percentage of items marked "Pass." Submissions scoring below 80% are flagged as "open."

#### Incident and Near-Miss Report (prefix: INC)
Used to document accidents or near-miss events. Captures incident type (injury, property damage, near-miss, environmental), severity (minor, moderate, critical, OSHA recordable), description, and corrective actions. Critical or OSHA recordable incidents are automatically flagged "open" regardless of score, signaling they require follow-up.

#### Toolbox Talk Log (prefix: TBX)
Records safety training sessions held on-site. Fields include the safety topic discussed, number of attendees, and meeting notes. Uses a boolean checklist (e.g., "Sign-in sheet collected", "Topic was OSHA relevant") to determine a compliance score.

#### Equipment Inspection (prefix: EQI)
Validates the safety status of specific pieces of equipment before use. A 5-item pass/fail checklist covers items like fluid levels, structural integrity, safety guards, and operator certification. Scores below 80% flag the inspection as open.

#### Hazard Assessment (prefix: HZA)
Documents identified hazards with fields for hazard type, description, likelihood (1–5), consequence (1–5), and control measures. The residual risk is rated Low, Medium, or High. High residual risk assessments are automatically flagged "open."

---

### 2. Five Dashboard Views

For each form type, the user can switch between five views:

#### Submissions View
Displays all submissions for the selected form type in a sortable table. Columns include submission ID, date, site, inspector, score, and status. A filter toolbar lets users narrow results by status (Complete / Open / Incomplete). A KPI bar at the top shows aggregate statistics: total submissions, average score, number of open items, and completion rate.

#### Analytics View
Renders interactive charts powered by Recharts:
- **5-Week Compliance Trend Line:** Shows the rolling compliance score for the selected form over the past five weeks, with a dashed reference line at 90% (the OSHA compliance target). Color fills indicate whether performance is above or below target.
- **Weekly Submission Volume Bar Chart:** Shows how many submissions were logged each week, helping identify drops in activity.

#### Reports View
Allows users to generate an AI-written safety performance summary for the selected form type. The report is produced by OpenAI GPT-4.1, which receives the recent submission data and trend figures and returns a narrative analysis suitable for management or compliance records. Reports are stored in LocalStorage so they persist across browser sessions. The view also displays a history of all previously generated reports with timestamps.

#### Alerts View
A chronological timeline of compliance events for the selected form type. Each alert has a severity level (danger, warning, success) and a descriptive message (e.g., "Score dropped below OSHA threshold on Site B"). Alerts are color-coded and icon-decorated to make critical items immediately visible.

#### Answer Form View
The data-entry interface for submitting a new compliance record. The form renders dynamically based on the selected form type's schema. It includes:
- Text, select, and textarea fields for structured data
- Pass/Fail or boolean checklist sections
- A live score counter that updates in real time as the user marks checklist items
- A warning banner that appears automatically when the form detects a critical condition (OSHA recordable incident, high residual risk hazard)
- Form validation that prevents submission if required fields are empty or checklist items are unanswered

On successful submission, a success screen confirms the record was saved, shows the final score and derived status, and offers a button to submit another form.

---

### 3. Theme System

The app supports dark mode and light mode. A toggle in the top navigation bar switches between the two. The theme is managed through a React context (ThemeContext) and applies a comprehensive set of 16 color tokens across every component:

- Background (primary, secondary, tertiary)
- Text (primary, secondary, muted)
- Border
- Accent (base, muted, contrast)
- Status colors: danger, warning, success, info (each with a muted variant)

All component styles consume these tokens via the context, so switching themes updates the entire UI instantly.

---

### 4. Navigation Structure

The app shell consists of:

- **TopBar** — App name/logo, form type selector, theme toggle
- **FormSelector** — Horizontal tab row for choosing between the five form types
- **ViewSwitcher** — Horizontal tab row for switching between the five views within a form type
- **HeroStatBar** — KPI summary bar rendered above the active view

---

### 5. Data Persistence

Form submissions created during a session are held in React state (in-memory). AI-generated reports are persisted in LocalStorage using a thin wrapper (`src/lib/storage.ts`) so they survive page refreshes. The app ships with pre-populated sample data for all five form types so the dashboard is immediately useful for demonstration or training.

---

## Sample Data

The app initializes with realistic pre-populated sample submissions:

**Work sites:**
- Site A — Tower 3
- Site B — Riverside Plaza
- Site C — North Annex
- Warehouse Unit 2

**Sample staff:**
- Marcus Reyes
- Dana Whitfield
- Carlos Nuñez
- Priya Anand
- Leon Brackett

Each form type has 7–8 base sample rows with varied scores, dates, sites, and statuses. Five weeks of trending analytics data are also included for each form, showing realistic compliance trajectories (e.g., Daily Inspection trending from 79% → 93% over five weeks).

---

## Data Models

### Key TypeScript Types

```typescript
type FormType = 'daily' | 'incident' | 'toolbox' | 'equipment' | 'hazard';
type ViewTab  = 'submissions' | 'analytics' | 'reports' | 'alerts' | 'answer';
type RowStatus = 'complete' | 'open' | 'incomplete';

interface RowData {
  id: string;
  date: string;
  site: string;
  inspector: string;
  score: number | null;
  status: RowStatus;
  answers?: Record<string, string>;
  checks?: Record<string, boolean | 'pass' | 'fail'>;
}

interface FormSchema {
  id: FormType;
  label: string;
  prefix: string;
  fields: FieldDef[];
  checks: CheckDef[];
  checkType: 'passfail' | 'boolean';
}

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
}

interface CheckDef {
  key: string;
  label: string;
}

interface WeekPoint {
  week: string;
  score: number;
  count: number;
}

interface AlertEntry {
  id: string;
  type: 'danger' | 'warning' | 'success';
  message: string;
  timestamp: string;
}

interface ReportEntry {
  id: string;
  formName: string;
  text: string;
  createdAt: string;
}
```

---

## Scoring and Status Logic

### Score Calculation

- **Pass/Fail forms** (Daily Inspection, Equipment Inspection): `score = (pass_count / total_checks) * 100`
- **Boolean forms** (Toolbox Talk): `score = (true_count / total_checks) * 100`
- **Non-checklist forms** (Incident Report, Hazard Assessment): score is derived from the severity/risk field

### Status Derivation

| Form Type | Open Condition |
|---|---|
| Daily Inspection | Score < 80% |
| Incident Report | Severity is "critical" or "osha_recordable" |
| Toolbox Talk | Score < 80% |
| Equipment Inspection | Score < 80% |
| Hazard Assessment | Residual risk is "High" |

Any submission not matching the open condition and with all required data filled is marked "complete." Partially filled submissions (before final save) are "incomplete."

### OSHA Compliance Target

The app uses 90% as the OSHA compliance benchmark. The analytics view renders a dashed 90% reference line on all trend charts. Submissions below this threshold trigger warning alerts.

---

## AI Integration

The Reports view calls the OpenAI Chat Completions API:

- **Model:** `gpt-4.1`
- **Temperature:** `0.4` (low randomness for consistent, professional output)
- **System prompt:** "You are an expert workplace safety and OSHA compliance analyst."
- **User prompt:** Includes recent submission summaries, average scores, trend data, and open item counts for the selected form type.
- **API routing:** Vite's dev server proxies `/api/openai` requests, injecting the `Authorization: Bearer` header from the `.env` file so the API key is never exposed to the browser.

Generated reports are cached in LocalStorage keyed by form type, and the full report history is accessible in the Reports view.

---

## Project File Structure

```
osha/
├── src/
│   ├── App.tsx                        # Root component; owns view/form state and routing
│   ├── main.tsx                       # React DOM entry point
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx             # App header with title and theme toggle
│   │   │   ├── FormSelector.tsx       # Form type tabs
│   │   │   ├── ViewSwitcher.tsx       # View tabs within a form type
│   │   │   └── HeroStatBar.tsx        # KPI summary bar
│   │   ├── views/
│   │   │   ├── SubmissionsView.tsx    # Table view with filtering
│   │   │   ├── AnalyticsView.tsx      # Recharts trend and volume charts
│   │   │   ├── ReportsView.tsx        # AI report generation and history
│   │   │   ├── AlertsView.tsx         # Compliance alert timeline
│   │   │   ├── AnswerFormView.tsx     # Form entry with live scoring
│   │   │   └── SuccessView.tsx        # Post-submission confirmation screen
│   │   └── ui/
│   │       ├── ScoreBadge.tsx         # Color-coded score display
│   │       ├── StatusBadge.tsx        # complete/open/incomplete badge
│   │       ├── PassFail.tsx           # Pass/Fail toggle button pair
│   │       ├── Cell.tsx               # Table cell wrapper
│   │       └── WarningBanner.tsx      # Critical-condition alert banner
│   ├── context/
│   │   └── ThemeContext.tsx           # Dark/light mode provider
│   ├── hooks/
│   │   ├── useSubmissions.ts          # Submission CRUD state management
│   │   └── useReports.ts             # Report generation and LocalStorage sync
│   ├── data/
│   │   ├── schema.ts                  # Form schemas for all 5 form types
│   │   ├── rows.ts                    # Sample submission data
│   │   ├── themes.ts                  # Dark and light color token objects
│   │   ├── weeklyTrends.ts            # 5-week analytics sample data
│   │   └── alerts.ts                  # Sample alert entries per form type
│   ├── lib/
│   │   └── storage.ts                 # LocalStorage read/write wrapper
│   └── types/
│       └── index.ts                   # All shared TypeScript interfaces
├── vite.config.ts                     # Vite build config + OpenAI API proxy
├── tsconfig.app.json                  # TypeScript config for app source
├── tsconfig.node.json                 # TypeScript config for build scripts
├── eslint.config.js                   # ESLint rules
├── package.json                       # Scripts and dependencies
├── .env                               # OpenAI API key (not committed)
└── verify.mjs                         # Playwright screenshot/verification script
```

---

## Build and Development Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run lint` | Run ESLint across all TypeScript/TSX files |
| `npm run preview` | Serve the production build locally |

---

## Testing and Verification

A Playwright script (`verify.mjs`) automates visual verification:

- Launches the app in a headless browser
- Navigates through all five views for each form type
- Captures screenshots in both dark and light modes
- Tests the form submission workflow end-to-end
- Validates that success messages appear and submitted data is reflected in the table
- Stores all screenshots in a `.shots/` directory for review

---

## Design Decisions

- **No backend required:** All data lives in React state and LocalStorage. This makes the app trivially deployable as a static site.
- **Inline styles over CSS files:** Every component uses style objects built from theme tokens, ensuring type-safe, theme-aware styling without a CSS preprocessor or class-name convention.
- **Schema-driven forms:** The AnswerFormView renders entirely from the selected form's schema definition. Adding a new form type requires only a new schema entry in `schema.ts` and corresponding sample data — no new view components needed.
- **AI as a reporting layer, not a core dependency:** The app is fully functional without the OpenAI key. The Reports view degrades gracefully, showing an error state if the API call fails while all other views continue to work normally.