"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import type { CardState, CardActions } from "@/hooks/use-episode-card";
import type { TextEffects } from "@/components/episode-card";

interface ContentTabProps {
  state: CardState;
  actions: CardActions;
}

export function ContentTab({ state, actions }: ContentTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
          First Line
        </label>
        <input
          type="text"
          value={state.topText}
          onChange={(e) => actions.setTopText(e.target.value)}
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
          value={state.midText}
          onChange={(e) => actions.setMidText(e.target.value)}
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
          value={state.botText}
          onChange={(e) => actions.setBotText(e.target.value)}
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
          value={state.epText}
          onChange={(e) => actions.setEpText(e.target.value)}
          className="magi-input"
          suppressHydrationWarning
        />
      </div>
      <div className="lg:col-span-2">
        <label className="text-magi-text-dim mb-1.5 block text-xs font-semibold tracking-wider uppercase">
          Title
        </label>
        <textarea
          value={state.titleText}
          onChange={(e) => actions.setTitleText(e.target.value)}
          rows={3}
          className="magi-input resize-none"
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}

interface StyleTabProps {
  state: CardState;
  actions: CardActions;
}

export function StyleTab({ state, actions }: StyleTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label className="text-magi-text-dim mb-2 block text-xs font-semibold tracking-wider uppercase">
          Font Style
        </label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => actions.setTitleStyle("serif")}
            className={`magi-btn justify-start ${
              state.titleStyle === "serif" ? "border-magi-cyan text-magi-cyan" : ""
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => actions.setTitleStyle("sans")}
            className={`magi-btn justify-start ${
              state.titleStyle === "sans" ? "border-magi-cyan text-magi-cyan" : ""
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
              onClick={() => actions.setTitleAlign(align)}
              className={`magi-btn flex-1 ${
                state.titleAlign === align ? "border-magi-cyan text-magi-cyan" : ""
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
            onClick={() => actions.setAspectRatio("standard")}
            className={`magi-btn justify-start ${
              state.aspectRatio === "standard" ? "border-magi-cyan text-magi-cyan" : ""
            }`}
          >
            900 × 675
          </button>
          <button
            onClick={() => actions.setAspectRatio("wide")}
            className={`magi-btn justify-start ${
              state.aspectRatio === "wide" ? "border-magi-cyan text-magi-cyan" : ""
            }`}
          >
            1280 × 720
          </button>
        </div>
      </div>
    </div>
  );
}

interface EffectsTabProps {
  effects: TextEffects;
  updateEffect: <K extends keyof TextEffects>(key: K, value: TextEffects[K]) => void;
  toggleGlow: () => void;
}

export function EffectsTab({ effects, updateEffect, toggleGlow }: EffectsTabProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="glow-toggle"
            checked={effects.glowEnabled}
            onChange={toggleGlow}
            className="magi-checkbox"
          />
          <label htmlFor="glow-toggle" className="text-magi-text cursor-pointer text-sm">
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
              {["#ffffff", "#00d4aa", "#ffb800", "#00ff44", "#ff2a2a"].map((color) => (
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
                    boxShadow: effects.glowColor === color ? `0 0 10px ${color}` : "none",
                  }}
                />
              ))}
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
  );
}

const tabs = [
  { id: "content", label: "Content" },
  { id: "style", label: "Style" },
  { id: "effects", label: "Effects" },
];

interface EditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export function EditorTabs({ activeTab, onTabChange, children }: EditorTabsProps) {
  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={onTabChange}
      className="flex h-full flex-col md:flex-row"
    >
      <Tabs.List
        className="border-magi-border flex w-full overflow-x-auto border-b md:w-56 md:flex-col md:border-r"
        aria-label="Editor tabs"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className={`focus:ring-magi-cyan/50 flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold tracking-wider whitespace-nowrap uppercase transition-all outline-none focus:ring-2 ${
              activeTab === tab.id
                ? "bg-magi-cyan/10 text-magi-cyan border-magi-cyan border-l-2"
                : "text-magi-text-secondary hover:text-magi-text hover:bg-magi-cyan/5 border-l-2 border-transparent"
            }`}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs.Content value="content" className="outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Tabs.Content>
        <Tabs.Content value="style" className="outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Tabs.Content>
        <Tabs.Content value="effects" className="outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
