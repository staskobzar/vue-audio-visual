import { commonProps } from './common'
import { resolvePropNum, resolvePropColor, resolvePropString, resolvePropBool } from './utils'

/**
 * props for AVCircle component
 */
const circleProps = {
  /**
   * prop: 'fft-size'
   * Represents the window size in samples that is used when performing
   * a Fast Fourier Transform (FFT) to get frequency domain data.
   * Must be power of 2 between 2^5 and 2^15
   * Default: 1024
   */
  fftSize: {
    type: Number,
    default: 1024
  },
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 100
   */
  canvWidth: {
    type: Number,
    default: 100
  },
  /**
   * prop: 'canv-height'
   * Canvas element height. Default 100
   */
  canvHeight: {
    type: Number,
    default: 100
  },
  /**
   * prop: 'radius'
   * Set circle radius. If zero will be calculated from canvas
   * width: (canv-width / 2) * 0.7
   * Default: 0
   */
  radius: {
    type: Number,
    default: 0
  },
  /**
   * prop: 'line-width'
   * Frequency bit line width to draw.
   */
  lineWidth: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'line-space'
   * Space between lines to draw.
   */
  lineSpace: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'outline-color'
   * Outline (contour) style RGB color.
   * Default: #00f
   */
  outlineColor: {
    type: String,
    default: '#0000FF'
  },
  /**
   * prop: 'outline-width'
   * Outline (contour) line width. Float value.
   * Default: 0.3
   */
  outlineWidth: {
    type: Number,
    default: 0.3
  },
  /**
   * prop: 'bar-width'
   * Frequency graph bar width.
   */
  barWidth: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'bar-length'
   * Frequency graph bar length.
   * Default is a difference between radius and canvas width.
   */
  barLength: {
    type: Number,
    default: 0
  },
  /**
   * prop: 'bar-color'
   * Bar style RGB color or radient gradient when array.
   * Default: [ #FFFFFF, #0000FF ]
   */
  barColor: {
    type: [String, Array],
    default: ['#FFFFFF', '#0000FF']
  },
  /**
   * prop: 'progress'
   * Draw play progress meter.
   * Default: false
   */
  progress: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'progress-width'
   * Progress meter width.
   * Default: 1
   */
  progressWidth: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'progress-color'
   * Progress meter color.
   * Default: 1
   */
  progressColor: {
    type: String,
    default: '#0000FF'
  },
  /**
   * prop: 'progress-clockwise'
   * Progress meter arc draw direction. Default clockwise
   * Default: true
   */
  progressClockwise: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'outline-meter-space'
   * Space between outline and progress meter.
   * Default: 2
   */
  outlineMeterSpace: {
    type: Number,
    default: 3
  },
  /**
   * prop: 'playtime'
   * Draw playtime text in the center of the circle.
   * Default: false
   */
  playtime: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'playtime-font'
   * Played time print font.
   * Default: '14px Monaco'
   */
  playtimeFont: {
    type: String,
    default: '14px Monaco'
  },
  /**
   * prop: 'playtime-color'
   * Played time font color.
   * Default: '#00f'
   */
  playtimeColor: {
    type: String,
    default: '#00f'
  },
  /**
   * prop: 'rotate-graph'
   * Rotate graph clockwise enable.
   * Default: false
   */
  rotateGraph: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'rotate-speed'
   * Rotate graph speed.
   * Default: 0.001
   */
  rotateSpeed: {
    type: Number,
    default: 0.001
  }
}

export const PropsCircle = { ...commonProps, ...circleProps }
export type PropsCircleType = typeof PropsCircle
export function makeCircleProps(): PropsCircleType { return PropsCircle }

let rotate = 1.5

export class Circle {
  barColor: string | string[]
  barLength: number
  barWidth: number
  canvFillColor: string | string[]
  canvHeight: number
  canvWidth: number
  fftSize: number
  lineSpace: number
  lineWidth: number
  outlineColor: string
  outlineMeterSpace: number
  outlineWidth: number
  placeholder: boolean
  playtime: boolean
  playtimeColor: string
  playtimeFont: string
  progress: boolean
  progressClockwise: boolean
  progressColor: string
  progressWidth: number
  radius: number
  rotateGraph: boolean
  rotateSpeed: number
  constructor(p: PropsCircleType){
    const c = PropsCircle
    this.barColor = resolvePropColor(p.barColor, c.barColor.default)
    this.barLength = resolvePropNum(p.barLength, c.barLength.default)
    this.barWidth = resolvePropNum(p.barWidth, c.barWidth.default)
    this.canvFillColor = resolvePropColor(p.canvFillColor, c.canvFillColor.default)
    this.canvHeight = resolvePropNum(p.canvHeight, c.canvHeight.default)
    this.canvWidth = resolvePropNum(p.canvWidth, c.canvWidth.default)
    this.fftSize = resolvePropNum(p.fftSize, c.fftSize.default)
    this.lineSpace = resolvePropNum(p.lineSpace, c.lineSpace.default)
    this.lineWidth = resolvePropNum(p.lineWidth, c.lineWidth.default)
    this.outlineColor = resolvePropString(p.outlineColor, c.outlineColor.default)
    this.outlineMeterSpace = resolvePropNum(p.outlineMeterSpace, c.outlineMeterSpace.default)
    this.outlineWidth = resolvePropNum(p.outlineWidth, c.outlineWidth.default)
    this.lineWidth = resolvePropNum(p.lineWidth, c.lineWidth.default)
    this.placeholder = resolvePropBool(p.placeholder, c.placeholder.default)
    this.playtime = resolvePropBool(p.playtime, c.playtime.default)
    this.playtimeColor = resolvePropString(p.playtimeColor, c.playtimeColor.default)
    this.playtimeFont = resolvePropString(p.playtimeFont, c.playtimeFont.default)
    this.progress = resolvePropBool(p.progress, c.progress.default)
    this.progressClockwise = resolvePropBool(p.progressClockwise, c.progressClockwise.default)
    this.progressColor = resolvePropString(p.progressColor, c.progressColor.default)
    this.progressWidth = resolvePropNum(p.progressWidth, c.progressWidth.default)
    this.radius = resolvePropNum(p.radius, c.radius.default)
    this.rotateGraph = resolvePropBool(p.rotateGraph, c.rotateGraph.default)
    this.rotateSpeed = resolvePropNum(p.rotateSpeed, c.rotateSpeed.default)
  }
  get cx() { return this.canvWidth / 2 }
  get cy() { return this.canvHeight / 2 }
  get r() {
    return this.radius > 0
      ? this.radius
      : Math.round(this.canvWidth / 2 * 0.7)
  }
  get arcStep() { return Math.ceil(this.lineWidth + this.lineSpace) }
  get barLen() {
    return this.barLength > 0
      ? this.barLength
      : (this.canvWidth / 2) - this.r
  }

  get angle() {
    const rot = (): number => {
      return rotate === 3.5
        ? 1.5
        : rotate + this.rotateSpeed
    }

    rotate = this.rotateGraph
      ? rot()
      : 1.5

    return Math.PI * rotate
  }
}
