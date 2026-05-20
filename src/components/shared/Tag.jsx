import React from "react";

export default function Tag({ label, color }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.7rem",
      letterSpacing: "0.04em",
      color: color || "var(--text-muted)",
      background: color ? `${color}15` : "var(--surface-2)",
      border: `1px solid ${color ? `${color}30` : "var(--border)"}`,
      borderRadius: "3px",
      padding: "0.25rem 0.6rem",
    }}>
      {label}
    </span>
  );
}
