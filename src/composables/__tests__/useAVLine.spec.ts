import { describe, it, expect, vi } from 'vitest'

import { makeCanvasContex2D } from '@/__tests__/setup'
import { draw } from '@/composables/useAVLine'
import { Line } from '@/composables/useProps'

describe('useAVLine', () => {
  it('init with default settings', () => {
    const data = new Uint8Array([])
    const canv = makeCanvasContex2D()
    const spyLineTo = vi.spyOn(canv, 'lineTo')
    draw(data, canv, new Line({}))
    expect(canv.lineWidth).toBe(2)
    expect(canv.strokeStyle).toBe('#9F9')
    expect(canv.fillStyle).toBeUndefined()
    expect(spyLineTo).toHaveBeenLastCalledWith(300, 40)
  })

  it('init settings via props props and line draw', () => {
    const props = {
      canvWidth: 300,
      canvHeight: 80,
      lineWidth: 3,
      lineColor: 'lime',
      canvFillColor: '#000'
    }

    const data = new Uint8Array([])
    const canv = makeCanvasContex2D()
    draw(data, canv, new Line(props))
    expect(canv.lineWidth).toBe(3)
    expect(canv.strokeStyle).toBe('lime')
    expect(canv.fillStyle).toBe('#000')
  })

  it('handles null canvas context', () => {
    const props = {}
    const data = new Uint8Array([255, 128, 5])
    expect(() => draw(data, null, new Line(props))).
      not.toThrowError()
  })

  it('draws line', () => {
    const props = {
      canvWidth: 300,
      canvHeight: 80,
      lineWidth: 2,
      lineColor: 'lime',
      canvFillColor: '#000'
    }

    const data = new Uint8Array([255, 128, 5])
    const canv = makeCanvasContex2D()
    const spyLineTo = vi.spyOn(canv, 'lineTo')
    draw(data, canv, new Line(props))
    expect(spyLineTo).toHaveBeenLastCalledWith(300, 40)
  })
})
