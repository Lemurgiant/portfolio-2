# CareOps Forms — Full App Description

## What It Is

A **React-based healthcare compliance management web app** for skilled nursing facilities (SNFs). It lets staff fill out compliance forms, view submission history and analytics, generate AI-written compliance reports, and build custom forms — all governed by a comprehensive Role-Based Access Control (RBAC) system that enforces least-privilege access, protects resident PHI in accordance with HIPAA, and generates an immutable audit trail for every user action.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3.1 |
| Bundler | Vite 6 |
| Form engine | SurveyJS (survey-core, survey-react-ui, survey-creator-react) |
| Charts | Recharts |
| Icons | Lucide React |
| AI reports | OpenAI API (GPT-4.1) |
| Storage | React state + `localStorage` |
| Access control | Custom RBAC context (`RBACContext`) — role definitions, permission maps, `usePermissions()` hook |
| Auth session | `localStorage` session token (dev) — swap for JWT/OAuth in production |
| Audit trail | `useAuditLog()` hook — append-only localStorage log (`corestedAuditLog`) |

---

## File Structure

```
shadow/round/
├── .env                        # API keys (OpenAI, SurveyJS license)
├── vite.config.js              # Build config + Anthropic API proxy
├── index.html                  # HTML entry point
├── core.jsx                    # Legacy monolithic file (unused)
└── src/
    ├── main.jsx                # App bootstrap, SurveyJS license init
    ├── App.jsx                 # Central state container + routing logic
    │                           #   wraps RBACProvider + checks auth
    ├── context/
    │   ├── ThemeContext.jsx     # Dark/light theme colors + useT() hook
    │   └── RBACContext.jsx     # [NEW] Role definitions, permission maps,
    │                           #   RBACProvider, usePermissions() hook,
    │                           #   useCurrentUser() hook
    ├── hooks/
    │   ├── useRows.js          # Manages form submission data
    │   ├── useReports.js       # OpenAI report generation + caching
    │   └── useAuditLog.js      # [NEW] Append-only audit event recorder;
    │                           #   reads/writes corestedAuditLog in localStorage
    ├── components/
    │   ├── TopBar.jsx          # Header bar — now shows current user chip + role badge
    │   ├── ViewSwitcher.jsx    # Tab nav — tabs hidden/disabled per role permissions
    │   ├── FormSelector.jsx    # Searchable form dropdown
    │   ├── LoginView.jsx       # [NEW] Mock login screen with role selector (dev);
    │                           #   production: replace with SSO/OIDC redirect
    │   ├── AccessDenied.jsx    # [NEW] Shown when a role lacks permission for a view
    │   └── ui/
    │       ├── Cell.jsx            # Smart table cell renderer
    │       ├── ScoreBadge.jsx      # Green/amber/red compliance score
    │       ├── StatusBadge.jsx     # Complete/Incomplete/Draft badge
    │       ├── PassFail.jsx        # Pass/Fail indicator
    │       ├── SectionLabel.jsx    # Form section header
    │       ├── FormField.jsx       # Reusable form input
    │       └── RoleBadge.jsx       # [NEW] Colored chip displaying user role label
    ├── views/
    │   ├── SubmissionsView.jsx     # Table of all submissions
    │   │                           #   Redact PHI columns per role
    │   │                           #   Delete row button only for DON+
    │   ├── AnalyticsView.jsx       # Metrics cards + charts
    │   ├── ReportsView.jsx         # AI QAPI report display
    │   │                           #   Generate button gated to Charge Nurse+
    │   ├── AlertsView.jsx          # Alert timeline
    │   ├── AnswerFormView.jsx      # SurveyJS form filling
    │   │                           #   Submission gated to roles with submit_forms
    │   ├── FormBuilderView.jsx     # Drag-and-drop form builder
    │   │                           #   Entire view gated to IT Admin / Super Admin
    │   ├── SuccessView.jsx         # Submission confirmation
    │   ├── FormatReport.jsx        # Markdown-style report renderer
    │   └── AuditLogView.jsx        # [NEW] Paginated audit event table
    │                               #   Visible only to Compliance Officer / Super Admin
    ├── data/
    │   ├── forms.js            # 4 predefined healthcare forms
    │   ├── rows.js             # Sample submission data + weekly metrics
    │   ├── alerts.js           # Pre-defined alerts per form
    │   ├── surveyForms.js      # SurveyJS JSON form definitions
    │   ├── schema.js           # Backup schema (unused by app)
    │   └── rbac.js             # [NEW] ROLE_DEFINITIONS[], PERMISSION_MAP{},
    │                           #   DEMO_USERS[] for dev login; helper canDo()
    └── styles/
        └── survey-theme.css    # SurveyJS component theming
```

