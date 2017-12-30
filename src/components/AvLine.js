/**
 * Component props Object
 */
const props = {
  /**
   * prop: 'audio-src'
   * Audio element src attribute. When provided creates audio element
   */
  audioSrc: {
    type: String,
    default: null
  },
  /**
   * prop: 'audio-controls'
   * Audio element controls attribute. When provided should
   * display audio element with controls
   */
  audioControls: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'audio-class'
   * Audio element css class name.
   */
  audioClass: {
    type: String,
    default: null
  },
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 300
   */
  canvWidth: {
    type: Number,
    default: 300
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
   * prop: 'canv-class'
   * Canvas element css class name.
   */
  canvClass: {
    type: String,
    default: null
  },
  /**
   * prop: 'canv-top'
   * Canvas element position on top relatively to audio element.
   * Default: false
   */
  canvTop: {
    type: Boolean,
    default: false
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
  },
  /**
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transperent.
   */
  canvFillColor: {
    type: [String, Array],
    default: null
  },
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
  }
}

/**
 * Component AvLine
 */
const AvLine = {
  name: 'av-line',
  props,
  data () {
    return {
      audio: null,
      analyser: null,
      ctx: null
    }
  },
  render: h => h('div'),
  mounted () {
    this.createHTMLElements()
    this.setAnalyser()
    this.mainLoop()
  },
  methods: {
    /**
     * Create audio and canvas elements and insert in the HTML template.
     * Using document.createElement to avoid Vue virtual DOM re-rendering
     * which and lead to infinit loops.
     */
    createHTMLElements: function () {
      const audio = document.createElement('audio')
      const audioDiv = document.createElement('div')
      const canv = document.createElement('canvas')
      const canvDiv = document.createElement('div')

      audio.setAttribute('src', this.audioSrc)
      if (this.audioControls) audio.setAttribute('controls', true)
      if (this.audioClass) audio.setAttribute('class', this.audioClass)
      audioDiv.appendChild(audio)
      this.$el.appendChild(audioDiv)

      if (this.canvClass) canv.setAttribute('class', this.canvClass)
      if (this.canvWidth) canv.setAttribute('width', this.canvWidth)
      if (this.canvHeight) canv.setAttribute('height', this.canvHeight)
      canvDiv.appendChild(canv)

      if (this.canvTop) {
        this.$el.insertBefore(canvDiv, audioDiv)
      } else {
        this.$el.appendChild(canvDiv)
      }
      this.ctx = canv.getContext('2d')
      this.audio = audio
    },
    /**
     * Set audio context analyser.
     */
    setAnalyser: function () {
      const ctx = new AudioContext()
      const src = ctx.createMediaElementSource(this.audio)
      this.analyser = ctx.createAnalyser()

      src.connect(this.analyser)
      this.analyser.fftSize = this.fftSize
      this.analyser.connect(ctx.destination)
    },
    /**
     * Main loop. Draws visualization.
     */
    mainLoop: function () {
      const w = +this.canvWidth
      const h = +this.canvHeight
      const frqBits = this.analyser.frequencyBinCount
      const data = new Uint8Array(frqBits)
      const step = (w / 2.0) / frqBits
      let x = 0

      this._setCanvas()
      this.analyser.getByteFrequencyData(data)

      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = Array.isArray(this.lineColor) ?
                              this._fillGradient(this.lineColor) :
                              this.lineColor
      this.ctx.beginPath()

      data.reverse()
      this.ctx.moveTo(x, h / 2)
      x = this._drawLine(data, x, step)
      data.reverse()
      x = this._drawLine(data, x, step)
      this.ctx.lineTo(w, h / 2)
      this.ctx.stroke()

      requestAnimationFrame(this.mainLoop)
    },
    /**
     * Canvas clear background fill
     * @private
     */
    _setCanvas: function () {
      const w = this.canvWidth
      const h = this.canvHeight
      const gradient = this.ctx.createLinearGradient(w / 2, 0, w / 2, h)
      let offset = 0
      this.ctx.clearRect(0, 0, w, h)

      if (!this.canvFillColor) return

      if (Array.isArray(this.canvFillColor)){
        colorsArray.forEach(color => {
          gradient.addColorStop(offset, color)
          offset += (1 / colorsArray.length)
        })
        this.ctx.fillStyle = gradient
      } else {
        this.ctx.fillStyle = this.canvFillColor
      }
      this.ctx.fillRect(0, 0, w, h)
    },
    /**
     * Draw line and return last X
     * @private
     */
    _drawLine: function (data, x, step) {
      const h = +this.canvHeight
      let y = 0
      data.forEach((v, i) => {
        // (h / 2) - v / 255 * (h / 2)
        y = h * (255 - v) / 510
        if (i % 2) y = h - y
        this.ctx.lineTo(x, y)
        x += step
      })
      return x
    },
    /**
     * Canvas gradient. Vertical, from top down
     * @private
     */
    _fillGradient: function (colorsArray) {
      const w = this.canvWidth
      const h = this.canvHeight
      const gradient = this.ctx.createLinearGradient(w / 2, 0, w / 2, h)
      let offset = 0
      colorsArray.forEach(color => {
        gradient.addColorStop(offset, color)
        offset += (1 / colorsArray.length)
      })
      return gradient
    },
  }
}

export default AvLine
