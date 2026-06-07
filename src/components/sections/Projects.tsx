"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Github } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" style={{ background: "#0A0A0A", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="projects-container">

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 16 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              Projects
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: 0, lineHeight: 1.05 }}
          >
            Work that ships<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>to production.</span>
          </motion.h2>
        </div>

        {/* Single unified grid — no gaps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .projects-container { padding: 0 20px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: (typeof projects)[0]; index: number; onClick: () => void }) {
  const categoryColor: Record<string, string> = {
    DevOps: "#3B82F6", Infrastructure: "#10B981", Observability: "#06B6D4",
    Security: "#F59E0B", "Full-Stack": "#8B5CF6", "Platform Engineering": "#EC4899",
  };
  const color = categoryColor[project.category] ?? "#3B82F6";

  const wrapRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 13}deg) rotateY(${x * 13}deg)`;
    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
      shineRef.current.style.opacity = "1";
    }
  }, []);

  const onEnter = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.borderColor = "rgba(255,255,255,0.14)";
      innerRef.current.style.background = "rgba(255,255,255,0.04)";
    }
  }, []);

  const onLeave = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => { if (wrapRef.current) wrapRef.current.style.transition = ""; }, 560);
    if (shineRef.current) shineRef.current.style.opacity = "0";
    if (innerRef.current) {
      innerRef.current.style.borderColor = "rgba(255,255,255,0.07)";
      innerRef.current.style.background = "rgba(255,255,255,0.02)";
    }
  }, []);

  // Outer plain div = tilt (no Framer Motion conflict)
  // Inner motion.div = scroll-entrance animation
  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ willChange: "transform", cursor: "pointer" }}
    >
      <motion.div
        ref={innerRef}
        initial={{ opacity: 0, y: 70, scale: 0.88 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.32, duration: 0.85, delay: index * 0.1 }}
        style={{
          padding: "28px",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          background: "rgba(255,255,255,0.02)",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {/* Specular shine overlay */}
        <div ref={shineRef} style={{
          position: "absolute", inset: 0, borderRadius: 16,
          pointerEvents: "none", opacity: 0,
          transition: "opacity 0.3s", zIndex: 1,
        }} />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color, padding: "3px 10px", borderRadius: 20,
            background: `${color}12`, border: `1px solid ${color}25`,
          }}>
            {project.category}
          </span>
          <ArrowUpRight size={16} color="rgba(255,255,255,0.2)" />
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", margin: "0 0 24px", lineHeight: 1.6 }}>
          {project.subtitle}
        </p>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
          {project.highlights.slice(0, 3).map(h => (
            <div key={h.label}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{h.metric}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3, letterSpacing: "0.04em" }}>{h.label}</div>
            </div>
          ))}
        </div>

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 5,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.45)",
            }}>{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>+{project.tech.length - 4}</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 640,
          maxHeight: "85vh", overflowY: "auto",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          background: "#111111",
          padding: 36,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{project.title}</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 24, padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 28 }}>
          {project.highlights.map(h => (
            <div key={h.label} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{h.metric}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{h.label}</div>
            </div>
          ))}
        </div>

        {[
          { title: "The Problem", text: project.problem },
          { title: "The Solution", text: project.solution },
          { title: "Architecture", text: project.architecture },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              {s.title}
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.7 }}>{s.text}</p>
          </div>
        ))}

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Impact</div>
          {project.impact.map(i => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "#10B981", fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{i}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: 12, padding: "4px 10px", borderRadius: 6,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}>{t}</span>
          ))}
        </div>

        {project.github && (
          <div style={{ marginTop: 20 }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
              color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600,
              textDecoration: "none", transition: "all 0.2s",
            }}>
              <Github size={15} /> GitHub
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
