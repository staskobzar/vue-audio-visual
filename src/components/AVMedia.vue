<script setup lang="ts">
import { ref } from 'vue'
import { useAVMedia } from '@/composables/useAVMedia'
import { makeMediaProps } from '@/composables/useProps'

const canvas = ref(null)

const props = defineProps(makeMediaProps())

useAVMedia(canvas, props)
</script>

<template>
  <canvas ref="canvas"/>
</template>
