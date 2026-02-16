'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Pencil, Type, Sparkles, LayoutGrid, Download } from 'lucide-react'
import type { ThemeConfig, CardState } from '@vignette-cards/core'
import { getCanvasDimensions } from '@vignette-cards/canvas-engine'
import {
  PropertyPanel,
  CollapsibleSection,
  ColorPicker,
  VisualSlider,
  Toggle,
  PresetCard,
  AddLineButton,
  DraggableLineItem,
  ZoomControl,
  QuickActionsBar,
} from '@/components/editor-ui'

interface ThemePageClientProps {
  theme: ThemeConfig
}

interface RendererRef {
  exportImage: () => string | undefined
}

export default function ThemePageClient({ theme }: ThemePageClientProps) {
  const [state, setState] = useState<CardState>(theme.defaultState)
  const [isClient, setIsClient] = useState(false)
  const [showPanel, setShowPanel] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const rendererRef = useRef<RendererRef>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExport = useCallback(async () => {
    if (!rendererRef.current?.exportImage) {
      console.error('Export not available')
      return
    }

    setIsExporting(true)
    
    try {
      const dataUrl = rendererRef.current.exportImage()
      if (!dataUrl) {
        console.error('Failed to generate image')
        return
      }

      const firstLine = state.headerLines[0]?.toLowerCase().replace(/\s+/g, '-') || theme.id
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `vignette-${firstLine}-${timestamp}.png`

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [state.headerLines, theme.id])

  const updateHeaderLine = useCallback((index: number, value: string) => {
    setState((prev) => ({
      ...prev,
      headerLines: prev.headerLines.map((line, i) =>
        i === index ? value : line
      ),
    }))
  }, [])

  const addHeaderLine = useCallback(() => {
    setState((prev) => ({
      ...prev,
      headerLines: [...prev.headerLines, ''],
    }))
  }, [])

  const removeHeaderLine = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      headerLines: prev.headerLines.filter((_, i) => i !== index),
    }))
  }, [])

  const updateEffect = useCallback(
    <K extends keyof CardState['effects']>(key: K, value: CardState['effects'][K]) => {
      setState((prev) => ({
        ...prev,
        effects: { ...prev.effects, [key]: value },
      }))
    },
    []
  )

  const applyPreset = useCallback(
    (preset: (typeof theme.presets)[0]) => {
      setState((prev) => ({
        ...prev,
        headerLines: preset.headerLines,
        label: preset.label,
        title: preset.title,
        subtitle: preset.subtitle,
        style: { ...prev.style, ...preset.style },
      }))
    },
    [theme.presets]
  )

  const { width, height } = getCanvasDimensions(state.style.aspectRatio)
  const ThemeRenderer = theme.renderer

  return (
    <div
      className='relative flex h-screen flex-col overflow-hidden'
      data-theme={theme.id}
    >
      <div className='mesh-bg' />
      <div className='noise-overlay' />

      <header className='app-header relative z-20 flex-none'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='flex items-center gap-2 text-white/60 transition-colors hover:text-white'
            >
              <ArrowLeft size={20} />
              <span className='text-sm font-medium'>Vignette</span>
            </Link>
            <span className='text-white/20'>/</span>
            <h1
              className='font-semibold'
              style={{ color: theme.colors.accent }}
            >
              {theme.name}
            </h1>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setShowPanel(!showPanel)}
              className='chameleon-btn-secondary rounded-lg px-4 py-2 text-sm'
            >
              {showPanel ? 'Hide Panel' : 'Edit'}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className='chameleon-btn text-sm flex items-center gap-2'
            >
              {isExporting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Download size={16} />
                  </motion.div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className='canvas-workspace relative z-10 flex-1'>
        <div
          className='canvas-viewport'
          style={{ transform: `scale(${zoom})` }}
        >
          {isClient && (
            <div
              className='preview-container w-full'
              style={{
                aspectRatio: `${width} / ${height}`,
                width: width > height ? '70vw' : 'auto',
                maxWidth: '900px',
              }}
            >
              <ThemeRenderer
                ref={rendererRef}
                state={state}
                width={width}
                height={height}
              />
            </div>
          )}
        </div>

        <AnimatePresence>
          {showPanel && (
            <PropertyPanel
              title='Properties'
              onClose={() => setShowPanel(false)}
            >
              <CollapsibleSection
                title='Content'
                icon={<Pencil size={16} />}
              >
                <div className='space-y-2'>
                  {state.headerLines.map((line, index) => (
                    <DraggableLineItem
                      key={index}
                      index={index}
                      value={line}
                      onChange={(value) => updateHeaderLine(index, value)}
                      onRemove={() => removeHeaderLine(index)}
                      canRemove={state.headerLines.length > 1}
                    />
                  ))}
                </div>
                <div className='mt-3'>
                  <AddLineButton
                    onClick={addHeaderLine}
                    disabled={state.headerLines.length >= 6}
                  />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title='Style'
                icon={<Type size={16} />}
              >
                <div className='space-y-4'>
                  <div>
                    <label className='input-label mb-2 block'>
                      Aspect Ratio
                    </label>
                    <div className='grid grid-cols-2 gap-2'>
                      <button
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            style: { ...prev.style, aspectRatio: 'standard' },
                          }))
                        }
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          state.style.aspectRatio === 'standard'
                            ? 'bg-theme-primary/20 border-theme-primary text-white'
                            : 'border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        4:3 Standard
                      </button>
                      <button
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            style: { ...prev.style, aspectRatio: 'wide' },
                          }))
                        }
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          state.style.aspectRatio === 'wide'
                            ? 'bg-theme-primary/20 border-theme-primary text-white'
                            : 'border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        16:9 Wide
                      </button>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title='Effects'
                icon={<Sparkles size={16} />}
              >
                <div className='space-y-4'>
                  <Toggle
                    checked={state.effects.glowEnabled}
                    onChange={(checked) =>
                      updateEffect('glowEnabled', checked)
                    }
                    label='Glow Effect'
                    description='Add neon glow to text'
                  />

                  {state.effects.glowEnabled && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='space-y-4 pl-2 border-l-2 border-theme-primary/30'
                    >
                      <div>
                        <label className='input-label mb-2 block'>
                          Glow Color
                        </label>
                        <ColorPicker
                          value={state.effects.glowColor}
                          onChange={(color) =>
                            updateEffect('glowColor', color)
                          }
                        />
                      </div>

                      <VisualSlider
                        label='Blur Intensity'
                        value={state.effects.glowBlur}
                        min={5}
                        max={50}
                        unit='px'
                        onChange={(value) => updateEffect('glowBlur', value)}
                      />

                      <VisualSlider
                        label='Opacity'
                        value={Math.round(state.effects.glowOpacity * 100)}
                        min={0}
                        max={100}
                        unit='%'
                        onChange={(value) =>
                          updateEffect('glowOpacity', value / 100)
                        }
                      />
                    </motion.div>
                  )}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title='Presets'
                icon={<LayoutGrid size={16} />}
              >
                <div className='space-y-2'>
                  {theme.presets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      title={preset.title}
                      subtitle={preset.label}
                      headerLines={preset.headerLines}
                      onClick={() => applyPreset(preset)}
                    />
                  ))}
                </div>
              </CollapsibleSection>
            </PropertyPanel>
          )}
        </AnimatePresence>

        <div className='toolbar-container'>
          <QuickActionsBar
            actions={[
              {
                icon: <Pencil size={20} />,
                label: 'Edit',
                onClick: () => setShowPanel(true),
                isActive: showPanel,
              },
              {
                icon: isExporting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Download size={20} />
                  </motion.div>
                ) : (
                  <Download size={20} />
                ),
                label: isExporting ? 'Exporting...' : 'Export',
                onClick: handleExport,
              },
            ]}
          />
        </div>

        <div className='bottom-bar'>
          <ZoomControl
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(z * 1.2, 3))}
            onZoomOut={() => setZoom((z) => Math.max(z / 1.2, 0.3))}
            onReset={() => setZoom(1)}
          />
        </div>
      </div>
    </div>
  )
}
