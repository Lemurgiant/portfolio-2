import React, { useState } from "react";
import { personal, contact } from "../data/content";
import SectionHeader from "./shared/SectionHeader";
import { useScrollReveal } from "../hooks/useAnimations";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
  { name: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
  { name: "subject", label: "Subject", type: "text", placeholder: "Project inquiry, collaboration..." },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project or what you're looking for..." },
];

export default function Contact() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase = (name) => ({
    width: "100%", boxSizing: "border-box",
    background: "var(--surface-2)",
    border: `1px solid ${focused === name ? "rgba(201,168,76,0.45)" : "var(--border-light)"}`,
    borderRadius: "8px", padding: "0.85rem 1.1rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.9rem", fontWeight: 400,
    color: "var(--text-primary)", outline: "none",
    transition: "border-color 0.2s",
    resize: name === "message" ? "vertical" : undefined,
    minHeight: name === "message" ? "150px" : undefined,
  });

  const labelStyle = {
    display: "block",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.72rem", fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "var(--text-muted)", marginBottom: "0.5rem",
  };

  return (
    <section id="contact" style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <SectionHeader
          label="Contact"
          title={contact.heading}
          subtitle={contact.subheading}
        />

        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1.7fr",
          gap: "5rem", alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }} className="contact-grid">

          {/* Left info */}
          <div>
            {[
              { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
              { label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
              { label: "Location", value: personal.location },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "2rem" }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.7rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--accent)", margin: "0 0 0.35rem",
                }}>{item.label}</p>
                {item.href ? (
                  <a href={item.href} style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem", fontWeight: 400,
                    color: "var(--text-secondary)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem", fontWeight: 400,
                    color: "var(--text-secondary)", margin: 0,
                  }}>{item.value}</p>
                )}
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", marginTop: "1rem" }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-dim)", marginBottom: "1.1rem",
              }}>Connect</p>
              {personal.social.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.88rem", fontWeight: 400,
                  color: "var(--text-muted)", textDecoration: "none",
                  marginBottom: "0.75rem", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
                  <span style={{
                    width: "24px", height: "24px", borderRadius: "6px",
                    background: "var(--surface-2)", border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem",
                  }}>↗</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem", marginBottom: "1.1rem" }} className="form-grid">
              {FIELDS.slice(0, 2).map((f) => (
                <div key={f.name}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    name={f.name} type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    required style={inputBase(f.name)}
                  />
                </div>
              ))}
            </div>
            {FIELDS.slice(2).map((f) => (
              <div key={f.name} style={{ marginBottom: "1.1rem" }}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    required style={inputBase(f.name)}
                  />
                ) : (
                  <input
                    name={f.name} type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    required style={inputBase(f.name)}
                  />
                )}
              </div>
            ))}
            <button type="submit" style={{
              width: "100%",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.88rem", fontWeight: 600,
              letterSpacing: "0.05em",
              color: sent ? "var(--teal)" : "#0D0D12",
              background: sent ? "transparent" : "var(--accent)",
              border: `1px solid ${sent ? "var(--teal)" : "var(--accent)"}`,
              borderRadius: "8px", padding: "1rem",
              cursor: "pointer", marginTop: "0.5rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { if (!sent) e.target.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; }}>
              {sent ? "✓ Message Sent Successfully" : contact.cta}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