---

## The 4 Predefined Forms

1. **Fall Risk & Incident Report** — logs fall events, injury severity, root cause, Morse score, MD notification, care plan update status
2. **Pressure Injury / Wound Assessment** — tracks wound staging, body site, size, wound bed condition, treatment plan
3. **Dining & Nutrition Round** — records meal acceptance %, hydration intake, positioning, diet restriction compliance, weight trend
4. **Physician / Practitioner Visit Log** — documents visit type, orders changed, signature obtained, next visit due date

Each form has a SurveyJS JSON definition, column config for the table view, and optional scoring logic. Resident name fields are treated as PHI and redacted in the Submissions table for roles below Nurse.

---

## The 6 Main Views (Tabs)

| Tab | What It Does | Minimum Role Required |
|---|---|---|
| **Submissions** | Table of all submissions for the selected form with stats (total, complete, avg score) and color-coded compliance scores | CNA (PHI redacted) |
| **Analytics** | 3 metric cards + bar chart (weekly volume) + line chart (compliance trend vs. 90% QAPI target) using Recharts | CNA |
| **Reports** | Left sidebar with form metrics + main area where "Generate QAPI Report" calls OpenAI to write a 3-section compliance narrative | Nurse (view); Charge Nurse (generate) |
| **Alerts** | Vertical timeline of alerts — critical, warning, success, info — with icons, timestamps, and colored badges | CNA |
| **Answer Form** | Renders the selected form via SurveyJS; on completion calculates a score, adds the row to state, and shows the SuccessView confirmation | CNA |
| **Audit Log** | Paginated, filterable table of every recorded system action — who, what, when, form, IP | Compliance Officer, Super Admin |

Plus **Form Builder** (toggled from the header): a full SurveyJS drag-and-drop designer for creating custom forms saved to `localStorage`. Visible only to IT Admin and Super Admin roles.

---

## UI Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  CareOps / Forms  │ Form Dropdown │ [Builder — IT Admin+] │ 👤 Role │ ☀ │
├────────────┬───────────┬──────────┬──────────┬────────────┬────────────┤
│Submissions │ Analytics │ Reports  │  Alerts  │ Answer Form│ Audit Log* │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                           Active View                                  │
│           (PHI fields, action buttons, generate controls               │
│            rendered or hidden based on current user role)              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
* Audit Log tab visible only to Compliance Officer and Super Admin
```

**Dark mode**: deep gray background `#101317`, blue accent `#3480f8`
**Light mode**: light gray `#f0f4f8`, darker blue `#2563eb`
Semantic colors: green (score ≥ 90%), amber (≥ 70%), red (< 70%)

The TopBar now renders a **user chip** (avatar initials, display name, role badge) at the right edge. Clicking it opens a mini dropdown showing role, facility unit, and a Sign Out button that calls `rbac.logout()` and clears the session.

---

## RBAC System

### Design Principles

