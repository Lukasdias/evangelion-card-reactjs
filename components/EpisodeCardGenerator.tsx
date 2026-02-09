"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EpisodeCardRef, TextEffects } from "./EpisodeCard";

const EpisodeCard = dynamic(() => import("./EpisodeCard"), {
  ssr: false,
});

const DATA_STREAM_CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

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
    setEffects((prev) => ({ ...prev, [key]: value }));
  };

  const presets = [
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:01",
      titleText: "Angel Attack",
      titleStyle: "serif" as const,
      titleAlign: "left" as const,
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:02",
      titleText: "The Beast",
      titleStyle: "serif" as const,
      titleAlign: "left" as const,
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:12",
      titleText: 'She said, "Don\'t make others suffer\nfor your personal hatred."',
      titleStyle: "serif" as const,
      titleAlign: "left" as const,
    },
    {
      topText: "NEON",
      midText: "GENESIS",
      botText: "EVANGELION",
      epText: "EPISODE:26",
      titleText: "Take care of yourself.",
      titleStyle: "serif" as const,
      titleAlign: "left" as const,
    },
    {
      topText: "",
      midText: "",
      botText: "THE END OF EVANGELION",
      epText: "",
      titleText: "One More Final: I need you.",
      titleStyle: "sans" as const,
      titleAlign: "center" as const,
    },
  ];

  const applyPreset = (preset: (typeof presets)[0]) => {
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

  return (
    <div
      className="min-h-screen magi-grid relative crt-flicker overflow-hidden"
      role="application"
      aria-label="Evangelion Title Card Generator"
    >
      {/* SEO Content */}
      <h1 className="sr-only">
        Evangelion Title Card Generator - Create authentic Neon Genesis Evangelion episode cards
      </h1>
      <p className="sr-only">
        Generate custom Evangelion episode title cards with authentic typography.
      </p>

      <div className="crt-overlay" aria-hidden="true" />

      {isClient && (
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none opacity-20"
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-magi-green-dim text-xs font-mono whitespace-nowrap"
              style={{
                left: `${i * 10}%`,
                top: `${Math.random() * 100}%`,
                animation: `dataStream ${8 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
              aria-hidden="true"
            >
              {generateDataStream()}
            </div>
          ))}
        </div>
      )}

      <header className="relative z-30 bg-magi-bg-panel border-b border-magi-grid" role="banner">
        <div className="h-12 flex items-center px-3 md:px-4">
          <div className="hidden md:flex items-center gap-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-magi-red" />
            <div className="w-3 h-3 rounded-full bg-magi-amber" />
            <div className="w-3 h-3 rounded-full bg-magi-green" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden mr-3 p-1 border border-magi-grid text-magi-cyan"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-2 h-2 bg-magi-cyan animate-pulse flex-shrink-0" />
            <span className="text-base md:text-lg font-bold text-magi-cyan tracking-widest truncate">
              MAGI SYSTEM
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm flex-shrink-0">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-magi-amber hover:bg-magi-amber/90 text-magi-bg font-bold py-1.5 px-2 md:px-4 text-xs transition-all"
            >
              <span className="hidden sm:inline">{isExporting ? "..." : "EXPORT"}</span>
              <span className="sm:hidden">PNG</span>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-magi-bg/95 pt-12">
          <div className="p-4 space-y-4">
            <h3 className="text-magi-cyan text-lg font-bold">QUICK LOAD</h3>
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="w-full text-left p-4 border border-magi-grid"
              >
                {preset.epText || preset.botText}
              </button>
            ))}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 border border-magi-cyan text-magi-cyan"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10 h-[calc(100vh-48px)] flex flex-col">
        <section className="flex-1 bg-magi-bg min-h-0 relative" aria-label="Card Preview">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div
              className="bg-black border-2 border-magi-grid"
              style={{ transform: `scale(${canvasScale})`, transformOrigin: "center center" }}
            >
              <div className="bg-magi-bg-panel border-b border-magi-grid px-3 py-1.5 flex items-center justify-between">
                <span className="text-magi-text text-xs">PREVIEW</span>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setCanvasScale(Math.max(0.2, canvasScale - 0.05))}
                    className="text-magi-text-dim"
                  >
                    −
                  </button>
                  <span className="text-magi-cyan w-10 text-center">
                    {Math.round(canvasScale * 100)}%
                  </span>
                  <button
                    onClick={() => setCanvasScale(Math.min(1.0, canvasScale + 0.05))}
                    className="text-magi-text-dim"
                  >
                    +
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
          className="h-auto max-h-[45vh] md:h-80 bg-magi-bg-panel border-t border-magi-grid flex flex-col md:flex-row"
          aria-label="Editor"
        >
          <nav
            className="w-full md:w-48 border-b md:border-r border-magi-grid flex md:flex-col overflow-x-auto"
            role="tablist"
          >
            <button
              onClick={() => setActiveTab("content")}
              role="tab"
              aria-selected={activeTab === "content"}
              className={`p-3 text-left whitespace-nowrap flex-shrink-0 ${activeTab === "content" ? "bg-magi-cyan/10 text-magi-cyan" : "text-magi-text"}`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("style")}
              role="tab"
              aria-selected={activeTab === "style"}
              className={`p-3 text-left whitespace-nowrap flex-shrink-0 ${activeTab === "style" ? "bg-magi-cyan/10 text-magi-cyan" : "text-magi-text"}`}
            >
              Style
            </button>
            <button
              onClick={() => setActiveTab("effects")}
              role="tab"
              aria-selected={activeTab === "effects"}
              className={`p-3 text-left whitespace-nowrap flex-shrink-0 ${activeTab === "effects" ? "bg-magi-cyan/10 text-magi-cyan" : "text-magi-text"}`}
            >
              Effects
            </button>
          </nav>

          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === "content" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-magi-text-dim text-xs">First Line</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full bg-magi-bg border border-magi-grid text-magi-text px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-magi-text-dim text-xs">Second Line</label>
                  <input
                    type="text"
                    value={midText}
                    onChange={(e) => setMidText(e.target.value)}
                    className="w-full bg-magi-bg border border-magi-grid text-magi-text px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-magi-text-dim text-xs">Third Line</label>
                  <input
                    type="text"
                    value={botText}
                    onChange={(e) => setBotText(e.target.value)}
                    className="w-full bg-magi-bg border border-magi-grid text-magi-text px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-magi-text-dim text-xs">Episode</label>
                  <input
                    type="text"
                    value={epText}
                    onChange={(e) => setEpText(e.target.value)}
                    className="w-full bg-magi-bg border border-magi-grid text-magi-text px-3 py-2 text-sm"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="text-magi-text-dim text-xs">Title</label>
                  <textarea
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    rows={3}
                    className="w-full bg-magi-bg border border-magi-grid text-magi-text px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "style" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-magi-text-dim text-xs block mb-2">Font</label>
                  <button
                    onClick={() => setTitleStyle("serif")}
                    className={`w-full p-2 border ${titleStyle === "serif" ? "border-magi-cyan text-magi-cyan" : "border-magi-grid"}`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setTitleStyle("sans")}
                    className={`w-full p-2 border mt-2 ${titleStyle === "sans" ? "border-magi-cyan text-magi-cyan" : "border-magi-grid"}`}
                  >
                    Sans
                  </button>
                </div>
                <div>
                  <label className="text-magi-text-dim text-xs block mb-2">Align</label>
                  <div className="flex gap-2">
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setTitleAlign(align)}
                        className={`flex-1 p-2 border ${titleAlign === align ? "border-magi-cyan text-magi-cyan" : "border-magi-grid"}`}
                      >
                        {align[0].toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-magi-text-dim text-xs block mb-2">Ratio</label>
                  <button
                    onClick={() => setAspectRatio("standard")}
                    className={`w-full p-2 border ${aspectRatio === "standard" ? "border-magi-cyan text-magi-cyan" : "border-magi-grid"}`}
                  >
                    900×675
                  </button>
                  <button
                    onClick={() => setAspectRatio("wide")}
                    className={`w-full p-2 border mt-2 ${aspectRatio === "wide" ? "border-magi-cyan text-magi-cyan" : "border-magi-grid"}`}
                  >
                    1280×720
                  </button>
                </div>
              </div>
            )}

            {activeTab === "effects" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-5 rounded-full p-0.5 ${effects.glowEnabled ? "bg-magi-cyan" : "bg-magi-grid"}`}
                    >
                      <button
                        onClick={() => updateEffect("glowEnabled", !effects.glowEnabled)}
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${effects.glowEnabled ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </div>
                    <span className="text-magi-text text-sm">Glow</span>
                  </div>
                </div>
                {effects.glowEnabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-magi-text-dim text-xs">Color</label>
                      <div className="flex gap-2">
                        {["#ffffff", "#00d4aa", "#ffb000", "#00ff41", "#ff0040"].map((color) => (
                          <button
                            key={color}
                            onClick={() => updateEffect("glowColor", color)}
                            className={`w-8 h-8 rounded border-2 ${effects.glowColor === color ? "border-white" : "border-transparent"}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-magi-text-dim text-xs">
                        Blur: {effects.glowBlur}px
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
          </div>
        </section>
      </main>
    </div>
  );
}
