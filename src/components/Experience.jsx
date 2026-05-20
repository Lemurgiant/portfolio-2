import React from "react";
import { experience } from "../data/content";
import SectionHeader from "./shared/SectionHeader";
import { useScrollReveal } from "../hooks/useAnimations";

const TYPE_COLORS = {
  "Full-time": "#5BBFB5",
  Contract: "#C9A84C",
  "Part-time": "#9B8FD4",
};

function ExperienceItem({ job, index }) {
  const [ref, visible] = useScrollReveal();
  const color = TYPE_COLORS[job.type] || "var(--text-muted)";

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "3rem",
        marginBottom: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.65s ease ${index * 0.1}s`,
      }}
      className="experience-item"
    >
      {/* Left meta */}
      <div style={{ paddingTop: "1.75rem" }}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            marginBottom: "0.35rem",
          }}
        >
          {job.period}
        </p>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "var(--text-muted)",
            marginBottom: "0.75rem",
          }}
        >
          {job.location}
        </p>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.67rem",
            fontWeight: 600,
            letterSpacing: "0.07em",
            color,
            border: `1px solid ${color}28`,
            borderRadius: "100px",
            padding: "0.2rem 0.7rem",
            textTransform: "uppercase",
          }}
        >
          {job.type}
        </span>
      </div>

      {/* Right card */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Accent left border */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "2rem",
            bottom: "2rem",
            width: "3px",
            borderRadius: "0 2px 2px 0",
            background: `linear-gradient(to bottom, ${color}, ${color}30)`,
          }}
        />

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color,
            marginBottom: "0.4rem",
            textTransform: "uppercase",
          }}
        >
          {job.company}
        </p>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 1.5rem",
          }}
        >
          {job.role}
        </h3>

        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {job.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.92rem",
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.75,
                marginBottom: "0.65rem",
                paddingLeft: "1.1rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0.55em",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.6,
                }}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <SectionHeader
          label="Career"
          title="Work Experience"
          subtitle="Where I've built products, led teams, and grown as an engineer and strategist."
        />
        {experience.map((job, i) => (
          <ExperienceItem key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
