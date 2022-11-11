import type { Ref } from 'vue'
import { resolveUnref, useEventListener } from '@vueuse/core'
import { useAudioContext } from '@/composables/useAudioContext'

import { useCanvasContext, fillCanvasBackground } from '@/composables/useCanvasContext'
import { Circle, type PropsCircleType } from '@/composables/useProps'

export function useAVCircle<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
){
  const p = new Circle(props as PropsCircleType)

  const ctx = useCanvasContext(canvas, p)
  useEventListener(player, 'loadedmetadata', () => {
    drawPlaceholder(ctx, p)
  })

  useAudioContext(player, p.fftSize, (data: Uint8Array) => {
    draw(data, ctx, player, new Circle(props as PropsCircleType))
  })
}

export function draw(
  data: Uint8Array,
  canvas: Ref<CanvasRenderingContext2D | null>,
  player: Ref<HTMLAudioElement | null>,
  p: Circle
) {
  const ctx = resolveUnref( canvas )
  if ( !ctx ) return
  const audio = resolveUnref( player )
  if ( !audio ) return

  const dataLen = data.length
  const step = ((p.lineWidth + p.lineSpace) / dataLen) * (2 * Math.PI)

  fillCanvasBackground(ctx, p.canvWidth, p.canvHeight, p.canvFillColor)

  drawOutline(ctx, p)

  drawProgress(ctx, audio, p)

  drawPlaytime(ctx, audio, p)

  ctx.lineWidth = p.barWidth
  ctx.strokeStyle = setBarColor(ctx, p)

  let angle = p.angle
  for (let i = 0; i < dataLen; i++) {
    angle += step
    if (i % p.arcStep) {
      continue
    }

    const bits = Math.round(data.slice(i, i + p.arcStep)
      .reduce((v, t) => t + v, 0) / p.arcStep)

    const blen = p.r + (bits / 255.0 * p.barLen)

    ctx.beginPath()
    ctx.moveTo(p.r * Math.cos(angle) + p.cx, p.r * Math.sin(angle) + p.cy)
    ctx.lineTo(blen * Math.cos(angle) + p.cx, blen * Math.sin(angle) + p.cy)
    ctx.stroke()
  }
}

function drawPlaceholder( canvas: Ref<CanvasRenderingContext2D | null>, p: Circle) {
  const ctx = resolveUnref( canvas )
  if ( !ctx ) return
  drawOutline(ctx, p)
  drawText(ctx, '0:00', p)
}

function drawOutline(ctx: CanvasRenderingContext2D, p: Circle) {
  if (p.outlineWidth === 0) {
    return
  }

  ctx.beginPath()
  ctx.strokeStyle = p.outlineColor
  ctx.lineWidth = p.outlineWidth
  ctx.arc(p.cx, p.cy, p.r, 0, 2 * Math.PI)
  ctx.stroke()
}

function drawProgress(ctx: CanvasRenderingContext2D, audio: HTMLAudioElement, p: Circle){
  if (!p.progress) {
    return
  }
  const { currentTime, duration } = audio
  const elapsed = currentTime / duration * 2 * Math.PI
  const angleEnd = Math.PI * 1.5 + elapsed

  if (!elapsed) return

  ctx.lineWidth = p.progressWidth
  ctx.strokeStyle = p.progressColor

  ctx.beginPath()
  ctx.arc(p.cx, p.cy, p.r - p.outlineWidth - p.outlineMeterSpace,
    1.5 * Math.PI, angleEnd, p.progressClockwise)
  ctx.stroke()
}

function drawPlaytime(ctx: CanvasRenderingContext2D, audio: HTMLAudioElement, p: Circle){
  const { currentTime } = audio

  const m = Math.floor(currentTime / 60)
  const sec = Math.floor(currentTime) % 60
  const s = sec < 10 ? `0${sec}` : `${sec}`
  const text = `${m}:${s}`
  drawText(ctx, text, p)
}

function drawText(ctx: CanvasRenderingContext2D, text: string, p: Circle) {
  ctx.font = p.playtimeFont
  ctx.fillStyle = p.playtimeColor
  ctx.textAlign = 'center'
  ctx.fillText(text, p.cx, p.cy + parseInt(p.playtimeFont) * 0.25)
}

function setBarColor(ctx: CanvasRenderingContext2D, p: Circle){
  if (!Array.isArray(p.barColor)) {
    return p.barColor
  }
  const gradient = ctx.createRadialGradient(p.cx, p.cy, p.canvWidth / 2, p.cx, p.cy, 0)
  let offset = 0

  p.barColor.forEach(color => {
    gradient.addColorStop(offset, color)
    offset += (1 / p.barColor.length)
  })
  return gradient
}
