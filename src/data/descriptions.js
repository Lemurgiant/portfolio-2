export const descriptions = {
  1: {
    industry: "Education / Personal Productivity",
    headline: "Turning casual reading into a measurable, structured habit",
    problem:
      "Avid readers had no reliable way to measure reading consistency, track improvement in reading speed, or organize insights from books — leaving valuable learning scattered and untracked.",
    solution:
      "Built a full-stack reading productivity platform that logs every session with timed metrics, surfaces cumulative analytics over time, and lets readers capture knowledge through structured summaries, quotes, and vocabulary — all linked to a Google Books-powered personal library.",
    outcomes: [
      "Live production deployment on Render with a MongoDB Atlas cloud backend",
      "Google Books API integration for instant book search and library management",
      "Per-session reading speed and duration tracking with cumulative analytics dashboard",
      "Knowledge capture system: summaries, quotes, and vocabulary terms per book",
      "Google OAuth 2.0 and email-verified local authentication",
    ],
    capabilities: [
      "Timed reading sessions with automatic speed and pages-per-minute calculation",
      "Personal book library powered by the Google Books database",
      "Productivity dashboard with per-book and cumulative reading history charts",
      "Structured knowledge management across notes, quotes, and vocabulary",
      "Profile and theme preferences synced server-side across devices",
    ],
  },

  2: {
    industry: "Fleet Management / Industrial Operations",
    headline: "Centralizing vehicle and equipment records for multi-site construction operations",
    problem:
      "Operations teams managing mixed fleets of vehicles and heavy equipment across multiple construction project sites lacked a unified system — maintenance history, inspection logs, certifications, and supporting documents were scattered across paper records.",
    solution:
      "Delivered a role-based fleet management platform with centralized asset profiles, maintenance and inspection records, document management, and real-time data sync — giving admins full control and field staff instant read-only access.",
    outcomes: [
      "Full fleet of vehicles and heavy equipment centralized in one live database",
      "Automated expiration warnings: visual alerts on assets expiring within 7 days",
      "Inline editing for maintenance and inspection records directly in the table",
      "Folder-organized document storage per asset (LTO, insurance, OR/CR, and more)",
      "Role-based access: admin full CRUD vs. read-only viewer mode",
      "Dockerized for straightforward container deployment",
    ],
    capabilities: [
      "Asset profiles with extensible custom fields beyond standard vehicle data",
      "Maintenance and inspection history with per-row inline editing",
      "Expiration tracking and visual alerts to prevent lapsed certifications",
      "Folder-based image and document management per asset",
      "Multi-project and multi-site assignment tracking",
      "Real-time sync via Firestore — changes reflect instantly without page refresh",
    ],
  },

  3: {
    industry: "Consumer AI / Entertainment",
    headline:
      "A production AI companion platform with three distinct personas, real-time streaming, and invite-only access",
    problem:
      "Users wanted AI conversation experiences with genuine character depth — distinct personality identities, configurable emotional tone, and conversation history that persists across sessions — rather than a generic chatbot.",
    solution:
      "Delivered an invite-only consumer AI platform with three fully-themed character personas, a configurable personality intensity slider, and SSE-based real-time streaming — built without a pre-made conversation framework.",
    outcomes: [
      "Three distinct AI personas, each with a unique visual identity and independent conversation history",
      "Real-time token streaming via Server-Sent Events with animated typewriter effect",
      "Configurable personality intensity (Innocent to Explicit scale) per character",
      "Lightweight invite-only access control — no per-user account overhead",
      "Delivered ahead of schedule with zero production downtime",
    ],
    capabilities: [
      "Character-specific tone and personality via a 1–10 intensity slider",
      "Live streaming AI responses with typing indicators",
      "Per-character conversation history persisted across sessions",
      "Shared-secret access control without full authentication infrastructure",
      "Mobile-first chat interface with immersive per-character visual theming",
    ],
  },

  4: {
    industry: "Veterinary / Healthcare",
    headline:
      "A full-featured clinic management platform covering patients, appointments, vaccinations, and invoices",
    problem:
      "Veterinary clinics had no purpose-built digital tool to manage the full patient lifecycle — pet registration, vaccination tracking, appointment scheduling, and invoice generation — in one unified interface.",
    solution:
      "Built VetDesk as a complete clinic management platform with persistent patient records (pets and owners), appointment scheduling with status tracking, per-pet vaccination history, and an invoice lifecycle from draft to paid — with a responsive AppShell layout and dark/light mode.",
    outcomes: [
      "Full patient registry linking pets to their owners, with species, breed, weight, and vet notes per pet",
      "Appointment scheduling with vet assignment, duration, and status tracking (scheduled, completed, cancelled, no-show)",
      "Per-pet vaccination records with next-due-date tracking",
      "Invoice management with line items and status lifecycle (draft → sent → paid → overdue)",
      "Responsive layout: collapsible sidebar becomes a mobile burger menu",
      "Dark/light mode with custom Mantine theme overrides",
    ],
    capabilities: [
      "Patient registry with full pet profiles and owner contact details",
      "Appointment management with vet assignment, visit notes, and status updates",
      "Vaccination history with due-date tracking for clinical compliance",
      "Invoice generation with line items, totals, and payment status",
      "Collapsible sidebar navigation for desktop and mobile",
      "Persistent dark and light mode for extended clinic use",
    ],
  },

  5: {
    industry: "Construction / Industrial Workplace Safety",
    headline:
      "Replacing manual OSHA paperwork with a multi-site compliance dashboard and AI-generated audit reports",
    problem:
      "Construction safety officers managing compliance across multiple work sites depended on paper-based forms and manual tracking — making it difficult to spot trends, escalate open items, and produce audit-ready reports quickly.",
    solution:
      "Delivered a self-contained OSHA compliance platform covering five form types with real-time risk flagging, automated compliance scoring, 5-week trend analytics, and AI-generated safety narratives — fully operational without a backend or database.",
    outcomes: [
      "5 OSHA form types digitized: daily safety inspections, incident and near-miss reports, toolbox talk logs, equipment inspections, and hazard assessments",
      "Automated risk escalation: critical incidents and high-risk hazards flagged immediately on submission — no manual review required",
      "AI-written safety performance reports via GPT-4.1, suitable for internal review and external audits",
      "5-week compliance trend analytics with the 90% OSHA benchmark target line",
      "Multi-site sample data across 4 work sites pre-loaded for immediate deployment",
    ],
    capabilities: [
      "Live compliance scoring as safety forms are completed",
      "Automatic critical-condition warnings during form entry, before submission",
      "AI-generated three-section safety reports: performance summary, key findings, and improvement plan",
      "Multi-site weekly submission volume and 5-week compliance trend charts",
      "Fully static deployment — no server or database required",
    ],
  },

  6: {
    industry: "Healthcare / Skilled Nursing Facilities",
    headline:
      "A HIPAA-aware compliance system that enforces data access by staff role and generates a complete audit trail",
    problem:
      "Skilled nursing facilities needed a compliance platform that enforced HIPAA-required data minimization by staff role — automatically protecting resident PHI from personnel without clinical clearance — while maintaining a tamper-evident record of every system action for regulatory review.",
    solution:
      "Built a full-featured SNF compliance management platform with eight purpose-built staff roles, automatic PHI redaction at the UI layer, AI-powered QAPI reporting, and an append-only audit log — architecturally ready for production JWT and SSO/OIDC upgrade without structural changes.",
    outcomes: [
      "8 staff roles from CNA to Super Admin, each with exactly the permissions their function requires",
      "Resident PHI automatically redacted for all roles below Nurse — HIPAA minimum-necessary principle enforced at the UI layer",
      "AI-generated QAPI compliance narratives using GPT-4.1 with three structured output sections",
      "Append-only audit log: every login, form submission, deletion, and report generation recorded with user identity and timestamp",
      "18 discrete permissions governing every tab, button, and data operation",
      "Architecture ready for drop-in JWT and SSO/OIDC integration without restructuring",
    ],
    capabilities: [
      "Role-gated compliance form submission, review, and deletion",
      "Automatic PHI redaction by role — resident identifiers never exposed to unauthorized personnel",
      "AI-powered QAPI reports with performance summary, key findings, and improvement plan",
      "Audit trail with full CSV export for compliance officer review",
      "Custom form builder restricted to IT Admin and Super Admin accounts",
      "Real-time compliance analytics with 5-week trend charts per form type",
    ],
  },
};
