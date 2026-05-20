import React, { useEffect, useState } from "react";
import { personal, stats } from "../data/content";
import { useScrollReveal, useCountUp } from "../hooks/useAnimations";
import { useTheme } from "../context/ThemeContext";

function StatItem({ value, suffix, label }) {
  const [ref, visible] = useScrollReveal();
  const count = useCountUp(value, visible);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
        fontWeight: 700, color: "var(--accent)", lineHeight: 1,
      }}>{count}{suffix}</div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.68rem", fontWeight: 600,
        color: "var(--text-muted)", letterSpacing: "0.1em",
        marginTop: "0.4rem", textTransform: "uppercase",
      }}>{label}</div>
    </div>
  );
}

function AvatarPlaceholder({ initials }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const hasPhoto = !!personal.avatarUrl;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: "420px",
      margin: "0 auto",
    }}>
      {/* Decorative background ring */}
      <div style={{
        position: "absolute",
        inset: "-16px",
        borderRadius: "50%",
        background: isDark
          ? "conic-gradient(from 180deg, rgba(201,168,76,0.18) 0%, transparent 40%, rgba(91,191,181,0.10) 70%, transparent 100%)"
          : "conic-gradient(from 180deg, rgba(160,120,40,0.14) 0%, transparent 40%, rgba(42,138,130,0.08) 70%, transparent 100%)",
        animation: "spin 18s linear infinite",
        zIndex: 0,
      }} />

      {/* Outer border ring */}
      <div style={{
        position: "absolute",
        inset: "-4px",
        borderRadius: "50%",
        border: "1px solid var(--border-light)",
        zIndex: 1,
      }} />

      {/* Main circle */}
      <div style={{
        position: "relative",
        zIndex: 2,
        aspectRatio: "1/1",
        borderRadius: "50%",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(145deg, #1C1C28 0%, #14141C 60%, #1A1828 100%)"
          : "linear-gradient(145deg, #EDE8DF 0%, #F7F4EE 60%, #E8E2D8 100%)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "0.5rem",
      }}>
        {hasPhoto ? (
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            {/* Silhouette SVG */}
        <svg
          viewBox="0 0 200 220"
          style={{ width: "72%", opacity: isDark ? 0.18 : 0.12 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <ellipse cx="100" cy="72" rx="42" ry="48" fill="var(--accent)" />
          {/* Neck */}
          <rect x="82" y="112" width="36" height="22" rx="8" fill="var(--accent)" />
          {/* Shoulders / body */}
          <path
            d="M20 220 Q20 155 100 148 Q180 155 180 220Z"
            fill="var(--accent)"
          />
        </svg>

        {/* Initials overlay */}
        <div style={{
          position: "absolute",
          bottom: "28%",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "var(--accent)",
          opacity: 0.55,
          letterSpacing: "0.06em",
          userSelect: "none",
        }}>
          {initials}
        </div>

        {/* "Add Photo" hint */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          opacity: 0.7,
        }}>
          Your Photo Here
        </div>
          </>
        )}
      </div>

      {/* Floating badge – availability */}
      <div style={{
        position: "absolute",
        bottom: "8%",
        right: "-8%",
        zIndex: 3,
        background: "var(--surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "100px",
        padding: "0.45rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        whiteSpace: "nowrap",
      }}>
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--teal)", flexShrink: 0,
          animation: "pulse 2.5s infinite",
        }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.05em", color: "var(--teal)",
        }}>{personal.availability}</span>
      </div>

      {/* Floating badge – location */}
      <div style={{
        position: "absolute",
        top: "8%",
        left: "-8%",
        zIndex: 3,
        background: "var(--surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "100px",
        padding: "0.45rem 1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        whiteSpace: "nowrap",
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem", fontWeight: 500,
          color: "var(--text-secondary)",
        }}>📍 {personal.location}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "7rem 2rem 4rem",
      maxWidth: "1160px",
      margin: "0 auto",
      position: "relative",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: "5rem",
        alignItems: "center",
        width: "100%",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }} className="hero-grid">

        {/* ── Left: text content ── */}
        <div>
          {/* Name */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 700, color: "var(--text-primary)",
            lineHeight: 0.97, margin: "0 0 0.7rem",
            letterSpacing: "-0.02em",
          }}>
            {personal.name}
          </h1>

          {/* Title */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            fontStyle: "italic", fontWeight: 400,
            color: "var(--accent)", marginBottom: "1.75rem",
          }}>{personal.title}</p>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            fontWeight: 300, color: "var(--text-secondary)",
            lineHeight: 1.6, maxWidth: "520px", marginBottom: "1.25rem",
          }}>
            {personal.tagline.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>

          {/* Bio */}
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.97rem", fontWeight: 300,
            color: "var(--text-muted)", maxWidth: "480px",
            lineHeight: 1.9, marginBottom: "2.75rem",
          }}>{personal.bio}</p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <button onClick={() => scrollTo("#projects")} style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.85rem", fontWeight: 600,
              letterSpacing: "0.05em", color: "#fff",
              background: "var(--accent)", border: "none",
              borderRadius: "8px", padding: "0.9rem 2rem",
              cursor: "pointer", transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.opacity="0.88"; e.target.style.transform="translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.opacity="1"; e.target.style.transform="none"; }}>
              View My Work
            </button>
            <button onClick={() => scrollTo("#contact")} style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.85rem", fontWeight: 500,
              letterSpacing: "0.04em", color: "var(--text-secondary)",
              background: "transparent", border: "1px solid var(--border-light)",
              borderRadius: "8px", padding: "0.9rem 2rem",
              cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(160,120,40,0.5)"; e.currentTarget.style.color="var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor="var(--border-light)"; e.currentTarget.style.color="var(--text-secondary)"; }}>
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
          }} className="stats-grid">
            {stats.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </div>

        {/* ── Right: avatar ── */}
        <AvatarPlaceholder initials={personal.initials} />
      </div>
    </section>
  );
}
