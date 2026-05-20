import React from "react";
import { personal } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2.5rem 2rem",
      background: "var(--surface)",
    }}>
      <div style={{
        maxWidth: "1160px", margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem", fontWeight: 600,
            color: "var(--text-secondary)",
          }}>{personal.name}</span>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.75rem", color: "var(--text-dim)",
            marginLeft: "1rem",
          }}>© {year} — All rights reserved</span>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {personal.social.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.75rem", fontWeight: 500,
              color: "var(--text-dim)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--accent)"}
            onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}>
              {s.label}
            </a>
          ))}
          <button onClick={scrollTop} style={{
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "8px", width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-muted)",
            fontSize: "0.9rem", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
