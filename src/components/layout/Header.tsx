"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowUpRight, Sun, Moon } from "lucide-react";
import { personalInfo } from "@/lib/data";
import NKLogo from "@/components/ui/NKLogo";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Experience",   href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const suppressRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (suppressRef.current) return; // ignore during programmatic scroll
      const ids = navLinks.map(l => l.href.slice(1));
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    setActive(id);
    suppressRef.current = true;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { suppressRef.current = false; }, 1200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "padding 0.3s, background 0.3s, border-color 0.3s",
          padding: scrolled ? "10px 0" : "20px 0",
          background: scrolled ? "var(--header-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-a)" : "1px solid transparent",
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>

          {/* ── LOGO ── */}
          <button
            onClick={() => go("#home")}
            aria-label="Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <NKLogo size={34} />
            <span style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-60)",
              letterSpacing: "-0.01em",
              display: "none",
            }}
            className="logo-name">
              Naimatullah Khan
            </span>
          </button>

          {/* ── NAV (desktop) ── */}
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "5px 6px",
            borderRadius: 50,
            background: "var(--surface-b)",
            border: "1px solid var(--border-b)",
          }}
          className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  style={{
                    position: "relative",
                    padding: "6px 14px",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    background: isActive ? "var(--surface-b)" : "transparent",
                    color: isActive ? "var(--text-100)" : "var(--text-40)",
                    transition: "all 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "var(--text-80)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "var(--text-40)";
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 50,
                        background: "var(--surface-b)",
                        border: "1px solid var(--border-b)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT: theme toggle + CTA (desktop) ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
               className="desktop-cta">

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36, height: 36,
                borderRadius: 10,
                border: "1px solid var(--border-b)",
                background: "var(--surface-a)",
                color: "var(--text-60)",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-100)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-60)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-b)";
              }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-60)",
                border: "1px solid var(--border-b)",
                background: "var(--surface-a)",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-100)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-60)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-b)";
              }}
            >
              Hire me
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
            <a
              href={personalInfo.resumePdf}
              download
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                background: "#3B82F6",
                textDecoration: "none",
                boxShadow: "0 0 0 1px #2563EB, 0 4px 16px rgba(59,130,246,0.35)",
                transition: "all 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2563EB";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px #1D4ED8, 0 4px 24px rgba(59,130,246,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#3B82F6";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px #2563EB, 0 4px 16px rgba(59,130,246,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <Download size={13} strokeWidth={2.5} />
              Resume
            </a>
          </div>

          {/* ── MOBILE RIGHT: theme toggle + hamburger ── */}
          <div style={{ display: "none", alignItems: "center", gap: 8 }} className="mobile-right">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38, height: 38,
                borderRadius: 10,
                border: "1px solid var(--border-b)",
                background: "var(--surface-a)",
                color: "var(--text-60)",
                cursor: "pointer",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              style={{
                display: "flex",
                width: 38,
                height: 38,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                border: "1px solid var(--border-b)",
                background: "var(--surface-a)",
                color: "var(--text-60)",
                cursor: "pointer",
                flexShrink: 0,
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: "flex" }}><X size={17} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: "flex" }}><Menu size={17} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-right { display: flex !important; }
          .logo-name { display: none !important; }
        }
        @media (min-width: 1024px) {
          .logo-name { display: block !important; }
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{   opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 64, left: 12, right: 12,
                zIndex: 50,
                borderRadius: 20,
                border: "1px solid var(--border-b)",
                background: "var(--panel-bg)",
                backdropFilter: "blur(24px)",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              }}
            >
              <nav style={{ padding: 10, display: "flex", flexDirection: "column", gap: 2 }}>
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => go(link.href)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        border: "none",
                        cursor: "pointer",
                        background: isActive ? "var(--surface-b)" : "transparent",
                        color: isActive ? "var(--text-100)" : "var(--text-60)",
                        textAlign: "left",
                        width: "100%",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "#3B82F6",
                          boxShadow: "0 0 8px #3B82F6",
                          flexShrink: 0,
                        }} />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
              <div style={{ margin: "0 10px", height: 1, background: "var(--border-a)" }} />
              <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px", borderRadius: 12,
                    fontSize: 15, fontWeight: 600, color: "var(--text-60)",
                    border: "1px solid var(--border-b)",
                    background: "var(--surface-a)",
                    textDecoration: "none",
                  }}
                >
                  Hire Me
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href={personalInfo.resumePdf}
                  download
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px", borderRadius: 12,
                    fontSize: 15, fontWeight: 700, color: "#fff",
                    background: "#3B82F6",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
                  }}
                >
                  <Download size={15} strokeWidth={2.5} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
