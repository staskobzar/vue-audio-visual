export default {
  name: 'av-bars',
  render: function (h) {
    this.header = h('h3', `av-bars: ${this.msg}`)
    return this.header
  },
  data () {
    return {
      header: null,
      msg: 'Hello World!'
    }
  },
  mounted () {
    console.log(this.header)
    const hdr = this.header.elm
    console.log(hdr.innerHTML)
    hdr.innerHTML = 'Changed header'
  }
}
