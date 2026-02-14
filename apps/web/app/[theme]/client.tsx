'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { ThemeConfig, CardState } from '@vignette/core'
import { getCanvasDimensions } from '@vignette/canvas-engine'

interface ThemePageClientProps {
  theme: ThemeConfig
}

export default function ThemePageClient({ theme }: ThemePageClientProps) {
  const [state, setState] = useState<CardState>(theme.defaultState)
  const [isClient, setIsClient] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExport = () => {
    console.log('Export functionality needs to be implemented with a different pattern')
  }

  const updateHeaderLine = (index: number, value: string) => {
    setState((prev) => ({
      ...prev,
      headerLines: prev.headerLines.map((line, i) => (i === index ? value : line)),
    }))
  }

  const { width, height } = getCanvasDimensions(state.style.aspectRatio)
  const ThemeRenderer = theme.renderer

  return (
    <div className='flex h-screen flex-col bg-black text-white'>
      <header className='flex-none border-b border-gray-800 bg-gray-900/50'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='text-xl font-bold text-gray-400 hover:text-white'>
              ← Vignette
            </Link>
            <span className='text-gray-600'>/</span>
            <h1 className='text-xl font-bold' style={{ color: theme.colors.accent }}>
              {theme.name}
            </h1>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setShowControls(!showControls)}
              className='rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-white'
            >
              {showControls ? 'Hide Controls' : 'Edit'}
            </button>
            <button
              onClick={handleExport}
              className='rounded-lg px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90'
              style={{ backgroundColor: theme.colors.accent }}
            >
              Export PNG
            </button>
          </div>
        </div>
      </header>

      <div className='relative flex flex-1 overflow-hidden'>
        <main
          ref={containerRef}
          className='flex flex-1 items-center justify-center p-8'
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {isClient && (
            <div
              className='relative w-full'
              style={{
                maxWidth: 'min(100%, 1200px)',
                aspectRatio: `${width} / ${height}`,
              }}
            >
              <ThemeRenderer state={state} width={width} height={height} />
            </div>
          )}
        </main>

        {showControls && (
          <div className='w-96 flex-none overflow-y-auto border-l border-gray-800 bg-gray-900/95 p-6'>
            <div className='space-y-6'>
              <div>
                <h2 className='mb-4 text-lg font-semibold'>Text</h2>
                <div className='space-y-4'>
                  {state.headerLines.map((line, index) => (
                    <div key={index}>
                      <label className='mb-1 block text-sm text-gray-400'>
                        Header Line {index + 1}
                      </label>
                      <input
                        type='text'
                        value={line}
                        onChange={(e) => updateHeaderLine(index, e.target.value)}
                        className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  ))}

                  <div>
                    <label className='mb-1 block text-sm text-gray-400'>Label</label>
                    <input
                      type='text'
                      value={state.label}
                      onChange={(e) => setState((prev) => ({ ...prev, label: e.target.value }))}
                      className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div>
                    <label className='mb-1 block text-sm text-gray-400'>Title</label>
                    <input
                      type='text'
                      value={state.title}
                      onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
                      className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  {state.subtitle !== undefined && (
                    <div>
                      <label className='mb-1 block text-sm text-gray-400'>Subtitle</label>
                      <input
                        type='text'
                        value={state.subtitle}
                        onChange={(e) => setState((prev) => ({ ...prev, subtitle: e.target.value }))}
                        className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className='mb-4 text-lg font-semibold'>Presets</h2>
                <div className='max-h-64 space-y-2 overflow-y-auto'>
                  {theme.presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          headerLines: preset.headerLines,
                          label: preset.label,
                          title: preset.title,
                          subtitle: preset.subtitle,
                          style: { ...prev.style, ...preset.style },
                        }))
                      }
                      className='w-full rounded border border-gray-700 bg-gray-800 p-3 text-left transition-colors hover:border-gray-600 hover:bg-gray-700'
                    >
                      <div className='text-sm font-medium'>{preset.title}</div>
                      <div className='text-xs text-gray-400'>{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
