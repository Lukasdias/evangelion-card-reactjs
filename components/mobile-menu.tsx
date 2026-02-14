"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "./status-badge";
import { TV_EPISODES, END_OF_EVANGELION, type Preset } from "@/lib/presets";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPreset: (preset: Preset) => void;
}

interface PresetSectionProps {
  title: string;
  presets: Preset[];
  onSelect: (preset: Preset) => void;
}

function PresetSection({ title, presets, onSelect }: PresetSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-magi-text-dim bg-magi-bg/95 sticky top-0 px-2 py-2 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
        {title}
      </h4>
      <div className="space-y-1">
        {presets.map((preset, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(preset)}
            className="border-magi-border hover:border-magi-cyan hover:bg-magi-cyan/5 w-full rounded border p-3 text-left transition-all"
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-magi-cyan font-mono text-xs">
                {preset.epText?.replace("EPISODE:", "") || "EOE"}
              </span>
              <span className="text-magi-text-secondary truncate text-sm">
                {preset.titleText.split("\n")[0]}
              </span>
            </div>
            {preset.titleText.includes("\n") && (
              <div className="text-magi-text-dim mt-1 truncate pl-9 text-xs">
                {preset.titleText.split("\n").slice(1).join(" ")}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function MobileMenu({ isOpen, onOpenChange, onSelectPreset }: MobileMenuProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="bg-magi-bg/98 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 pt-14 md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex h-full flex-col">
                  <div className="border-magi-border flex items-center justify-between border-b px-4 py-3">
                    <Dialog.Title className="text-magi-cyan text-sm font-bold tracking-widest uppercase">
                      Quick Load
                    </Dialog.Title>
                    <StatusBadge status="info" label="Ready" />
                  </div>

                  <div className="flex-1 space-y-6 overflow-y-auto p-4">
                    <PresetSection
                      title="TV Series"
                      presets={TV_EPISODES}
                      onSelect={onSelectPreset}
                    />
                    <PresetSection
                      title="The End of Evangelion"
                      presets={END_OF_EVANGELION}
                      onSelect={onSelectPreset}
                    />
                  </div>

                  <div className="border-magi-border border-t p-4">
                    <Dialog.Close asChild>
                      <button className="border-magi-cyan text-magi-cyan hover:bg-magi-cyan/5 w-full rounded border py-3 font-semibold uppercase transition-all">
                        Close
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
