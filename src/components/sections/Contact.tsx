"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight, Copy, Check } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ background: "#111111", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="contact-container">

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="contact-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: 24 }}>
              Contact
            </span>
            <h2 style={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.04em", color: "#fff",
              margin: "0 0 24px",
            }}>
              Let&apos;s build<br />
              something<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>impactful.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 380, margin: "0 0 40px" }}>
              Open to DevOps, infrastructure, and platform engineering roles.
              If you&apos;re building something that needs to be reliable at scale — let&apos;s talk.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12,
                background: "#fff", color: "#0A0A0A",
                fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Send me an email <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Right: links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ paddingTop: 56 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              {[
                {
                  icon: Mail, label: "Email", value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`, copyable: true,
                  iconBg: "rgba(234,67,53,0.12)", iconBorder: "rgba(234,67,53,0.25)", iconColor: "#EA4335",
                },
                {
                  icon: Linkedin, label: "LinkedIn", value: "muhammad-naimatullah-khan",
                  href: personalInfo.linkedin, copyable: false,
                  iconBg: "rgba(10,102,194,0.12)", iconBorder: "rgba(10,102,194,0.3)", iconColor: "#0A66C2",
                },
                {
                  icon: Github, label: "GitHub", value: "Cyber-Naimo",
                  href: personalInfo.github, copyable: false,
                  iconBg: "rgba(167,139,250,0.12)", iconBorder: "rgba(167,139,250,0.25)", iconColor: "#a78bfa",
                },
                {
                  icon: MapPin, label: "Location", value: "Karachi, Pakistan",
                  href: null, copyable: false,
                  iconBg: "rgba(16,185,129,0.12)", iconBorder: "rgba(16,185,129,0.25)", iconColor: "#10B981",
                },
              ].map(({ icon: Icon, label, value, href, copyable, iconBg, iconBorder, iconColor }, i, arr) => (
                <div key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 24px", gap: 16,
                        textDecoration: "none",
                        background: "rgba(255,255,255,0.01)",
                        borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.01)"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10,
                          background: iconBg,
                          border: `1px solid ${iconBorder}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: iconColor, flexShrink: 0,
                        }}>
                          <Icon size={17} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{value}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {copyable && (
                          <button
                            onClick={e => { e.preventDefault(); copyEmail(); }}
                            title="Copy email"
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "center",
                              width: 30, height: 30, borderRadius: 7,
                              border: "1px solid rgba(255,255,255,0.1)",
                              background: copied ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                              color: copied ? "#10B981" : "rgba(255,255,255,0.35)",
                              cursor: "pointer", flexShrink: 0,
                              transition: "all 0.2s",
                            }}
                          >
                            {copied ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        )}
                        <ArrowUpRight size={15} color="rgba(255,255,255,0.25)" />
                      </div>
                    </a>
                  ) : (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "20px 24px",
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      background: "rgba(255,255,255,0.01)",
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: iconBg,
                        border: `1px solid ${iconBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: iconColor, flexShrink: 0,
                      }}>
                        <Icon size={17} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{label}</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{value}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-container { padding: 0 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
