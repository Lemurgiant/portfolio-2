import React, { useState, useEffect } from "react";
import { personal } from "../data/content";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "About",      href: "#hero" },
  { label: "Skills",     href: "#skills" },
  { label: "Work",       href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: "42px",
        height: "24px",
        borderRadius: "100px",
        border: "1px solid var(--border-light)",
        background: isDark ? "var(--surface-2)" : "var(--surface-2)",
        cursor: "pointer",
        position: "relative",
        padding: 0,
        flexShrink: 0,
        transition: "border-color 0.2s",
      }}
    >
      {/* Track icons */}
      <span style={{
        position: "absolute",
        left: "5px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "10px",
        opacity: isDark ? 0.5 : 0,
        transition: "opacity 0.2s",
        pointerEvents: "none",
      }}>☀️</span>
      <span style={{
        position: "absolute",
        right: "5px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "10px",
        opacity: isDark ? 1 : 0,
        transition: "opacity 0.2s",
        pointerEvents: "none",
      }}>🌙</span>
      {/* Thumb */}
      <span style={{
        position: "absolute",
        top: "3px",
        left: isDark ? "calc(100% - 19px)" : "3px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "var(--accent)",
        transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
      }} />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("");
  const { theme }                 = useTheme();
  const isDark                    = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "skills", "projects", "experience", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = scrolled
    ? isDark
      ? "rgba(13,13,18,0.95)"
      : "rgba(247,245,240,0.95)"
    : "transparent";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "background 0.4s ease, border-color 0.4s ease",
      background: navBg,
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: "1160px", margin: "0 auto", padding: "0 2rem",
        height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem", fontWeight: 700,
          color: "var(--text-primary)", textDecoration: "none",
          letterSpacing: "0.01em",
        }}>
          {personal.name.split(" ").map((w, i, arr) => (
            <span key={i} style={{ color: i === 1 ? "var(--accent)" : "var(--text-primary)" }}>
              {w}{i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </a>

        {/* Desktop nav */}
        <ul style={{
          display: "flex", gap: "2.5rem",
          listStyle: "none", margin: 0, padding: 0, alignItems: "center",
        }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.82rem", fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: active === link.href.slice(1) ? "var(--accent)" : "var(--text-muted)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Theme toggle */}
          <li><ThemeToggle /></li>

          {/* Resume */}
          <li>
            <a
              href={personal.resumeUrl}
              target="_blank" rel="noreferrer"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.78rem", fontWeight: 600,
                color: "var(--accent)",
                border: "1px solid rgba(160,120,40,0.35)",
                borderRadius: "6px", padding: "0.45rem 1.1rem",
                textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--accent)";
                e.target.style.color = isDark ? "#0D0D12" : "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--accent)";
              }}
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display: "none", alignItems: "center", gap: "0.75rem" }} className="mobile-menu-btn">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: "22px", height: "1.5px",
                background: "var(--text-primary)", transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                  : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          background: "var(--surface)", borderTop: "1px solid var(--border)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem",
        }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem",
              color: "var(--text-secondary)", textDecoration: "none",
            }}>{link.label}</a>
          ))}
          <a href={personal.resumeUrl} target="_blank" rel="noreferrer" style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem",
            color: "var(--accent)", textDecoration: "none",
          }}>Resume ↗</a>
        </div>
      )}
    </nav>
  );
}
