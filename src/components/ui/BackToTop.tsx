"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 50,
            width: 42, height: 42,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            background: "rgba(17,17,17,0.9)",
            backdropFilter: "blur(12px)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
