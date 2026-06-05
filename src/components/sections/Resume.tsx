"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Resume() {
  return (
    <section id="resume" style={{ background: "#0A0A0A", padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }} className="resume-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
            Want the full picture?
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            Download my resume for a complete breakdown of experience, projects, and certifications.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: 10 }}
        >
          <a
            href={personalInfo.resumePdf}
            download
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 22px", borderRadius: 10,
              background: "#3B82F6", color: "#fff",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#2563EB"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#3B82F6"}
          >
            <Download size={15} strokeWidth={2.5} /> Download
          </a>
          <a
            href={personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 22px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent", color: "rgba(255,255,255,0.6)",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            <ExternalLink size={15} /> View Online
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .resume-container { padding: 0 24px !important; flex-direction: column; } }
      `}</style>
    </section>
  );
}
