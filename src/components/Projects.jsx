import React, { useState } from "react";
import { projects } from "../data/content";
import SectionHeader from "./shared/SectionHeader";
import { useScrollReveal } from "../hooks/useAnimations";

const STATUS_COLORS = {
  Live: "#5BBFB5",
  "Open Source": "#9B8FD4",
  Delivered: "#C9A84C",
};

function FeaturedProject({ project, index }) {
  const [ref, visible] = useScrollReveal();
  const isEven = index % 2 === 0;
  const color = STATUS_COLORS[project.status] || "var(--text-muted)";

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        marginBottom: "7rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.75s cubic-bezier(0.22,1,0.36,1)",
      }}
      className="featured-project"
    >
      {/* Visual card */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            aspectRatio: "4/3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            padding: "2rem",
          }}
        >
          {/* subtle mesh bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${color}08 0%, transparent 70%)`,
            }}
          />
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "5rem",
              fontWeight: 700,
              color: color,
              opacity: 0.12,
              lineHeight: 1,
              position: "relative",
            }}
          >
            {project.title.slice(0, 1)}
          </div>

          {/* Metrics strip */}
          {/* <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(13,13,18,0.7)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem",
            display: "flex", justifyContent: "space-around",
          }}>
            {project.metrics.map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem", fontWeight: 700,
                  color, lineHeight: 1,
                }}>{m.value}</div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.62rem", fontWeight: 500,
                  color: "var(--text-muted)", textTransform: "uppercase",
                  letterSpacing: "0.07em", marginTop: "0.25rem",
                }}>{m.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Content */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color,
              border: `1px solid ${color}30`,
              borderRadius: "100px",
              padding: "0.25rem 0.8rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: color,
              }}
            />
            {project.status}
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              color: "var(--text-dim)",
            }}
          >
            {project.year}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 0.4rem",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--accent)",
            marginBottom: "1.1rem",
            letterSpacing: "0.02em",
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "var(--text-muted)",
            lineHeight: 1.85,
            marginBottom: "1.5rem",
          }}
        >
          {project.description}
        </p>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-dim)",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Role —{" "}
          <span
            style={{
              color: "var(--text-muted)",
              textTransform: "none",
              letterSpacing: "normal",
            }}
          >
            {project.role}
          </span>
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.75rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "0.3rem 0.7rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

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
  );
}

function ProjectCard({ project }) {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  const color = STATUS_COLORS[project.status] || "var(--text-muted)";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-light)" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "1.75rem",
        transition: "all 0.3s ease",
        transform: hovered
          ? "translateY(-4px)"
          : visible
            ? "translateY(0)"
            : "translateY(18px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.35)" : "none",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 600,
            color,
            border: `1px solid ${color}25`,
            borderRadius: "100px",
            padding: "0.2rem 0.7rem",
            letterSpacing: "0.06em",
          }}
        >
          ● {project.status}
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

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 0.25rem",
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "var(--accent)",
          marginBottom: "0.9rem",
        }}
      >
        {project.subtitle}
      </p>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 300,
          color: "var(--text-muted)",
          lineHeight: 1.75,
          marginBottom: "1.25rem",
        }}
      >
        {project.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1.25rem",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "5px",
              padding: "0.2rem 0.6rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
            }}
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
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      style={{ padding: "8rem 2rem", maxWidth: "1160px", margin: "0 auto" }}
    >
      <SectionHeader
        label="Selected Work"
        title="Projects & Case Studies"
        subtitle="High-impact work across engineering, leadership, and consulting."
      />
      {featured.map((project, i) => (
        <FeaturedProject key={project.id} project={project} index={i} />
      ))}
      {others.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{ flex: 1, height: "1px", background: "var(--border)" }}
            />
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              More Projects
            </span>
            <div
              style={{ flex: 1, height: "1px", background: "var(--border)" }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
