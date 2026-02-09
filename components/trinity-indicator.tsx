"use client";

import { motion } from "framer-motion";

interface SystemStatus {
  melchior: "active" | "standby" | "error";
  balthasar: "active" | "standby" | "error";
  caspar: "active" | "standby" | "error";
}

interface TrinityIndicatorProps {
  status: SystemStatus;
}

export function TrinityIndicator({ status }: TrinityIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        className={`h-2.5 w-2.5 rounded-full ${
          status.melchior === "active"
            ? "bg-magi-melchior"
            : status.melchior === "error"
              ? "bg-magi-melchior-dim"
              : "bg-magi-melchior-dim opacity-40"
        }`}
        title="MELCHIOR"
        animate={
          status.melchior === "active"
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 8px rgba(255,42,42,0.4)",
                  "0 0 12px rgba(255,42,42,0.8)",
                  "0 0 8px rgba(255,42,42,0.4)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`h-2.5 w-2.5 rounded-full ${
          status.balthasar === "active"
            ? "bg-magi-balthasar"
            : status.balthasar === "error"
              ? "bg-magi-balthasar-dim"
              : "bg-magi-balthasar-dim opacity-40"
        }`}
        title="BALTHASAR"
        animate={
          status.balthasar === "active"
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 8px rgba(255,184,0,0.4)",
                  "0 0 12px rgba(255,184,0,0.8)",
                  "0 0 8px rgba(255,184,0,0.4)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      <motion.div
        className={`h-2.5 w-2.5 rounded-full ${
          status.caspar === "active"
            ? "bg-magi-caspar"
            : status.caspar === "error"
              ? "bg-magi-caspar-dim"
              : "bg-magi-caspar-dim opacity-40"
        }`}
        title="CASPAR"
        animate={
          status.caspar === "active"
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 8px rgba(0,255,68,0.4)",
                  "0 0 12px rgba(0,255,68,0.8)",
                  "0 0 8px rgba(0,255,68,0.4)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
    </div>
  );
}
