"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import NKLogo from "@/components/ui/NKLogo";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "#0A0A0A",
      padding: "28px 88px",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NKLogo size={28} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            {personalInfo.name}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
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
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.3)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
