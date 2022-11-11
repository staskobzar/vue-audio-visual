import { describe, it, expect } from 'vitest'
import { Line } from '@/composables/useProps/Line'

describe('Line class', () => {
  it('default properties', () => {
    const line = new Line({})
    expect(line.canvWidth).toBe(300)
    expect(line.canvHeight).toBe(80)
    expect(line.canvFillColor).toBe('')
    expect(line.lineWidth).toBe(2)
    expect(line.lineColor).toBe('#9F9')
    expect(line.fftSize).toBe(128)
    expect(line.placeholder).toBe(true)
  })

  it('pre-defined properties', () => {
    const line = new Line({
      canvWidth: 444,
      canvHeight: 55,
      canvFillColor: '#ccc',
      lineWidth: 4,
      lineColor: ['#aaa', '#fff'],
      fftSize: 512,
      placeholder: false
    })
    expect(line.canvWidth).toBe(444)
    expect(line.canvHeight).toBe(55)
    expect(line.canvFillColor).toBe('#ccc')
    expect(line.lineWidth).toBe(4)
    expect(line.lineColor).toEqual([ '#aaa', '#fff' ])
    expect(line.fftSize).toBe(512)
    expect(line.placeholder).toBe(false)
  })
})
