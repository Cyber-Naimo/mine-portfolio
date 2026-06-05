"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setProgress(pct);
      spring.set(pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [spring]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2,
      zIndex: 100, background: "rgba(255,255,255,0.04)",
    }}>
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
          scaleX: spring,
          transformOrigin: "0%",
          boxShadow: "0 0 8px rgba(59,130,246,0.6)",
        }}
      />
    </div>
  );
}
