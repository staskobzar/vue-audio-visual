import axios from 'axios'
import BaseMixin from './AvBase'

/**
 * Component props
 */
const props = {
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 500
   */
  canvWidth: {
    type: Number,
    default: 500
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
   * prop: 'played-line-width'
   * Waveform line width for played segment of audio
   * Default: 0.5
   */
  playedLineWidth: {
    type: Number,
    default: 0.5
  },
  /**
   * prop: 'played-line-color'
   * Waveform line color for played segment of audio
   * Default: navy
   */
  playedLineColor: {
    type: String,
    default: 'navy'
  },
  /**
   * prop: 'noplayed-line-width'
   * Waveform line width for not yet played segment of audio
   * Default: 0.5
   */
  noplayedLineWidth: {
    type: Number,
    default: 0.5
  },
  /**
   * prop: 'noplayed-line-color'
   * Waveform line color for not yet played segment of audio
   * Default: lime
   */
  noplayedLineColor: {
    type: String,
    default: 'lime'
  },
  /**
   * prop: 'playtime'
   * Display played time next to progress slider.
   * Default: true
   */
  playtime: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-with-ms'
   * Display milliseconds in played when true.
   * For example: 02:55.054
   * Default: true
   */
  playtimeWithMs: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-font-size'
   * Played time print font size in pixels.
   * Default: 12
   */
  playtimeFontSize: {
    type: Number,
    default: 12
  },
  /**
   * prop: 'playtime-font-family'
   * Played time print font family.
   * Default: monospace
   */
  playtimeFontFamily: {
    type: String,
    default: 'monospace'
  },
  /**
   * prop: 'playtime-font-color'
   * Played time print font RGB color string.
   * Default: grey
   */
  playtimeFontColor: {
    type: String,
    default: 'grey'
  },
  /**
   * prop: 'playtime-text-bottom'
   * Position playtime text bottom.
   * Default on top.
   * Default: false
   */
  playtimeTextBottom: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'playtime-slider'
   * Draw played slider
   * Default: true
   */
  playtimeSlider: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'playtime-slider-color'
   * Played slider color
   * Default: red
   */
  playtimeSliderColor: {
    type: String,
    default: 'red'
  },
  /**
   * prop: 'playtime-slider-width'
   * Played slider width
   * Default: 1
   */
  playtimeSliderWidth: {
    type: Number,
    default: 1
  },
  /**
   * prop: 'playtime-clickable'
   * Allow click on waveform to change playtime.
   * Default: true
   */
  playtimeClickable: {
    type: Boolean,
    default: true
  },
  /**
   * prop: 'requester'
   * Allow set a custom requester (axios/fetch) to be used.
   * Default: new axios instance
   */
  requester: {
    type: Function,
    default: axios
  }
}

/**
 * Component AvLine
 */
const AvWaveform = {
  name: 'av-waveform',
  mixins: [BaseMixin],
  props,
  data () {
    return {
      animId: null,
      ctxWrapper: null,
      ctx: null,
      audio: null,
      duration: null,
      peaks: []
    }
  },
  mounted () {
    const conf = {
      responseType: 'arraybuffer',
      onDownloadProgress: this.downloadProgress
    }
    this.requester.get(this.audio.src, conf)
      .then(response => this.decode(response))
      .catch(err => {
        console.error(`Failed to get file '${this.audio.src}'`)
        console.log(err)
      })
    this.audio.onplay = () => {
      this.animId = requestAnimationFrame(this.waveformAnim)
    }
    this.audio.onpause = () => {
      cancelAnimationFrame(this.animId)
      this.animId = null
    }
  },
  methods: {
    // Stub set analyser method from Mixin AvBase
    // as there is no need of analyser in that component
    // this method is called from mixin mounted()
    setAnalyser: function () {
      /* istanbul ignore next */
      return null
    },

    // Stub mainLoop method from Mixin AvBase as
    // here different init method will be used.
    // This method is called from mixin mounted()
    mainLoop: function () {
      /* istanbul ignore next */
      return null
    },

    /**
     * Decode audio source response array buffer
     */
    decode: function (response) {
      /* istanbul ignore next */
      const ctx = new AudioContext()
      /* istanbul ignore next */
      ctx.decodeAudioData(response.data, (audioBuffer) => {
        this.setPeaks(audioBuffer)
      }, (err) => {
        console.error('Failed to decode audio data.')
        console.log(err)
      })
    },

    /**
     * Set peaks array for waveform.
     * For now use only one channel
     */
    setPeaks: function (buffer) {
      const peaks = []
      let min = 0
      let max = 0
      let top = 0
      let bottom = 0
      const segSize = Math.ceil(buffer.length / this.canvWidth)
      const width = this.canvWidth
      const height = this.canvHeight
      this.duration = buffer.duration // while we have buffer why we don't use it ?

      for (let c = 0; c < buffer.numberOfChannels; c++) {
        const data = buffer.getChannelData(c)
        for (let s = 0; s < width; s++) {
          const start = ~~(s * segSize)
          const end = ~~(start + segSize)
          min = 0
          max = 0
          for (let i = start; i < end; i++) {
            min = data[i] < min ? data[i] : min
            max = data[i] > max ? data[i] : max
          }
          // merge multi channel data
          if (peaks[s]) {
            peaks[s][0] = peaks[s][0] < max ? max : peaks[s][0]
            peaks[s][1] = peaks[s][1] > min ? min : peaks[s][1]
          }
          peaks[s] = [max, min]
        }
      }
      // set peaks relativelly to canvas dimensions
      for (let i = 0; i < peaks.length; i++) {
        max = peaks[i][0]
        min = peaks[i][1]
        top = ((height / 2) - (max * height / 2))
        bottom = ((height / 2) - (min * height / 2))
        peaks[i] = [top, bottom === top ? top + 1 : bottom]
      }
      this.peaks = peaks

      if (this.playtimeClickable) {
        this.ctxWrapper.addEventListener('click', (e) => this.updateTime(e))
      }
      this.waveform()
    },

    /**
     * Draw wave form.
     */
    waveform: function () {
      const peaks = this.peaks
      const time = this.audio.currentTime
      const playX = this.playX(time)
      let x = 0
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight)
      x = this.draw(peaks.slice(0, playX), this.playedLineWidth, this.playedLineColor, x)
      this.draw(peaks.slice(playX), this.noplayedLineWidth, this.noplayedLineColor, x)
      this.drawSlider(time)
      if (this.playtime) this.drawTime(time)
    },

    /**
     * Waveform animation proxy
     */
    waveformAnim: function () {
      this.waveform()
      this.animId = requestAnimationFrame(this.waveformAnim)
    },

    /**
     * Draw segment.
     */
    draw: function (data, lineWidth, color, x) {
      this.ctx.lineWidth = lineWidth
      this.ctx.strokeStyle = color
      this.ctx.beginPath()
      data.forEach(v => {
        this.ctx.moveTo(x, v[0])
        this.ctx.lineTo(x, v[1])
        x++
      })
      this.ctx.stroke()
      return x
    },

    /**
     * Formatted string of current play time.
     * @param {Number} Current play time
     * @return {String}
     */
    timeFormat: function (timeSec) {
      let frmStr = ''
      const time = parseFloat(timeSec)
      if (isNaN(time)) {
        return frmStr
      }

      const min = ~~(time / 60)
      const sec = ~~(time % 60)
      const ms = ~~(time % 1 * 1000)

      frmStr = (min < 10) ? `0${min}:` : `${min}:`
      frmStr += `0${sec}`.substr(-2)
      if (this.playtimeWithMs) {
        frmStr += '.' + `00${ms}`.substr(-3)
      }

      return frmStr
    },

    /**
     * Draw play time next to slider.
     * @param {Number} Played time sec.millisec.
     * @return {Void}
     */
    drawTime: function (time) {
      const timeStr = this.timeFormat(time)
      const offset = 3
      const textWidth = ~~this.ctx.measureText(timeStr).width
      const playX = this.playX(time)
      const textX = playX > (this.canvWidth - textWidth - offset)
        ? playX - textWidth - offset
        : playX + offset
      const textY = this.playtimeTextBottom
        ? this.canvHeight - this.playtimeFontSize + offset
        : this.playtimeFontSize + offset
      this.ctx.fillStyle = this.playtimeFontColor
      this.ctx.font = `${this.playtimeFontSize}px ${this.playtimeFontFamily}`
      this.ctx.fillText(timeStr, textX, textY)
    },

    /**
     * Draw played slider.
     * @param {Number} Played time sec.millisec.
     * @return {Void}
     */
    drawSlider: function (time) {
      const playX = this.playX(time)
      this.ctx.lineWidth = this.playtimeSliderWidth
      this.ctx.strokeStyle = this.playtimeSliderColor
      this.ctx.beginPath()
      this.ctx.moveTo(playX, 0)
      this.ctx.lineTo(playX, this.canvHeight)
      this.ctx.stroke()
    },

    /**
     * Get x coodrinate for play time.
     * @param {Number}
     * @return {Number}
     */
    playX: function (time) {
      return ~~(time / this.duration * this.canvWidth)
    },

    /**
     * Audio playback update time callback.
     * @param event
     */
    updateTime: function (e) {
      this.audio.currentTime = e.offsetX / this.canvWidth * this.duration
      if (!this.animId) {
        // re-draw if animation is not running
        this.waveform()
      }
    },

    /**
     * Audio source download progress
     */
    downloadProgress: function (ev) {
      const progressX = Math.round(ev.loaded / ev.total * this.canvWidth)
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight)
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.noplayedLineColor
      this.ctx.moveTo(0, this.canvHeight / 2)
      this.ctx.lineTo(progressX, this.canvHeight / 2)
      this.ctx.stroke()
    }
  }
}
export default AvWaveform
