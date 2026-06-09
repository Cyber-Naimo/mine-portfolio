"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import NKLogo from "@/components/ui/NKLogo";

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: "1px solid var(--border-a)",
        background: "var(--bg-primary)",
        padding: "28px 88px",
      }}
    >
      <div className="footer-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NKLogo size={28} />
          <span style={{ fontSize: 13, color: "var(--text-40)" }}>
            {personalInfo.name}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--text-20)" }}>
          © {new Date().getFullYear()} · Built with Next.js
        </span>
        <div style={{ display: "flex", gap: 8 }}>
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
                width: 32, height: 32, borderRadius: 8,
                border: "1px solid var(--border-a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-40)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-100)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-40)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-a)"; }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .site-footer { padding: 24px 20px !important; }
          .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
        }
      `}</style>
    </footer>
  );
}
