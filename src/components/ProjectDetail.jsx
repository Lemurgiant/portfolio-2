import React, { useState, useEffect } from "react";
import { descriptions } from "../data/descriptions";
import ImageCarousel from "./shared/ImageCarousel";

const STATUS_COLORS = {
  Live: "#5BBFB5",
  "Open Source": "#9B8FD4",
  Delivered: "#C9A84C",
};

export default function ProjectDetail({ project, onBack }) {
  const [visible, setVisible] = useState(false);
  const desc = descriptions[project.id] || {};
  const color = STATUS_COLORS[project.status] || "var(--text-muted)";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        maxWidth: "1160px",
        margin: "0 auto",
        padding: "2rem 2rem 6rem",
      }}
    >
      {/* Top back button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem 0",
          marginBottom: "2.5rem",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        ← Back to Projects
      </button>

      {/* Hero: image + meta side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55% 1fr",
          gap: "4rem",
          alignItems: "start",
          marginBottom: "4rem",
        }}
        className="detail-hero"
      >
        <ImageCarousel images={project.images} color={color} />

        <div style={{ paddingTop: "0.5rem" }}>
          {/* Industry · Status · Year */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {desc.industry && (
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  color: "var(--text-dim)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  padding: "0.2rem 0.75rem",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {desc.industry}
              </span>
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                color,
                border: `1px solid ${color}30`,
                borderRadius: "100px",
                padding: "0.2rem 0.75rem",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: color,
                }}
              />
              {project.status}
            </span>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
              }}
            >
              {project.year}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 0.45rem",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--accent)",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            {project.subtitle}
          </p>

          <div
            style={{
              width: "36px",
              height: "2px",
              background: "var(--accent)",
              marginBottom: "1.5rem",
              opacity: 0.45,
            }}
          />

          {desc.headline && (
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                opacity: 0.9,
              }}
            >
              {desc.headline}
            </p>
          )}

          {/* External links */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Live ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "1px", background: "var(--border)", marginBottom: "4rem" }}
      />

      {/* Problem */}
      {desc.problem && (
        <div style={{ marginBottom: "3.5rem", maxWidth: "740px" }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1rem",
            }}
          >
            The Problem
          </p>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--text-muted)",
              lineHeight: 1.9,
            }}
          >
            {desc.problem}
          </p>
        </div>
      )}

      {/* Solution */}
      {desc.solution && (
        <div style={{ marginBottom: "3.5rem", maxWidth: "740px" }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1rem",
            }}
          >
            What Was Built
          </p>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--text-muted)",
              lineHeight: 1.9,
            }}
          >
            {desc.solution}
          </p>
        </div>
      )}

      {/* Key Results */}
      {desc.outcomes && desc.outcomes.length > 0 && (
        <div style={{ marginBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.5rem",
            }}
          >
            Key Results
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "0.85rem",
            }}
          >
            {desc.outcomes.map((outcome, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${color}`,
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capabilities */}
      {desc.capabilities && desc.capabilities.length > 0 && (
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.5rem",
            }}
          >
            Capabilities Delivered
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              maxWidth: "680px",
            }}
          >
            {desc.capabilities.map((cap, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                <span
                  style={{
                    marginTop: "0.52rem",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom back button */}
      <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "0.65rem 1.25rem",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.borderColor = "var(--border-light)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
