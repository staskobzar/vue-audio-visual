import { describe, it, expect, vi } from 'vitest'

import { makeCanvasContex2D } from '@/__tests__/setup'
import { Circle } from '@/composables/useProps'
import { draw } from '@/composables/useAVCircle'

describe('AVCircle', () => {
  it('init with default settings', () => {
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const spyArc = vi.spyOn(canv, 'arc')
    const spyFillText = vi.spyOn(canv, 'fillText')
    const audio = new Audio()
    const p = new Circle({})
    draw(data, canv, audio, p)
    expect(canv.lineWidth).toBe(1)
    expect(canv.strokeStyle.colors).toEqual(['#FFFFFF', '#0000FF'])
    expect(canv.fillStyle).toBe('#00f')
    expect(spyArc).toHaveBeenCalledTimes(1)
    expect(spyFillText).toHaveBeenLastCalledWith('0:00', expect.anything(), expect.anything())
  })

  it('draw circle with props', () => {
    const props = {
      barWidth: 3,
      barColor: '#00ff00'
    }
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const audio = new Audio()

    const p = new Circle(props)
    draw(data, canv, audio, p)
    expect(canv.lineWidth).toBe(3)
    expect(canv.strokeStyle).toBe('#00ff00')
  })

  it('draw circle outline', () => {
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const audio = new Audio()
    const spyArc = vi.spyOn(canv, 'arc')

    draw(data, canv, audio, new Circle({}))
    expect(spyArc).toHaveBeenCalledTimes(1)
    vi.resetAllMocks()

    const props = { outlineWidth: 0 }
    draw(data, canv, audio, new Circle(props))
    expect(spyArc).toHaveBeenCalledTimes(0)

    props.outlineWidth = 0.02
    draw(data, canv, audio, new Circle(props))
    expect(spyArc).toHaveBeenCalledTimes(1)
  })

  it('draw progress bar', () => {
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const audio = { duration: 0, currentTime: 0 }
    const spyArc = vi.spyOn(canv, 'arc')
    const props = { outlineWidth: 0, progress: false }

    draw(data, canv, audio, new Circle(props))
    expect(spyArc).toHaveBeenCalledTimes(0)

    audio.duration = 20
    audio.currentTime = 5
    draw(data, canv, audio, new Circle(props))
    expect(spyArc).toHaveBeenCalledTimes(0)

    props.progress = true
    draw(data, canv, audio, new Circle(props))
    expect(spyArc).toHaveBeenCalledTimes(1)
  })

  it('draw playtime', () => {
    const data = new Uint8Array([255])
    const canv = makeCanvasContex2D()
    const audio = { duration: 0, currentTime: 0 }
    const spyFillText = vi.spyOn(canv, 'fillText')

    draw(data, canv, audio, new Circle({}))
    expect(canv.font).toBe('14px Monaco')
    expect(canv.fillStyle).toBe('#00f')
    expect(spyFillText).toHaveBeenLastCalledWith('0:00', expect.anything(), expect.anything())

    const props = { playtimeFont: '15px Arial', playtimeColor: '#ff0000' }
    audio.duration = 1800
    audio.currentTime = 126
    draw(data, canv, audio, new Circle(props))
    expect(canv.font).toBe('15px Arial')
    expect(canv.fillStyle).toBe('#ff0000')
    expect(spyFillText).toHaveBeenLastCalledWith('2:06', expect.anything(), expect.anything())

    audio.currentTime = 16
    draw(data, canv, audio, new Circle(props))
    expect(spyFillText).toHaveBeenLastCalledWith('0:16', expect.anything(), expect.anything())

    audio.currentTime = 698
    draw(data, canv, audio, new Circle(props))
    expect(spyFillText).toHaveBeenLastCalledWith('11:38', expect.anything(), expect.anything())
  })
})
