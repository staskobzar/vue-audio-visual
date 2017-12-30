import { baseProps, createHTMLElements, setAnalyser } from './AvBase'

/**
 * Component props
 */
const props = Object.assign({}, baseProps, {
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
})

/**
 * Component AvCircle
 */
const AvLine = {
  name: 'av-circle',
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
    createHTMLElements(this)
    setAnalyser(this)
    this.mainLoop()
  },
  methods: {
    /**
     * Main loop. Draws visualization.
     */
    mainLoop: function () {
      const w = +this.canvWidth
      const h = +this.canvHeight
      const frqBits = this.analyser.frequencyBinCount
      const data = new Uint8Array(frqBits)
      let x = 0

      this._setCanvas()
      this.analyser.getByteFrequencyData(data)

      /* cicle draw here */

      requestAnimationFrame(this.mainLoop)
    }
  }
}

export default AvLine
