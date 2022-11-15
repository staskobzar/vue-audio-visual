import { watchEffect, type Ref } from 'vue'
import { useCanvasContext } from '@/composables/useCanvasContext'
import { Waveform, type PropsWaveformType } from '@/composables/useProps'
import { resolveUnref, useEventListener, useFetch, useRafFn, type UseFetchOptions } from '@vueuse/core'

const peaks: [number, number][] = []

export function useAVWaveform<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T,
  fetchOpts: UseFetchOptions = {}
){
  const p = new Waveform(props as PropsWaveformType)

  const ctx = useCanvasContext(canvas, p)

  fetchData(ctx, p, fetchOpts)

  const { pause, resume } = useRafFn(() => {
    p.currentTime = player?.value?.currentTime ?? 0
    draw(ctx, p)
  }, { immediate: false })

  useEventListener(player, 'play', () => resume())
  useEventListener(player, 'pause', () => pause())
  useEventListener(canvas, 'click', (e: Event) => {
    if (!p.playtimeClickable) return
    const audio = resolveUnref(player)
    if (!audio) return
    audio.currentTime = (e as PointerEvent).offsetX / p.canvWidth * p.duration
    p.currentTime = audio.currentTime
    draw(ctx, p)
  })
}

export function draw(canvas: Ref<CanvasRenderingContext2D | null>, p: Waveform) {
  const ctx = resolveUnref(canvas)
  if (!ctx) return
  let x = 0

  ctx.clearRect(0, 0, p.canvWidth, p.canvHeight)

  const waveform = (x: number, to: number, lw: number, color: string): number => {
    ctx.lineWidth = lw
    ctx.strokeStyle = color
    ctx.beginPath()
    for (;x < to;x++) {
      ctx.moveTo(x, peaks[x][0])
      ctx.lineTo(x, peaks[x][1])
    }
    ctx.stroke()
    return x
  }

  x = waveform(x, p.playX, p.playedLineWidth, p.playedLineColor)
  waveform(x, peaks.length, p.noplayedLineWidth, p.noplayedLineColor)

  drawSlider(ctx, p)

  if (p.playtime) {
    drawTime(ctx, p)
  }
}

function drawSlider(ctx: CanvasRenderingContext2D, p: Waveform) {
  ctx.lineWidth = p.playtimeSliderWidth
  ctx.strokeStyle = p.playtimeSliderColor
  ctx.beginPath()
  ctx.moveTo(p.playX, 0)
  ctx.lineTo(p.playX, p.canvHeight)
  ctx.stroke()
}

function drawTime(ctx: CanvasRenderingContext2D, p: Waveform) {
  const time = p.timePlayed
  const offset = 3 // pixels
  const textWidth = ~~ctx.measureText(time).width
  const textX = p.playX > (p.canvWidth - textWidth - offset)
    ? p.playX - textWidth - offset
    : p.playX + offset
  const textY = p.playtimeTextBottom
    ? p.canvHeight - p.playtimeFontSize + offset
    : p.playtimeFontSize + offset
  ctx.fillStyle = p.playtimeFontColor
  ctx.font = `${p.playtimeFontSize}px ${p.playtimeFontFamily}`
  ctx.fillText(time, textX, textY)
}

function fetchData(canv: Ref<CanvasRenderingContext2D | null>, p: Waveform, fetchOpts: UseFetchOptions) {
  if (!p.src) return
  useFetch(p.src, fetchOpts).arrayBuffer().then(({ error, data }) => {
    const err = resolveUnref(error)
    if (err !== null) {
      console.error(`Failed get url '${p.src}': ${err}`)
      return
    }

    if (data.value === null) {
      console.error('invalid arrayBuffer data received')
      return
    }
    const ctx = new AudioContext()
    ctx.decodeAudioData(data.value).then(buff => {
      p.duration = buff.duration
      setPeaks(buff, p)
      draw(canv, p)
    }).catch(err => {
      console.error('Failed to decode audio array buffer:', err)
    })
  })
  watchEffect(() => {
    const ctx = resolveUnref(canv)
    if (!ctx) return
    ctx.lineWidth = p.noplayedLineWidth
    ctx.strokeStyle = p.noplayedLineColor
    ctx.beginPath()
    ctx.moveTo(0, p.canvHeight / 2)
    ctx.lineTo(p.canvWidth, p.canvHeight / 2)
    ctx.stroke()
    drawSlider(ctx, p)
    if (p.playtime) {
      drawTime(ctx, p)
    }
  })
}

function setPeaks(buffer: AudioBuffer, p: Waveform) {
  peaks.slice(0)
  let min = 0
  let max = 0
  let top = 0
  let bottom = 0
  const segSize = Math.ceil(buffer.length / p.canvWidth)
  const width = p.canvWidth
  const height = p.canvHeight

  for (let c = 0; c < buffer.numberOfChannels; c++) {
    const data = buffer.getChannelData(c)
    for (let s = 0; s < width; s++) {
      const start = ~~(s * segSize)
      const end = ~~(start + segSize)
      min = 0
      max = 0
      for (let i = start; i < end; i++) {
        min = data[i] < min ? data[i] : min
        max = data[i] > max ? data[i] : max
      }
      // merge multi channel data
      if (peaks[s]) {
        peaks[s][0] = peaks[s][0] < max ? max : peaks[s][0]
        peaks[s][1] = peaks[s][1] > min ? min : peaks[s][1]
      }
      peaks[s] = [max, min]
    }
  }
  // set peaks relativelly to canvas dimensions
  for (let i = 0; i < peaks.length; i++) {
    max = peaks[i][0]
    min = peaks[i][1]
    top = ((height / 2) - (max * height / 2))
    bottom = ((height / 2) - (min * height / 2))
    peaks[i] = [top, bottom === top ? top + 1 : bottom]
  }
}
