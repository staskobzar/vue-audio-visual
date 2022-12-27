<script setup lang="ts">
import { ref } from 'vue'
import { makeWavefromProps } from '@/composables/useProps'
import { useAVWaveform } from '@/composables/useAVWaveform'

const props = defineProps(makeWavefromProps())
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
