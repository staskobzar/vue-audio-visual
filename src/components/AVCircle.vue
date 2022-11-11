<script setup lang="ts">
import { ref } from 'vue'
import { makeCircleProps } from '@/composables/useProps'
import { useAVCircle } from '@/composables/useAVCircle'

const props = defineProps(makeCircleProps())
const player = ref(null)
const canvas = ref(null)

useAVCircle(player, canvas, props)
</script>

<template>
  <audio ref="player"
    :controls="props.audioControls"
    :src="props.src" />
  <canvas ref="canvas" />
</template>
