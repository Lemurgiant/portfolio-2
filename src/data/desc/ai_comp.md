# AIGF-v0 — App Description

## Overview

AIGF-v0 (AI Girlfriend - Version 0) is a dark-themed, single-page AI companion chat application. Users interact with one of three distinct AI character personas — each with its own personality, visual identity, and configurable "spice level" that governs how intimate or explicit the conversation tone becomes. The app streams responses in real time from a backend AI service, persists conversation history server-side, and presents the entire experience inside a polished mobile-width chat widget with rich animations.

---

## Purpose & Audience

The app is designed as an AI companion/relationship simulation platform. Users select a character, set their preferred personality intensity, and engage in ongoing conversations that feel personalized and immersive. Access is gated behind a secret key, implying a closed or invite-only audience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | Shadcn/ui (Radix UI primitives) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Date handling | date-fns |
| Analytics | Vercel Analytics |
| Theming | next-themes |
| Toast notifications | Sonner |

---

## Authentication & Access Control

Access is controlled via a middleware layer (`proxy.js`) that intercepts every request and checks for a query parameter `?key=<ACCESS_KEY>`. Any visitor without the correct key is redirected to `/unauthorized`. The key is stored in `.env` as `ACCESS_KEY`. This is a lightweight, shared-secret approach with no per-user accounts or OAuth providers.

---

## Pages & Routes

### `/` — Main Chat Interface
The entire application lives on a single page. It renders the `ChatApp` component, which contains:
- A full-screen animated background
- A character selection header (tab row)
- The scrollable message list
- The spice level slider
- The message input bar

### `/unauthorized`
A simple page shown when a visitor does not provide or provides an incorrect access key.

---

## Characters

Three AI personas are available, each fully themed with unique visuals and personality defaults.

### Luna — Dream Guide
- **Accent color:** Indigo/purple (`#818cf8`)
- **Particles:** Stars
- **Default spice:** 3 (Flirty)
- **Tagline:** "Let me guide you through your deepest fantasies..."
- **Aesthetic:** Soft cosmic, dreamy starfield gradient

### Aiko — Soul Companion
- **Accent color:** Pink/rose (`#f472b6`)
- **Particles:** Petals
- **Default spice:** 4 (Flirty/Spicy)
- **Tagline:** "I feel everything you feel... and so much more."
- **Aesthetic:** Cherry blossom, warm pink gradients

### Nova — Fire Spirit
- **Accent color:** Orange/amber (`#fb923c`)
- **Particles:** Embers
- **Default spice:** 5 (Spicy)
- **Tagline:** "I burn for you. Every. Single. Time."
- **Aesthetic:** Fiery, ember-lit warm orange gradients

Each character has:
- A full-body avatar and a close-up avatar (used in different UI contexts)
- A unique header gradient and message bubble gradient
- A glow color applied to interactive elements
- Its own conversation history stored separately on the backend

---

## Spice Level System

Each character has a configurable "spice level" slider (1–10) that determines how the AI backend shapes the personality and tone of responses.

| Range | Label | Tone |
|---|---|---|
| 1–2 | Innocent | Friendly, wholesome |
| 3–4 | Flirty | Light teasing, playful |
| 5–6 | Spicy | Suggestive, bold |
| 7–8 | Steamy | Heated, intimate |
| 9–10 | Explicit | Unrestricted adult content |

The slider is color-coded from cool blue (low) to hot red (high) and shows an emoji indicator. The selected level is sent to the backend with each message and persists independently per character during the session.

---

## Chat Features

### Streaming Responses
The backend delivers AI responses as a Server-Sent Events (SSE) stream. The app appends tokens one-by-one to a temporary message, creating a live typewriter effect. A typing indicator (animated dots) is shown while the stream begins.

### Conversation History
On character selection, the app fetches the full conversation history from the backend using a `conversationId` (formatted as `user_{userId}_{characterId}`). The last 20 messages of history are also sent as context with every new message to maintain coherent multi-turn dialogue.

