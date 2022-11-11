import { resolvePropNum, resolvePropColor, resolvePropBool } from './utils'
import { commonProps } from './common'

/**
 * props for AVLine component
 */
const lineProps = {
  /**
   * prop: 'line-width'
   * Draw line width in px
   */
  lineWidth: {
    type: Number,
    default: 2
  },
  /**
   * prop: 'line-color'
   * Draw line color or gradient array
   */
  lineColor: {
    type: [String, Array],
    default: '#9F9'
  },
  /**
   * prop: 'fft-size'
   * Represents the window size in samples that is used when performing
   * a Fast Fourier Transform (FFT) to get frequency domain data.
   * Must be power of 2 between 2^5 and 2^15
   * Default: 128
   */
  fftSize: {
    type: Number,
    default: 128
  }
}

export const PropsLine = { ...commonProps, ...lineProps }
export type PropsLineType = typeof PropsLine
export function makeLineProps(): PropsLineType { return PropsLine }

export class Line{
  canvWidth: number
  canvHeight: number
  canvFillColor: string | string[]
  lineWidth: number
  lineColor: string | string[]
  fftSize: number
  placeholder: boolean
  constructor (p: PropsLineType) {
    const l = PropsLine
    this.canvWidth = resolvePropNum(p.canvWidth, l.canvWidth.default)
    this.canvHeight = resolvePropNum(p.canvHeight, l.canvHeight.default)
    this.canvFillColor = resolvePropColor(p.canvFillColor, l.canvFillColor.default)
    this.lineWidth = resolvePropNum(p.lineWidth, l.lineWidth.default)
    this.lineColor = resolvePropColor(p.lineColor, l.lineColor.default)
    this.fftSize = resolvePropNum(p.fftSize, l.fftSize.default)
    this.placeholder = resolvePropBool(p.placeholder, l.placeholder.default)
  }
}
