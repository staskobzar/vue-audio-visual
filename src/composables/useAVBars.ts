import type { Ref } from 'vue'
import { resolveUnref, useEventListener } from '@vueuse/core'
import { useAudioContext } from '@/composables/useAudioContext'

import {
  useCanvasContext,
  fillCanvasBackground,
  fillGradient
} from '@/composables/useCanvasContext'

import { Bars, type PropsBarsType } from '@/composables/useProps'

// init with min value
const caps: number[] = Array(16).fill(0)

export function useAVBars<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
){
  const p = new Bars(props as PropsBarsType)

  caps.length = p.fftSize / 2
  caps.fill(0)

  const ctx = useCanvasContext(canvas, p)
  useEventListener(player, 'loadedmetadata', () => {
    if (!p.placeholder || !ctx) return
    draw(new Uint8Array(p.fftSize / 2), ctx, props as PropsBarsType)
  })

  useAudioContext(player, p.fftSize, (data: Uint8Array) => {
    draw(data, ctx, props as PropsBarsType)
  })
}

export function draw(
  data: Uint8Array,
  canvas: Ref<CanvasRenderingContext2D | null>,
  props: PropsBarsType
) {
  const ctx = resolveUnref( canvas )
  if ( !ctx ) return

  const p = new Bars(props)
  const step = Math.round((p.barWidth + p.barSpace) / p.frqBits * p.canvWidth)
  const dataLen = data.length

  let x = 0

  fillCanvasBackground(ctx, p.canvWidth, p.canvHeight, p.canvFillColor)

  for (let i = 0;i < dataLen;i++){
    if (i % step) continue
    const bits =  Math.round(data.slice(i, i + step)
      .reduce((v, t) => t + v, 0) / step)
    const barHeight = bits / 255 * p.canvHeight

    drawCaps(ctx, p, bits, i, x)

    ctx.fillStyle = fillGradient(ctx, p.canvWidth, p.canvHeight, p.barColor)
    if (p.brickHeight > 0) {
      drawBarBricks(ctx, p, barHeight, x)
    } else {
      ctx.fillRect(x, p.canvHeight - barHeight - p.alignSym(barHeight), p.barWidth, barHeight)
    }
    x += p.barWidth + p.barSpace
  }
}

function drawCaps(ctx: CanvasRenderingContext2D, p: Bars, bits: number, i: number, x: number){
  if (p.capsHeight === 0) {
    return
  }

  const cap = caps[i] <= bits
    ? bits
    : caps[i] - p.capsDropSpeed
  caps[i] = cap
  const y = (cap / 255.0 * p.canvHeight)
  const capY = p.canvHeight - y - p.capsHeight - p.alignSym(y)
  ctx.fillStyle = p.capsColor
  ctx.fillRect(x, capY, p.barWidth, p.capsHeight)

  if (p.symmetric) {
    ctx.fillRect(x, p.canvHeight - capY - p.capsHeight, p.barWidth, p.capsHeight)
  }
}

function drawBarBricks(ctx:CanvasRenderingContext2D, p: Bars, barHeight: number, x:number){
  for (let b = 0; b < barHeight; b += p.brickHeight + p.brickSpace) {
    ctx.fillRect(
      x, p.canvHeight - barHeight + b - p.alignSym(barHeight),
      p.barWidth, p.brickHeight
    )
  }
}
