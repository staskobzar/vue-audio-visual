import { describe, it, expect } from 'vitest'
import { Media } from '@/composables/useProps/Media'

describe('Media class', () => {
  it('default propreties', () => {
    const media = new Media({})
    expect(media.canvWidth).toBe(200)
    expect(media.canvClass).toBe('')
    expect(media.canvHeight).toBe(40)
    expect(media.canvFillColor).toBe('')
    expect(media.circleGradient).toEqual([[0, 'palegreen'], [0.3, 'lime'], [0.7, 'limegreen'], [1, 'green']])
    expect(media.fftSize).toBe(8192)
    expect(media.type).toBe('wform')
    expect(media.frequLnum).toBe(60)
    expect(media.frequLineCap).toBe(false)
    expect(media.frequDirection).toBe('lr')
    expect(media.lineColor).toBe('lime')
    expect(media.lineWidth).toBe(0.5)
    expect(media.radius).toBe(4)
    expect(media.connectDestination).toBe(false)
    expect(media.vbarBgColor).toBe('#e1e1e1')
    expect(media.vbarCaps).toBe(true)
    expect(media.vbarSpace).toBe(1)
    expect(media.vbarWidth).toBe(4)
    expect(media.vbarFillColor).toBe('lime')
    expect(media.vbarRightColor).toBe('#c0c0c0')
  })

  it('default width and height depends on type', () => {
    const vbar = new Media({ type: 'vbar' })
    expect(vbar.canvWidth).toBe(50)
    expect(vbar.canvHeight).toBe(20)
    const frequ = new Media({ type: 'frequ' })
    expect(frequ.canvWidth).toBe(300)
    expect(frequ.canvHeight).toBe(80)
    const wform = new Media({ type: 'wform' })
    expect(wform.canvWidth).toBe(200)
    expect(wform.canvHeight).toBe(40)
    const circle = new Media({ type: 'circle' })
    expect(circle.canvWidth).toBe(80)
    expect(circle.canvHeight).toBe(80)
    const media = new Media({ type: 'unknown' })
    expect(media.canvWidth).toBe(200)
    expect(media.canvHeight).toBe(40)
  })

  it('pre-defined properties', () => {
    const media = new Media({
      canvWidth: 400,
      canvClass: 'foo-bar',
      canvHeight: 99,
      canvFillColor: '#cfcfcf',
      circleGradient: [[0, 'white'], [1, 'red']],
      fftSize: 512,
      type: 'circle',
      frequLnum: 80,
      frequLineCap: true,
      frequDirection: 'mo',
      lineColor: 'red',
      lineWidth: 3,
      radius: 15,
      connectDestination: true,
      vbarBgColor: 'grey',
      vbarCaps: false,
      vbarSpace: 2,
      vbarWidth: 6,
      vbarFillColor: 'green',
      vbarRightColor: '#ccc'
    })
    expect(media.canvWidth).toBe(400)
    expect(media.canvClass).toBe('foo-bar')
    expect(media.canvHeight).toBe(99)
    expect(media.canvFillColor).toBe('#cfcfcf')
    expect(media.circleGradient).toEqual([[0, 'white'], [1, 'red']])
    expect(media.fftSize).toBe(512)
    expect(media.type).toBe('circle')
    expect(media.frequLnum).toBe(80)
    expect(media.frequLineCap).toBe(true)
    expect(media.frequDirection).toBe('mo')
    expect(media.lineColor).toBe('red')
    expect(media.lineWidth).toBe(3)
    expect(media.radius).toBe(15)
    expect(media.connectDestination).toBe(true)
    expect(media.vbarBgColor).toBe('grey')
    expect(media.vbarCaps).toBe(false)
    expect(media.vbarSpace).toBe(2)
    expect(media.vbarWidth).toBe(6)
    expect(media.vbarFillColor).toBe('green')
    expect(media.vbarRightColor).toBe('#ccc')
  })
})
