import { watchEffect, type Ref } from 'vue'
import { useCanvasContext } from '@/composables/useCanvasContext'
import { Waveform, type PropsWaveformType } from '@/composables/useProps'
import { createFetch, resolveUnref, useEventListener, useRafFn, type CreateFetchOptions } from '@vueuse/core'

export function useAVWaveform<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T,
  fetchOpts: CreateFetchOptions = {}
) {
  const p = new Waveform(props as PropsWaveformType)

  const ctx = useCanvasContext(canvas, p)

  fetchData(ctx, p, fetchOpts)

  const { pause, resume } = useRafFn(() => {
    p.currentTime = player?.value?.currentTime ?? 0
    draw(ctx, p)
  }, { immediate: false })

  useEventListener(player, 'play', resume)
  useEventListener(player, 'pause', pause)
  useEventListener(player, 'ended', () => {
    // this is a patch for weba file formats.
    // weba files when buffered with fetchData function return
    // wrong data duration which is longer then real duration.
    // So, when file is finished to play waveform still have empty
    // space in the end. This will try to fix it.
    const audio = resolveUnref(player)
    if (!audio || audio.duration === p.duration) return
    p.duration = audio.duration
    draw(ctx, p)
  })
  useEventListener(player, 'timeupdate', () => {
    const audio = resolveUnref(player)
    if (!audio) return
    p.currentTime = audio.currentTime
    draw(ctx, p)
  })
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
    to = to > p.peaks.length ? p.peaks.length : to
    ctx.beginPath()
    for (; x < to; x++) {
      ctx.moveTo(x, p.peaks[x][0])
      ctx.lineTo(x, p.peaks[x][1])
    }
    ctx.stroke()
    return x
  }

  x = waveform(x, p.playX, p.playedLineWidth, p.playedLineColor)
  waveform(x, p.peaks.length, p.noplayedLineWidth, p.noplayedLineColor)

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

function fetchData(canv: Ref<CanvasRenderingContext2D | null>, p: Waveform, fetchOpts: CreateFetchOptions) {
  if (!p.src) return
  const localFetch = createFetch(fetchOpts)
  localFetch(p.src).arrayBuffer().then(({ error, data }) => {
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
      p.setPeaks(buff)
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
