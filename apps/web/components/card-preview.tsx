"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { StatusBadge } from "./status-badge";
import type { EpisodeCardRef } from "./episode-card";
import type { CardState } from "@/hooks/use-episode-card";
import type { TextEffects } from "./episode-card";

const EpisodeCard = dynamic(() => import("./episode-card"), {
  ssr: false,
});

interface CardPreviewProps {
  state: CardState;
  effects: TextEffects;
  canvasScale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const CardPreview = forwardRef<EpisodeCardRef, CardPreviewProps>(
  ({ state, effects, canvasScale, onZoomIn, onZoomOut }, ref) => {
    return (
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
                  onClick={onZoomOut}
                  className="text-magi-text-dim hover:text-magi-cyan transition-colors"
                  aria-label="Zoom out"
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
                  onClick={onZoomIn}
                  className="text-magi-text-dim hover:text-magi-cyan transition-colors"
                  aria-label="Zoom in"
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
              ref={ref}
              topText={state.topText}
              midText={state.midText}
              botText={state.botText}
              epText={state.epText}
              titleText={state.titleText}
              titleStyle={state.titleStyle}
              titleAlign={state.titleAlign}
              aspectRatio={state.aspectRatio}
              effects={effects}
            />
          </div>
        </div>
      </section>
    );
  },
);

CardPreview.displayName = "CardPreview";
