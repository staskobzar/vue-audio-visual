import { resolveUnref, useEventListener, useRafFn } from '@vueuse/core'
import type { Ref } from 'vue'

export function useAudioContext(
  player: Ref<HTMLAudioElement | null>,
  fft: number,
  cbFun: (data: Uint8Array) => void
) {
  let ctx: AudioContext | null = null
  let analyser: AnalyserNode | null = null
  let src: MediaElementAudioSourceNode | null = null
  const fftSize = fft || 1024
  const data = new Uint8Array(fftSize / 2)

  const { pause, resume } = useRafFn(() => {
    if (!analyser) return
    analyser.getByteFrequencyData(data)
    cbFun(data)
  }, { immediate: false })

  useEventListener(player, 'play', () => {
    const audio = resolveUnref(player)
    if (!audio) return
    if (!ctx) {
      ctx = new AudioContext()
      src = ctx.createMediaElementSource(audio)
    }
    analyser = ctx.createAnalyser()
    analyser.fftSize = fftSize
    src?.connect(analyser)
    analyser.connect(ctx.destination)
    ctx.resume()
    resume()
  })

  useEventListener(player, 'pause', () => {
    ctx?.suspend()
    src?.disconnect()
    analyser?.disconnect()
    pause()
  })
}
