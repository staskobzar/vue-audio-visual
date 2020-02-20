import Vue from 'vue'

Vue.config.productionTip = false
window.HTMLMediaElement.prototype.load = jest.fn()
window.MediaStream = jest.fn()
