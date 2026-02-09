"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

interface DataStreamProps {
  isClient: boolean;
}

const DATA_STREAM_CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export function DataStream({ isClient }: DataStreamProps) {
  const generateDataStream = useCallback(() => {
    return Array.from(
      { length: 50 },
      () => DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)],
    ).join("");
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden opacity-20"
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="text-magi-caspar-dim absolute font-mono text-xs whitespace-nowrap"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            left: `${i * 10}%`,
          }}
        >
          {generateDataStream()}
        </motion.div>
      ))}
    </div>
  );
}