### Message Display
Messages are displayed in a bubble layout:
- **User messages** — right-aligned, character accent color
- **AI messages** — left-aligned with the character's avatar, themed gradient bubble

Each message shows a timestamp. The list auto-scrolls to the latest message as new content arrives.

### Input
- Multi-line textarea (Shift+Enter for newlines, Enter to send)
- Send button disabled when input is empty or while a response is streaming
- Input disabled during loading to prevent double-sends

---

## Backend API Integration

The frontend communicates with an external backend at `NEXT_PUBLIC_BACKEND_URL` (defaults to `http://localhost:5000`).

### `POST /chat` — Send a message
**Request body:**
```json
{
  "message": "string",
  "character": "luna | aiko | nova",
  "conversationId": "user_{userId}_{characterId}",
  "chatHistory": [{ "content": "...", "role": "user | assistant" }],
  "userId": "string"
}
```
**Response:** SSE stream of `{ type: "start" | "end", token: "string" }` events.

### `GET /chat/load?conversationId={id}` — Load history
**Response:**
```json
{
  "messages": [
    { "content": "string", "role": "user | assistant", "createdAt": "ISO timestamp" }
  ]
}
```

---

## Visual Design

The app has a dark space/fantasy aesthetic throughout:

- **Background:** Near-black (`#07070e`) with layered CSS animations — a scrolling starfield, a translucent hex grid overlay, billowing nebula clouds, and a vignette edge fade
- **Character particles:** Animated floating elements (stars, flower petals, or ember sparks) unique to each character
- **Gradients:** Every character has a distinct header gradient and message bubble gradient applied consistently across the UI
- **Glow effects:** Accent-colored box-shadows and glows on active elements, avatars, and send buttons
- **Typography:** Clean sans-serif with tight spacing, subtle shimmer animations on character names
- **Responsive width:** The chat widget is constrained to 390px (mobile-first) and centered on wider screens

---

## Project Structure

```
aigf-v0/
├── app/
│   ├── page.tsx              # Single page — renders ChatApp
│   ├── layout.tsx            # Root layout, metadata, Analytics
│   └── globals.css           # Global Tailwind + CSS variable definitions
├── components/
│   ├── chat/
│   │   ├── chat-app.tsx      # Core component — all chat state and logic
│   │   ├── chat-header.tsx   # Character header (avatar, name, status)
│   │   ├── message-bubble.tsx
│   │   ├── message-input.tsx
│   │   ├── messages-list.tsx
│   │   ├── typing-indicator.tsx
│   │   └── index.ts
│   ├── ui/                   # 40+ Shadcn/Radix UI base components
│   └── theme-provider.tsx
├── lib/
│   ├── chat-utils.ts         # Message type, helper utilities
│   └── utils.ts              # cn() class utility
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.ts
├── public/
│   └── characters/           # luna.png, lunaclose.png, aiko.png, aikoclose.png,
│                             #   nova.png, novaclose.jpg
├── proxy.js                  # Next.js middleware — access key enforcement
├── .env                      # ACCESS_KEY, NEXT_PUBLIC_BACKEND_URL
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `ACCESS_KEY` | Shared secret for query-param auth | `df2fb23702974f8d8f5c2f78d1646b82` |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL for the AI chat backend | `http://localhost:5000` |

---

## Key Architectural Notes

- **Single-component core:** Almost all app logic (character state, message state, streaming, history loading) lives in `chat-app.tsx`. The other chat components are mostly presentational.
- **No user account system:** User identity is a generated or static `userId` string passed to the backend. There is no login, registration, or session management on the frontend.
- **Backend-dependent:** The app is a thin frontend shell. Without the backend running at the configured URL, there is no AI functionality.
- **Streaming-first UX:** The entire message flow is designed around SSE streaming. There is no request/response polling fallback.
- **Character isolation:** Conversations and spice settings are tracked independently per character, so switching characters preserves each character's distinct history and personality setting.
