import { useCallback, useRef } from 'react'
import type Konva from 'konva'

export function useExport() {
  const stageRef = useRef<Konva.Stage>(null)

  const exportImage = useCallback(() => {
    if (stageRef.current) {
      return stageRef.current.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/png',
      })
    }
    return undefined
  }, [])

  return { stageRef, exportImage }
}
