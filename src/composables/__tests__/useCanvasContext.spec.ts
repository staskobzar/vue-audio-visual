import { describe, it, expect, beforeEach, vi } from 'vitest'
import { makeCanvasContex2D } from '@/__tests__/setup'
import {
  useCanvasContext,
  fillCanvasBackground,
  fillGradient
} from '@/composables/useCanvasContext'
import { Line, PropsLine } from '@/composables/useProps'

let canvHtml

describe('useCanvasContext', () => {
  beforeEach(() => {
    canvHtml = {
      getContext: () => makeCanvasContex2D(),
      width: 0,
      height: 0
    }
  })
  it('default settings', () => {
    useCanvasContext(canvHtml, new Line({}))
    expect(canvHtml.width).toBe(PropsLine.canvWidth.default)
    expect(canvHtml.height).toBe(PropsLine.canvHeight.default)
  })

  it('via props', () => {
    const line = new Line({ canvWidth: 280, canvHeight: 66 })
    useCanvasContext(canvHtml, line)
    expect(canvHtml.width).toBe(280)
    expect(canvHtml.height).toBe(66)
  })

  it('fillCanvasBackground', () => {
    const canv = makeCanvasContex2D()
    const clearRect = vi.spyOn(canv, 'clearRect')
    const fillRect = vi.spyOn(canv, 'fillRect')

    fillCanvasBackground(canv, 300, 80, null)
    expect(clearRect).toHaveBeenCalled()
    expect(fillRect).not.toHaveBeenCalled()
    vi.resetAllMocks()

    fillCanvasBackground(canv, 300, 80, '#ccc')
    expect(clearRect).toHaveBeenCalled()
    expect(fillRect).toHaveBeenCalled()
    expect(canv.fillStyle).toBe('#ccc')
    vi.resetAllMocks()
  })

  it('fillGradient', () => {
    const canv = makeCanvasContex2D()
    const color = fillGradient(canv, 300, 80, '#00f')
    expect(color).toBe('#00f')

    const gradient = fillGradient(canv, 300, 80, ['#f00', '#0f0', '#00f'])
    expect(gradient.colors).toContain('#f00')
    expect(gradient.colors).toContain('#0f0')
    expect(gradient.colors).toContain('#00f')
  })
})
