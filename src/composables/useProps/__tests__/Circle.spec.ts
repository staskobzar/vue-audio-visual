import { describe, it, expect } from 'vitest'
import { Circle } from '@/composables/useProps/Circle'

describe('Circle class', () => {
  it('default propreties', () => {
    const c = new Circle({})
    expect(c.barColor).toEqual(['#FFFFFF', '#0000FF'])
    expect(c.barLength).toBe(0)
    expect(c.barWidth).toBe(1)
    expect(c.canvFillColor).toBe('')
    expect(c.canvHeight).toBe(100)
    expect(c.canvWidth).toBe(100)
    expect(c.fftSize).toBe(1024)
    expect(c.lineSpace).toBe(1)
    expect(c.lineWidth).toBe(1)
    expect(c.outlineColor).toBe('#0000FF')
    expect(c.outlineMeterSpace).toBe(3)
    expect(c.outlineWidth).toBe(0.3)
    expect(c.placeholder).toBe(true)
    expect(c.playtime).toBe(false)
    expect(c.playtimeColor).toBe('#00f')
    expect(c.playtimeFont).toBe('14px Monaco')
    expect(c.progress).toBe(true)
    expect(c.progressClockwise).toBe(true)
    expect(c.progressColor).toBe('#0000FF')
    expect(c.progressWidth).toBe(1)
    expect(c.radius).toBe(0)
    expect(c.rotateGraph).toBe(false)
    expect(c.rotateSpeed).toBe(0.001)

    expect(c.cx).toBe(50)
    expect(c.cy).toBe(50)
    expect(c.arcStep).toBe(2)
  })

  it('pre-defined props', () => {
    const c = new Circle({
      barColor: '#fff',
      barLength: 2,
      barWidth: 3,
      canvFillColor: '#cacaca',
      canvHeight: 120,
      canvWidth: 120,
      fftSize: 2048,
      lineSpace: 2,
      lineWidth: 4,
      outlineColor: '#AAA',
      outlineMeterSpace: 2,
      outlineWidth: 0.4,
      placeholder: false,
      playtime: true,
      playtimeColor: '#fafafa',
      playtimeFont: '12px monospace',
      progress: false,
      progressClockwise: false,
      progressColor: '#ececec',
      progressWidth: 2,
      radius: 30,
      rotateGraph: true,
      rotateSpeed: 0.09
    })

    expect(c.barColor).toBe('#fff')
    expect(c.barLength).toBe(2)
    expect(c.barWidth).toBe(3)
    expect(c.canvFillColor).toBe('#cacaca')
    expect(c.canvHeight).toBe(120)
    expect(c.canvWidth).toBe(120)
    expect(c.fftSize).toBe(2048)
    expect(c.lineSpace).toBe(2)
    expect(c.lineWidth).toBe(4)
    expect(c.outlineColor).toBe('#AAA')
    expect(c.outlineMeterSpace).toBe(2)
    expect(c.outlineWidth).toBe(0.4)
    expect(c.placeholder).toBe(false)
    expect(c.playtime).toBe(true)
    expect(c.playtimeColor).toBe('#fafafa')
    expect(c.playtimeFont).toBe('12px monospace')
    expect(c.progress).toBe(false)
    expect(c.progressClockwise).toBe(false)
    expect(c.progressColor).toBe('#ececec')
    expect(c.progressWidth).toBe(2)
    expect(c.radius).toBe(30)
    expect(c.rotateGraph).toBe(true)
    expect(c.rotateSpeed).toBe(0.09)

    expect(c.cx).toBe(60)
    expect(c.cy).toBe(60)
    expect(c.arcStep).toBe(6)
  })

  it('calculate radius', () => {
    const c = new Circle({ canvWidth: 200 })
    expect(c.r).toBe(70)
    c.radius = 100
    expect(c.r).toBe(100)
  })

  it('calculate barLen', () => {
    const c = new Circle({ barLength: 0, canvWidth: 200 })
    expect(c.barLen).toBe(30)
    c.barLength  = 55
    expect(c.barLen).toBe(55)
  })

  it('calculate angle', () => {
    const c = new Circle({ rotateSpeed: 1, rotateGraph: false })
    expect(c.angle).toBeCloseTo(4.71)
    expect(c.angle).toBeCloseTo(4.71)

    c.rotateGraph = true
    expect(c.angle).toBeCloseTo(7.85)
    expect(c.angle).toBeCloseTo(10.996)
    expect(c.angle).toBeCloseTo(4.71)
    expect(c.angle).toBeCloseTo(7.85)
    expect(c.angle).toBeCloseTo(10.996)
  })
})