1. **Least privilege by default.** Every permission is denied unless explicitly granted to the role.
2. **Role hierarchy is flat.** Roles do not inherit from each other in code — each role carries its full explicit permission set. This avoids ambiguous inheritance bugs and makes the permission map auditable at a glance.
3. **UI and data layer enforcement.** Permissions gate both what the user can see (component rendering) and what they can do (hook-level guards before any state mutation or API call). A hidden button is not security; both layers enforce the same rule.
4. **PHI minimization.** Resident name, date of birth, room number, and any other 18 HIPAA Safe Harbor identifiers are treated as PHI. Roles below Nurse see these columns replaced with a `[Redacted]` token rendered by `Cell.jsx`. The underlying data object is never sent to a lower-privilege render path.
5. **Append-only audit trail.** Every significant action writes a structured event to `useAuditLog`. Events are never deleted or modified via the UI. In production, these events must be written to a server-side, tamper-evident log (see HIPAA notes below).

---

### Role Definitions

| Role ID | Display Name | Typical SNF Personnel |
|---|---|---|
| `cna` | CNA | Certified Nursing Assistant |
| `nurse` | Nurse | LVN, LPN |
| `charge_nurse` | Charge Nurse | Charge RN, Shift Supervisor |
| `don` | Director of Nursing | DON, ADON |
| `administrator` | Administrator | Executive Director, NHA |
| `compliance_officer` | Compliance Officer | QAPI Coordinator, Compliance Director |
| `it_admin` | IT Admin | Health IT, Systems Admin |
| `super_admin` | Super Admin | Platform owner, break-glass account |

---

### Permission Definitions

Each permission is a string constant defined in `src/data/rbac.js`.

| Permission Key | What It Guards |
|---|---|
| `view_submissions` | Read the Submissions tab for any form |
| `view_own_submissions` | Read only submissions the user personally submitted |
| `delete_submission` | Remove a submission row from the table |
| `view_analytics` | Read the Analytics tab |
| `view_reports` | Read the Reports tab and any cached report text |
| `generate_report` | Trigger the "Generate QAPI Report" OpenAI call |
| `delete_report` | Remove a cached report from storage |
| `view_alerts` | Read the Alerts tab |
| `dismiss_alert` | Mark an alert as acknowledged/resolved |
| `submit_forms` | Fill out and submit the Answer Form |
| `view_phi` | See resident name and other PHI columns unredacted |
| `view_form_builder` | Access the Form Builder view via the TopBar toggle |
| `create_form` | Save a new custom form from the Form Builder |
| `delete_form` | Remove a user-created form from the forms list |
| `view_audit_log` | Read the Audit Log tab |
| `export_audit_log` | Download the audit log as CSV |
| `manage_users` | Add, edit, or deactivate user accounts (future backend feature) |
| `manage_roles` | Assign or change user roles (future backend feature) |

---

### Permission Matrix

A checkmark means the role has the permission. A dash means it is denied.

| Permission | CNA | Nurse | Charge Nurse | DON | Administrator | Compliance Officer | IT Admin | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `view_own_submissions` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `view_submissions` | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `delete_submission` | — | — | — | ✓ | ✓ | — | — | ✓ |
| `view_analytics` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `view_reports` | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `generate_report` | — | — | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `delete_report` | — | — | — | ✓ | — | ✓ | — | ✓ |
| `view_alerts` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `dismiss_alert` | — | — | ✓ | ✓ | — | ✓ | — | ✓ |
| `submit_forms` | ✓ | ✓ | ✓ | ✓ | — | — | — | ✓ |
| `view_phi` | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `view_form_builder` | — | — | — | — | — | — | ✓ | ✓ |
| `create_form` | — | — | — | — | — | — | ✓ | ✓ |
| `delete_form` | — | — | — | — | — | — | ✓ | ✓ |
| `view_audit_log` | — | — | — | — | — | ✓ | — | ✓ |
| `export_audit_log` | — | — | — | — | — | ✓ | — | ✓ |
| `manage_users` | — | — | — | — | — | — | ✓ | ✓ |
| `manage_roles` | — | — | — | — | — | — | — | ✓ |

**Notes on specific role design decisions:**

