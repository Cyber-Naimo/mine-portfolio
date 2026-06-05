"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#27272A] bg-[#171717] mb-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
        <span className="text-xs font-medium text-[#A1A1AA] uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#A1A1AA] text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
