import Vue from 'vue'
import AudioVisual from 'vue-audio-visual'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(AudioVisual)

new Vue({
  render: h => h(App)
}).$mount('#app')
