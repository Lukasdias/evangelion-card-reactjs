'use client'

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { Stage, Layer, Rect, Text, Image } from 'react-konva'
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
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)

    useEffect(() => {
      const image = new window.Image()
      image.src = '/twin-peaks-1.jpg'
      image.onload = () => {
        setBgImage(image)
      }
    }, [])

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

    const headerSize = canvasHeight * 0.14
    const lineHeight = headerSize * 1.2
    const totalTextHeight = state.headerLines.length * lineHeight
    const headerY = (canvasHeight - totalTextHeight) / 2

    return (
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        className='overflow-hidden rounded-lg'
      >
        <Layer>
          {bgImage ? (
            <Image
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHeight}
              image={bgImage}
              crop={{
                x: 0,
                y: 0,
                width: bgImage.width,
                height: bgImage.height,
              }}
            />
          ) : (
            <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill={bgColor} />
          )}

          {state.headerLines.map((line, index) => (
            <Text
              key={`header-${index}`}
              text={line.toUpperCase()}
              x={0}
              y={headerY + index * lineHeight}
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
        </Layer>
      </Stage>
    )
  }
)

TwinPeaksRenderer.displayName = 'TwinPeaksRenderer'

export default TwinPeaksRenderer