- **CNA** can only view their own submissions (`view_own_submissions`) — not the full submissions table for a form (`view_submissions`). PHI is always redacted. Analytics and Alerts are visible because aggregate data carries no individual PHI.
- **Nurse** gains `view_submissions` (all rows, not just own) and `view_phi` — necessary for clinical documentation review. Still cannot generate AI reports or dismiss alerts.
- **Charge Nurse** is the minimum role that can trigger AI report generation and dismiss alerts. This reflects the supervisory duty to act on compliance data.
- **Administrator** (NHA/Executive Director) can read everything operational but cannot submit forms (not a clinical role) and cannot touch the form builder or audit log. They can delete submissions for data correction purposes.
- **Compliance Officer** has read access to everything, can generate and delete reports, can dismiss alerts, and is the only non-Super Admin role that can view and export the audit log. Cannot manage users or forms.
- **IT Admin** has access only to the Form Builder — no clinical data views at all. This honors the HIPAA minimum necessary principle; IT staff should never see PHI without a break-glass justification.
- **Super Admin** holds all permissions. This account must be tightly controlled, MFA-enforced in production, and all Super Admin actions are flagged in the audit log with a `[ELEVATED]` marker.

---

### RBAC Implementation: New Files

#### `src/data/rbac.js`

Defines the canonical data structures the RBAC system reads at runtime.

```js
// Role and permission constants, the PERMISSION_MAP, and demo user fixtures.

export const ROLES = {
  CNA:                'cna',
  NURSE:              'nurse',
  CHARGE_NURSE:       'charge_nurse',
  DON:                'don',
  ADMINISTRATOR:      'administrator',
  COMPLIANCE_OFFICER: 'compliance_officer',
  IT_ADMIN:           'it_admin',
  SUPER_ADMIN:        'super_admin',
};

export const PERMISSIONS = {
  VIEW_OWN_SUBMISSIONS: 'view_own_submissions',
  VIEW_SUBMISSIONS:     'view_submissions',
  DELETE_SUBMISSION:    'delete_submission',
  VIEW_ANALYTICS:       'view_analytics',
  VIEW_REPORTS:         'view_reports',
  GENERATE_REPORT:      'generate_report',
  DELETE_REPORT:        'delete_report',
  VIEW_ALERTS:          'view_alerts',
  DISMISS_ALERT:        'dismiss_alert',
  SUBMIT_FORMS:         'submit_forms',
  VIEW_PHI:             'view_phi',
  VIEW_FORM_BUILDER:    'view_form_builder',
  CREATE_FORM:          'create_form',
  DELETE_FORM:          'delete_form',
  VIEW_AUDIT_LOG:       'view_audit_log',
  EXPORT_AUDIT_LOG:     'export_audit_log',
  MANAGE_USERS:         'manage_users',
  MANAGE_ROLES:         'manage_roles',
};

// PERMISSION_MAP[roleId] → Set of permission strings
export const PERMISSION_MAP = { /* ... full matrix as above ... */ };

// canDo(roleId, permission) → boolean
export const canDo = (roleId, permission) =>
  Boolean(PERMISSION_MAP[roleId]?.has(permission));

// DEMO_USERS: fixtures for the dev LoginView role switcher
export const DEMO_USERS = [
  { id: 'u001', name: 'Tom Brown',      role: ROLES.CNA,                unit: 'East Wing'  },
  { id: 'u002', name: 'Marcus Dela Cruz', role: ROLES.NURSE,            unit: 'East Wing'  },
  { id: 'u003', name: 'Kristy Caudillo', role: ROLES.CHARGE_NURSE,      unit: 'All Units'  },
  { id: 'u004', name: 'Maria Santos',   role: ROLES.DON,                 unit: 'All Units'  },
  { id: 'u005', name: 'Sarah Mendoza',  role: ROLES.ADMINISTRATOR,       unit: 'Facility'   },
  { id: 'u006', name: 'Dr. Linda Reyes', role: ROLES.COMPLIANCE_OFFICER, unit: 'Compliance' },
  { id: 'u007', name: 'John Smith',     role: ROLES.IT_ADMIN,            unit: 'IT'         },
  { id: 'u008', name: 'Admin',          role: ROLES.SUPER_ADMIN,         unit: 'All'        },
];
```

