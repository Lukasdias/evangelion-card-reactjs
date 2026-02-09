"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "./status-badge";
import type { Preset } from "@/lib/presets";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  presets: Preset[];
  onSelectPreset: (preset: Preset) => void;
}

export function MobileMenu({ isOpen, onOpenChange, presets, onSelectPreset }: MobileMenuProps) {
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
                <div className="h-full space-y-4 overflow-y-auto p-4">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-magi-cyan text-sm font-bold tracking-widest uppercase">
                      Quick Load
                    </Dialog.Title>
                    <StatusBadge status="info" label="Ready" />
                  </div>
                  <div className="space-y-2">
                    {presets.map((preset, index) => (
                      <motion.button
                        key={index}
                        onClick={() => onSelectPreset(preset)}
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
                  </div>
                  <Dialog.Close asChild>
                    <button className="border-magi-cyan text-magi-cyan hover:bg-magi-cyan/5 w-full border py-3 font-semibold uppercase transition-all">
                      Close
                    </button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
