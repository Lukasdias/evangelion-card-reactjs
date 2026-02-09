"use client";

import { useRef, useState, useEffect } from "react";
import { Header } from "./app-header";
import { MobileMenu } from "./mobile-menu";
import { CardPreview } from "./card-preview";
import { EditorTabs, ContentTab, StyleTab, EffectsTab } from "./editor-tabs";
import { DataStream } from "./data-stream";
import { DataReadout } from "./data-readout";
import { PRESETS } from "@/lib/presets";
import {
  useCardState,
  useEffectsState,
  useCanvasScale,
  useExport,
  useSystemTime,
  useSystemStatus,
} from "@/hooks/use-episode-card";
import type { EpisodeCardRef } from "./episode-card";

export default function EpisodeCardGenerator() {
  const cardRef = useRef<EpisodeCardRef>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { state, actions } = useCardState();
  const { effects, updateEffect, toggleGlow } = useEffectsState();
  const { canvasScale, zoomIn, zoomOut } = useCanvasScale(state.aspectRatio);
  const { isExporting, handleExport } = useExport(cardRef, state.botText);
  const { currentTime, formatTime } = useSystemTime();
  const systemStatus = useSystemStatus();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectPreset = (preset: (typeof PRESETS)[0]) => {
    actions.applyPreset(preset);
    setIsMobileMenuOpen(false);
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
      <DataStream isClient={isClient} />

      <Header
        systemStatus={systemStatus}
        currentTime={currentTime}
        formatTime={formatTime}
        isExporting={isExporting}
        onExport={handleExport}
        onMenuOpen={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        presets={PRESETS}
        onSelectPreset={handleSelectPreset}
      />

      <main className="relative z-10 flex h-[calc(100vh-56px)] flex-col">
        <CardPreview
          ref={cardRef}
          state={state}
          effects={effects}
          canvasScale={canvasScale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />

        <section
          className="bg-magi-bg-panel border-magi-border flex h-auto max-h-[45vh] flex-col border-t md:h-80 md:flex-row"
          aria-label="Editor"
        >
          <EditorTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === "content" && <ContentTab state={state} actions={actions} />}
            {activeTab === "style" && <StyleTab state={state} actions={actions} />}
            {activeTab === "effects" && (
              <EffectsTab effects={effects} updateEffect={updateEffect} toggleGlow={toggleGlow} />
            )}
          </EditorTabs>

          <div className="border-magi-border bg-magi-bg hidden flex-col gap-3 border-t p-4 md:mt-auto md:flex md:w-56 md:border-l">
            <DataReadout label="Memory Usage" value={42} unit="%" variant="balthasar" />
            <DataReadout label="CPU Load" value={12} unit="%" variant="caspar" />
          </div>
        </section>
      </main>
    </div>
  );
}
