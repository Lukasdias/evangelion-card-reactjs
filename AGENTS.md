# AGENTS.md

Guidance for agentic coding agents working in this repository.

## Build Commands

```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build (static export)
npm run start        # Start production server
npm run lint         # ESLint
npm run oxlint       # Oxlint (Rust-based linter)
npm run format       # Oxc formatter
npm run format:check # Check formatting
```

## Project Structure

```
app/
├── layout.tsx         # Root layout with fonts & metadata
├── page.tsx           # Main page component
└── globals.css        # Tailwind + CSS variables

components/
├── episode-card.tsx           # Canvas rendering with Konva
├── episode-card-generator.tsx # Main UI controller (refactored)
├── loading-spinner.tsx        # Suspense fallback
├── structured-data.tsx        # Schema.org JSON-LD
├── trinity-indicator.tsx      # MAGI trinity status indicator
├── status-badge.tsx           # Status badge component
├── data-readout.tsx           # Data readout component
├── app-header.tsx             # Application header
├── mobile-menu.tsx            # Mobile menu (Radix Dialog)
├── editor-tabs.tsx            # Tab interface (Radix Tabs)
├── card-preview.tsx           # Card preview component
└── data-stream.tsx            # Background data stream animation

hooks/
└── use-episode-card.ts        # Custom hooks for state management

lib/
└── presets.ts                 # Episode presets data (all 26 episodes + EOE)
```

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **React**: 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Canvas**: Konva 10 + react-konva 19
- **Linting**: ESLint 9, Oxlint 1.43
- **Formatting**: Oxc formatter

## Code Style Guidelines

### Imports

Order: React → third-party → local → types

```typescript
"use client";
import React, { useRef } from "react";
import { Stage } from "react-konva";
import { EpisodeCardRef } from "./EpisodeCard";
````

### Formatting

- 2 spaces indentation, single quotes, no semicolons
- Max 100 characters per line
- Trailing commas in multi-line objects

### TypeScript

```typescript
interface EpisodeCardProps {
  topText: string;
  aspectRatio?: "standard" | "wide";
}

export interface EpisodeCardRef {
  exportImage: () => string | undefined;
}
```

### Naming

- **Files**: kebab-case (`episode-card.tsx`, `loading-spinner.tsx`)
- **Components**: PascalCase (`EpisodeCard`)
- **Props**: `{Component}Props`, **Refs**: `{Component}Ref`
- **Functions**: camelCase (`handleExport`)
- **State**: `[value, setValue]`, **Constants**: UPPER_SNAKE_CASE

### React Patterns

```typescript
const Component = forwardRef<RefType, Props>(({ prop }, ref) => {
  useImperativeHandle(ref, () => ({ method: () => {} }));
  return <div />;
});
Component.displayName = 'Component';
```

- Use `'use client'` for client components
- Prefer early returns, check `typeof window !== 'undefined'` for client-only logic

### Konva/Canvas

```typescript
import "konva/lib/shapes/Text";
import "konva/lib/shapes/Rect";
```

- Wrap in dynamic imports with `ssr: false`
- Always set `displayName` on forwardedRef components

### Tailwind CSS

- Use semantic colors from globals.css (`magi-cyan`, `magi-bg`)
- Responsive: `sm:`, `md:`, `lg:`, Arbitrary: `h-[calc(100vh-48px)]`

### Error Handling

- Use try/catch in async functions
- Log descriptive errors, cleanup effects

## Static Export Notes

`output: 'export'` means:

- No API routes, images need `unoptimized: true`
- All pages prerendered at build time, output to `dist/`

## Linting Configuration

### ESLint (Next.js)

Config: `eslint.config.mjs` - Uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`

### Oxlint

Config: `.oxlintrc.json` - Plugins: import, typescript, react, jsx-a11y, next

- Categories: correctness=error, suspicious=warn
- Rules: eqeqeq, no-unused-vars, react-hooks/rules-of-hooks, next/no-img-element

```bash
npx oxlint --init && npx oxlint && npx oxlint --fix
```

## Formatter Configuration

### Oxc Formatter

Config: `.oxfmtrc.json` - Tailwind CSS class sorting enabled via `experimentalTailwindcss`

- Sorts classes in `class` and `className` attributes, supports `clsx` and `cn` functions

```bash
npx oxfmt --init && npx oxfmt && npx oxfmt --check
```

VS Code: Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## Pre-Commit Checklist

1. `npm run build` - Verify static export
2. `npm run lint && npm run oxlint` - Linting
3. `npm run format` - Format code
4. TypeScript compiles without errors
5. Test responsive behavior, no hydration mismatches
