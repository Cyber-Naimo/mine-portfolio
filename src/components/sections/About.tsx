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
    body: "I run the servers that move real money between countries. If my systems go down, someone can't pay their bills. That's why I work hard to make sure they don't go down, and fix things before anyone else notices.",
  },
  {
    number: "02",
    title: "Proactive, Not Reactive",
    body: "Nobody asked me to, but I noticed my teammates spending hours just to find one broken payment across 20+ apps. I built a tool that did it in seconds. I like fixing problems before anyone tells me to.",
  },
  {
    number: "03",
    title: "Knowledge Spreads, Not Silos",
    body: "I've taught 20+ engineers at other banks how to use our tools. I write things down, run workshops, and make sure the people around me know what I know, not keep it to myself.",
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
            color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
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
                "I fix things before people notice they're broken — and sometimes I fix things
                people didn't even know needed fixing."
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Pillars — fly in from alternating directions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginBottom: 100, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="pillars-grid">
          {pillars.map((p, i) => {
            const from = i === 0 ? { x: -80, opacity: 0 } : i === 1 ? { y: 80, opacity: 0, scale: 0.9 } : { x: 80, opacity: 0 };
            return (
              <motion.div
                key={p.number}
                initial={from}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.35, duration: 0.9, delay: i * 0.12 }}
                style={{
                  padding: "40px 36px",
                  background: "rgba(255,255,255,0.015)",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", marginBottom: 20 }}>{p.number}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em" }}>{p.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{p.body}</div>
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
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
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
        @media (max-width: 900px) {
          .about-container { padding: 0 24px !important; }
          .about-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
