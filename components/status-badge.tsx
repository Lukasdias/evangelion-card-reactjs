"use client";

import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: "ok" | "warn" | "alert" | "info";
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles = {
    ok: "border-magi-caspar-dim text-magi-caspar bg-magi-caspar/5",
    warn: "border-magi-balthasar-dim text-magi-balthasar bg-magi-balthasar/5",
    alert: "border-magi-melchior-dim text-magi-melchior bg-magi-melchior/5",
    info: "border-magi-cyan-dim text-magi-cyan bg-magi-cyan/5",
  };

  const dotColors = {
    ok: "bg-magi-caspar",
    warn: "bg-magi-balthasar",
    alert: "bg-magi-melchior",
    info: "bg-magi-cyan",
  };

  const shouldPulse = status === "warn" || status === "alert";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-sm border px-2 py-0.5 text-xs font-semibold tracking-wider uppercase ${styles[status]}`}
    >
      <motion.span
        className={`h-1.5 w-1.5 rounded-full ${dotColors[status]}`}
        animate={
          shouldPulse
            ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }
            : {}
        }
        transition={{
          duration: status === "alert" ? 0.8 : 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label}
    </div>
  );
}
