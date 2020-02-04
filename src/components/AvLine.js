import BaseMixin from './AvBase'

/**
 * Component props
 */
const props = {
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

/**
 * Component AvLine
 */
const AvLine = {
  name: 'av-line',
  mixins: [ BaseMixin ],
  props,
  data () {
    return {
      animId: null,
      audio: null,
      analyser: null,
      ctx: null,
      audioCtx: null
    }
  },
  methods: {
    /**
     * Main loop. Draws visualization.
     */
    mainLoop: function () {
      const frqBits = this.analyser.frequencyBinCount
      const step = (this.canvWidth / 2.0) / frqBits
      const data = new Uint8Array(frqBits)
      let x = 0

      this._setCanvas()
      this.analyser.getByteFrequencyData(data)

      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = Array.isArray(this.lineColor)
        ? this.fillGradient(this.lineColor)
        : this.lineColor
      this.ctx.beginPath()

      data.reverse()
      this.ctx.moveTo(x, this.canvHeight / 2)
      x = this._drawLine(data, x, step)
      data.reverse()
      x = this._drawLine(data, x, step)
      this.ctx.lineTo(this.canvWidth, this.canvHeight / 2)
      this.ctx.stroke()

      this.animId = requestAnimationFrame(this.mainLoop)
    },
    /**
     * Canvas clear background fill
     * @private
     */
    _setCanvas: function () {
      const w = this.canvWidth
      const h = this.canvHeight
      const canvColor = this.canvFillColor
      const gradient = this.ctx.createLinearGradient(w / 2, 0, w / 2, h)
      let offset = 0
      this.ctx.clearRect(0, 0, w, h)

      if (!canvColor) return

      if (Array.isArray(canvColor)) {
        canvColor.forEach(color => {
          gradient.addColorStop(offset, color)
          offset += (1 / canvColor.length)
        })
        this.ctx.fillStyle = gradient
      } else {
        this.ctx.fillStyle = canvColor
      }
      this.ctx.fillRect(0, 0, w, h)
    },
    /**
     * Draw line and return last X
     * @private
     */
    _drawLine: function (data, x, step) {
      const h = this.canvHeight
      let y = 0
      data.forEach((v, i) => {
        // (h / 2) - v / 255 * (h / 2)
        y = h * (255 - v) / 510
        if (i % 2) y = h - y
        this.ctx.lineTo(x, y)
        x += step
      })
      return x
    }
  }
}

export default AvLine