#### `src/context/RBACContext.jsx`

Provides the authenticated user and permission-checking utilities to the entire component tree via React Context.

```jsx
// Key exports:
//   RBACProvider        — wraps App, reads currentUser from localStorage session
//   useCurrentUser()    — returns { id, name, role, unit } or null
//   usePermissions()    — returns { can(permission), canAny([...]), canAll([...]) }
//   useRBAC()           — returns { currentUser, can, logout, switchUser (dev only) }
```

- `RBACProvider` reads a `corestedSession` key from `localStorage` on mount to hydrate the current user. If absent or invalid, it renders `<LoginView />` instead of the main app.
- `usePermissions().can(permission)` calls the `canDo(user.role, permission)` helper from `rbac.js`. Components import this and wrap conditional renders.
- In development (detected via `import.meta.env.DEV`), `switchUser(userId)` allows cycling through `DEMO_USERS` for testing without a real auth backend.

#### `src/hooks/useAuditLog.js`

```js
// useAuditLog() returns:
//   logEvent(action, details)  — appends a structured event to the audit log
//   getEvents(filters)         — reads and filters the audit log (compliance view)
//   exportCSV()                — serializes events to CSV for download

// Event shape:
// {
//   id:         string (nanoid or Date.now()),
//   timestamp:  ISO 8601 string,
//   userId:     string,
//   userName:   string,
//   userRole:   string,
//   action:     string,   // e.g. 'SUBMIT_FORM', 'GENERATE_REPORT', 'DELETE_SUBMISSION'
//   formId:     string | null,
//   formName:   string | null,
//   details:    string,   // human-readable description
//   elevated:   boolean,  // true when userRole === 'super_admin'
// }
```

`logEvent` is called by:
- `useRows.addRow()` → logs `SUBMIT_FORM`
- `useRows.deleteRow()` → logs `DELETE_SUBMISSION`
- `useReports.generateReport()` → logs `GENERATE_REPORT`
- `FormBuilderView.handleSave()` → logs `CREATE_FORM`
- `LoginView` on login → logs `USER_LOGIN`
- `TopBar` on logout → logs `USER_LOGOUT`
- Future: `dismiss_alert` handler → logs `DISMISS_ALERT`

#### `src/components/LoginView.jsx`

Shown when no valid session is found in `localStorage`. In development mode it renders the `DEMO_USERS` list as a role-selector grid so any role can be tested without credentials. In production this component is replaced by a redirect to the facility's SSO/OIDC provider (Epic, PointClickCare, Azure AD, etc.).

#### `src/components/AccessDenied.jsx`

A centered card rendered in place of any view the current user's role cannot access. Shows the user's current role, the missing permission, and a contact-IT prompt. Used by `App.jsx` as the fallback for guarded route rendering.

#### `src/components/ui/RoleBadge.jsx`

A small colored chip component that displays a role's human-readable label. Color map:
- CNA: gray
- Nurse: blue
- Charge Nurse: indigo
- DON: purple
- Administrator: orange
- Compliance Officer: teal
- IT Admin: slate
- Super Admin: red

#### `src/views/AuditLogView.jsx`

Paginated table of audit events, visible only to Compliance Officer and Super Admin. Columns: Timestamp, User, Role, Action, Form, Details. Supports filter by action type, date range, and user. "Export CSV" button calls `useAuditLog().exportCSV()`. Elevated (Super Admin) events are highlighted with a red left border.

---

### RBAC Integration in Existing Files

#### `src/App.jsx` (modified)

