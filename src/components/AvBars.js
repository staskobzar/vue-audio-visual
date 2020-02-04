import BaseMixin from './AvBase'
/**
 * Component props Object
 */
const props = {
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

/**
 * Component AvBars
 */
const AvBars = {
  name: 'av-bars',
  mixins: [ BaseMixin ],
  props,
  data () {
    return {
      animId: null,
      audio: null,
      analyser: null,
      ctx: null,
      audioCtx: null,
      caps: Array.apply(null, Array(this.fftSize / 2)).map(() => 0)
    }
  },
  methods: {
    /**
     * Main loop. Draws visualization.
     */
    mainLoop: function () {
      const frqBits = this.analyser.frequencyBinCount
      const data = new Uint8Array(frqBits)
      const barWidth = this.barWidth >= this.canvWidth ? this.canvWidth : this.barWidth
      const step = Math.round((barWidth + this.barSpace) / frqBits * this.canvWidth)
      const barFill = Array.isArray(this.barColor)
        ? this.fillGradient(this.barColor)
        : this.barColor
      let x = 0

      this.analyser.getByteFrequencyData(data)
      this._fillCanvasBG()

      data.forEach((_, index) => {
        if (index % step) return
        const bits = Math.round(data.slice(index, index + step)
          .reduce((v, t) => t + v, 0) / step)
        const barHeight = bits / 255 * this.canvHeight
        if (this.capsHeight) {
          this._drawCap(index, barWidth, x, bits)
        }
        this.ctx.fillStyle = barFill
        this._drawBar(barWidth, barHeight, x)
        x += barWidth + this.barSpace
      })
      this.animId = requestAnimationFrame(this.mainLoop)
    },
    /**
     * Canvas background fill
     * @private
     */
    _fillCanvasBG: function () {
      const w = this.canvWidth
      const h = this.canvHeight
      this.ctx.clearRect(0, 0, w, h)
      if (this.canvFillColor) {
        this.ctx.fillStyle = Array.isArray(this.canvFillColor)
          ? this.fillGradient(this.canvFillColor)
          : this.canvFillColor
        this.ctx.fillRect(0, 0, w, h)
      }
    },
    /**
     * Draw bar. Solid bar or brick bar.
     * @private
     */
    _drawBar: function (barWidth, barHeight, barX) {
      if (this.brickHeight) {
        this._drawBrickBar(barWidth, barHeight, barX)
      } else {
        this.ctx.fillRect(
          barX, this.canvHeight - barHeight - this._symAlign(barHeight),
          barWidth, barHeight
        )
      }
    },
    /**
     * Draw bricks bar.
     * @private
     */
    _drawBrickBar: function (barWidth, barHeight, barX) {
      for (let b = 0; b < barHeight; b += this.brickHeight + this.brickSpace) {
        this.ctx.fillRect(
          barX, this.canvHeight - barHeight + b - this._symAlign(barHeight),
          barWidth, this.brickHeight
        )
      }
    },
    /**
     * Draw cap for each bar and animate caps falling down.
     * @private
     */
    _drawCap: function (index, barwidth, barX, barY) {
      const cap = this.caps[index] <= barY
        ? barY
        : this.caps[index] - this.capsDropSpeed
      const y = (cap / 255.0 * this.canvHeight)
      const capY = this.canvHeight - y - this.capsHeight - this._symAlign(y)
      this.ctx.fillStyle = this.capsColor
      this.ctx.fillRect(barX, capY, barwidth, this.capsHeight)
      if (this.symmetric) {
        this.ctx.fillRect(
          barX, this.canvHeight - capY - this.capsHeight,
          barwidth, this.capsHeight)
      }
      this.caps[index] = cap
    },
    /**
     * Shift for symmetric alignment
     * @private
     */
    _symAlign: function (barHeight) {
      return this.symmetric ? ((this.canvHeight - barHeight) / 2) : 0
    }
  }
}

export default AvBars
