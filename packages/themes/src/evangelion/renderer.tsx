'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Text, Group } from 'react-konva'
import type Konva from 'konva'
import type { CardState } from '@vignette/core'

export interface EvangelionRendererRef {
  exportImage: () => string | undefined
}

interface EvangelionRendererProps {
  state: CardState
  width?: number
  height?: number
}

const EvangelionRenderer = forwardRef<EvangelionRendererRef, EvangelionRendererProps>(
  ({ state, width: propWidth, height: propHeight }, ref) => {
    const stageRef = useRef<Konva.Stage>(null)
    const group1Ref = useRef<Konva.Group>(null)
    const group2Ref = useRef<Konva.Group>(null)
    const group3Ref = useRef<Konva.Group>(null)
    const groupEpRef = useRef<Konva.Group>(null)
    const groupTitleRef = useRef<Konva.Group>(null)

    const canvasWidth = propWidth ?? (state.style.aspectRatio === 'wide' ? 1280 : 900)
    const canvasHeight = propHeight ?? (state.style.aspectRatio === 'wide' ? 720 : 675)
    const leftMargin = state.style.aspectRatio === 'wide' ? 115 : 75
    const rightBoundary = state.style.aspectRatio === 'wide' ? 1150 : 815

    const smHeadSize = canvasHeight * 0.184
    const lgHeadSize = canvasHeight * 0.308
    const epSize = canvasHeight * 0.095
    const titleSize = canvasHeight * 0.095

    const topSquash = 0.62
    const midSquash = 0.62
    const botSquash = 0.57
    const epSquash = 0.76
    const titleSquash = state.style.fontSet === 'sans' ? 0.8 : 0.76

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

    useEffect(() => {
      if (group1Ref.current) {
        group1Ref.current.scaleX(topSquash)
        group1Ref.current.x(leftMargin)
        group1Ref.current.y(canvasHeight * 0.074)
      }
      if (group2Ref.current) {
        group2Ref.current.scaleX(midSquash)
        group2Ref.current.x(leftMargin)
        group2Ref.current.y(canvasHeight * 0.222)
      }
      if (group3Ref.current) {
        group3Ref.current.scaleX(botSquash)
        group3Ref.current.x(leftMargin)
        group3Ref.current.y(canvasHeight * 0.354)
      }
      if (groupEpRef.current) {
        groupEpRef.current.scaleX(epSquash)
        groupEpRef.current.x(leftMargin)
        groupEpRef.current.y(canvasHeight * 0.637)
      }
      if (groupTitleRef.current) {
        groupTitleRef.current.scaleX(titleSquash)
        groupTitleRef.current.x(leftMargin)
        groupTitleRef.current.y(canvasHeight * 0.785)
      }
    }, [topSquash, midSquash, botSquash, epSquash, titleSquash, leftMargin, canvasHeight])

    const bgColor = '#000000'
    const textColor = '#FFFFFF'

    const getTitleX = () => {
      if (state.style.textAlign === 'right') return rightBoundary / titleSquash
      if (state.style.textAlign === 'center') return (rightBoundary + leftMargin) / 2 / titleSquash
      return leftMargin / titleSquash
    }

    const titleX = getTitleX()

    const glowConfig = state.effects.glowEnabled
      ? {
          shadowColor: state.effects.glowColor,
          shadowBlur: state.effects.glowBlur,
          shadowOpacity: state.effects.glowOpacity,
        }
      : {}

    const headerLines = state.headerLines
    const hasThreeLines = headerLines.length >= 3

    return (
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        className='overflow-hidden rounded-lg'
      >
        <Layer>
          <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill={bgColor} />

          {headerLines[0] && (
            <Group ref={group1Ref}>
              <Text
                text={headerLines[0].toUpperCase()}
                fontSize={smHeadSize}
                fontFamily='Times New Roman'
                fontStyle='900'
                fill={textColor}
                {...glowConfig}
              />
            </Group>
          )}

          {headerLines[1] && (
            <Group ref={group2Ref}>
              <Text
                text={headerLines[1].toUpperCase()}
                fontSize={smHeadSize}
                fontFamily='Times New Roman'
                fontStyle='900'
                fill={textColor}
                {...glowConfig}
              />
            </Group>
          )}

          {hasThreeLines && headerLines[2] && (
            <Group ref={group3Ref}>
              <Text
                text={headerLines[2].toUpperCase()}
                fontSize={lgHeadSize}
                fontFamily='Times New Roman'
                fontStyle='900'
                fill={textColor}
                {...glowConfig}
              />
            </Group>
          )}

          {state.label && (
            <Group ref={groupEpRef}>
              <Text
                text={state.label.toUpperCase()}
                fontSize={epSize}
                fontFamily='Helvetica Neue, Helvetica, Arial, sans-serif'
                fontStyle='700'
                fill={textColor}
                {...glowConfig}
              />
            </Group>
          )}

          {state.title && (
            <Group ref={groupTitleRef}>
              {state.title.split('\n').map((line, index) => (
                <Text
                  key={index}
                  text={line}
                  y={index * titleSize * 1.1}
                  fontSize={titleSize}
                  fontFamily={
                    state.style.fontSet === 'sans'
                      ? 'Helvetica Neue, Helvetica, Arial, sans-serif'
                      : 'Times New Roman'
                  }
                  fontStyle={state.style.fontSet === 'sans' ? '800' : '600'}
                  fill={textColor}
                  align={state.style.textAlign}
                  width={
                    state.style.textAlign === 'left'
                      ? (rightBoundary - leftMargin) / titleSquash
                      : undefined
                  }
                  x={state.style.textAlign === 'left' ? 0 : titleX}
                  {...glowConfig}
                />
              ))}
            </Group>
          )}
        </Layer>
      </Stage>
    )
  }
)

EvangelionRenderer.displayName = 'EvangelionRenderer'

export default EvangelionRenderer
