import type { ThemeConfig } from '@vignette-cards/core'
import { twinPeaksPresets, defaultTwinPeaksState } from './presets'
import TwinPeaksRenderer from './renderer'
export type { TwinPeaksRendererRef } from './renderer'

export const twinPeaksTheme: ThemeConfig = {
  id: 'twin-peaks',
  name: 'Twin Peaks',
  description: 'The mysterious world of David Lynch and Mark Frost',
  year: 1990,
  creator: 'David Lynch & Mark Frost',
  colors: {
    background: '#1a3d1a',
    text: '#c4b896',
    outline: '#39FF14',
    accent: '#ff6b35',
  },
  fonts: {
    header: '"Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif',
    label: '"Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif',
    title: '"Times New Roman", Times, serif',
    subtitle: '"Arial Narrow", Arial, sans-serif',
  },
  presets: twinPeaksPresets,
  defaultState: defaultTwinPeaksState,
  renderer: TwinPeaksRenderer,
}
