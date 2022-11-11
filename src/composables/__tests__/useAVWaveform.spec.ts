import { describe, it, expect, vi } from 'vitest'
import { makeCanvasContex2D } from '@/__tests__/setup'
import { draw } from '@/composables/useAVWaveform'
import { Waveform } from '@/composables/useProps'

describe('useAVWaveform', () => {
  it('draw with defaults', () => {
    const props = new Waveform({})
    const canv = makeCanvasContex2D()
    const clearRect = vi.spyOn(canv, 'clearRect')
    draw(canv, props)
    expect(clearRect).toHaveBeenCalledWith(0, 0, 500, 80)
    expect(canv.lineWidth).toBe(1)
    expect(canv.font).toBe('12px monospace')
  })

  it('draw not playtime', () => {
    const p = {
      playtime: false,
      canvWidth: 300,
      canvHeight: 60
    }
    const props = new Waveform(p)
    const canv = makeCanvasContex2D()
    const clearRect = vi.spyOn(canv, 'clearRect')
    draw(canv, props)
    expect(clearRect).toHaveBeenCalledWith(0, 0, 300, 60)
    expect(canv.lineWidth).toBe(1)
    expect(canv.font).toBeUndefined()
  })
})
