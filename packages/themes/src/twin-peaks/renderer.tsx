'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import type Konva from 'konva'
import type { CardState } from '@vignette/core'

export interface TwinPeaksRendererRef {
  exportImage: () => string | undefined
}

interface TwinPeaksRendererProps {
  state: CardState
  width?: number
  height?: number
}

const TwinPeaksRenderer = forwardRef<TwinPeaksRendererRef, TwinPeaksRendererProps>(
  ({ state, width: propWidth, height: propHeight }, ref) => {
    const stageRef = useRef<Konva.Stage>(null)

    const canvasWidth = propWidth ?? (state.style.aspectRatio === 'wide' ? 1280 : 900)
    const canvasHeight = propHeight ?? (state.style.aspectRatio === 'wide' ? 720 : 675)

    const bgColor = '#1a3d1a'
    const textColor = '#c4b896'
    const outlineColor = '#39FF14'

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

    const glowConfig = state.effects.glowEnabled
      ? {
          shadowColor: state.effects.glowColor,
          shadowBlur: state.effects.glowBlur,
          shadowOpacity: state.effects.glowOpacity,
        }
      : {}

    const headerSize = canvasHeight * 0.12
    const labelSize = canvasHeight * 0.05
    const titleSize = canvasHeight * 0.08
    const subtitleSize = canvasHeight * 0.045

    const headerY = canvasHeight * 0.15
    const labelY = canvasHeight * 0.45
    const titleY = canvasHeight * 0.55
    const subtitleY = canvasHeight * 0.7

    return (
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        className='overflow-hidden rounded-lg'
      >
        <Layer>
          <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill={bgColor} />

          {state.headerLines.map((line, index) => (
            <Text
              key={`header-${index}`}
              text={line.toUpperCase()}
              x={0}
              y={headerY + index * headerSize * 1.1}
              width={canvasWidth}
              align='center'
              fontSize={headerSize}
              fontFamily='"Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif'
              fontStyle='bold'
              fill={textColor}
              stroke={outlineColor}
              strokeWidth={1}
              letterSpacing={8}
              {...glowConfig}
            />
          ))}

          {state.label && (
            <Text
              text={state.label.toUpperCase()}
              x={0}
              y={labelY}
              width={canvasWidth}
              align='center'
              fontSize={labelSize}
              fontFamily='"Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif'
              fontStyle='bold'
              fill={textColor}
              letterSpacing={4}
              {...glowConfig}
            />
          )}

          {state.title && (
            <Text
              text={state.title}
              x={canvasWidth * 0.1}
              y={titleY}
              width={canvasWidth * 0.8}
              align='center'
              fontSize={titleSize}
              fontFamily='"Times New Roman", Times, serif'
              fontStyle='italic'
              fill={textColor}
              {...glowConfig}
            />
          )}

          {state.subtitle && (
            <Text
              text={state.subtitle}
              x={canvasWidth * 0.1}
              y={subtitleY}
              width={canvasWidth * 0.8}
              align='center'
              fontSize={subtitleSize}
              fontFamily='"Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif'
              fill={textColor}
              opacity={0.8}
              {...glowConfig}
            />
          )}
        </Layer>
      </Stage>
    )
  }
)

TwinPeaksRenderer.displayName = 'TwinPeaksRenderer'

export default TwinPeaksRenderer
