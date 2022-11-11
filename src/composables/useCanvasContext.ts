import { resolveUnref } from '@vueuse/core'
import { watchEffect, ref, type Ref } from 'vue'
import type { Props } from '@/composables/useProps'

export function useCanvasContext(
  canvas: Ref<HTMLCanvasElement | null>,
  props: Props
): Ref<CanvasRenderingContext2D | null> {
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  watchEffect(() => {
    const canv = resolveUnref(canvas)
    if (!canv) return

    ctx.value = canv.getContext('2d')
    canv.width = props.canvWidth
    canv.height = props.canvHeight
  })
  return ctx
}

type CanvColor = string[] | string | null | undefined

export function fillCanvasBackground(ctx: CanvasRenderingContext2D, w: number, h: number, colors: CanvColor): void {
  ctx.clearRect(0, 0, w, h)
  if (!colors) {
    return
  }
  ctx.fillStyle = fillGradient(ctx, w, h, colors)
  ctx.fillRect(0, 0, w, h)
}

export function fillGradient(ctx: CanvasRenderingContext2D, w: number, h: number, colors: CanvColor): CanvasGradient | string {
  if (!Array.isArray(colors)) {
    return colors || ''
  }
  const gradient = ctx.createLinearGradient(w / 2, 0, w / 2, h)
  let offset = 0
  colors.forEach((color: string) => {
    gradient.addColorStop(offset, color)
    offset += 1 / colors.length
  })
  return gradient
}
