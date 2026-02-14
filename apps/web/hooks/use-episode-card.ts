"use client";

import { useState, useCallback, useEffect } from "react";
import type { EpisodeCardRef, TextEffects } from "@/components/episode-card";

export interface CardState {
  topText: string;
  midText: string;
  botText: string;
  epText: string;
  titleText: string;
  titleStyle: "serif" | "sans";
  titleAlign: "left" | "center" | "right";
  aspectRatio: "standard" | "wide";
}

export interface CardActions {
  setTopText: (value: string) => void;
  setMidText: (value: string) => void;
  setBotText: (value: string) => void;
  setEpText: (value: string) => void;
  setTitleText: (value: string) => void;
  setTitleStyle: (value: "serif" | "sans") => void;
  setTitleAlign: (value: "left" | "center" | "right") => void;
  setAspectRatio: (value: "standard" | "wide") => void;
  resetState: () => void;
  applyPreset: (preset: CardState) => void;
}

const DEFAULT_STATE: CardState = {
  topText: "NEON",
  midText: "GENESIS",
  botText: "EVANGELION",
  epText: "EPISODE:26",
  titleText: "Take care of yourself.",
  titleStyle: "serif",
  titleAlign: "left",
  aspectRatio: "standard",
};

export function useCardState(initialState: Partial<CardState> = {}) {
  const [topText, setTopText] = useState(initialState.topText ?? DEFAULT_STATE.topText);
  const [midText, setMidText] = useState(initialState.midText ?? DEFAULT_STATE.midText);
  const [botText, setBotText] = useState(initialState.botText ?? DEFAULT_STATE.botText);
  const [epText, setEpText] = useState(initialState.epText ?? DEFAULT_STATE.epText);
  const [titleText, setTitleText] = useState(initialState.titleText ?? DEFAULT_STATE.titleText);
  const [titleStyle, setTitleStyle] = useState<"serif" | "sans">(
    initialState.titleStyle ?? DEFAULT_STATE.titleStyle,
  );
  const [titleAlign, setTitleAlign] = useState<"left" | "center" | "right">(
    initialState.titleAlign ?? DEFAULT_STATE.titleAlign,
  );
  const [aspectRatio, setAspectRatio] = useState<"standard" | "wide">(
    initialState.aspectRatio ?? DEFAULT_STATE.aspectRatio,
  );

  const resetState = useCallback(() => {
    setTopText(DEFAULT_STATE.topText);
    setMidText(DEFAULT_STATE.midText);
    setBotText(DEFAULT_STATE.botText);
    setEpText(DEFAULT_STATE.epText);
    setTitleText(DEFAULT_STATE.titleText);
    setTitleStyle(DEFAULT_STATE.titleStyle);
    setTitleAlign(DEFAULT_STATE.titleAlign);
    setAspectRatio(DEFAULT_STATE.aspectRatio);
  }, []);

  const applyPreset = useCallback((preset: CardState) => {
    setTopText(preset.topText);
    setMidText(preset.midText);
    setBotText(preset.botText);
    setEpText(preset.epText);
    setTitleText(preset.titleText);
    setTitleStyle(preset.titleStyle);
    setTitleAlign(preset.titleAlign);
    setAspectRatio(preset.aspectRatio);
  }, []);

  const state: CardState = {
    topText,
    midText,
    botText,
    epText,
    titleText,
    titleStyle,
    titleAlign,
    aspectRatio,
  };

  const actions: CardActions = {
    setTopText,
    setMidText,
    setBotText,
    setEpText,
    setTitleText,
    setTitleStyle,
    setTitleAlign,
    setAspectRatio,
    resetState,
    applyPreset,
  };

  return { state, actions };
}

export function useEffectsState() {
  const [effects, setEffects] = useState<TextEffects>({
    glowEnabled: false,
    glowColor: "#ffffff",
    glowBlur: 20,
    glowOpacity: 0.8,
  });

  const updateEffect = useCallback(<K extends keyof TextEffects>(key: K, value: TextEffects[K]) => {
    setEffects((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleGlow = useCallback(() => {
    setEffects((prev) => ({ ...prev, glowEnabled: !prev.glowEnabled }));
  }, []);

  const resetEffects = useCallback(() => {
    setEffects({
      glowEnabled: false,
      glowColor: "#ffffff",
      glowBlur: 20,
      glowOpacity: 0.8,
    });
  }, []);

  return { effects, updateEffect, toggleGlow, resetEffects };
}

export function useCanvasScale(aspectRatio: "standard" | "wide") {
  const [canvasScale, setCanvasScale] = useState(0.65);

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

  const zoomIn = useCallback(() => {
    setCanvasScale((prev) => Math.min(1.0, prev + 0.05));
  }, []);

  const zoomOut = useCallback(() => {
    setCanvasScale((prev) => Math.max(0.2, prev - 0.05));
  }, []);

  return { canvasScale, setCanvasScale, zoomIn, zoomOut };
}

export function useExport(cardRef: React.RefObject<EpisodeCardRef | null>, botText: string) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
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
  }, [cardRef, botText]);

  return { isExporting, handleExport };
}

export function useSystemTime() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  return { currentTime, formatTime };
}

type SystemStatus = "active" | "standby" | "error";

interface SystemStatusState {
  melchior: SystemStatus;
  balthasar: SystemStatus;
  caspar: SystemStatus;
}

export function useSystemStatus() {
  const [systemStatus, setSystemStatus] = useState<SystemStatusState>({
    melchior: "active",
    balthasar: "active",
    caspar: "active",
  });

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

  return systemStatus;
}

export function useDataStream() {
  const DATA_STREAM_CHARS =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  const generateDataStream = useCallback(() => {
    return Array.from(
      { length: 50 },
      () => DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)],
    ).join("");
  }, []);

  return { generateDataStream };
}
