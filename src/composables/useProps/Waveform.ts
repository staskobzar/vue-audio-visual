import { commonProps } from './common'
import { resolvePropNum, resolvePropColor, isUndef, resolvePropString, resolvePropBool } from './utils'

/**
 * props for AVWaveform component
 */
const waveformProps = {
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 500
   */
  canvWidth: {
    type: Number,
    default: 500
  },
  /**
   * prop: 'canv-height'
   * Canvas element height. Default 80
   */
  canvHeight: {
    type: Number,
    default: 80
  },
  /**
   * prop: 'played-line-width'
   * Waveform line width for played segment of audio
   * Default: 0.5
   */
  playedLineWidth: {
    type: Number,
    default: 0.5
  },
  /**
   * prop: 'played-line-color'
   * Waveform line color for played segment of audio
   * Default: navy
   */
  playedLineColor: {
    type: String,
    default: 'navy'
  },
  /**
   * prop: 'noplayed-line-width'
   * Waveform line width for not yet played segment of audio
   * Default: 0.5
   */
  noplayedLineWidth: {
    type: Number,
    default: 0.5
  },
  /**
   * prop: 'noplayed-line-color'
   * Waveform line color for not yet played segment of audio
   * Default: lime
   */
  noplayedLineColor: {
    type: String,
    default: 'lime'
  },
  /**
   * prop: 'playtime'
   * Display played time next to progress slider.
   * Default: true
   */
  playtime: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-with-ms'
   * Display milliseconds in played when true.
   * For example: 02:55.054
   * Default: true
   */
  playtimeWithMs: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-font-size'
   * Played time print font size in pixels.
   * Default: 12
   */
  playtimeFontSize: {
    type: Number,
    default: 12
  },
  /**
   * prop: 'playtime-font-family'
   * Played time print font family.
   * Default: monospace
   */
  playtimeFontFamily: {
    type: String,
    default: 'monospace'
  },
  /**
   * prop: 'playtime-font-color'
   * Played time print font RGB color string.
   * Default: grey
   */
  playtimeFontColor: {
    type: String,
    default: 'grey'
  },
  /**
   * prop: 'playtime-text-bottom'
   * Position playtime text bottom.
   * Default on top.
   * Default: false
   */
  playtimeTextBottom: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'playtime-slider'
   * Draw played slider
   * Default: true
   */
  playtimeSlider: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-slider-color'
   * Played slider color
   * Default: red
   */
  playtimeSliderColor: {
    type: String,
    default: 'red'
  },
  /**
   * prop: 'playtime-slider-width'
   * Played slider width
   * Default: 1
   */
  playtimeSliderWidth: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'playtime-clickable'
   * Allow click on waveform to change playtime.
   * Default: true
   */
  playtimeClickable: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'requester'
   * Allow set a custom requester (axios/fetch) to be used.
   * Default: new fetch instance
   */
  requester: {
    type: Function,
    default: fetch
  }
}

export const PropsWaveform = { ...commonProps, ...waveformProps }
export type PropsWaveformType = typeof PropsWaveform
export function makeWavefromProps(): PropsWaveformType { return PropsWaveform }

export class Waveform {
  src: string | null
  canvWidth: number
  canvHeight: number
  canvFillColor: string | string[]
  currentTime: number
  duration: number
  playedLineWidth: number
  playedLineColor: string
  noplayedLineWidth: number
  noplayedLineColor: string
  playtime: boolean
  playtimeWithMs: boolean
  playtimeFontSize: number
  playtimeFontFamily: string
  playtimeFontColor: string
  playtimeTextBottom: boolean
  playtimeSlider: boolean
  playtimeSliderColor: string
  playtimeSliderWidth: number
  playtimeClickable: boolean
  constructor(p: PropsWaveformType) {
    const w = PropsWaveform
    this.canvWidth = resolvePropNum(p.canvWidth, w.canvWidth.default)
    this.canvHeight = resolvePropNum(p.canvHeight, w.canvHeight.default)
    this.canvFillColor = resolvePropColor(p.canvFillColor, w.canvFillColor.default)
    this.playedLineWidth = resolvePropNum(p.playedLineWidth, w.playedLineWidth.default)
    this.playedLineColor = resolvePropString(p.playedLineColor, w.playedLineColor.default)
    this.noplayedLineWidth = resolvePropNum(p.noplayedLineWidth, w.noplayedLineWidth.default)
    this.noplayedLineColor = resolvePropString(p.noplayedLineColor, w.noplayedLineColor.default)
    this.playtime = resolvePropBool(p.playtime, w.playtime.default)
    this.playtimeWithMs = resolvePropBool(p.playtimeWithMs, w.playtimeWithMs.default)
    this.playtimeFontSize = resolvePropNum(p.playtimeFontSize, w.playtimeFontSize.default)
    this.playtimeFontFamily = resolvePropString(p.playtimeFontFamily, w.playtimeFontFamily.default)
    this.playtimeFontColor = resolvePropString(p.playtimeFontColor, w.playtimeFontColor.default)
    this.playtimeTextBottom = resolvePropBool(p.playtimeTextBottom, w.playtimeTextBottom.default)
    this.playtimeSlider = resolvePropBool(p.playtimeSlider, w.playtimeSlider.default)
    this.playtimeSliderColor = resolvePropString(p.playtimeSliderColor, w.playtimeSliderColor.default)
    this.playtimeSliderWidth = resolvePropNum(p.playtimeSliderWidth, w.playtimeSliderWidth.default)
    this.playtimeClickable = resolvePropBool(p.playtimeClickable, w.playtimeClickable.default)
    this.src = isUndef(p.src) ? null : String(p.src)
    this.currentTime = 0
    this.duration = 0
  }
  get playX (): number {
    if (!this.duration) return 0
    return ~~(this.currentTime / this.duration * this.canvWidth)
  }
  get timePlayed (): string {
    const time = [
      this.currentTime / 3600,
      this.currentTime / 60 % 60,
      this.currentTime % 60
    ].
      map(v => String(~~v).padStart(2, '0')).
      join(':')

    if (!this.playtimeWithMs)
      return time
    const ms = ~~(this.currentTime % 1 * 1000)
    return [time, String(ms).padStart(3, '0')].join('.')
  }
}
