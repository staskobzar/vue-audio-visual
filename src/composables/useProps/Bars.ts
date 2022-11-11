import { resolvePropNum, resolvePropColor, resolvePropString, resolvePropBool } from './utils'
import { commonProps } from './common'
/**
 * props for AVBars component
 */
const barsProps = {
  /**
   * prop: 'bar-width'
   * Width of the bar in pixels.
   * Default: 5
   */
  barWidth: {
    type: Number,
    default: 5
  },
  /**
   * prop: 'bar-space'
   * Space between bars.
   * Default: 1
   */
  barSpace: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'bar-color'
   * Bar fill color. Can be string RGB color or canvas gradients array.
   */
  barColor: {
    type: [String, Array],
    default: '#0A0AFF'
  },
  /**
   * prop: 'caps-height'
   * Create caps on bars with given height in pixels.
   * If zero caps then skip creating bars.
   * Default: 0
   */
  capsHeight: {
    type: Number,
    default: 0
  },
  /**
   * prop: 'caps-drop-speed'
   * Caps drop down animation speed.
   * Default: 0.9
   */
  capsDropSpeed: {
    type: Number,
    default: 0.9
  },
  /**
   * prop: 'caps-color'
   * Caps rectangles RGB color.
   */
  capsColor: {
    type: String,
    default: '#A0A0FF'
  },
  /**
   * prop: 'brick-height'
   * Draw bar as bricks with set height.
   */
  brickHeight: {
    type: Number,
    default: 0
  },
  /**
   * prop: 'brick-space'
   * Space between bricks.
   */
  brickSpace: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'symmetric'
   * Draw bars symmetric to canvas vertical center
   * Default: false
   */
  symmetric: {
    type: Boolean,
    default: false
  },
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
  }
}

export const PropsBars = { ...commonProps, ...barsProps }
export type PropsBarsType = typeof PropsBars
export function makeBarsProps(): PropsBarsType { return PropsBars }

export class Bars {
  barColor: string | string[]
  barSpace: number
  barWidth: number
  brickHeight: number
  brickSpace: number
  canvFillColor: string | string[]
  canvHeight: number
  canvWidth: number
  capsColor: string
  capsDropSpeed: number
  capsHeight: number
  fftSize: number
  frqBits: number
  placeholder: boolean
  symmetric: boolean
  constructor(p: PropsBarsType) {
    this.barColor = resolvePropColor(p.barColor, PropsBars.barColor.default)
    this.barSpace = resolvePropNum(p.barSpace, PropsBars.barSpace.default)
    this.brickHeight = resolvePropNum(p.brickHeight, PropsBars.brickHeight.default)
    this.brickSpace = resolvePropNum(p.brickSpace, PropsBars.brickSpace.default)
    this.canvFillColor = resolvePropColor(p.canvFillColor, PropsBars.canvFillColor.default)
    this.canvHeight = resolvePropNum(p.canvHeight, PropsBars.canvHeight.default)
    this.canvWidth = resolvePropNum(p.canvWidth, PropsBars.canvWidth.default)
    this.capsColor = resolvePropString(p.capsColor, PropsBars.capsColor.default)
    this.capsDropSpeed = resolvePropNum(p.capsDropSpeed, PropsBars.capsDropSpeed.default)
    this.capsHeight = resolvePropNum(p.capsHeight, PropsBars.capsHeight.default)
    this.fftSize = resolvePropNum(p.fftSize, PropsBars.fftSize.default)
    this.frqBits = this.fftSize >> 1 // same as div 2 in this case
    this.placeholder = resolvePropBool(p.placeholder, PropsBars.placeholder.default)
    this.symmetric = resolvePropBool(p.symmetric, PropsBars.symmetric.default)
    const bw = resolvePropNum(p.barWidth, PropsBars.barWidth.default)
    this.barWidth = bw > this.canvWidth ? this.canvWidth : bw
  }
  alignSym(barHeight: number):number {
    return this.symmetric ? ((this.canvHeight - barHeight) / 2) : 0
  }
}
