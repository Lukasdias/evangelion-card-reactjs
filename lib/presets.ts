import type { CardState } from "@/hooks/use-episode-card";

export type Preset = CardState;

export const PRESETS: Preset[] = [
  {
    topText: "NEON",
    midText: "GENESIS",
    botText: "EVANGELION",
    epText: "EPISODE:01",
    titleText: "Angel Attack",
    titleStyle: "serif",
    titleAlign: "left",
    aspectRatio: "standard",
  },
  {
    topText: "NEON",
    midText: "GENESIS",
    botText: "EVANGELION",
    epText: "EPISODE:02",
    titleText: "The Beast",
    titleStyle: "serif",
    titleAlign: "left",
    aspectRatio: "standard",
  },
  {
    topText: "NEON",
    midText: "GENESIS",
    botText: "EVANGELION",
    epText: "EPISODE:12",
    titleText: 'She said, "Don\'t make others suffer\nfor your personal hatred."',
    titleStyle: "serif",
    titleAlign: "left",
    aspectRatio: "standard",
  },
  {
    topText: "NEON",
    midText: "GENESIS",
    botText: "EVANGELION",
    epText: "EPISODE:26",
    titleText: "Take care of yourself.",
    titleStyle: "serif",
    titleAlign: "left",
    aspectRatio: "standard",
  },
  {
    topText: "",
    midText: "",
    botText: "THE END OF EVANGELION",
    epText: "",
    titleText: "One More Final: I need you.",
    titleStyle: "sans",
    titleAlign: "center",
    aspectRatio: "wide",
  },
];
