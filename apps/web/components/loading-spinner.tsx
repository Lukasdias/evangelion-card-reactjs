"use client";

import { motion } from "framer-motion";

function TrinityLoading() {
  return (
    <div className="flex items-center gap-2">
      <motion.div className="relative">
        <motion.div
          className="bg-magi-melchior h-3 w-3 rounded-full shadow-[0_0_10px_rgba(255,42,42,0.6)]"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 10px rgba(255,42,42,0.4)",
              "0 0 20px rgba(255,42,42,0.8)",
              "0 0 10px rgba(255,42,42,0.4)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="bg-magi-melchior absolute inset-0 h-3 w-3 rounded-full opacity-30"
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.div>
      <motion.div className="relative">
        <motion.div
          className="bg-magi-balthasar h-3 w-3 rounded-full shadow-[0_0_10px_rgba(255,184,0,0.6)]"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 10px rgba(255,184,0,0.4)",
              "0 0 20px rgba(255,184,0,0.8)",
              "0 0 10px rgba(255,184,0,0.4)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="bg-magi-balthasar absolute inset-0 h-3 w-3 rounded-full opacity-30"
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
      </motion.div>
      <motion.div className="relative">
        <motion.div
          className="bg-magi-caspar h-3 w-3 rounded-full shadow-[0_0_10px_rgba(0,255,68,0.6)]"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 10px rgba(0,255,68,0.4)",
              "0 0 20px rgba(0,255,68,0.8)",
              "0 0 10px rgba(0,255,68,0.4)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        <motion.div
          className="bg-magi-caspar absolute inset-0 h-3 w-3 rounded-full opacity-30"
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.4,
          }}
        />
      </motion.div>
    </div>
  );
}

function ProgressBar({ color, delay }: { color: string; delay: number }) {
  return (
    <div className="bg-magi-grid h-1 w-full overflow-hidden rounded-full">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1,
          delay,
          ease: "easeOut",
        }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="bg-magi-bg flex min-h-screen items-center justify-center">
      <div className="magi-panel magi-panel-elevated p-8 text-center">
        <div className="mb-6 flex justify-center">
          <TrinityLoading />
        </div>

        <div className="mb-2 flex items-center justify-center gap-2">
          <motion.span
            className="bg-magi-cyan h-2 w-2 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.p
            className="text-magi-cyan text-lg font-bold tracking-[0.2em] uppercase"
            animate={{
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Initializing MAGI System
          </motion.p>
        </div>

        <div className="mb-6 text-center">
          <p className="text-magi-text-dim text-sm">Loading interface components</p>
        </div>

        <div className="border-magi-border bg-magi-bg rounded-sm border p-4">
          <div className="text-magi-text-dim mb-2 flex justify-between text-xs uppercase">
            <span>MELCHIOR</span>
            <span className="text-magi-melchior">ONLINE</span>
          </div>
          <ProgressBar color="bg-magi-melchior" delay={0} />

          <div className="text-magi-text-dim mt-3 mb-2 flex justify-between text-xs uppercase">
            <span>BALTHASAR</span>
            <span className="text-magi-balthasar">ONLINE</span>
          </div>
          <ProgressBar color="bg-magi-balthasar" delay={0.3} />

          <div className="text-magi-text-dim mt-3 mb-2 flex justify-between text-xs uppercase">
            <span>CASPAR</span>
            <span className="text-magi-caspar">ONLINE</span>
          </div>
          <ProgressBar color="bg-magi-caspar" delay={0.6} />
        </div>
      </div>
    </div>
  );
}
