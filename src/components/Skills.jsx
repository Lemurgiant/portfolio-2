import React, { useState } from "react";
import { skills } from "../data/content";
import SectionHeader from "./shared/SectionHeader";
import { useScrollReveal } from "../hooks/useAnimations";

function SkillBar({ name, level, color, animate }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-muted)",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "2px",
          background: "var(--surface-2)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animate ? `${level}%` : "0%",
            background: color,
            borderRadius: "2px",
            transition: "width 1.3s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: "0.15s",
            opacity: 0.85,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ skill, isActive, onClick }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        background: isActive ? "var(--surface)" : "var(--surface)",
        border: `1px solid ${isActive ? skill.color + "35" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "2rem",
        cursor: "pointer",
        transition: "all 0.35s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        boxShadow: isActive ? `0 0 40px ${skill.color}0D` : "none",
        outline: isActive ? `none` : "none",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: skill.color + "15",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          marginBottom: "1rem",
        }}
      >
        {skill.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem",
          fontWeight: 600,
          color: isActive ? skill.color : "var(--text-primary)",
          margin: "0 0 0.5rem",
          transition: "color 0.3s",
        }}
      >
        {skill.category}
      </h3>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 300,
          color: "var(--text-muted)",
          margin: "0 0 1.5rem",
          lineHeight: 1.65,
        }}
      >
        {skill.description}
      </p>

      {skill.items.map((item) => (
        <SkillBar
          key={item.name}
          name={item.name}
          level={item.level || 75}
          color={skill.color}
          animate={isActive && visible}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="skills"
      style={{ padding: "8rem 2rem", maxWidth: "1160px", margin: "0 auto" }}
    >
      <SectionHeader
        label="Capabilities"
        title="Skills & Expertise"
        subtitle="A breadth of technical and leadership capabilities built across years of cross-industry work."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {skills.map((skill, i) => (
          <SkillCard
            key={skill.category}
            skill={skill}
            isActive={active === i}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
