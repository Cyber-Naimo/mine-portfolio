"use client";

import dynamic from "next/dynamic";
import { motion, type Transition } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Typewriter from "@/components/ui/Typewriter";

const TYPEWRITER_PHRASES = [
  "Kubernetes that stays up when it counts.",
  "CI/CD across 20+ services, two countries.",
  "Observability before the alert fires.",
  "Disaster recovery — tested, not assumed.",
  "Self-hosted tools that cut licensing costs.",
];

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 55 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", bounce: 0.3, duration: 0.9, delay } as Transition,
});

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* 3D scene */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.65 }}>
        <HeroScene />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Radial fade — only top/bottom edges, leave center open for 3D */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, transparent 0%, #0A0A0A 90%)",
      }} />
      {/* Subtle blue glow behind cluster area */}
      <div style={{
        position: "absolute", pointerEvents: "none",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: 1280, margin: "0 auto",
        padding: "120px 40px 80px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
      className="hero-grid">

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

          {/* Terminal status badge */}
          <motion.div {...fadeUp(0.05)} style={{ marginBottom: 24 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "7px 14px",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 8,
              background: "rgba(16,185,129,0.06)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "rgba(16,185,129,0.85)", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.05em" }}>
                kubectl get pods — all running
              </span>
            </div>
          </motion.div>

          {/* Label */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginBottom: 32,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
              }}>
                DevOps Engineer
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
                color: "#3B82F6", textTransform: "uppercase",
              }}>
                Paysys Labs
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div {...fadeUp(0.2)} style={{ marginBottom: 24 }}>
            <h1 style={{
              fontSize: "clamp(52px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: 0,
            }}>
              Muhammad<br />
              <span style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 40%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Naimatullah
              </span>
            </h1>
          </motion.div>

          {/* Value prop — typewriter */}
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 40 }}>
            <p style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 460,
              margin: 0,
              fontWeight: 400,
              minHeight: "1.6em",
            }}>
              <Typewriter phrases={TYPEWRITER_PHRASES} speed={40} pause={2600} />
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "13px 24px",
                background: "#fff", color: "#0A0A0A",
                border: "none", borderRadius: 10,
                fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: "-0.01em",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              View Work <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            <a
              href={personalInfo.resumePdf}
              download
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "13px 24px",
                background: "transparent", color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: "pointer", letterSpacing: "-0.01em",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.5)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[
              { href: personalInfo.github, Icon: Github, label: "GitHub" },
              { href: personalInfo.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  color: "rgba(255,255,255,0.4)",
                  background: "transparent",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <Icon size={16} />
              </a>
            ))}
            <span style={{ marginLeft: 8, fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
              Karachi, Pakistan
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT — Stats panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
          className="hero-right"
        >
          {/* Current role card */}
          <div style={{
            padding: "24px 28px",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Currently</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Associate DevOps Engineer</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Paysys Labs · Aug 2025 – Present</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Kubernetes", "ELK Stack", "GitLab CI", "Fintech"].map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 20,
                  background: "rgba(59,130,246,0.1)", color: "#60A5FA",
                  border: "1px solid rgba(59,130,246,0.2)",
                  letterSpacing: "0.02em",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats grid — animated counters */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {personalInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 + i * 0.1 }}
                style={{
                  padding: "20px 20px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  duration={1600}
                  style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}
                />
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6, lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badges row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{
              padding: "14px 16px",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 14,
              background: "rgba(16,185,129,0.05)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(16,185,129,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
              }}>⎈</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>
                  CKA Certified
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>KodeKloud</div>
              </div>
            </div>
            <div style={{
              padding: "14px 16px",
              border: "1px solid rgba(251,191,36,0.2)",
              borderRadius: 14,
              background: "rgba(251,191,36,0.04)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(251,191,36,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
              }}>🥇</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>
                  2× Gold Medal
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>FAST NUCES</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: 32,
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 100px 20px 60px !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}
