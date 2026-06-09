"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Wrench, FolderOpen, Trophy, Briefcase,
  Mail, Download, Github, Linkedin, ArrowUpRight, Search,
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import NKLogo from "@/components/ui/NKLogo";

type LucideIcon = React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;

type Item = {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  action: () => void;
  group: string;
  shortcut?: string;
};

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = [
    { id: "home",         label: "Home",         icon: Home,       group: "Navigate", action: () => scrollTo("home") },
    { id: "about",        label: "About",         icon: User,       group: "Navigate", action: () => scrollTo("about") },
    { id: "skills",       label: "Skills",        icon: Wrench,     group: "Navigate", action: () => scrollTo("skills") },
    { id: "projects",     label: "Projects",      icon: FolderOpen, group: "Navigate", action: () => scrollTo("projects") },
    { id: "achievements", label: "Achievements",  icon: Trophy,     group: "Navigate", action: () => scrollTo("achievements") },
    { id: "experience",   label: "Experience",    icon: Briefcase,  group: "Navigate", action: () => scrollTo("experience") },
    { id: "contact",      label: "Contact",       icon: Mail,       group: "Navigate", action: () => scrollTo("contact") },
    {
      id: "resume",
      label: "Download Resume",
      description: "Get the PDF",
      icon: Download,
      group: "Actions",
      shortcut: "⌘R",
      action: () => { const a = document.createElement("a"); a.href = personalInfo.resumePdf; a.download = ""; a.click(); },
    },
    {
      id: "copy-email",
      label: "Copy Email Address",
      description: personalInfo.email,
      icon: Mail,
      group: "Actions",
      shortcut: "⌘E",
      action: () => { navigator.clipboard.writeText(personalInfo.email); showToast("Email copied!"); },
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "Cyber-Naimo",
      icon: Github,
      group: "Actions",
      action: () => window.open(personalInfo.github, "_blank"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "muhammad-naimatullah-khan",
      icon: Linkedin,
      group: "Actions",
      action: () => window.open(personalInfo.linkedin, "_blank"),
    },
  ];

  const filtered = query.trim() === ""
    ? items
    : items.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.description?.toLowerCase().includes(query.toLowerCase()) ||
        i.group.toLowerCase().includes(query.toLowerCase())
      );

  const groups = [...new Set(filtered.map(i => i.group))];

  const run = useCallback((item: Item) => {
    item.action();
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  // Keyboard: open/close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Arrow key nav + Enter
  useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) run(filtered[selected]);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, filtered, selected, run]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Reset selected when query changes
  useEffect(() => { setSelected(0); }, [query]);

  return (
    <>
      {/* Trigger — bottom left floating circle (Next.js toolbar style) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => setOpen(true)}
        title="Quick nav  ⌘K"
        className="cmd-trigger"
        style={{
          position: "fixed", bottom: 28, left: 28, zIndex: 49,
          width: 44, height: 44, borderRadius: "50%",
          background: "transparent",
          border: "none", padding: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.7)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(0,0,0,0.9)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.7)";
        }}
        aria-label="Open command palette (⌘K)"
      >
        <NKLogo size={44} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Palette */}
            <motion.div
              key="palette"
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: "20%", left: "50%", transform: "translateX(-50%)",
                zIndex: 201,
                width: "100%", maxWidth: 560,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(14,14,14,0.97)",
                backdropFilter: "blur(24px)",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Search input */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <Search size={16} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search sections, actions..."
                  style={{
                    flex: 1, background: "transparent", border: "none",
                    outline: "none", fontSize: 15, color: "#fff",
                    fontFamily: "inherit",
                  }}
                />
                <kbd style={{
                  fontSize: 10, padding: "2px 6px", borderRadius: 5,
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.05)",
                  letterSpacing: "0.04em",
                }}>ESC</kbd>
              </div>

              {/* Results */}
              <div style={{ maxHeight: 360, overflowY: "auto", padding: "8px 8px" }}>
                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  groups.map(group => {
                    const groupItems = filtered.filter(i => i.group === group);
                    const globalStart = filtered.indexOf(groupItems[0]);
                    return (
                      <div key={group} style={{ marginBottom: 4 }}>
                        <div style={{
                          fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                          color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
                          padding: "8px 12px 4px",
                        }}>
                          {group}
                        </div>
                        {groupItems.map((item, idx) => {
                          const globalIdx = globalStart + idx;
                          const isSelected = selected === globalIdx;
                          const Icon = item.icon;
                          return (
                            <motion.button
                              key={item.id}
                              onClick={() => run(item)}
                              onMouseEnter={() => setSelected(globalIdx)}
                              style={{
                                width: "100%", display: "flex", alignItems: "center", gap: 12,
                                padding: "10px 12px", borderRadius: 10,
                                border: "none", cursor: "pointer", textAlign: "left",
                                background: isSelected ? "rgba(59,130,246,0.12)" : "transparent",
                                transition: "background 0.1s",
                              }}
                            >
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                background: isSelected ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.06)",
                                border: `1px solid ${isSelected ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)"}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: isSelected ? "#60A5FA" : "rgba(255,255,255,0.4)",
                              }}>
                                <Icon size={14} strokeWidth={1.8} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 500, color: isSelected ? "#fff" : "rgba(255,255,255,0.75)", letterSpacing: "-0.01em" }}>
                                  {item.label}
                                </div>
                                {item.description && (
                                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {item.description}
                                  </div>
                                )}
                              </div>
                              {item.shortcut && (
                                <kbd style={{
                                  fontSize: 10, padding: "2px 6px", borderRadius: 5,
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  color: "rgba(255,255,255,0.3)",
                                  background: "rgba(255,255,255,0.05)",
                                  flexShrink: 0,
                                }}>{item.shortcut}</kbd>
                              )}
                              {!item.shortcut && group === "Actions" && (
                                <ArrowUpRight size={13} color="rgba(255,255,255,0.2)" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 20px",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                {[
                  { keys: ["↑", "↓"], label: "Navigate" },
                  { keys: ["↵"], label: "Select" },
                  { keys: ["Esc"], label: "Close" },
                ].map(hint => (
                  <div key={hint.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {hint.keys.map(k => (
                      <kbd key={k} style={{
                        fontSize: 10, padding: "1px 5px", borderRadius: 4,
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.3)",
                        background: "rgba(255,255,255,0.05)",
                      }}>{k}</kbd>
                    ))}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{hint.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 767px) { .cmd-trigger { display: none !important; } }
      `}</style>
    </>
  );
}

// Simple toast — rendered via portal-style injection
function showToast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  Object.assign(el.style, {
    position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)",
    padding: "10px 20px", borderRadius: "10px",
    background: "rgba(17,17,17,0.95)", color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: "13px", fontWeight: "600",
    backdropFilter: "blur(12px)",
    zIndex: "9999", pointerEvents: "none",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    fontFamily: "inherit",
    transition: "opacity 0.3s",
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); }, 2000);
}
