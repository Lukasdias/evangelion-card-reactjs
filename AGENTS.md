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
├── EpisodeCard.tsx           # Canvas rendering with Konva
├── EpisodeCardGenerator.tsx  # Main UI controller
├── LoadingSpinner.tsx        # Suspense fallback
└── StructuredData.tsx        # Schema.org JSON-LD
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
'use client';
import React, { useRef } from 'react';
import { Stage } from 'react-konva';
import { EpisodeCardRef } from './EpisodeCard';
```

### Formatting

- 2 spaces indentation, single quotes, no semicolons
- Max 100 characters per line
- Trailing commas in multi-line objects

### TypeScript

```typescript
interface EpisodeCardProps {
  topText: string;
  aspectRatio?: 'standard' | 'wide';
}

export interface EpisodeCardRef {
  exportImage: () => string | undefined;
}
```

### Naming Conventions

- **Components**: PascalCase (`EpisodeCard`)
- **Props**: `{Component}Props`, **Refs**: `{Component}Ref`
- **Functions**: camelCase (`handleExport`)
- **State**: `[value, setValue]`
- **Constants**: UPPER_SNAKE_CASE

### React Patterns

```typescript
const Component = forwardRef<RefType, Props>(({ prop }, ref) => {
  useImperativeHandle(ref, () => ({ method: () => {} }));
  return <div />;
});
Component.displayName = 'Component';
```

- Use `'use client'` for client components
- Prefer early returns
- Check `typeof window !== 'undefined'` for client-only logic

### Konva/Canvas

```typescript
import 'konva/lib/shapes/Text';
import 'konva/lib/shapes/Rect';
```

- Wrap in dynamic imports with `ssr: false`
- Always set `displayName` on forwardedRef components

### Tailwind CSS

- Use semantic colors from globals.css (`magi-cyan`, `magi-bg`)
- Responsive: `sm:`, `md:`, `lg:`
- Arbitrary: `h-[calc(100vh-48px)]`

### Error Handling

- Use try/catch in async functions
- Log descriptive errors
- Cleanup effects (removeEventListener, clearInterval)

## Static Export Notes

`output: 'export'` means:
- No API routes
- Images need `unoptimized: true`
- All pages prerendered at build time
- Output to `dist/` directory

## Linting Configuration

### ESLint (Next.js)

Config: `eslint.config.mjs`
- Uses `eslint-config-next/core-web-vitals`
- Uses `eslint-config-next/typescript`
- Run: `npm run lint`

### Oxlint

Config: `.oxlintrc.json`
- Plugins: import, typescript, react, jsx-a11y, next
- Categories: correctness=error, suspicious=warn
- Rules: eqeqeq, no-unused-vars, react-hooks/rules-of-hooks, next/no-img-element

```bash
npx oxlint --init      # Create config
npx oxlint             # Lint all files
npx oxlint --fix       # Auto-fix issues
```

## Formatter Configuration

### Oxc Formatter

Config: `.oxfmtrc.json`
- Tailwind CSS class sorting enabled via `experimentalTailwindcss`
- Sorts classes in `class` and `className` attributes
- Supports `clsx` and `cn` utility functions

```bash
npx oxfmt --init       # Create config
npx oxfmt              # Format all files
npx oxfmt --check      # Check without writing
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
2. `npm run lint` - ESLint check
3. `npm run oxlint` - Additional linting
4. `npm run format` - Format code
5. TypeScript compiles without errors
6. Test responsive behavior
7. No hydration mismatches
