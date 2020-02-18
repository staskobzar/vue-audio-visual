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
   * prop: 'canv-height'
   * Canvas element height. Default 80
   */
  canvHeight: {
    type: Number,
    default: 80
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
    default: 1024 // 8192
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
      console.log(this.media)
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
      canv.style.border = '1px solid'
      this.ctx = canv.getContext('2d')
      this.$el.appendChild(canv)
    },

    setAnalyser: function () {
      this.audioCtx = new AudioContext()
      this.analyser = this.audioCtx.createAnalyser()
      const src = this.audioCtx.createMediaStreamSource(this.media)

      src.connect(this.analyser)
      this.analyser.fftSize = this.fftSize
      this.analyser.connect(this.audioCtx.destination)
    },

    draw: function () {
      const w = this.canvWidth
      const h = this.canvHeight
      const frqBits = this.analyser.fftSize
      const data = new Uint8Array(frqBits)
      const step = w / frqBits

      // this.analyser.getByteTimeDomainData(data)
      this.analyser.getByteFrequencyData(data)

      // this.ctx.save()
      // this.ctx.scale(1, 1)
      this.ctx.clearRect(0, 0, w, h)
      this.ctx.beginPath()

      // this._line(data, step, h)
      this._chunk(data)
      // this.ctx.restore()

      requestAnimationFrame(this.draw)
    },

    _line: function (data, step, h) {
      let x = 0
      data.forEach(v => {
        const y = (v / 255.0) * h
        this.ctx.lineTo(x, y)
        x += step
      })
      this.ctx.stroke()
    },

    _chunk: function (data) {
      const c = 50
      const step = this.canvWidth / c
      const h = this.canvHeight
      for (let i = 0; i < c; i++) {
        const x = i * step
        const avg = data.slice(x, x + step).reduce((sum, v) => sum + (v / 255.0 * h), 0) / step
        const v = avg
        // const space = (v === 0 ? h - 5 : (v * h)) / 2.0 // (h - avg) / 2.0
        const space = h - v // h * (255 - v) / 510
        this.ctx.lineWidth = 2
        this.ctx.moveTo(x, space)
        this.ctx.lineTo(x, h - space) // + space)
        this.ctx.stroke()
      }
    }
  }
}

export default AvMedia
