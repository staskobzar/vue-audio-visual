<script setup lang="ts">
import { ref } from 'vue'
import { makeWaveformProps } from '@/composables/useProps'
import { useAVWaveform } from '@/composables/useAVWaveform'

const props = defineProps(makeWaveformProps())
const player = ref(null)
const canvas = ref(null)

useAVWaveform(player, canvas, props, {
  options: { refetch: true },
  fetchOptions: { mode: 'cors' }
})
</script>

<template>
  <audio ref="player"
    :controls="props.audioControls"
    :src="props.src" />
  <canvas ref="canvas" />
</template>
