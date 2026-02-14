"use client";

import { motion } from "framer-motion";
import { TrinityIndicator } from "./trinity-indicator";
import { DataReadout } from "./data-readout";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface SystemStatus {
  melchior: "active" | "standby" | "error";
  balthasar: "active" | "standby" | "error";
  caspar: "active" | "standby" | "error";
}

interface HeaderProps {
  systemStatus: SystemStatus;
  currentTime: Date | null;
  formatTime: (date: Date) => string;
  isExporting: boolean;
  onExport: () => void;
  onMenuOpen: () => void;
}

export function Header({
  systemStatus,
  currentTime,
  formatTime,
  isExporting,
  onExport,
  onMenuOpen,
}: HeaderProps) {
  return (
    <header className="bg-magi-bg-panel border-magi-border relative z-30 border-b" role="banner">
      <div className="flex h-14 items-center px-4">
        <div className="mr-6 flex items-center gap-3">
          <TrinityIndicator status={systemStatus} />
          <div className="text-magi-text-dim hidden text-xs font-semibold tracking-wider uppercase md:block">
            <span className="text-magi-melchior">MELCHIOR</span>
            <span className="mx-2">/</span>
            <span className="text-magi-balthasar">BALTHASAR</span>
            <span className="mx-2">/</span>
            <span className="text-magi-caspar">CASPAR</span>
          </div>
        </div>

        <button
          onClick={onMenuOpen}
          className="border-magi-border text-magi-cyan hover:border-magi-cyan hover:bg-magi-cyan/5 mr-3 border p-2 transition-all md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <VisuallyHidden.Root>Open menu</VisuallyHidden.Root>
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <motion.div
            className="bg-magi-cyan h-2 w-2 flex-shrink-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="flex flex-col">
            <span className="text-magi-cyan truncate text-base font-bold tracking-[0.2em] md:text-lg">
              MAGI SYSTEM
            </span>
            <span className="text-magi-text-dim hidden text-[10px] font-semibold tracking-wider uppercase md:block">
              TOKYO-3 / NERV HQ
            </span>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          {currentTime && (
            <div className="hidden flex-col items-end md:flex">
              <DataReadout label="System Time" value={formatTime(currentTime)} variant="cyan" />
            </div>
          )}
          <div className="bg-magi-border hidden h-8 w-px md:block" />
          <button
            onClick={onExport}
            disabled={isExporting}
            className="magi-btn magi-btn-primary disabled:opacity-40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">{isExporting ? "PROCESSING..." : "EXPORT"}</span>
            <span className="sm:hidden">PNG</span>
          </button>
        </div>
      </div>
    </header>
  );
}
