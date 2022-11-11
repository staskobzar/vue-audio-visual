<script setup lang="ts">
import { ref } from 'vue'
import { makeBarsProps } from '@/composables/useProps'
import { useAVBars } from '@/composables/useAVBars'

const props = defineProps(makeBarsProps())
const player = ref(null)
const canvas = ref(null)

useAVBars(player, canvas, props)
</script>

<template>
  <audio ref="player"
    :controls="props.audioControls"
    :src="props.src" />
  <canvas ref="canvas" />
</template>
