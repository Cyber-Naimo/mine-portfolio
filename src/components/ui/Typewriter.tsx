"use client";

import { useEffect, useState } from "react";

interface Props {
  phrases: string[];
  speed?: number;       // ms per character
  pause?: number;       // ms to hold completed phrase
  style?: React.CSSProperties;
}

export default function Typewriter({ phrases, speed = 45, pause = 2800, style }: Props) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return (
    <span style={style}>
      {text}
      <span
        style={{
          display: "inline-block",
          width: 2, height: "0.85em",
          background: "#3B82F6",
          marginLeft: 2, verticalAlign: "middle",
          animation: "blink 1.1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
