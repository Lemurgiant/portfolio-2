import React from "react";

export default function SectionHeader({ label, title, subtitle, align = "left" }) {
  const isCenter = align === "center";
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: isCenter ? "center" : "flex-start",
      textAlign: isCenter ? "center" : "left",
      marginBottom: "4rem",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
      }}>
        <div style={{ width: "28px", height: "1px", background: "var(--accent)", opacity: 0.7 }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
          opacity: 0.85,
        }}>
          {label}
        </span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 4vw, 2.9rem)",
        fontWeight: 700,
        color: "var(--text-primary)",
        lineHeight: 1.15,
        margin: 0,
        marginBottom: subtitle ? "1.1rem" : 0,
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "1.05rem",
          fontWeight: 300,
          color: "var(--text-muted)",
          maxWidth: "540px",
          lineHeight: 1.75,
          margin: 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
