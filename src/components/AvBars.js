export default {
  name: 'av-bars',
  props: {
    /**
     * prop: 'audio-src'
     * Audio element src attribute. When provided creates audio element
     */
    audioSrc: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      audio: null,
      analyser: null,
      canvas: null
    }
  },
  render: function (h) {
    return h('h3', `av-bars: AAA`)
  },
  mounted () {
    // const hdr = this.header.elm
    // hdr.innerHTML = '<div style="color: red"> Error </div>'
  }
}
