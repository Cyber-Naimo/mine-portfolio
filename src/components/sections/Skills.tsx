"use client";

import { motion } from "framer-motion";

const groups = [
  {
    label: "Container & Orchestration",
    items: ["Kubernetes", "EKS Anywhere", "Helm", "Docker"],
    accent: "#3B82F6",
  },
  {
    label: "CI/CD & Automation",
    items: ["GitLab CI", "Jenkins", "GitHub Actions", "ArgoCD"],
    accent: "#8B5CF6",
  },
  {
    label: "Observability",
    items: ["ELK Stack", "Prometheus", "Grafana", "Kibana", "Filebeat", "Logstash"],
    accent: "#06B6D4",
  },
  {
    label: "Cloud",
    items: ["Google Cloud (GCP)", "Amazon Web Services (AWS)"],
    accent: "#10B981",
  },
  {
    label: "Security & DevSecOps",
    items: ["Trivy", "SonarQube", "Penetration Testing", "API Security"],
    accent: "#F59E0B",
  },
  {
    label: "Infrastructure as Code",
    items: ["Terraform", "Ansible", "Helm Charts"],
    accent: "#EC4899",
  },
  {
    label: "Disaster Recovery",
    items: ["Velero", "MinIO", "OpenEBS"],
    accent: "#10B981",
  },
  {
    label: "Languages & Scripting",
    items: ["Bash", "Python", "YAML", "SQL", "JavaScript"],
    accent: "#A1A1AA",
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#111111", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      {/* Ambient orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
          filter: "blur(60px)", top: "-10%", right: "-15%",
          animation: "orbFloat1 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          filter: "blur(50px)", bottom: "-10%", left: "-10%",
          animation: "orbFloat2 16s ease-in-out infinite",
        }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }} className="skills-container">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Skills
          </span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="skills-grid">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.28, duration: 0.9 }}
          >
            <h2 style={{
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
            }}>
              Every tool here<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>used in production.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 360, margin: 0 }}>
              Not practice projects. Real systems, real traffic, real money moving through these tools every day.
            </p>
          </motion.div>

          {/* Skill groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            {groups.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.7, delay: i * 0.07 }}
                style={{
                  display: "flex", alignItems: "flex-start",
                  padding: "20px 24px",
                  borderBottom: i < groups.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  gap: 20,
                  background: "rgba(255,255,255,0.01)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.01)"}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: group.accent, marginTop: 5, flexShrink: 0,
                  boxShadow: `0 0 8px ${group.accent}60`,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: group.accent, marginBottom: 10, letterSpacing: "0.06em", fontWeight: 600, textTransform: "uppercase", opacity: 0.75 }}>
                    {group.label}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {group.items.map(item => (
                      <span key={item} style={{
                        fontSize: 13, padding: "4px 12px", borderRadius: 6,
                        background: `${group.accent}10`,
                        border: `1px solid ${group.accent}28`,
                        color: "rgba(255,255,255,0.88)",
                        letterSpacing: "-0.01em",
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbFloat1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-40px) translateX(20px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(30px) translateX(-20px)} }
        @media (max-width: 768px) {
          .skills-container { padding: 0 20px !important; }
          .skills-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
