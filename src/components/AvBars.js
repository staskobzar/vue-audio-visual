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
      canvas: null
    }
  },
  render: function (h) {
    const audioAttrs = {
      src: this.audioSrc,
      controls: this.audioControls,
      class: this.audioClass
    }
    const canvAttrs = {
      class: this.canvClass,
      width: this.canvWidth,
      height: this.canvHeight
    }
    this.audio = h('audio', { attrs: audioAttrs })
    this.canvas = h('canvas', { attrs: canvAttrs })
    const items = [ this.audio, this.canvas ]
    if (this.canvTop) {
      items.reverse()
    }
    return h('div', items.map(v => h('div', [v])))
  },
  mounted () {
    // const hdr = this.header.elm
    // hdr.innerHTML = '<div style="color: red"> Error </div>'
  }
}

export default AvBars