- Wraps the entire return tree in `<RBACProvider>` (alongside the existing `<ThemeCtx.Provider>`).
- Before rendering the main layout, checks `currentUser` from `useCurrentUser()`. If null, renders `<LoginView />`.
- The Form Builder toggle in `TopBar` is only passed `onToggleBuilder` when `can(PERMISSIONS.VIEW_FORM_BUILDER)` is true; otherwise the prop is omitted and the button does not appear.
- Active tab rendering wraps each view in a permission guard:
  ```jsx
  {tab === 'reports' && (
    can(PERMISSIONS.VIEW_REPORTS)
      ? <ReportsView ... canGenerate={can(PERMISSIONS.GENERATE_REPORT)} />
      : <AccessDenied permission={PERMISSIONS.VIEW_REPORTS} />
  )}
  ```
- The `auditLog` tab is injected into the tabs array only when `can(PERMISSIONS.VIEW_AUDIT_LOG)`.

#### `src/components/TopBar.jsx` (modified)

- Adds a user chip at the right edge: avatar initials circle + display name + `<RoleBadge>`.
- Clicking the chip opens a mini dropdown with: role label, unit, and a "Sign Out" button.
- "Form Builder" button only renders when `can(PERMISSIONS.VIEW_FORM_BUILDER)`.
- Sign Out calls `useRBAC().logout()`, which clears `corestedSession` and logs `USER_LOGOUT` via `useAuditLog`.

#### `src/components/ViewSwitcher.jsx` (modified)

- Receives a `visibleTabs` prop from `App.jsx` — an array of tab IDs filtered by the current user's permissions.
- The Audit Log tab (`id: 'auditlog'`) is included in `visibleTabs` only for Compliance Officer and Super Admin.
- Tabs the user cannot access are omitted entirely (not just disabled) to avoid tempting users to probe for access.

#### `src/views/SubmissionsView.jsx` (modified)

- Receives a `canViewPHI` boolean prop (`can(PERMISSIONS.VIEW_PHI)`).
- PHI columns (`resident`, `staff_name`, `employee_id`) are filtered through a `redact(value, canViewPHI)` helper in `Cell.jsx` that returns `[Redacted]` when false.
- CNA users additionally receive a pre-filtered `rows` array from `App.jsx` containing only their own submissions (rows where `row.employee_id === currentUser.id`).
- A "Delete" icon button appears on each row only when `can(PERMISSIONS.DELETE_SUBMISSION)`. Clicking it calls `useRows.deleteRow()` which internally calls `logEvent('DELETE_SUBMISSION', ...)`.

#### `src/views/ReportsView.jsx` (modified)

- "Generate QAPI Report" button is only rendered when `canGenerate` prop is true (passed from App based on `can(PERMISSIONS.GENERATE_REPORT)`).
- When the user has `view_reports` but not `generate_report`, the button is absent and a note reads: "Report generation requires Charge Nurse access or above."
- Cached report text is still shown regardless (read is separated from generate).

#### `src/views/AlertsView.jsx` (modified)

- "Dismiss" or "Acknowledge" control on each alert card only renders when `can(PERMISSIONS.DISMISS_ALERT)`.

#### `src/views/FormBuilderView.jsx` (modified)

- `App.jsx` never mounts this component unless `can(PERMISSIONS.VIEW_FORM_BUILDER)` passes, so the guard is at the routing layer. The component itself adds a secondary in-component check as defense-in-depth.
- "Save to Forms List" calls `onFormSaved()` only when `can(PERMISSIONS.CREATE_FORM)`.

#### `src/hooks/useRows.js` (modified)

- `addRow(formId, row)` accepts the current user object and stamps `submittedBy: user.id` and `submittedByName: user.name` onto every row before storing it. This is critical for the CNA own-submissions filter.
- New `deleteRow(formId, rowId)` function added — checks `canDo(user.role, PERMISSIONS.DELETE_SUBMISSION)` inside the hook before mutating state, then calls `logEvent`.

#### `src/hooks/useReports.js` (modified)

