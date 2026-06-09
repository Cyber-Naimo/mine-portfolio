"use client";

import dynamic from "next/dynamic";
import { motion, type Transition } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Typewriter from "@/components/ui/Typewriter";
import { useTheme } from "@/context/ThemeContext";

const TYPEWRITER_PHRASES = [
  "Kubernetes that stays up when it counts.",
  "CI/CD across 20+ services, two countries.",
  "Observability before the alert fires.",
  "Disaster recovery, tested, not assumed.",
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
  const { theme } = useTheme();

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* 3D scene — dark mode only (additive blending invisible on light bg) */}
      <div style={{ position: "absolute", inset: 0, opacity: theme === "dark" ? 0.65 : 0, transition: "opacity 0.4s", pointerEvents: theme === "light" ? "none" : undefined }}>
        <HeroScene />
      </div>

      {/* Light mode animation — floating gradient blobs */}
      {theme === "light" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
          <div className="hero-blob hero-blob-4" />
        </div>
      )}

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Radial fade — top edge */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, transparent 0%, var(--vignette) 90%)",
      }} />

      {/* Subtle accent glow */}
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

          {/* Label */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "var(--text-40)", textTransform: "uppercase" }}>
                DevOps Engineer
              </span>
              <span style={{ color: "var(--text-20)" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#3B82F6", textTransform: "uppercase" }}>
                Paysys Labs
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div {...fadeUp(0.2)} style={{ marginBottom: 24 }}>
            <h1 style={{
              fontSize: "clamp(52px, 7vw, 88px)",
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--text-100)", margin: 0,
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

          {/* Typewriter */}
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 40 }}>
            <p style={{
              fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.6,
              color: "var(--text-60)", maxWidth: 460, margin: 0,
              fontWeight: 400, minHeight: "1.6em",
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
                background: "var(--text-100)", color: "var(--bg-primary)",
                border: "none", borderRadius: 10,
                fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: "-0.01em", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              View Work <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            <a
              href={personalInfo.resumePdf}
              download
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "13px 24px",
                background: "transparent", color: "var(--text-60)",
                border: "1px solid var(--border-b)", borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: "pointer", letterSpacing: "-0.01em",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-100)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-60)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-b)"; }}
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
                  border: "1px solid var(--border-a)",
                  borderRadius: 10,
                  color: "var(--text-40)",
                  background: "transparent",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-100)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-b)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-40)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-a)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <Icon size={16} />
              </a>
            ))}
            <span style={{ marginLeft: 8, fontSize: 12, color: "var(--text-20)", letterSpacing: "0.05em" }}>
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
            border: "1px solid var(--border-a)",
            borderRadius: 16,
            background: "var(--surface-a)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ fontSize: 11, color: "var(--text-40)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Currently</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-100)", marginBottom: 4 }}>Associate DevOps Engineer</div>
            <div style={{ fontSize: 13, color: "var(--text-40)" }}>Paysys Labs · Aug 2025 – Present</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Kubernetes", "ELK Stack", "GitLab CI", "Fintech"].map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 20,
                  background: "rgba(59,130,246,0.1)", color: "#60A5FA",
                  border: "1px solid rgba(59,130,246,0.2)", letterSpacing: "0.02em",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {personalInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 + i * 0.1 }}
                style={{
                  padding: "20px 20px",
                  border: "1px solid var(--border-a)",
                  borderRadius: 14,
                  background: "var(--surface-a)",
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  duration={1600}
                  style={{ fontSize: 28, fontWeight: 800, color: "var(--text-100)", letterSpacing: "-0.03em", lineHeight: 1 }}
                />
                <div style={{ fontSize: 11, color: "var(--text-40)", marginTop: 6, lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{
              padding: "14px 16px",
              border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14,
              background: "rgba(16,185,129,0.05)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>⎈</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-80)", marginBottom: 2 }}>CKA Certified</div>
                <div style={{ fontSize: 10, color: "var(--text-40)" }}>KodeKloud</div>
              </div>
            </div>
            <div style={{
              padding: "14px 16px",
              border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14,
              background: "rgba(251,191,36,0.04)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(251,191,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🥇</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-80)", marginBottom: 2 }}>2× Gold Medal</div>
                <div style={{ fontSize: 10, color: "var(--text-40)" }}>FAST NUCES</div>
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
          color: "var(--text-20)",
        }}
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 100px 20px 60px !important; }
          .hero-right { display: none !important; }
        }
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,-80px) scale(1.15); }
          66%      { transform: translate(-40px,40px) scale(0.88); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-70px,60px) scale(1.2); }
          70%      { transform: translate(50px,-30px) scale(0.9); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          30%      { transform: translate(40px,70px) scale(0.85); }
          65%      { transform: translate(-60px,-50px) scale(1.1); }
        }
        @keyframes blob4 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px,50px) scale(1.1); }
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          will-change: transform;
        }
        .hero-blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%);
          top: -80px; left: -60px;
          animation: blob1 10s ease-in-out infinite;
        }
        .hero-blob-2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%);
          top: 30%; right: -80px;
          animation: blob2 13s ease-in-out infinite;
        }
        .hero-blob-3 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
          bottom: -60px; left: 30%;
          animation: blob3 11s ease-in-out infinite;
        }
        .hero-blob-4 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
          top: 20%; left: 45%;
          animation: blob4 14s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
