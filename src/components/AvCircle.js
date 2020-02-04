import BaseMixin from './AvBase'

/**
 * Component props
 */
const props = {
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
   * Set cercle radius. If zero will be calculated from canvas
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
    default: () => [ '#FFFFFF', '#0000FF' ]
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
    default: false
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

/**
 * Component AvCircle
 */
const AvCircle = {
  name: 'av-circle',
  mixins: [ BaseMixin ],
  props,
  data () {
    return {
      animId: null,
      rotate: 1.5,
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
      const cx = this.canvWidth / 2 // center X
      const cy = this.canvHeight / 2 // center Y
      const r = this.radius ? this.radius : Math.round(this.canvWidth / 2 * 0.7)
      const lineWidth = this.lineWidth
      const lineSpace = this.lineSpace
      const arcStep = Math.ceil(lineWidth + lineSpace)
      const frqBits = this.analyser.frequencyBinCount
      const data = new Uint8Array(frqBits)
      const step = ((lineWidth + lineSpace) / data.length) * (2 * Math.PI)
      const barLen = this.barLength > 0
        ? this.barLength
        : (this.canvWidth / 2) - r
      let angle = Math.PI * this._rotate() // start from top

      this._setCanvas()
      this.analyser.getByteFrequencyData(data)

      // contour outline
      if (this.outlineWidth > 0) {
        this._drawOutline(r, cx, cy)
      }

      // draw play progress meter
      if (this.progress) {
        this._drawProgress(r, cx, cy)
      }

      // draw played time
      if (this.playtime) {
        this._drawPlaytime(cx, cy)
      }

      // circle bar lines
      this.ctx.lineWidth = this.barWidth
      this.ctx.strokeStyle = this._setBarColor(cx, cy)

      data.forEach((_, index) => {
        angle += step
        if (index % arcStep) {
          return
        }
        const bits = Math.round(data.slice(index, index + arcStep)
          .reduce((v, t) => t + v, 0) / arcStep)

        const blen = r + (bits / 255.0 * barLen)
        this.ctx.beginPath()
        this.ctx.moveTo(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy)
        this.ctx.lineTo(blen * Math.cos(angle) + cx, blen * Math.sin(angle) + cy)
        this.ctx.stroke()
      })

      this.animId = requestAnimationFrame(this.mainLoop)
    },
    /**
     * Canvas clear background fill
     * @private
     */
    _setCanvas: function () {
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight)

      if (!this.canvFillColor) return

      this.ctx.fillStyle = Array.isArray(this.canvFillColor)
        ? this.fillGradient(this.canvFillColor)
        : this.canvFillColor
      this.ctx.fillRect(0, 0, this.canvWidth, this.canvHeight)
    },
    /**
     * Draw play progress meter
     */
    _drawProgress: function (r, cx, cy) {
      const elapsed = this.audio.currentTime / this.audio.duration * 2 * Math.PI
      const angleEnd = Math.PI * 1.5 + elapsed

      if (!elapsed) return

      this.ctx.lineWidth = this.progressWidth
      this.ctx.strokeStyle = this.progressColor

      this.ctx.beginPath()
      this.ctx.arc(cx, cy, r - this.outlineWidth - this.outlineMeterSpace,
        1.5 * Math.PI, angleEnd, this.progressClockwise)
      this.ctx.stroke()
    },
    /**
     * Draw outline circle
     */
    _drawOutline: function (r, cx, cy) {
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.outlineColor
      this.ctx.lineWidth = this.outlineWidth
      this.ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      this.ctx.stroke()
    },
    /**
     * Draw played time
     */
    _drawPlaytime: function (cx, cy) {
      const m = Math.floor(this.audio.currentTime / 60)
      const sec = Math.floor(this.audio.currentTime) % 60
      const s = sec < 10 ? `0${sec}` : `${sec}`
      const text = `${m}:${s}`
      const tsizew = Math.ceil(this.ctx.measureText(text).width)

      this.ctx.font = this.playtimeFont
      this.ctx.fillStyle = this.playtimeColor
      this.ctx.fillText(text, cx - Math.round(tsizew / 2), cy + 0.25 * parseInt(this.playtimeFont))
    },
    /**
     * If rotate is enabled will return rotated angle
     */
    _rotate: function () {
      if (this.rotateGraph) {
        this.rotate = this.rotate === 3.5 ? 1.5 : this.rotate + this.rotateSpeed
      } else {
        this.rotate = 1.5
      }
      return this.rotate
    },
    /**
     * Set bars color.
     */
    _setBarColor: function (cx, cy) {
      if (!Array.isArray(this.barColor)) {
        return this.barColor
      }
      const gradient = this.ctx.createRadialGradient(cx, cy, this.canvWidth / 2, cx, cy, 0)
      let offset = 0

      this.barColor.forEach(color => {
        gradient.addColorStop(offset, color)
        offset += (1 / this.barColor.length)
      })
      return gradient
    }
  }
}

export default AvCircle
