import type { ThemeConfig } from '@vignette/core'
import { evangelionPresets, defaultEvangelionState } from './presets'
import EvangelionRenderer from './renderer'

export const evangelionTheme: ThemeConfig = {
  id: 'evangelion',
  name: 'Neon Genesis Evangelion',
  description: 'The seminal 1995 anime series directed by Hideaki Anno',
  year: 1995,
  creator: 'Hideaki Anno / Gainax',
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    accent: '#FF2A2A',
  },
  fonts: {
    header: '"Times New Roman", Times, serif',
    label: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    title: '"Times New Roman", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  presets: evangelionPresets,
  defaultState: defaultEvangelionState,
  renderer: EvangelionRenderer,
}
