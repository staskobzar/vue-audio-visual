import { watch, type Ref } from 'vue'
import { resolveUnref } from '@vueuse/core'
import { useAudioContext } from '@/composables/useAudioContext'

import {
  useCanvasContext,
  fillCanvasBackground,
  fillGradient
} from '@/composables/useCanvasContext'

import { Line, type PropsLineType } from '@/composables/useProps'

export function useAVLine<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
) {
  const p = new Line(props as PropsLineType)
  const ctx = useCanvasContext(canvas, p)

  watch(ctx, () => {
    if (!p.placeholder) return
    const canv = resolveUnref( ctx )
    if (!canv) return
    draw(new Uint8Array(p.fftSize), ctx, p)
  })

  useAudioContext(player, p.fftSize, (data: Uint8Array) => {
    draw(data, ctx, new Line(props as PropsLineType))
  })
}

export function draw(
  data: Uint8Array,
  canvas: Ref<CanvasRenderingContext2D | null>,
  props: Line
) {
  const ctx = resolveUnref( canvas )
  if ( !ctx ) return

  const w = props.canvWidth
  const h = props.canvHeight
  const lw = props.lineWidth

  const dataLen = data.length
  const step = ~~w / 2.0 / dataLen
  let x = 0

  const drawLine = (): number => {
    let y = 0
    for ( let i = 0; i < dataLen; i++ ) {
      // (h / 2) - v / 255 * (h / 2)
      const v = data[i]
      y = ( h * ( 255 - v )) / 510
      if ( i % 2 ) y = h - y
      ctx.lineTo( x, y )
      x += step
    }
    return x
  }

  fillCanvasBackground(ctx, w, h, props.canvFillColor)

  ctx.lineWidth = lw
  ctx.strokeStyle = fillGradient(ctx, w, h, props.lineColor)
  ctx.beginPath()

  data.reverse()
  ctx.moveTo( x, h / 2 )
  x = drawLine()

  data.reverse()
  drawLine()
  ctx.lineTo( w, h / 2 )
  ctx.stroke()
}
