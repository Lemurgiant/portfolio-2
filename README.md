# Portfolio — Alex Mercer

A professional dark-mode portfolio built with React + Vite.

## ✦ Customizing Content

**All content lives in one file:** `src/data/content.js`

Edit that file to update:
- Personal info, bio, availability status
- Stats (years of experience, projects, etc.)
- Skills & proficiency levels
- Projects (featured + grid cards)
- Work experience / timeline
- Contact details & social links

No other files need to be touched for content changes.

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✦ Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← Global styles, fonts, entry point
    ├── App.jsx           ← Root component, section assembly
    ├── data/
    │   └── content.js    ← ✦ ALL YOUR CONTENT LIVES HERE
    ├── hooks/
    │   └── useAnimations.js  ← Scroll reveal, count-up, typed text
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        └── shared/
            ├── SectionHeader.jsx
            └── Tag.jsx
```

---

## ✦ Design System

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0A0A0F` | Page background |
| `--surface` | `#111118` | Card backgrounds |
| `--accent` | `#F0A500` | Amber gold — CTAs, highlights |
| `--accent-teal` | `#4ECDC4` | Secondary accent |
| `--border` | `#1E1E2E` | Dividers, card edges |

**Fonts:** Cormorant Garamond (headings) · Fira Code (labels/code) · DM Mono (body)

---

## ✦ Deploying

Push to any static host. For Vercel:
```bash
npm i -g vercel
vercel --prod
```

For Netlify, drag-and-drop the `dist/` folder after `npm run build`.
