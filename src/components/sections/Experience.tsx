"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ background: "var(--bg-secondary)", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="exp-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "var(--text-40)", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
            Experience
          </span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-100)", margin: 0, lineHeight: 1.05 }}>
            Where I&apos;ve built<br />
            <span style={{ color: "var(--text-20)" }}>real things.</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {experience.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: 48,
                padding: "44px 0",
                borderBottom: "1px solid var(--border-a)",
              }}
              className="exp-row"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 19, fontWeight: 700, color: "var(--text-100)", letterSpacing: "-0.02em" }}>
                    {job.company}
                  </div>
                  {i === 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                      background: "rgba(16,185,129,0.1)", color: "#10B981",
                      border: "1px solid rgba(16,185,129,0.2)", letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>Now</span>
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-60)", marginBottom: 6 }}>{job.role}</div>
                <div style={{ fontSize: 13, color: "var(--text-40)", marginBottom: 4 }}>{job.duration}</div>
                <div style={{ fontSize: 13, color: "var(--text-40)" }}>{job.location}</div>
              </div>

              <div>
                <p style={{ fontSize: 15, color: "var(--text-60)", lineHeight: 1.75, margin: "0 0 28px" }}>
                  {job.description}
                </p>
                {job.highlights.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
                    {job.highlights.map(h => (
                      <div key={h.label} style={{
                        padding: "14px 18px", borderRadius: 12,
                        border: "1px solid var(--border-a)",
                        background: "var(--surface-a)",
                        minWidth: 100,
                      }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-100)", letterSpacing: "-0.03em" }}>{h.metric}</div>
                        <div style={{ fontSize: 11, color: "#3B82F6", marginTop: 3, fontWeight: 600, letterSpacing: "0.05em" }}>{h.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-40)", marginTop: 3, lineHeight: 1.4 }}>{h.detail}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  {job.contributions.slice(0, 5).map((c, j) => (
                    <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "rgba(59,130,246,0.5)", fontSize: 14, marginTop: 2, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: 14, color: "var(--text-60)", lineHeight: 1.65 }}>{c}</span>
                    </div>
                  ))}
                </div>
                {job.tech.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {job.tech.map(t => (
                      <span key={t} style={{
                        fontSize: 12, padding: "4px 11px", borderRadius: 5,
                        background: "var(--surface-b)", border: "1px solid var(--border-a)",
                        color: "var(--text-60)",
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-container { padding: 0 20px !important; }
          .exp-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
