"use client";

import { motion } from "framer-motion";

const timeline = [
  { year: "2021", label: "Started BSCS", sub: "FAST NUCES · Karachi" },
  { year: "2023", label: "Campus Ambassador", sub: "SkillReactor" },
  { year: "2024", label: "Gold Medal - Fall 2024", sub: "FAST NUCES · 1st Position" },
  { year: "2025", label: "Gold Medal - Spring 2025", sub: "FAST NUCES · 1st Position" },
  { year: "2025", label: "QA Engineer Intern", sub: "VentureDive" },
  { year: "2025", label: "Internal API Platform", sub: "Paysys Labs · Hoppscotch self-hosted" },
  { year: "2025", label: "KubeForge", sub: "Multi-country deployment CLI · 70–90% faster" },
  { year: "2025", label: "Associate DevOps Engineer", sub: "Paysys Labs · Present", active: true },
];

const pillars = [
  {
    number: "01",
    title: "Reliability First",
    body: "Real money moves through my systems. Downtime isn't an inconvenience, it's a failed transaction. I build things that don't break.",
  },
  {
    number: "02",
    title: "Proactive, Not Reactive",
    body: "I built a transaction search tool nobody asked for. Saved engineers hours daily. Then got recognized for it.",
  },
  {
    number: "03",
    title: "Knowledge Spreads",
    body: "Trained 20+ engineers at partner banks on Kubernetes and ELK Stack. Knowledge shared is knowledge multiplied.",
  },
];

export default function About() {
  return (
    <section id="about" style={{ background: "#111111", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="about-container">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 80 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
          }}>
            About
          </span>
        </motion.div>

        {/* Top: headline + quote */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 100 }} className="about-top">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.28, duration: 0.9 }}
          >
            <h2 style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: 0,
            }}>
              I build infra<br />
              that handles money<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>across two countries.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.28, duration: 0.9, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          >
            <blockquote style={{
              margin: 0,
              padding: "0 0 0 20px",
              borderLeft: "2px solid rgba(59,130,246,0.5)",
            }}>
              <p style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.72)",
                margin: 0,
                fontStyle: "italic",
              }}>
                "I fix things before people notice they're broken, and sometimes I fix things
                people didn't even know needed fixing."
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Pillars — fly in from alternating directions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 100 }} className="pillars-grid">
          {pillars.map((p, i) => {
            const from = i === 0 ? { x: -80, opacity: 0 } : i === 1 ? { y: 80, opacity: 0, scale: 0.9 } : { x: 80, opacity: 0 };
            const accentColors = ["#3B82F6", "#a78bfa", "#10B981"];
            const color = accentColors[i];
            return (
              <motion.div
                key={p.number}
                initial={from}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.35, duration: 0.9, delay: i * 0.12 }}
                style={{
                  padding: "36px 32px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  borderTop: `2px solid ${color}`,
                  transition: "background 0.25s, border-color 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.borderTopColor = color;
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: `${color}18`, letterSpacing: "-0.05em", marginBottom: 16, lineHeight: 1 }}>{p.number}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>{p.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.75 }}>{p.body}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 32 }}
          >
            Career Timeline
          </motion.div>
          <div style={{ position: "relative" }}>
            {/* Animated growing line */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.05)" }} />
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(59,130,246,0.4)", transformOrigin: "top" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.7, delay: i * 0.08 }}
                  className="timeline-row"
                  style={{
                    display: "flex", alignItems: "center",
                    gap: 28, padding: "20px 0 20px 28px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    position: "relative",
                  }}
                >
                  {/* Dot — pops in */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.6, delay: i * 0.08 + 0.15 }}
                    style={{
                      position: "absolute", left: -4,
                      width: 8, height: 8, borderRadius: "50%",
                      background: t.active
                        ? "#3B82F6"
                        : (t.label.startsWith("Gold Medal"))
                          ? "rgba(251,191,36,0.8)"
                          : (t.label === "Internal API Platform" || t.label === "KubeForge")
                            ? "rgba(167,139,250,0.8)"
                            : "rgba(255,255,255,0.3)",
                      boxShadow: t.active ? "0 0 12px rgba(59,130,246,0.6)" : "none",
                    }}
                  />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", minWidth: 36, letterSpacing: "0.05em" }}>
                    {t.year}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: t.active ? 700 : 500, color: t.active ? "#fff" : "rgba(255,255,255,0.8)", flex: 1 }}>
                    {t.label}
                  </span>
                  <span className="tl-sub" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    {t.sub}
                  </span>
                  {t.active && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                      background: "rgba(59,130,246,0.1)", color: "#3B82F6",
                      border: "1px solid rgba(59,130,246,0.2)", letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>Now</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-container { padding: 0 20px !important; }
          .about-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .timeline-row { gap: 12px !important; flex-wrap: wrap; }
          .timeline-row .tl-sub { display: none !important; }
        }
      `}</style>
    </section>
  );
}
