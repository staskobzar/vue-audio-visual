import { resolveUnref, useRafFn } from '@vueuse/core'
import { watchEffect, type Ref } from 'vue'
import { useCanvasContext } from './useCanvasContext'
import { type PropsMediaType, Media } from './useProps'

export function useAVMedia<T extends object>(
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
) {
  const p = props as PropsMediaType
  let analyser: AnalyserNode

  const ctx = useCanvasContext(canvas, new Media(p))

  const { pause, resume } = useRafFn(() => {
    if (!analyser) return
    draw(analyser, ctx, new Media(p))
  }, { immediate: false })

  watchEffect(() => {
    const stream = resolveUnref(p.media)
    if (stream) {
      analyser = setAnalyser(stream as unknown as MediaStream, new Media(p))
      resume()
    } else {
      pause()
    }
  })
}

function setAnalyser(stream: MediaStream, p: Media): AnalyserNode {
  const ctx = new AudioContext()
  const analyser = ctx.createAnalyser()
  const src = ctx.createMediaStreamSource(stream)

  src.connect(analyser)
  analyser.fftSize = p.fftSize

  if (p.connectDestination) {
    analyser.connect(ctx.destination)
  }

  return analyser
}

export function draw(analyser: AnalyserNode, canv: Ref<CanvasRenderingContext2D | null>, p: Media) {
  const ctx = resolveUnref(canv)
  if (!ctx) return
  const data = new Uint8Array(analyser.fftSize)
  if (p.canvFillColor) ctx.fillStyle = p.canvFillColor
  ctx.clearRect(0, 0, p.canvWidth, p.canvHeight)
  ctx.beginPath()
  ctx.strokeStyle = p.lineColor

  switch (p.type) {
  case 'frequ':
    analyser.getByteFrequencyData(data)
    drawFrequ(data, ctx, p)
    break
  case 'circle':
    analyser.getByteFrequencyData(data)
    drawCircle(data, ctx, p)
    break
  case 'vbar':
    analyser.getByteFrequencyData(data)
    drawVBar(data, ctx, p)
    break
  default: // wform
    analyser.getByteTimeDomainData(data)
    drawWForm(data, ctx, p)
    break
  }
}

function drawFrequ(data: Uint8Array, ctx: CanvasRenderingContext2D, p: Media) {
  const middleOut = p.frequDirection === 'mo'
  const start = middleOut ? p.canvWidth / 2 : 0
  const c = middleOut ? p.frequLnum / 2 : p.frequLnum
  const step = middleOut ? p.canvWidth / c / 2 : p.canvWidth / c
  const h = p.canvHeight
  const lw = p.lineWidth || 2
  for (let i = 0; i < c; i++) {
    const x = middleOut ? i * step : i * step + lw
    const v = data.slice(x, x + step).reduce((sum, v) => sum + (v / 255.0 * h), 0) / step
    const space = (h - v) / 2 + 2 // + 2 is space for caps
    ctx.lineWidth = lw
    ctx.lineCap = p.frequLineCap ? 'round' : 'butt'
    ctx.moveTo(start + x, space)
    ctx.lineTo(start + x, h - space)
    ctx.stroke()

    if (middleOut && i > 0) {
      ctx.moveTo(start - x, space)
      ctx.lineTo(start - x, h - space)
      ctx.stroke()
    }
  }
}

function drawVBar(data: Uint8Array, ctx: CanvasRenderingContext2D, p: Media) {
  const barWidth = p.vbarWidth
  const barSpace = p.vbarSpace
  const capSpace = barWidth < 5 ? 5 : barWidth / 2
  let max = 0
  for (let i = 0; i < data.length; i++) {
    max = max < data[i] ? data[i] : max
  }
  const vbarLen = max / 255 * p.canvWidth
  ctx.lineWidth = p.vbarWidth
  ctx.lineCap = p.vbarCaps ? 'round' : 'butt'
  ctx.fillStyle = p.vbarBgColor
  ctx.fillRect(0, 0, p.canvWidth, p.canvHeight)
  for (let x = barWidth / 2; x + barWidth + barSpace <= p.canvWidth; x = x + barWidth + barSpace) {
    ctx.strokeStyle = x > vbarLen ? p.vbarRightColor : p.vbarFillColor
    ctx.beginPath()
    ctx.moveTo(x, capSpace)
    ctx.lineTo(x, p.canvHeight - capSpace)
    ctx.stroke()
  }
}

function drawCircle(data: Uint8Array, ctx: CanvasRenderingContext2D, p: Media) {
  const cx = p.canvWidth / 2 // center X
  const cy = p.canvHeight / 2 // center Y
  const outr = cx < cy ? cx : cy

  const max = Math.max(...data)
  const r = max / 255 * outr

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)

  for (const [offset, color] of p.circleGradient) {
    gradient.addColorStop(offset, color)
  }

  ctx.fillStyle = gradient
  ctx.arc(cx, cy, r, 0, 2 * Math.PI)
  ctx.fill('evenodd')
}

function drawWForm(data: Uint8Array, ctx: CanvasRenderingContext2D, p: Media) {
  const h = p.canvHeight
  const step = p.canvWidth / p.fftSize
  let x = 0
  ctx.lineWidth = p.lineWidth || 0.5
  for (let i = 0; i < data.length; i++){
    const v = data[i]
    const y = (v / 255.0) * h
    ctx.lineTo(x, y)
    x += step
  }
  ctx.stroke()
}
