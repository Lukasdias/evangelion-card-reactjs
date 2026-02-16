import { evangelionTheme } from './evangelion'
import { twinPeaksTheme } from './twin-peaks'
import type { ThemeConfig } from '@vignette/core'

export const themes: Record<string, ThemeConfig> = {
  evangelion: evangelionTheme,
  'twin-peaks': twinPeaksTheme,
}

export function getTheme(id: string): ThemeConfig | undefined {
  return themes[id]
}

export function getAllThemes(): ThemeConfig[] {
  return Object.values(themes)
}

export function getThemeIds(): string[] {
  return Object.keys(themes)
}

export { evangelionTheme, twinPeaksTheme }
export type { ThemeConfig }
export type { TwinPeaksRendererRef } from './twin-peaks'
export type { EvangelionRendererRef } from './evangelion'
