import AvBars from './components/AvBars'
const AVPlugin = {}

AVPlugin.install = function (Vue) {
  Vue.component(AvBars.name, AvBars)
}

export default AVPlugin