- `generateReport()` checks `canDo(user.role, PERMISSIONS.GENERATE_REPORT)` before calling the OpenAI API. If the check fails it throws an `AccessDeniedError` rather than silently doing nothing — so callers can surface a meaningful error.
- `generateReport()` calls `logEvent('GENERATE_REPORT', ...)` on both success and failure for the audit trail.

---

## Data Flow (with RBAC)

```
main.jsx
 └── App.jsx
      ├── RBACProvider (RBACContext.jsx)
      │    ├── reads corestedSession → currentUser { id, name, role, unit }
      │    ├── exposes useCurrentUser(), usePermissions(), useRBAC()
      │    └── renders <LoginView /> if no valid session
      ├── ThemeCtx.Provider (ThemeContext.jsx)
      ├── useAuditLog() — logEvent, getEvents, exportCSV
      ├── Forms list (predefined + user-created from localStorage)
      │    visibleForms filtered: IT Admin sees only custom forms metadata,
      │    not clinical form data
      ├── Selected form + active tab (state)
      │    visibleTabs filtered by currentUser.role permissions
      ├── useRows → submissions state
      │    addRow stamps submittedBy, calls logEvent
      │    deleteRow enforces DELETE_SUBMISSION permission, calls logEvent
      │    getRows filters to own submissions for CNA role
      └── useReports → AI report state
           generateReport enforces GENERATE_REPORT permission, calls logEvent

Views receive permission props from App.jsx:
 ├── SubmissionsView  ← rows (pre-filtered for CNA), cols, canViewPHI, canDelete
 ├── AnalyticsView    ← weekly metrics (no PHI, open to all permitted roles)
 ├── ReportsView      ← report, canGenerate, canDelete
 ├── AlertsView       ← alerts, canDismiss
 ├── AnswerFormView   ← surveyJson; submit blocked if !can(SUBMIT_FORMS)
 ├── FormBuilderView  ← only mounted when can(VIEW_FORM_BUILDER)
 └── AuditLogView     ← only mounted when can(VIEW_AUDIT_LOG)
```

---

## Persistence (localStorage keys)

| Key | What's Stored | Who Can Write |
|---|---|---|
| `corestedUserForms` | User-created forms from the Form Builder | IT Admin, Super Admin |
| `corestedReports2` | Cached AI-generated reports per form | Charge Nurse, DON, Administrator, Compliance Officer, Super Admin |
| `corestedFormBuilderDraft` | Auto-saved in-progress form builder work | IT Admin, Super Admin |
| `corestedSession` | Current user session `{ id, name, role, unit, loginAt }` | Set on login, cleared on logout |
| `corestedAuditLog` | Append-only array of audit event objects | `useAuditLog.logEvent()` only (no UI delete path) |

---

## AI Report Generation

When "Generate QAPI Report" is clicked in the Reports tab, `useReports.js` first verifies `canDo(user.role, PERMISSIONS.GENERATE_REPORT)`. If permitted, it calls the OpenAI API (`gpt-4.1`, max 1000 tokens) with a prompt that includes the form name, aggregate submission metrics, and 5-week compliance trend. The API key is read from `import.meta.env.VITE_OPENAI_API_KEY`.

The AI returns a formal 3-section narrative:

1. **Performance Summary** — current period status and trajectory
2. **Key Findings** — 3 data-referenced bullet points
3. **Improvement Plan** — 3 action items with timelines and responsible parties

The result is cached in `corestedReports2` (localStorage) keyed by `formId` so it does not regenerate on every visit. Resident-level PHI is never included in the prompt — only aggregate statistics — ensuring the OpenAI API call is outside the HIPAA data boundary for this prototype.

A `logEvent('GENERATE_REPORT', { formId, formName, userId, ... })` event is written to the audit log on every generation attempt.

---

## HIPAA Compliance Considerations

CareOps Forms currently operates as a **client-side prototype** with localStorage persistence. Elevating it to a production HIPAA-covered system requires the following architectural changes, which the RBAC design anticipates and enables:

