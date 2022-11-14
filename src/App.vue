<script setup lang="ts">
import { ref, watch } from 'vue'
import AVLine from '@/components/AVLine.vue'
import AVBars from '@/components/AVBars.vue'
import AVCircle from '@/components/AVCircle.vue'
import AVWaveform from '@/components/AVWaveform.vue'
import AVMedia from '@/components/AVMedia.vue'
import { useUserMedia } from '@vueuse/core'

const audioSrc = ref('./file_example_MP3_1MG.mp3')
const showMedia = ref(false)
const { stream, enabled } = useUserMedia()

watch(enabled, () => {
  if (showMedia.value) return
  if (enabled) showMedia.value = true
})
</script>

<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col text-center">
        <img alt="Plugin logo" class="logo" src="./assets/logo.png" />
        <h2> <a href="">Vue-Audio-Visual</a> Vue plugin demo </h2>
        <figcaption class="blockquote-footer mt-2">
          Audio source: https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3
        </figcaption>
        <div class="text-muted small">
          See source this page
          <a href="https://github.com/staskobzar/vue-audio-visual/blob/master/src/App.vue">source code</a>
          for details
        </div>
      </div>
    </div>

    <div class="row row-cols-3 mb-5 justify-content-start">
      <div class="col">
        <h3><code>&lt;AVLine&gt;</code></h3>
        <AVLine :src="audioSrc" :cors-anonym="false"/>
      </div>
      <div class="col">
        <h3><code>&lt;AVBars&gt;</code></h3>
        <AVBars :src="audioSrc"
          caps-color="#FFF"
          :bar-color="['#f00', '#ff0', '#0f0']"
          canv-fill-color="#000"
          :brick-height="6"
          :bar-width="10"
          :caps-height="2" />
      </div>
      <div class="col">
        <h3><code>&lt;AVCircle&gt;</code></h3>
        <div class="d-flex align-items-center">
          <AVCircle :src="audioSrc"
            :outline-width="0.5"
            :progress-width="5"
            :outline-meter-space="4"
            :playtime="true"
            playtime-font="16px Monaco" />
        </div>
      </div>
    </div>
    <div class="row row-cols-2">
      <div class="col">
        <h3><code>&lt;AVWaveform&gt;</code></h3>
        <AVWaveform :src="audioSrc" noplayed-line-color="#CFCFCF" played-line-color="lime"/>
      </div>
      <div class="col">
        <h3><code>&lt;AVMedia&gt;</code></h3>
        <button class="btn btn-primary btn-default" @click="enabled=!enabled" type="submit">
          <i :class="enabled ? 'bi-pause-circle' : 'bi-play-circle'"></i>
          {{enabled ? 'Pause' : 'Enable'}}
        </button>
        <div v-show="!showMedia" class="card mt-3">
          <div class="card-header text-primary">
            <i class="bi-mic-fill"></i>Microphone media visualization
          </div>
          <div class="card-body">
            To start click "Enable" and allow audio if asked.
          </div>
        </div>
        <div v-show="showMedia" class="row row-cols-2">
          <div class="col">
            <p class="font-monospace text-muted mb-0">type="frequ"</p>
            <AVMedia :media="stream" type="frequ" line-color="darkorange"/>

            <p class="font-monospace text-muted text-nowrap mt-3 mb-0">
              type="frequ" frequ-direction="mo"</p>
            <AVMedia :media="stream" type="frequ" frequ-direction="mo"
              :frequ-lnum="60" line-color="darkorange"/>

            <p class="font-monospace text-muted mt-2 mb-0">type="wform"</p>
            <AVMedia :media="stream" type="wform" line-color="blue"/>

          </div>
          <div class="col">
            <p class="font-monospace text-muted mb-0">type="vbar"</p>
            <AVMedia :media="stream" type="vbar"/>

            <p class="font-monospace text-muted mb-0 mt-3">
              type="frequ" :frequ-lnum="3"</p>
            <AVMedia :media="stream" :canv-width="30" :canv-height="30"
              type="frequ"
              :frequ-line-cap="true" :frequ-lnum="3"
              :line-width="6"/>

            <p class="font-monospace text-muted mb-0 mt-2">type="circle"</p>
            <AVMedia :media="stream" type="circle" />
            <AVMedia :media="stream" type="vbar"></AVMedia>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
