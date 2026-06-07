"use client";

import { motion } from "framer-motion";
import { achievements, certifications } from "@/lib/data";

export default function Achievements() {
  return (
    <section id="achievements" style={{ background: "#0A0A0A", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="ach-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
            Achievements
          </span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: 0, lineHeight: 1.05 }}>
            Credibility &amp;<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>recognition.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="ach-grid">

          {/* Left: Certifications */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 24 }}>
              Certifications
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "20px 22px",
                    borderBottom: i < certifications.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: "rgba(255,255,255,0.01)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.01)"; }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 17,
                  }}>
                    {i === 0 ? "⎈" : i === 3 ? "📬" : i === 4 ? "🔐" : "☁"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 3 }}>
                      {cert.name}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: cert.note ? 4 : 0 }}>{cert.issuer} · {cert.date}</div>
                    {cert.note && (
                      <div style={{ fontSize: 11, color: "#F59E0B", fontWeight: 500, letterSpacing: "0.04em" }}>
                        ↳ {cert.note}
                      </div>
                    )}
                  </div>
                  {(cert.credentialFile || cert.credentialUrl) && (
                    <a
                      href={cert.credentialUrl ?? cert.credentialFile ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        fontSize: 12, color: "#3B82F6", textDecoration: "none",
                        padding: "5px 12px", borderRadius: 6,
                        border: "1px solid rgba(59,130,246,0.25)",
                        background: "rgba(59,130,246,0.08)",
                        flexShrink: 0, whiteSpace: "nowrap",
                        transition: "all 0.15s",
                      }}
                    >
                      Verify ↗
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Achievements timeline */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 24 }}>
              Milestones
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: "flex", gap: 20, padding: "20px 0 20px 28px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      position: "relative",
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      position: "absolute", left: -4,
                      width: 8, height: 8, borderRadius: "50%",
                      background: item.type === "award" ? "rgba(251,191,36,0.9)" : "rgba(59,130,246,0.6)",
                      marginTop: 6,
                      boxShadow: item.type === "award" ? "0 0 10px rgba(251,191,36,0.5)" : "none",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {item.type === "award" && (
                            <span style={{ fontSize: 16 }}>🏆</span>
                          )}
                          <div style={{ fontSize: 15, fontWeight: 600, color: item.type === "award" ? "#FCD34D" : "#fff", lineHeight: 1.4 }}>{item.title}</div>
                        </div>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{item.year}</span>
                      </div>
                      <div style={{ fontSize: 12, color: item.type === "award" ? "rgba(251,191,36,0.6)" : "#3B82F6", marginBottom: 5, fontWeight: 500 }}>{item.org}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>{item.description}</div>
                      {item.type === "award" && (
                        <a
                          href="/raising-the-bar-award.jpeg"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            marginTop: 10, fontSize: 12, color: "rgba(251,191,36,0.8)",
                            textDecoration: "none", fontWeight: 500,
                            padding: "4px 10px", borderRadius: 6,
                            border: "1px solid rgba(251,191,36,0.2)",
                            background: "rgba(251,191,36,0.06)",
                            transition: "all 0.2s",
                          }}
                        >
                          View Award ↗
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ach-container { padding: 0 20px !important; }
          .ach-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
