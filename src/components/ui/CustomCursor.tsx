"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(!!(
        target.closest("a, button, [role=button], input, textarea, select, [onclick]") ||
        window.getComputedStyle(target).cursor === "pointer"
      ));
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", () => setIsHidden(true));
      document.removeEventListener("mouseenter", () => setIsHidden(false));
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      animate={{
        scale: isPointer ? 1.6 : 1,
        opacity: isHidden ? 0 : 1,
        backgroundColor: isPointer ? "#3B82F6" : "#ffffff",
      }}
      transition={{ duration: 0.12 }}
      style={{
        x: cursorX,
        y: cursorY,
        position: "fixed",
        top: -4,
        left: -4,
        width: 8,
        height: 8,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
