import AvBars from './components/AvBars'
import AvLine from './components/AvLine'
import AvCircle from './components/AvCircle'
import AvWaveform from './components/AvWaveform'
import AvMedia from './components/AvMedia'

const AVPlugin = {}

AVPlugin.install = function (Vue) {
  // browsers compatibility
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
  // Components
  Vue.component(AvBars.name, AvBars)
  Vue.component(AvLine.name, AvLine)
  Vue.component(AvCircle.name, AvCircle)
  Vue.component(AvWaveform.name, AvWaveform)
  Vue.component(AvMedia.name, AvMedia)
}

export default AVPlugin
