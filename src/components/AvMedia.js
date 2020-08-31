/**
 * Component props
 */
const props = {
  /**
   * prop: 'media'
   * MediaStream object for visualisation. Can be delivered by
   * Web Audio API functions like getUserMedia or RTCPeerConnection
   */
  media: {
    type: MediaStream,
    required: false,
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
   * prop: 'canv-class'
   * Canvas element css class name.
   */
  canvClass: {
    type: String,
    default: null
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
   * prop: 'canv-fill-color'
   * Canvas fill background RGB color.
   * Default is transperent.
   */
  canvFillColor: {
    type: String,
    default: null
  },

  /**
   * prop: 'fft-size'
   * Represents the window size in samples that is used when performing
   * a Fast Fourier Transform (FFT) to get frequency domain data.
   * Must be power of 2 between 2^5 and 2^15
   * Default: 8192 for 'wform' 1024 for 'freq'
   */
  fftSize: {
    type: Number,
    default: null // 1024 // 8192
  },

  /**
   * prop: 'type'
   * Type of visualisation.
   * wform - using byte time domaine data
   * frequ - using byte frequency data
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
    type: Number,
    default: null
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
  }
}

/**
 * Component AvMedia
 */
const AvMedia = {
  name: 'av-media',
  data () {
    return {
      ctx: null,
      audioCtx: null,
      analyser: null
    }
  },
  props,
  render: h => h('div'),
  mounted () {
    this.createCanvas()
  },
  watch: {
    media: function (newVal, oldVal) {
      if (newVal) this.setAnalyser()
      this.draw()
    }
  },
  methods: {
    /**
     * Create Canvas inside div
     */
    createCanvas: function () {
      const canv = document.createElement('canvas')
      canv.width = this.canvWidth
      canv.height = this.canvHeight
      if (this.canvClass) canv.setAttribute('class', this.canvClass)
      this.ctx = canv.getContext('2d')
      this.$el.appendChild(canv)
    },

    /**
     * Set analyser
     */
    setAnalyser: function () {
      this.audioCtx = this.audioCtx || new AudioContext()
      this.analyser = this.analyser || this.audioCtx.createAnalyser()
      const src = this.audioCtx.createMediaStreamSource(this.media)

      src.connect(this.analyser)
      if (this.fftSize) {
        this.analyser.fftSize = this.fftSize
      } else {
        this.analyser.fftSize = this.type === 'frequ' ? 1024 : 8192
      }
      if (this.connectDestination) {
        this.analyser.connect(this.audioCtx.destination)
      }
    },

    draw: function () {
      const data = new Uint8Array(this.analyser.fftSize)

      if (this.canvFillColor) this.ctx.fillStyle = this.canvFillColor
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight)
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.lineColor

      if (this.type === 'frequ') {
        this.analyser.getByteFrequencyData(data)
        this.frequ(data)
      } else if (this.type === 'circle') {
        this.analyser.getByteFrequencyData(data)
        this.circle(data)
      } else {
        this.analyser.getByteTimeDomainData(data)
        this.wform(data)
      }

      requestAnimationFrame(this.draw)
    },

    wform: function (data) {
      const h = this.canvHeight
      const step = this.canvWidth / this.analyser.fftSize
      let x = 0
      this.ctx.lineWidth = this.lineWidth || 0.5
      data.forEach(v => {
        const y = (v / 255.0) * h
        this.ctx.lineTo(x, y)
        x += step
      })
      this.ctx.stroke()
    },

    frequ: function (data) {
      const c = this.frequLnum
      const step = this.canvWidth / c
      const h = this.canvHeight
      const lw = this.lineWidth || 2
      for (let i = 0; i < c; i++) {
        const x = i * step + lw
        const v = data.slice(x, x + step).reduce((sum, v) => sum + (v / 255.0 * h), 0) / step
        const space = (h - v) / 2 + 2 // + 2 is space for caps
        this.ctx.lineWidth = lw
        this.ctx.lineCap = this.frequLineCap ? 'round' : 'butt'
        this.ctx.moveTo(x, space)
        this.ctx.lineTo(x, h - space)
        this.ctx.stroke()
      }
    },

    circle: function (data) {
      const cx = this.canvWidth / 2 // center X
      const cy = this.canvHeight / 2 // center Y
      const r = this.radius || 4
      const lineWidth = this.lineWidth
      const lineSpace = 10
      const arcStep = Math.ceil(lineWidth + lineSpace)
      const step = ((lineWidth + lineSpace) / data.length) * (2 * Math.PI)
      const barLen = this.canvWidth / 1.2 - r
      let angle = Math.PI

      this.ctx.lineWidth = this.lineWidth || 0.5

      data.forEach((_, index) => {
        angle += step
        if (index % arcStep) {
          return
        }

        const bits = Math.round(
          data.slice(index, index + arcStep).reduce((v, t) => t + v, 0) /
            arcStep
        )

        const blen = r + (bits / 255.0) * barLen
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy)
        this.ctx.lineTo(
          blen * Math.cos(angle) + cx,
          blen * Math.sin(angle) + cy
        )
        this.ctx.stroke()
      })
    }
  }
}

export default AvMedia
