<template>
  <b-container fluid>
    <b-row>
      <b-col offset-md="1" md="2">
        <img alt="logo" src="logo.png">
      </b-col>
      <b-col>
        <h1>
          <a href="https://github.com/staskobzar/vue-audio-visual" target="blank">
            vue-audio-visual</a>
          demo</h1>
        <blockquote>
          Audio source:
          https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3
        </blockquote>
        <b-alert show variant="warning">
        Note: there might be problem with Safari browser.
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-md="1">
        <AvLineDemo />
        <AvBarsDemo />
      </b-col>
      <b-col>
        <AvCircleDemo />
        <AvWaveformDemo />
      </b-col>
      <b-col>
        <h4><code>av-media</code> component</h4>
        <a target="blank" href="https://github.com/staskobzar/vue-audio-visual/blob/master/demo/src/components/AvMedia.vue">
        Example source code</a>
        <b-alert show variant="info">Allow audio when asked and use headphones</b-alert>
        <b-alert :show="mediaNotSupported" variant="danger">
          You browser does not support AvMedia component. <br/>
          No suitable media device found (navigator.mediaDevices is not defined)
        </b-alert>
        <b-button v-if="!mediaNotSupported && !showMedia" variant="outline-primary" @click="showMedia=true">
          Start av-media
        </b-button>
        <AvMediaDemo v-if="showMedia" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AvLineDemo from './components/AvLines.vue'
import AvBarsDemo from './components/AvBars.vue'
import AvCircleDemo from './components/AvCircle.vue'
import AvWaveformDemo from './components/AvWaveform.vue'
import AvMediaDemo from './components/AvMedia.vue'

export default {
  name: 'App',
  data () {
    return {
      mediaNotSupported: false,
      showMedia: false
    }
  },
  components: {
    AvLineDemo,
    AvBarsDemo,
    AvCircleDemo,
    AvWaveformDemo,
    AvMediaDemo
  },
  mounted () {
    if (!navigator.mediaDevices) {
      this.mediaNotSupported = true
    }
  }
}
</script>

<style>
</style>
