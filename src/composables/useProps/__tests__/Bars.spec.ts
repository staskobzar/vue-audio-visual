import { describe, it, expect } from 'vitest'
import { Bars } from '@/composables/useProps/Bars'

describe('Bars class', () => {
  it('default propreties', () => {
    const bars = new Bars({})
    expect(bars.barColor).toBe('#0A0AFF')
    expect(bars.barSpace).toBe(1)
    expect(bars.barWidth).toBe(5)
    expect(bars.brickHeight).toBe(0)
    expect(bars.brickSpace).toBe(1)
    expect(bars.canvFillColor).toBe('')
    expect(bars.canvHeight).toBe(80)
    expect(bars.canvWidth).toBe(300)
    expect(bars.capsColor).toBe('#A0A0FF')
    expect(bars.capsDropSpeed).toBe(0.9)
    expect(bars.capsHeight).toBe(0)
    expect(bars.fftSize).toBe(1024)
    expect(bars.frqBits).toBe(512)
    expect(bars.placeholder).toBe(true)
    expect(bars.symmetric).toBe(false)
  })

  it('pre-defined props', () => {
    const bars = new Bars({
      barColor: '#ccc',
      barSpace: 0.5,
      barWidth: 8,
      brickHeight: 2,
      brickSpace: 3,
      canvFillColor:'#aaccff',
      canvHeight:  90,
      canvWidth: 120,
      capsColor: '#00ffcc',
      capsDropSpeed: 0.11,
      capsHeight: 3,
      fftSize: 512,
      placeholder: false,
      symmetric: true
    })
    expect(bars.barColor).toBe('#ccc')
    expect(bars.barSpace).toBe(0.5)
    expect(bars.barWidth).toBe(8)
    expect(bars.brickHeight).toBe(2)
    expect(bars.brickSpace).toBe(3)
    expect(bars.canvFillColor).toBe('#aaccff')
    expect(bars.canvHeight).toBe(90)
    expect(bars.canvWidth).toBe(120)
    expect(bars.capsColor).toBe('#00ffcc')
    expect(bars.capsDropSpeed).toBe(0.11)
    expect(bars.capsHeight).toBe(3)
    expect(bars.fftSize).toBe(512)
    expect(bars.frqBits).toBe(256)
    expect(bars.placeholder).toBe(false)
    expect(bars.symmetric).toBe(true)
  })

  it('make sure bar width is not bigger then canvas width', () => {
    const bars = new Bars({
      barWidth: 100,
      canvWidth: 80
    })
    expect(bars.barWidth).toBe(80)
  })

  it('set color array props', () => {
    const bars = new Bars({
      barColor: ['#CCC', '#AAA'],
      canvFillColor: ['#000', '#999']
    })
    expect(bars.barColor).toEqual(['#CCC', '#AAA'])
    expect(bars.canvFillColor).toEqual(['#000', '#999'])
  })

  it('#alignSym', () => {
    const bars = new Bars({ canvHeight: 100 })
    expect(bars.alignSym(1)).toBe(0)
    bars.symmetric = true
    expect(bars.alignSym(10)).toBe(45)
  })
})