### PHI Handling

- **Minimum necessary principle**: Already enforced at the role level via `view_phi` permission and the `redact()` helper in `Cell.jsx`. CNAs and IT Admins never see resident identifiers.
- **Data at rest**: localStorage is not encrypted. Production must move to an encrypted server-side database (PostgreSQL with field-level encryption, or a HIPAA BAA-covered PaaS like AWS Healthcare or Azure Health Data Services).
- **Data in transit**: All API calls must be over TLS 1.2+. The Vite dev proxy already enforces this for the Anthropic endpoint.
- **AI API calls**: The `useReports.js` prompt is deliberately designed to contain only aggregate statistics, not individual resident records. Verify this holds for all future prompt changes before production launch.

### Audit Trail Requirements

HIPAA Security Rule (45 CFR § 164.312(b)) requires audit controls that record and examine activity in information systems containing PHI. The `useAuditLog` hook is designed to satisfy this requirement when backed by a tamper-evident server log. Minimum required events already captured:

| Audit Event | Triggered By |
|---|---|
| `USER_LOGIN` | `LoginView` on successful authentication |
| `USER_LOGOUT` | `TopBar` sign-out action |
| `SUBMIT_FORM` | `useRows.addRow()` |
| `DELETE_SUBMISSION` | `useRows.deleteRow()` |
| `GENERATE_REPORT` | `useReports.generateReport()` |
| `CREATE_FORM` | `FormBuilderView.handleSave()` |
| `VIEW_PHI` | Logged on tab entry when `can(VIEW_PHI)` and form contains PHI columns |
| `EXPORT_AUDIT_LOG` | `AuditLogView` export button |

**Production requirement**: Audit events must be written to an append-only server-side log (e.g., AWS CloudTrail, immutable S3 with Object Lock, or a dedicated audit table with insert-only IAM policy). The `useAuditLog` localStorage implementation is a prototype placeholder only.

### Access Control Enforcement

- **Session management**: Replace `corestedSession` localStorage token with a short-lived JWT (≤ 15 min) with refresh rotation, or delegate entirely to the facility's IdP via OIDC (Epic MyChart, PointClickCare, Azure AD).
- **Server-side enforcement**: All permission checks in `RBACContext` and `useRows`/`useReports` hooks are client-side. A production backend API must re-validate the user's role on every request — client-side RBAC is a UX layer, not a security boundary.
- **MFA**: Required for Compliance Officer, Administrator, DON, and Super Admin roles under HIPAA addressable specification for authentication.
- **Automatic timeout**: Sessions should auto-expire after 15 minutes of inactivity per CMS SNF security guidance.
- **Role assignment governance**: Only Super Admin can assign roles (`manage_roles`). Role changes must generate an audit event and require a second Super Admin to approve (four-eyes principle) in production.

### Business Associate Agreements

If this system is deployed with a cloud backend, BAAs are required with:
- The cloud provider (AWS, Azure, GCP)
- OpenAI (or the AI provider — note: OpenAI offers a BAA under their Enterprise plan)
- Any analytics or error-tracking tools that may receive request data

---

## Summary

CareOps Forms is a polished, modular compliance-tracking SaaS prototype for healthcare facilities, with real form submission workflows, live charts, AI-generated QAPI reporting, and a custom form builder — all running client-side in React with SurveyJS handling form rendering and design.

The RBAC system adds a full access control layer appropriate for a HIPAA-regulated SNF environment: eight purpose-specific roles, eighteen discrete permissions, PHI redaction at the render layer, per-role tab and button visibility, permission enforcement at both the UI and hook levels, and an append-only audit log covering all significant user actions. The architecture is deliberately designed so the client-side RBAC layer can be backed by a real auth server (JWT + server-side role enforcement) without restructuring the React component tree — only the session hydration logic in `RBACContext.jsx` and the API guard logic in `useRows.js` / `useReports.js` need to point at real endpoints instead of localStorage.