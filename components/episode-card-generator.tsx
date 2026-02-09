"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { TrinityIndicator } from "./trinity-indicator";
import { StatusBadge } from "./status-badge";
import { DataReadout } from "./data-readout";
import type { EpisodeCardRef, TextEffects } from "./episode-card";

const EpisodeCard = dynamic<
  React.ComponentProps<typeof import("./episode-card").default> &
    React.RefAttributes<EpisodeCardRef>
>(() => import("./episode-card"), {
  ssr: false,
});

const DATA_STREAM_CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

interface SystemStatus {
  melchior: "active" | "standby" | "error";
  balthasar: "active" | "standby" | "error";
  caspar: "active" | "standby" | "error";
}

interface Preset {
  topText: string;
  midText: string;
  botText: string;
  epText: string;
  titleText: string;
  titleStyle: "serif" | "sans";
  titleAlign: "left" | "center" | "right";
}

export default function EpisodeCardGenerator() {
  const cardRef = useRef<EpisodeCardRef>(null);
  const [topText, setTopText] = useState("NEON");
  const [midText, setMidText] = useState("GENESIS");
  const [botText, setBotText] = useState("EVANGELION");
  const [epText, setEpText] = useState("EPISODE:26");
  const [titleText, setTitleText] = useState("Take care of yourself.");
  const [titleStyle, setTitleStyle] = useState<"serif" | "sans">("serif");
  const [titleAlign, setTitleAlign] = useState<"left" | "center" | "right">("left");
  const [aspectRatio, setAspectRatio] = useState<"standard" | "wide">("standard");
  const [isExporting, setIsExporting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"content" | "style" | "effects">("content");
  const [canvasScale, setCanvasScale] = useState(0.65);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [effects, setEffects] = useState<TextEffects>({
    glowEnabled: false,
    glowColor: "#ffffff",
    glowBlur: 20,
    glowOpacity: 0.8,
  });
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    melchior: "active",
    balthasar: "active",
    caspar: "active",
  });

  useEffect(() => {
    const calculateScale = () => {
      const canvasWidth = aspectRatio === "wide" ? 1280 : 900;
      const canvasHeight = aspectRatio === "wide" ? 720 : 675;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 768;
      const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
      let availableWidth, availableHeight;

      if (isMobile) {
        availableWidth = viewportWidth - 24;
        availableHeight = viewportHeight * 0.4;
      } else if (isTablet) {
        availableWidth = viewportWidth - 200 - 48;
        availableHeight = viewportHeight - 48 - 280 - 80;
      } else {
        availableWidth = viewportWidth - 48;
        availableHeight = viewportHeight - 48 - 320 - 100;
      }

      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;
      let scale = Math.min(scaleX, scaleY) * 0.95;

      if (isMobile) {
        scale = Math.max(0.25, Math.min(scale, 0.55));
      } else if (isTablet) {
        scale = Math.max(0.35, Math.min(scale, 0.7));
      } else {
        scale = Math.max(0.35, Math.min(scale, 0.85));
      }

      setCanvasScale(scale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [aspectRatio]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus({
        melchior: Math.random() > 0.1 ? "active" : "standby",
        balthasar: Math.random() > 0.1 ? "active" : "standby",
        caspar: Math.random() > 0.1 ? "active" : "standby",
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = async () => {
    if (cardRef.current) {
      setIsExporting(true);
      try {
        const dataUrl = cardRef.current.exportImage();
        if (dataUrl) {
          const link = document.createElement("a");
          link.download = `evangelion-${botText.toLowerCase().replace(/\s+/g, "-")}.png`;
          link.href = dataUrl;
          link.click();
        }
      } catch (error) {
        console.error("Export error:", error);
      } finally {
        setIsExporting(false);
      }
    }
  };

  const updateEffect = <K extends keyof TextEffects>(key: K, value: TextEffects[K]) => {
    setEffects((prev: TextEffects) => ({ ...prev, [key]: value }));
  };

  const presets: Preset[] = [
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:01",
      titleText: "Angel Attack",
      titleStyle: "serif",
      titleAlign: "left",
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:02",
      titleText: "The Beast",
      titleStyle: "serif",
      titleAlign: "left",
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:12",
      titleText: 'She said, "Don\'t make others suffer\nfor your personal hatred."',
      titleStyle: "serif",
      titleAlign: "left",
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:26",
      titleText: "Take care of yourself.",
      titleStyle: "serif",
      titleAlign: "left",
    },
    {
      topText: "",
      midText: "",
      botText: "THE END OF EVANGELION",
      epText: "",
      titleText: "One More Final: I need you.",
      titleStyle: "sans",
      titleAlign: "center",
    },
  ];

  const applyPreset = (preset: Preset) => {
    setTopText(preset.topText);
    setMidText(preset.midText);
    setBotText(preset.botText);
    setEpText(preset.epText);
    setTitleText(preset.titleText);
    setTitleStyle(preset.titleStyle);
    setTitleAlign(preset.titleAlign);
    setIsMobileMenuOpen(false);
  };

  const generateDataStream = () => {
    return Array.from(
      { length: 50 },
      () => DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)],
    ).join("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className="crt-flicker magi-grid relative min-h-screen overflow-hidden"
      role="application"
      aria-label="Evangelion Title Card Generator"
    >
      <h1 className="sr-only">
        Evangelion Title Card Generator - Create authentic Neon Genesis Evangelion episode cards
      </h1>
      <p className="sr-only">
        Generate custom Evangelion episode title cards with authentic typography.
      </p>

      <div className="crt-overlay" aria-hidden="true" />

      {isClient && (
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
      )}

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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            <div className="hidden flex-col items-end md:flex">
              <DataReadout label="System Time" value={formatTime(currentTime)} variant="cyan" />
            </div>
            <div className="bg-magi-border hidden h-8 w-px md:block" />
            <button
              onClick={handleExport}
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="bg-magi-bg/98 fixed inset-0 z-40 pt-14 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-magi-cyan text-sm font-bold tracking-widest uppercase">
                  Quick Load
                </h3>
                <StatusBadge status="info" label="Ready" />
              </div>
              {presets.map((preset, index) => (
                <motion.button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="border-magi-border hover:border-magi-cyan hover:bg-magi-cyan/5 w-full border p-4 text-left transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-magi-text-secondary text-sm">
                    {preset.epText || preset.botText}
                  </div>
                  <div className="text-magi-text-dim mt-1 text-xs">{preset.titleText}</div>
                </motion.button>
              ))}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-magi-cyan text-magi-cyan hover:bg-magi-cyan/5 w-full border py-3 font-semibold uppercase transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 flex h-[calc(100vh-56px)] flex-col">
        <section className="bg-magi-bg relative min-h-0 flex-1" aria-label="Card Preview">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div
              className="border-magi-border border-2 bg-black"
              style={{
                transform: `scale(${canvasScale})`,
                transformOrigin: "center center",
              }}
            >
              <div className="bg-magi-bg-panel border-magi-border flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-magi-cyan text-xs font-semibold tracking-wider uppercase">
                    Preview
                  </span>
                  <StatusBadge status="ok" label="Live" />
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <button
                    onClick={() => setCanvasScale(Math.max(0.2, canvasScale - 0.05))}
                    className="text-magi-text-dim hover:text-magi-cyan transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-magi-cyan w-12 text-center font-mono">
                    {Math.round(canvasScale * 100)}%
                  </span>
                  <button
                    onClick={() => setCanvasScale(Math.min(1.0, canvasScale + 0.05))}
                    className="text-magi-text-dim hover:text-magi-cyan transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <EpisodeCard
                ref={cardRef}
                topText={topText}
                midText={midText}
                botText={botText}
                epText={epText}
                titleText={titleText}
                titleStyle={titleStyle}
                titleAlign={titleAlign}
                aspectRatio={aspectRatio}
                effects={effects}
              />
            </div>
          </div>
        </section>

        <section
          className="bg-magi-bg-panel border-magi-border flex h-auto max-h-[45vh] flex-col border-t md:h-80 md:flex-row"
          aria-label="Editor"
        >
          <nav
            className="border-magi-border flex w-full overflow-x-auto border-b md:w-56 md:flex-col md:border-r"
            role="tablist"
          >
            {[
              { id: "content", label: "Content", icon: "edit" },
              { id: "style", label: "Style", icon: "palette" },
              { id: "effects", label: "Effects", icon: "bolt" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold tracking-wider whitespace-nowrap uppercase transition-all ${
                  activeTab === tab.id
                    ? "bg-magi-cyan/10 text-magi-cyan border-magi-cyan border-l-2"
                    : "text-magi-text-secondary hover:text-magi-text hover:bg-magi-cyan/5 border-l-2 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="border-magi-border bg-magi-bg hidden flex-col gap-3 border-t p-4 md:mt-auto md:flex">
              <DataReadout label="Memory Usage" value={42} unit="%" variant="balthasar" />
              <DataReadout label="CPU Load" value={12} unit="%" variant="caspar" />
            </div>
          </nav>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "content" && (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                        First Line
                      </label>
                      <input
                        type="text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        className="magi-input"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                        Second Line
                      </label>
                      <input
                        type="text"
                        value={midText}
                        onChange={(e) => setMidText(e.target.value)}
                        className="magi-input"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                        Third Line
                      </label>
                      <input
                        type="text"
                        value={botText}
                        onChange={(e) => setBotText(e.target.value)}
                        className="magi-input"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                        Episode
                      </label>
                      <input
                        type="text"
                        value={epText}
                        onChange={(e) => setEpText(e.target.value)}
                        className="magi-input"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                        Title
                      </label>
                      <textarea
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        rows={3}
                        className="magi-input resize-none"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                )}

                {activeTab === "style" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-magi-text-dim mb-2 block text-xs font-semibold tracking-wider uppercase">
                        Font Style
                      </label>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setTitleStyle("serif")}
                          className={`magi-btn justify-start ${
                            titleStyle === "serif" ? "border-magi-cyan text-magi-cyan" : ""
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setTitleStyle("sans")}
                          className={`magi-btn justify-start ${
                            titleStyle === "sans" ? "border-magi-cyan text-magi-cyan" : ""
                          }`}
                        >
                          Sans-Serif
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-magi-text-dim mb-2 block text-xs font-semibold tracking-wider uppercase">
                        Alignment
                      </label>
                      <div className="flex gap-2">
                        {(["left", "center", "right"] as const).map((align) => (
                          <button
                            key={align}
                            onClick={() => setTitleAlign(align)}
                            className={`magi-btn flex-1 ${
                              titleAlign === align ? "border-magi-cyan text-magi-cyan" : ""
                            }`}
                          >
                            {align[0].toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-magi-text-dim mb-2 block text-xs font-semibold tracking-wider uppercase">
                        Aspect Ratio
                      </label>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setAspectRatio("standard")}
                          className={`magi-btn justify-start ${
                            aspectRatio === "standard" ? "border-magi-cyan text-magi-cyan" : ""
                          }`}
                        >
                          900 × 675
                        </button>
                        <button
                          onClick={() => setAspectRatio("wide")}
                          className={`magi-btn justify-start ${
                            aspectRatio === "wide" ? "border-magi-cyan text-magi-cyan" : ""
                          }`}
                        >
                          1280 × 720
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "effects" && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="glow-toggle"
                          checked={effects.glowEnabled}
                          onChange={(e) => updateEffect("glowEnabled", e.target.checked)}
                          className="magi-checkbox"
                        />
                        <label
                          htmlFor="glow-toggle"
                          className="text-magi-text cursor-pointer text-sm"
                        >
                          Enable Glow Effect
                        </label>
                      </div>
                    </div>
                    {effects.glowEnabled && (
                      <div className="space-y-4 pl-7">
                        <div>
                          <label className="text-magi-text-dim mb-2 block text-xs font-semibold tracking-wider uppercase">
                            Glow Color
                          </label>
                          <div className="flex gap-2">
                            {["#ffffff", "#00d4aa", "#ffb800", "#00ff44", "#ff2a2a"].map(
                              (color) => (
                                <button
                                  key={color}
                                  onClick={() => updateEffect("glowColor", color)}
                                  className={`h-8 w-8 rounded border-2 transition-all ${
                                    effects.glowColor === color
                                      ? "border-white shadow-lg"
                                      : "border-magi-border hover:border-magi-cyan"
                                  }`}
                                  style={{
                                    backgroundColor: color,
                                    boxShadow:
                                      effects.glowColor === color ? `0 0 10px ${color}` : "none",
                                  }}
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-magi-text-dim mb-2 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
                            <span>Blur Intensity</span>
                            <span className="text-magi-cyan font-mono">{effects.glowBlur}px</span>
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="50"
                            value={effects.glowBlur}
                            onChange={(e) => updateEffect("glowBlur", parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
