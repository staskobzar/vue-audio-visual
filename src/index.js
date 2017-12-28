import AvBars from './components/AvBars'
const AVPlugin = {}

AVPlugin.install = function (Vue) {
  // browsers compatibility
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
  Vue.component(AvBars.name, AvBars)
}

export default AVPlugin
