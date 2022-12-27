import { resolvePropNum, isUndef, resolvePropString, resolvePropBool } from './utils'

/**
 * props for AVMedia component
 */
const mediaProps = {
  /**
   * prop: 'media'
   * MediaStream object for visualisation. Can be delivered by
   * Web Audio API functions like getUserMedia or RTCPeerConnection
   */
  media: {
    type: Object,
    required: false,
    default: null
  },

  /**
   * prop: 'canv-width'
   * Canvas element width. Default depends on type
   * vbar: 50, frequ: 300, wform: 200, circle: 80
   */
  canvWidth: {
    type: Number,
    default: 0
  },

  /**
   * prop: 'canv-class'
   * Canvas element css class name.
   */
  canvClass: {
    type: String,
    default: ''
  },

  /**
   * prop: 'canv-height'
   * Canvas element height. Default value depends on type.
   * vbar: 20, frequ: 80, wform: 40, circle: 80
   */
  canvHeight: {
    type: Number,
    default: 0
  },

  /**
   * prop: 'canv-fill-color'
   * Canvas fill background RGB color.
   * Default is transparent.
   */
  canvFillColor: {
    type: String,
    default: ''
  },

  /**
   * prop: 'circle-gradient'
   * Gradient array for circle type
   * Default: [[0, 'palegreen'], [0.3, 'lime'], [0.7, 'limegreen'], [1, 'green']]
   */
  circleGradient: {
    type: Array, // <[number, string]>,
    default: [[0, 'palegreen'], [0.3, 'lime'], [0.7, 'limegreen'], [1, 'green']]
  },

  /**
   * prop: 'fft-size'
   * Represents the window size in samples that is used when performing
   * a Fast Fourier Transform (FFT) to get frequency domain data.
   * Must be power of 2 between 2^5 and 2^15
   * Default: 8192 for 'wform' 1024 for 'freq'
   */
  fftSize: {
    type: Number
  },

  /**
   * prop: 'type'
   * Type of visualisation.
   * circle - circle form
   * frequ  - using byte frequency data
   * wform  - using byte time domaine data
   * vbar   - vertical bar
   * wform when not recognized.
   * Default: wform
   */
  type: {
    type: String,
    default: 'wform'
  },

  /**
   * prop: 'frequ-lnum'
   * Vertical lines number for frequ type.
   * Default: 60
   */
  frequLnum: {
    type: Number,
    default: 60
  },

  /**
   * prop: 'frequ-line-cap'
   * Draw line with rounded end caps.
   * Default: false
   */
  frequLineCap: {
    type: Boolean,
    default: false
  },

  /**
   * prop: 'frequ-direction'
   * Direction for frequency visualization.
   * lr - from left to right
   * mo - from middle out
   * lr when not recognized.
   * Default: lr
   */
  frequDirection: {
    type: String,
    default: 'lr'
  },

  /**
   * prop: 'line-color'
   * Line color.
   * Default: lime
   */
  lineColor: {
    type: String,
    default: 'lime'
  },

  /**
   * prop: 'line-width'
   * Line width.
   * Default: 0.5 for wform and 3 for frequ
   */
  lineWidth: {
    type: Number
  },

  /**
   * prop: 'radius'
   * Circle radius.
   * Default: 4 for circle
   */
  radius: {
    type: Number,
    default: 4
  },

  /**
   * prop: 'connect-destination'
   * Analyser to connect to audio context's destination
   * Default: false
   */
  connectDestination: {
    type: Boolean,
    default: false
  },

  /**
   * 'prop': 'vbar-bg-color'
   * Background canvas color for 'vbar' type
   * Default: '#e1e1e1'
   */
  vbarBgColor: {
    type: String,
    default: '#e1e1e1'
  },

  /**
   * 'prop': 'vbar-caps'
   * Rounded bars for 'vbar' types
   * Default: true
   */
  vbarCaps: {
    type: Boolean,
    default: true
  },

  /**
   * 'prop': 'vbar-space'
   * Space between bars in 'vbar' type
   * Default: 1
   */
  vbarSpace: {
    type: Number,
    default: 1
  },

  /**
   * 'prop': 'vbar-width'
   * Width of bars in 'vbar' type
   * Default: 4
   */
  vbarWidth: {
    type: Number,
    default: 4
  },

  /**
   * 'prop': 'vbar-fill-color'
   * Color of bars in 'vbar' type
   * Default: 'lime'
   */
  vbarFillColor: {
    type: String,
    default: 'lime'
  },

  /**
   * 'prop': 'vbar-right-color'
   * Color of bars on right side in 'vbar' type
   * Default: '#c0c0c0'
   */
  vbarRightColor: {
    type: String,
    default: '#c0c0c0'

  }
}

