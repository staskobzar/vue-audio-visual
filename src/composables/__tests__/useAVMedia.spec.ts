import { describe, it, expect, vi } from 'vitest'
import { makeCanvasContex2D, AudioContext } from '@/__tests__/setup'
import { useAVMedia, draw } from '@/composables/useAVMedia'
import { Media } from '@/composables/useProps'

global.AudioContext = AudioContext

describe('useAVMedia', () => {
  it('draw with defaults', () => {
    const props = new Media({})
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    const canv = makeCanvasContex2D()

    const clearRect = vi.spyOn(canv, 'clearRect')
    const getData = vi.spyOn(analyser, 'getByteTimeDomainData')

    draw(analyser, canv, props)
    expect(clearRect).toHaveBeenCalledWith(0, 0, 200, 40)
    expect(getData).toHaveBeenCalledOnce()
    expect(canv.lineWidth).toBe(0.5)
  })

  it('draw type "frequ"', () => {
    const props = new Media({})
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    const canv = makeCanvasContex2D()
    const getByte = vi.spyOn(analyser, 'getByteFrequencyData')

    props.type = 'frequ'
    props.frequLineCap = true
    props.lineWidth = 3
    draw(analyser, canv, props)
    expect(getByte).toHaveBeenCalledOnce()
    expect(canv.lineCap).toBe('round')
    expect(canv.lineWidth).toBe(3)

    props.frequDirection = 'mo'
    props.frequLineCap = false
    props.lineWidth = 2
    draw(analyser, canv, props)
    expect(canv.lineCap).toBe('butt')
    expect(canv.lineWidth).toBe(2)
  })

  it('draw type "circle"', () => {
    const props = new Media({})
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    const canv = makeCanvasContex2D()
    const getByte = vi.spyOn(analyser, 'getByteFrequencyData')
    const spyFill = vi.spyOn(canv, 'fill')

    props.type = 'circle'
    draw(analyser, canv, props)
    expect(getByte).toHaveBeenCalledOnce()
    expect(spyFill).toHaveBeenCalledWith('evenodd')
  })

  it('draw type "vbar"', () => {
    const props = new Media({})
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    const canv = makeCanvasContex2D()
    const getByte = vi.spyOn(analyser, 'getByteFrequencyData')
    const spyFill = vi.spyOn(canv, 'fillRect')

    props.type = 'vbar'
    draw(analyser, canv, props)
    expect(getByte).toHaveBeenCalledOnce()
    expect(canv.lineWidth).toBe(4)
    expect(canv.lineCap).toBe('round')
    expect(canv.fillStyle).toBe('#e1e1e1')
    expect(spyFill).toHaveBeenCalledWith(0, 0, 200, 40)

    props.vbarWidth = 6
    props.vbarBgColor = 'yellow'
    props.vbarCaps = false
    props.canvWidth = 220
    props.canvHeight = 60
    draw(analyser, canv, props)
    expect(canv.lineWidth).toBe(6)
    expect(canv.lineCap).toBe('butt')
    expect(canv.fillStyle).toBe('yellow')
    expect(spyFill).toHaveBeenCalledWith(0, 0, 220, 60)
  })

  it('useAVMedia', () => {
    const media = MediaStream
    const props = { media: media }
    const canv = {
      getContext: () => makeCanvasContex2D(),
      width: 0,
      height: 0
    }
    expect(() => useAVMedia(canv, props)).not.toThrow()
    props.type = 'circle'
    expect(() => useAVMedia(canv, props)).not.toThrow()
  })
})
