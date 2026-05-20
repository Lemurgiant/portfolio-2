import React, { useState } from "react";
import { projects } from "../data/content";
import SectionHeader from "./shared/SectionHeader";
import { useScrollReveal } from "../hooks/useAnimations";

const STATUS_COLORS = {
  Live: "#5BBFB5",
  "Open Source": "#9B8FD4",
  Delivered: "#C9A84C",
};

function CarouselSlide({ src, index }) {
  const isVideo = src.toLowerCase().endsWith(".mp4");

  if (isVideo) {
    return (
      <video
        key={index}
        autoPlay
        loop
        muted
        playsInline
        style={{
          flex: "0 0 100%",
          width: "100%",
          height: "auto",
          display: "block",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={`Slide ${index + 1}`}
      style={{
        flex: "0 0 100%",
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />
  );
}

function ImageCarousel({ images = [], color }) {
  const [cur, setCur] = useState(0);
  const total = images.length;

  const go = (n) => setCur((n + total) % total);

  if (!total) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ fontSize: "5rem", fontWeight: 700, color, opacity: 0.12 }}
        >
          ?
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        width: "100%",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      {/* Track */}
      <div
        style={{
          display: "flex",
          width: "100%",
          transform: `translateX(-${cur * 100}%)`,
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {images.map((src, i) => (
          <CarouselSlide key={i} src={src} index={i} />
        ))}
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            onClick={() => go(cur - 1)}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              fontSize: "1.1rem",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => go(cur + 1)}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              fontSize: "1.1rem",
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                cursor: "pointer",
                background:
                  i === cur
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.35)",
                transform: i === cur ? "scale(1.3)" : "scale(1)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.8)",
            background: "rgba(0,0,0,0.4)",
            padding: "3px 8px",
            borderRadius: "20px",
          }}
        >
          {cur + 1} / {total}
        </div>
      )}
    </div>
  );
}

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
      <div style={{ order: isEven ? 0 : 1 }}>
        <ImageCarousel images={project.images} color={color} />
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
