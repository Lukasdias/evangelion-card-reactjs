export interface TextEffects {
  glowEnabled: boolean
  glowColor: string
  glowBlur: number
  glowOpacity: number
}

export interface CardStyle {
  fontSet: string
  textAlign: 'left' | 'center' | 'right'
  aspectRatio: 'standard' | 'wide'
}

export interface CardState {
  headerLines: string[]
  label: string
  title: string
  subtitle?: string
  style: CardStyle
  effects: TextEffects
}

export interface CardPreset {
  id: string
  headerLines: string[]
  label: string
  title: string
  subtitle?: string
  style?: Partial<CardStyle>
}

export interface ThemeColors {
  background: string
  text: string
  textSecondary?: string
  outline?: string
  accent: string
  glow?: string
}

export interface ThemeFonts {
  header: string
  label: string
  title: string
  subtitle?: string
}

export interface CardRendererProps {
  state: CardState
  width: number
  height: number
}

export type RendererComponent = React.ComponentType<CardRendererProps>

export interface ThemeConfig {
  id: string
  name: string
  description: string
  year?: number
  creator?: string
  colors: ThemeColors
  fonts: ThemeFonts
  presets: CardPreset[]
  renderer: RendererComponent
  defaultState: CardState
}
