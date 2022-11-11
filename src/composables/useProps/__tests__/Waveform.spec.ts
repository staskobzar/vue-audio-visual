import { describe, it, expect } from 'vitest'
global.MediaStream = {}
import { Waveform } from '@/composables/useProps'

describe('Waveform class', () => {
  it('default properties', () => {
    const w = new Waveform({})
    expect(w.canvWidth).toBe(500)
    expect(w.canvHeight).toBe(80)
    expect(w.canvFillColor).toBe('')
    expect(w.playedLineWidth).toBe(0.5)
    expect(w.playedLineColor).toBe('navy')
    expect(w.noplayedLineWidth).toBe(0.5)
    expect(w.noplayedLineColor).toBe('lime')
    expect(w.playtime).toBe(true)
    expect(w.playtimeWithMs).toBe(true)
    expect(w.playtimeFontSize).toBe(12)
    expect(w.playtimeFontFamily).toBe('monospace')
    expect(w.playtimeFontColor).toBe('grey')
    expect(w.playtimeTextBottom).toBe(false)
    expect(w.playtimeSlider).toBe(true)
    expect(w.playtimeSliderColor).toBe('red')
    expect(w.playtimeSliderWidth).toBe(1)
    expect(w.playtimeClickable).toBe(true)
    expect(w.src).toBeNull()
    expect(w.currentTime).toBe(0)
    expect(w.duration).toBe(0)
  })

  it('pre-defined properties', () => {
    const w = new Waveform({
      canvWidth: 600,
      canvHeight: 90,
      canvFillColor: '#fff',
      playedLineWidth: 0.8,
      playedLineColor: 'green',
      noplayedLineWidth: 0.9,
      noplayedLineColor: '#ccc',
      playtime: false,
      playtimeWithMs: false,
      playtimeFontSize: 14,
      playtimeFontFamily: 'Sans Serif',
      playtimeFontColor: 'blue',
      playtimeTextBottom: true,
      playtimeSlider: false,
      playtimeSliderColor: '#fafafa',
      playtimeSliderWidth: 2,
      playtimeClickable: false
    })
    expect(w.canvWidth).toBe(600)
    expect(w.canvHeight).toBe(90)
    expect(w.canvFillColor).toBe('#fff')
    expect(w.playedLineWidth).toBe(0.8)
    expect(w.playedLineColor).toBe('green')
    expect(w.noplayedLineWidth).toBe(0.9)
    expect(w.noplayedLineColor).toBe('#ccc')
    expect(w.playtime).toBe(false)
    expect(w.playtimeWithMs).toBe(false)
    expect(w.playtimeFontSize).toBe(14)
    expect(w.playtimeFontFamily).toBe('Sans Serif')
    expect(w.playtimeFontColor).toBe('blue')
    expect(w.playtimeTextBottom).toBe(true)
    expect(w.playtimeSlider).toBe(false)
    expect(w.playtimeSliderColor).toBe('#fafafa')
    expect(w.playtimeSliderWidth).toBe(2)
    expect(w.playtimeClickable).toBe(false)
    expect(w.src).toBeNull()
    expect(w.currentTime).toBe(0)
    expect(w.duration).toBe(0)
  })

  it('playX parameter', () => {
    const w = new Waveform({ canvWidth: 200 })
    expect(w.playX).toBe(0)
    w.duration = 0
    expect(w.playX).toBe(0)
    w.duration = 100
    expect(w.playX).toBe(0)
    w.currentTime = 10
    expect(w.playX).toBe(20)
  })

  it('timePlayed parameter', () => {
    const w = new Waveform({})
    expect(w.timePlayed).toBe('00:00:00.000')
    w.playtimeWithMs = false
    expect(w.timePlayed).toBe('00:00:00')
    w.currentTime = 82.04556
    expect(w.timePlayed).toBe('00:01:22')
    w.playtimeWithMs = true
    expect(w.timePlayed).toBe('00:01:22.045')
  })
})