export const PropsMedia = { ...mediaProps }
export type PropsMediaType = typeof PropsMedia
export function makeMediaProps(): PropsMediaType { return PropsMedia }

type GradientType = Array<[number, string]>
export class Media {
  canvWidth: number
  canvHeight: number
  canvFillColor: string
  canvClass: string
  circleGradient: GradientType
  fftSize: number
  type: string
  frequLnum: number
  frequLineCap: boolean
  frequDirection: string
  lineColor: string
  lineWidth: number
  radius: number
  connectDestination: boolean
  vbarBgColor: string
  vbarCaps: boolean
  vbarFillColor: string
  vbarRightColor: string
  vbarSpace: number
  vbarWidth: number

  constructor(p: PropsMediaType){
    const m = PropsMedia

    this.canvFillColor = resolvePropString(p.canvFillColor, m.canvFillColor.default)
    this.canvClass = resolvePropString(p.canvClass, m.canvClass.default)
    this.circleGradient = isUndef(p.circleGradient)
      ? m.circleGradient.default as GradientType
      : p.circleGradient as unknown as GradientType
    this.type = resolvePropString(p.type, m.type.default)
    this.fftSize = isUndef(p.fftSize)
      ? this.type === 'frequ' ? 1024 : 8192
      : Number(p.fftSize)
    this.frequLnum = resolvePropNum(p.frequLnum, m.frequLnum.default)
    this.frequLineCap = resolvePropBool(p.frequLineCap, m.frequLineCap.default)
    this.frequDirection = resolvePropString(p.frequDirection, m.frequDirection.default)
    this.lineColor = resolvePropString(p.lineColor, m.lineColor.default)
    this.lineWidth = isUndef(p.lineWidth)
      ? this.type === 'frequ' ? 3 : 0.5
      : Number(p.lineWidth)
    this.radius = resolvePropNum(p.radius, m.radius.default)
    this.connectDestination = resolvePropBool(p.connectDestination, m.connectDestination.default)
    this.vbarBgColor = resolvePropString(p.vbarBgColor, m.vbarBgColor.default)
    this.vbarCaps = resolvePropBool(p.vbarCaps, m.vbarCaps.default)
    this.vbarFillColor = resolvePropString(p.vbarFillColor, m.vbarFillColor.default)
    this.vbarRightColor = resolvePropString(p.vbarRightColor, m.vbarRightColor.default)
    this.vbarSpace = resolvePropNum(p.vbarSpace, m.vbarSpace.default)
    this.vbarWidth = resolvePropNum(p.vbarWidth, m.vbarWidth.default)

    this.canvWidth = isUndef(p.canvWidth) || Number(p.canvWidth) === 0
      ? this.defaultWidth
      : Number(p.canvWidth)
    this.canvHeight = isUndef(p.canvHeight) || Number(p.canvHeight) === 0
      ? this.defaultHeight
      : Number(p.canvHeight)
  }
  // vbar w: 50, h: 20; frequ w: 300, h: 80; wform w: 200, h: 40; circle w: 80, h: 80
  get defaultWidth(): number {
    switch (this.type) {
    case 'vbar': return 50
    case 'frequ': return 300
    case 'circle': return 80
    default: return 200 // wform is default
    }
  }
  get defaultHeight(): number {
    switch (this.type) {
    case 'vbar': return 20
    case 'frequ': return 80
    case 'circle': return 80
    default: return 40 // wform is default
    }
  }
}
