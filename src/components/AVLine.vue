<script setup lang="ts">
import { ref } from 'vue'
import { makeLineProps } from '@/composables/useProps'
import { useAVLine } from '@/composables/useAVLine'

const props = defineProps(makeLineProps())
const player = ref(null)
const canvas = ref(null)

useAVLine(player, canvas, props)
</script>

<template>
  <audio ref="player"
    :controls="props.audioControls"
    :src="props.src" />
  <canvas ref="canvas" />
</template>
