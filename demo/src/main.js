import Vue from 'vue'
import AudioVisual from 'vue-audio-visual'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(AudioVisual)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
