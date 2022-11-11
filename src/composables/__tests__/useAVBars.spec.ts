import { describe, it, expect, vi } from 'vitest'

import { makeCanvasContex2D } from '@/__tests__/setup'
import { draw } from '@/composables/useAVBars'

describe('useAVBars', () => {
  it('draw with default settings', () => {
    const data = new Uint8Array([100])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, {})
    expect(canv.fillStyle).toBe('#0A0AFF')
    expect(fillRect).toHaveBeenCalledOnce()
  })

  it('draw bars with props', () => {
    const props = {
      canvWidth: 100,
      canvHeight: 50,
      canvFillColor: '#CCC',
      barWidth: 50,
      barSpace: 0,
      fftSize: 1,
      barColor: '#F00'
    }
    const data = new Uint8Array([250])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, props)
    expect(canv.fillStyle).toBe('#F00')
    expect(fillRect).toHaveBeenCalledTimes(2)
    expect(fillRect.calls[0]).toEqual([0, 0, 100, 50])
    expect(fillRect.calls[1]).toEqual([0, 50, 50, 0])
  })

  it('draw bars with caps', () => {
    const props = {
      canvWidth: 100,
      canvHeight: 50,
      canvFillColor: '#CCC',
      barWidth: 5,
      barSpace: 5,
      barColor: '#F00',
      capsHeight: 2
    }
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, props)
    expect(fillRect).toHaveBeenCalledTimes(3)
    expect(fillRect.calls[0]).toEqual([0, 0, 100, 50])
  })

  it('draw bricks bars', () => {
    const props = {
      canvWidth: 100,
      canvHeight: 50,
      canvFillColor: '#CCC',
      barWidth: 5,
      barSpace: 2,
      barColor: '#F00',
      brickHeight: 5,
      brickSpace: 5
    }
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, props)
    expect(fillRect).toHaveBeenCalledTimes(6)
    expect(fillRect.calls[0]).toEqual([0, 0, 100, 50])
    expect(fillRect.calls[1]).toEqual([ 0, 0, 5, 5 ])
    expect(fillRect.calls[2]).toEqual([ 0, 10, 5, 5 ])
    expect(fillRect.calls[3]).toEqual([ 0, 20, 5, 5 ])
    expect(fillRect.calls[4]).toEqual([ 0, 30, 5, 5 ])
    expect(fillRect.calls[5]).toEqual([ 0, 40, 5, 5 ])
  })

  it('draw symmetric to middle', () => {
    const props = {
      canvWidth: 100,
      canvHeight: 50,
      canvFillColor: '#CCC',
      barWidth: 50,
      barSpace: 0,
      barColor: '#F00',
      fftSize: 1,
      symmetric: true
    }
    const data = new Uint8Array([250])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, props)
    expect(fillRect).toHaveBeenCalledTimes(2)
    expect(fillRect.calls[0]).toEqual([0, 0, 100, 50])
    expect(fillRect.calls[1]).toEqual([0, 25, 50, 0])
  })

  it('draw symmetric to middle', () => {
    const props = {
      canvWidth: 100,
      canvHeight: 50,
      canvFillColor: '#CCC',
      barWidth: 50,
      barSpace: 0,
      barColor: '#F00',
      fftSize: 1,
      capsHeight: 5,
      symmetric: true
    }
    const data = new Uint8Array([250])
    const canv = makeCanvasContex2D()
    const fillRect = vi.spyOn(canv, 'fillRect')

    draw(data, canv, props)
    expect(fillRect).toHaveBeenCalledTimes(4)
  })
})
