# Vignette Cards

A web application for creating themed title cards inspired by movies, series, and anime. Currently supports Neon Genesis Evangelion and Twin Peaks styles. Built with Next.js 16, React, TypeScript, and Konva canvas.

## Features

- Create title cards in multiple iconic styles
- Export as PNG images
- Customizable text, fonts, colors, and effects
- Responsive canvas with zoom controls
- Preset templates for quick generation

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Monorepo**: Turborepo 2.x with pnpm workspaces
- **React**: 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Canvas**: Konva 10 + react-konva 19
- **Linting**: Oxlint 1.43
- **Formatting**: Oxc formatter

## Project Structure

```
vignette-cards/
├── apps/
│   └── web/               # Next.js 16 web application
│       ├── app/           # App router pages
│       ├── components/    # React components
│       └── public/        # Static assets
├── packages/
│   ├── core/              # Shared types and contracts
│   ├── themes/            # Theme implementations
│   │   ├── evangelion/    # Evangelion theme
│   │   └── twin-peaks/    # Twin Peaks theme
│   └── canvas-engine/     # Canvas rendering utilities
├── package.json           # Root package.json (turborepo)
└── turbo.json             # Turborepo configuration
```

## Setup

```bash
pnpm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

Outputs to `apps/web/dist/` as static files.

## Adding a New Theme

To add a new theme (e.g., Breaking Bad):

### 1. Create Theme Directory

Create a new directory under `packages/themes/src/`:

```bash
mkdir packages/themes/src/breaking-bad
```

### 2. Create Renderer Component

Create `packages/themes/src/breaking-bad/renderer.tsx`:

```typescript
'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import type Konva from 'konva'
import type { CardState } from '@vignette-cards/core'

export interface BreakingBadRendererRef {
  exportImage: () => string | undefined
}

interface BreakingBadRendererProps {
  state: CardState
  width?: number
  height?: number
}

const BreakingBadRenderer = forwardRef<BreakingBadRendererRef, BreakingBadRendererProps>(
  ({ state, width: propWidth, height: propHeight }, ref) => {
    const stageRef = useRef<Konva.Stage>(null)

    const canvasWidth = propWidth ?? 1280
    const canvasHeight = propHeight ?? 720

    useImperativeHandle(ref, () => ({
      exportImage: () => {
        if (stageRef.current) {
          return stageRef.current.toDataURL({
            pixelRatio: 2,
            mimeType: 'image/png',
          })
        }
        return undefined
      },
    }))

    // Implement your theme's rendering logic here
    // Use state.headerLines for text content

    return (
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        className='overflow-hidden rounded-lg'
      >
        <Layer>
          {/* Your theme's visual elements */}
        </Layer>
      </Stage>
    )
  }
)

BreakingBadRenderer.displayName = 'BreakingBadRenderer'

export default BreakingBadRenderer
```

### 3. Create Presets

Create `packages/themes/src/breaking-bad/presets.ts`:

```typescript
import type { CardPreset, CardState } from '@vignette-cards/core'

export const breakingBadPresets: CardPreset[] = [
  {
    id: 'pilot',
    headerLines: ['BREAKING BAD', '', ''],
    label: 'Episode 01',
    title: 'Pilot',
  },
  // Add more presets
]

export const defaultBreakingBadState: CardState = {
  headerLines: ['BREAKING BAD', '', ''],
  label: 'Episode 01',
  title: 'Pilot',
  subtitle: '',
  style: {
    fontSet: 'sans',
    textAlign: 'center',
    aspectRatio: 'wide',
  },
  effects: {
    glowEnabled: false,
    glowColor: '#ffffff',
    glowBlur: 10,
    glowOpacity: 0.5,
  },
}
```

### 4. Create Index File

Create `packages/themes/src/breaking-bad/index.ts`:

```typescript
import type { ThemeConfig } from '@vignette-cards/core'
import { breakingBadPresets, defaultBreakingBadState } from './presets'
import BreakingBadRenderer from './renderer'

export const breakingBadTheme: ThemeConfig = {
  id: 'breaking-bad',
  name: 'Breaking Bad',
  description: 'The iconic AMC series',
  year: 2008,
  creator: 'Vince Gilligan',
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    accent: '#00FF00',
  },
  fonts: {
    header: 'Arial, sans-serif',
    label: 'Arial, sans-serif',
    title: 'Arial, sans-serif',
  },
  presets: breakingBadPresets,
  defaultState: defaultBreakingBadState,
  renderer: BreakingBadRenderer,
}

export type { BreakingBadRendererRef } from './renderer'
```

### 5. Register Theme

Update `packages/themes/src/index.ts`:

```typescript
import { breakingBadTheme } from './breaking-bad'

export const themes: Record<string, ThemeConfig> = {
  // ...existing themes
  'breaking-bad': breakingBadTheme,
}

export { breakingBadTheme }
export type { BreakingBadRendererRef } from './breaking-bad'
```

### 6. Add Static Assets

Place any background images in `apps/web/public/`:

```bash
cp breaking-bad-bg.jpg apps/web/public/
```

### 7. Test and Build

```bash
npm run build
npm run dev
```

Navigate to `http://localhost:3000/breaking-bad`

## Configuration

### Next.js (`next.config.ts`)

- `output: 'export'` - Static site generation
- `distDir: 'dist'` - Output directory
- `images.unoptimized: true` - Required for static export

### Static Export

`output: 'export'` means:
- No API routes
- All pages prerendered at build time
- Output to `apps/web/dist/`

## License

MIT
