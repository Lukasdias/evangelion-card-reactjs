# AGENTS.md

Guidance for agentic coding agents working in this repository.

## Build Commands

```bash
# Root commands (run from monorepo root)
npm run build          # Build all packages and apps
npm run dev            # Start development server
npm run lint           # Run linters via turbo
npm run format         # Format all code
npm run typecheck      # Type-check all packages

# Package-specific (from package directory)
cd packages/core && npm run build          # Build single package
cd packages/themes && npm run typecheck    # Type-check single package
cd apps/web && npm run build               # Build web app only

# Linting & Formatting
npm run oxlint         # Rust-based linter (faster than ESLint)
npm run oxlint --fix   # Fix auto-fixable issues
npx oxfmt              # Format with Oxc formatter
npx oxfmt --check      # Check formatting without writing
```

## Project Structure

```
vignette-cards/           # Monorepo root
├── apps/
│   └── web/               # Next.js 16 web application
│       ├── app/           # App router pages
│       ├── components/    # React components
│       └── public/        # Static assets
├── packages/
│   ├── core/              # Shared types and contracts
│   ├── themes/            # Theme implementations (Evangelion, Twin Peaks)
│   └── canvas-engine/     # Canvas rendering utilities
├── package.json           # Root package.json (turborepo)
└── turbo.json             # Turborepo configuration
```

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Monorepo**: Turborepo 2.x with pnpm workspaces
- **React**: 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Canvas**: Konva 10 + react-konva 19
- **Linting**: Oxlint 1.43
- **Formatting**: Oxc formatter

## Code Style Guidelines

### Imports

Order: React → third-party → local → types

```typescript
'use client'
import { forwardRef, useRef } from 'react'
import { Stage } from 'react-konva'
import { getCanvasDimensions } from '@vignette-cards/canvas-engine'
import type { CardState } from '@vignette-cards/core'
```

### Formatting

- 2 spaces indentation, single quotes, no semicolons
- Max 100 characters per line
- Trailing commas in multi-line objects

### TypeScript

```typescript
// Interfaces for props
interface TwinPeaksRendererProps {
  state: CardState
  width?: number
  height?: number
}

// Interfaces for refs
export interface TwinPeaksRendererRef {
  exportImage: () => string | undefined
}

// Type exports
export type { ThemeConfig }
```

### Naming Conventions

- **Files**: kebab-case (`episode-card.tsx`, `loading-spinner.tsx`)
- **Components**: PascalCase (`TwinPeaksRenderer`)
- **Props**: `{Component}Props` (`TwinPeaksRendererProps`)
- **Refs**: `{Component}Ref` (`TwinPeaksRendererRef`)
- **Functions**: camelCase (`handleExport`)
- **State**: `[value, setValue]` pattern
- **Constants**: UPPER_SNAKE_CASE

### React Patterns

```typescript
const Component = forwardRef<RefType, Props>(({ prop }, ref) => {
  useImperativeHandle(ref, () => ({ 
    exportImage: () => stageRef.current?.toDataURL() 
  }))
  return <div />
})
Component.displayName = 'Component'
```

- Use `'use client'` for client components
- Use `forwardRef` for components that need ref access
- Always set `displayName` on forwardedRef components

### Canvas/Konva Patterns

```typescript
import { Stage, Layer, Rect, Text } from 'react-konva'
import type Konva from 'konva'

const stageRef = useRef<Konva.Stage>(null)

// Export function via ref
useImperativeHandle(ref, () => ({
  exportImage: () => stageRef.current?.toDataURL({
    pixelRatio: 2,
    mimeType: 'image/png',
  })
}))
```

### Tailwind CSS

- Use CSS variables from globals.css (`--theme-primary`, `--glass-border`)
- Responsive: `sm:`, `md:`, `lg:`
- Arbitrary values: `h-[calc(100vh-48px)]`

### Error Handling

```typescript
try {
  const dataUrl = rendererRef.current?.exportImage()
  if (!dataUrl) throw new Error('Export failed')
} catch (error) {
  console.error('Export failed:', error)
}
```

## Adding a New Theme

To add a theme like Breaking Bad:

1. **Create theme directory** in `packages/themes/src/breaking-bad/`
2. **Create renderer.tsx** following the Twin Peaks/Evangelion pattern
3. **Create presets.ts** with default state and preset cards
4. **Create index.ts** exporting the theme config
5. **Register theme** in `packages/themes/src/index.ts`
6. **Add background image** to `apps/web/public/`

## Static Export

`output: 'export'` in next.config.ts means:
- No API routes
- Images need `unoptimized: true`
- All pages prerendered at build time
- Output to `apps/web/dist/`

## Pre-Commit Checklist

1. `npm run build` - Verify all packages build
2. `npm run lint` - Check for lint errors
3. `npm run format` - Format code
4. `npm run typecheck` - TypeScript check
