import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles injected via JS for portability
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');

  /* ── Dark mode (default) ── */
  :root, [data-theme="dark"] {
    --bg: #0D0D12;
    --surface: #14141C;
    --surface-2: #1C1C28;
    --surface-hover: #202030;
    --border: #252538;
    --border-light: #2E2E48;
    --accent: #C9A84C;
    --accent-light: #E8C97A;
    --accent-subtle: rgba(201,168,76,0.08);
    --teal: #5BBFB5;
    --red: #E07070;
    --purple: #9B8FD4;
    --text-primary: #F5F3EE;
    --text-secondary: #D0CBC0;
    --text-muted: #948E84;
    --text-dim: #5C5850;
    --nav-bg-scrolled: rgba(13,13,18,0.95);
    --scrollbar-thumb: #252538;
    --scrollbar-thumb-hover: #2E2E48;
  }

  /* ── Light mode ── */
  [data-theme="light"] {
    --bg: #F7F5F0;
    --surface: #FFFFFF;
    --surface-2: #F0EDE6;
    --surface-hover: #EAE6DE;
    --border: #E2DDD4;
    --border-light: #CEC8BC;
    --accent: #A07828;
    --accent-light: #C9A84C;
    --accent-subtle: rgba(160,120,40,0.07);
    --teal: #2A8A82;
    --red: #C04040;
    --purple: #6B5FBF;
    --text-primary: #111008;
    --text-secondary: #2E2A22;
    --text-muted: #5C5648;
    --text-dim: #9C9488;
    --nav-bg-scrolled: rgba(247,245,240,0.95);
    --scrollbar-thumb: #D8D2C8;
    --scrollbar-thumb-hover: #C0B8AC;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.15s ease;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--bg);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  ::selection {
    background: rgba(201,168,76,0.25);
    color: var(--text-primary);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 960px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .hero-grid > div:last-child { max-width: 320px; margin: 0 auto; }
  }

  /* Responsive */
  @media (max-width: 860px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; align-items: center; }
    .featured-project { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .featured-project > div { order: unset !important; }
    .detail-hero { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .form-grid { grid-template-columns: 1fr !important; }
    .experience-item { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
