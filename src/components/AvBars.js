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
   * Default: 1028
   */
  fftSize: {
    type: Number,
    default: 1028
  },
  /**
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transperent.
   */
  canvFillColor: {
    type: [String, Array],
    default: null
  }
}

/**
 * Component AvBars
 */
const AvBars = {
  name: 'av-bars',
  props,
  data () {
    return {
      audio: null,
      analyser: null,
      ctx: null,
      canvas: null
    }
  },
  render: h => h('div'),
  mounted () {
    this._createHTMLElements()
    // console.log(Array.isArray(this.canvFillColor))
    // this._setAnalyser()
    // this._setCanvasContext()
    // this._mainLoop()
  },
  methods: {
    _createHTMLElements: function () {
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
    },
    _setAnalyser: function () {
      const ctx = new AudioContext()
      const src = ctx.createMediaElementSource(this.canvas.element)
      this.analyser = ctx.createAnalyser()

      src.connect(this.analyser)
      this.analyser.fftSize = this.fftSize
      this.analyser.connect(ctx.destination)
    },
    _setCanvasContext: function () {
      this.ctx = this.canvas.elm.getContext('2d')
    },
    _mainLoop: function () {
    }
  }
}

export default AvBars
