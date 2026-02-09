# Evangelion Title Card Generator

A web application for creating title cards in the style of Neon Genesis Evangelion episodes. Built with Next.js 16, React, and Konva canvas.

## What It Does

Generates PNG images of episode title cards with:

- Three-line header text (e.g., "NEON GENESIS EVANGELION")
- Episode label and title text
- Adjustable typography (serif/sans-serif fonts)
- Optional glow effects
- Two aspect ratios: 900×675 (standard) and 1280×720 (wide)

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Build Tool**: Turbopack (default in Next.js 16)
- **UI**: React 19
- **Canvas Rendering**: Konva + react-konva
- **Styling**: Tailwind CSS v4
- **Fonts**:
  - EPSON Kyouka (custom TTF, Evangelion-style)
  - VT323 (Google Fonts, terminal interface)
  - Times New Roman / Helvetica Neue (canvas text)

## Project Structure

```
app/
  ├── layout.tsx          # Root layout with metadata
  ├── page.tsx            # Main page (server component)
  └── globals.css         # Tailwind + custom CSS variables

components/
  ├── EpisodeCard.tsx     # Canvas rendering component
  ├── EpisodeCardGenerator.tsx  # Main UI with controls
  ├── StructuredData.tsx  # Schema.org JSON-LD
  └── LoadingSpinner.tsx  # Suspense fallback

public/
  ├── fonts/              # TTF font files
  ├── manifest.json       # PWA manifest
  └── _headers            # Static asset headers
```

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

Outputs to `dist/` directory as static files.

## Configuration

### Next.js (`next.config.ts`)

- `output: 'export'` - Static site generation
- `distDir: 'dist'` - Output directory
- `images.unoptimized: true` - Required for static export
- `turbopack.root` - Set to avoid workspace detection issues
- `experimental.optimizePackageImports` - Tree-shaking for Konva

### Canvas Dimensions

- Standard: 900×675px (4:3)
- Wide: 1280×720px (16:9)

Text scaling factors:

- Header lines 1-2: 0.62 horizontal squash
- Header line 3: 0.57 horizontal squash
- Episode label: 0.76 horizontal squash
- Title: 0.76 (serif) or 0.80 (sans) horizontal squash

## License

MIT
