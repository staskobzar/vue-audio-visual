import type { App } from 'vue'
import AVBars from '@/components/AVBars.vue'
import AVCircle from '@/components/AVCircle.vue'
import AVLine from '@/components/AVLine.vue'
import AVWaveform from '@/components/AVWaveform.vue'
import AVMedia from '@/components/AVMedia.vue'
import { useAVBars } from '@/composables/useAVBars'
import { useAVCircle } from '@/composables/useAVCircle'
import { useAVLine } from '@/composables/useAVLine'
import { useAVWaveform } from '@/composables/useAVWaveform'
import { useAVMedia } from '@/composables/useAVMedia'

const AVPlugin = {
  install(app: App) {
    app.component('av-bars', AVBars)
    app.component('av-circle', AVCircle)
    app.component('av-line', AVLine)
    app.component('av-waveform', AVWaveform)
    app.component('av-media', AVMedia)
  }
}

export {
  AVBars,
  AVCircle,
  AVLine,
  AVWaveform,
  AVMedia,
  useAVBars,
  useAVCircle,
  useAVLine,
  useAVWaveform,
  useAVMedia,
  AVPlugin
}
