export function getCanvasDimensions(aspectRatio: 'standard' | 'wide'): {
  width: number
  height: number
} {
  return {
    width: aspectRatio === 'wide' ? 1280 : 900,
    height: aspectRatio === 'wide' ? 720 : 675,
  }
}
