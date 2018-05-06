/**
 * Mixin component with base and common properties and functions.
 */

/**
 * Base properties common for the audio-visual components
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
  audioElement: {
    type: HTMLAudioElement,
    default: null
  },
  /**
   * prop: 'audio-controls'
   * Audio element controls attribute. When provided should
   * display audio element with controls
   */
  audioControls: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'cors-anonym'
   * CORS requests for this element will not have the credentials flag set.
   * Set crossOrigin property of audio element to 'anonymous'.
   * Default: null
   */
  corsAnonym: {
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
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transperent.
   */
  canvFillColor: {
    type: [String, Array],
    default: null
  }
}

const methods = {
  /**
   * Create audio and canvas elements and insert in the HTML template.
   * Using document.createElement to avoid Vue virtual DOM re-rendering
   * which and lead to infinit loops.
   */
  createHTMLElements: function () {
    const audio = this.audioElement || document.createElement('audio')
    const audioDiv = document.createElement('div')
    const canv = document.createElement('canvas')
    const canvDiv = document.createElement('div')

    if (!this.audioElement) {
      audio.setAttribute('src', this.audioSrc)
      if (this.audioControls) audio.setAttribute('controls', true)
      if (this.audioClass) audio.setAttribute('class', this.audioClass)
      if (this.corsAnonym) audio.crossOrigin = 'anonymous'
      audioDiv.appendChild(audio)
      this.$el.appendChild(audioDiv)
    }

    if (this.canvClass) canv.setAttribute('class', this.canvClass)
    if (this.canvWidth) canv.setAttribute('width', this.canvWidth)
    if (this.canvHeight) canv.setAttribute('height', this.canvHeight)
    canvDiv.appendChild(canv)

    if (this.canvTop && !this.audioElement) {
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
   * Canvas gradient. Vertical, from top down
   */
  fillGradient: function (colorsArray) {
    const w = this.canvWidth
    const h = this.canvHeight
    const gradient = this.ctx.createLinearGradient(w / 2, 0, w / 2, h)
    let offset = 0
    colorsArray.forEach(color => {
      gradient.addColorStop(offset, color)
      offset += (1 / colorsArray.length)
    })
    return gradient
  }
}

export default {
  props,
  render: h => h('div'),
  mounted () {
    this.createHTMLElements()
    this.setAnalyser()
    this.mainLoop()
  },
  methods
}
