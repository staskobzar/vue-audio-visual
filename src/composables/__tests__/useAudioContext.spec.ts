import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { useAudioContext } from '@/composables/useAudioContext'
import { AudioContext } from '@/__tests__/setup'

global.AudioContext = AudioContext

describe('useAudioContext', () => {
  it('does not start on init', () => {
    const player = ref(null)
    let fdata: Uint8Array
    useAudioContext(player, null, (data: Uint8Array) => {
      fdata = data
    })
    expect(fdata).toBeUndefined()
  })

  it('default fftSize is 1024 and frequency is 512', () => {
    const player = ref(new Audio('music.mp3'))
    let fdata: Uint8Array
    useAudioContext(player, null, (data: Uint8Array) => {
      fdata = data
    })
    player.value.dispatchEvent(new Event('play'))
    player.value.dispatchEvent(new Event('pause'))
    expect(fdata).not.toBeUndefined()
    expect(fdata).toHaveLength(512)
  })

  it('set fftSize', () => {
    const player = ref(new Audio('music.mp3'))

    let fdata: Uint8Array
    useAudioContext(player, 128, (data: Uint8Array) => {
      fdata = data
    })

    player.value.dispatchEvent(new Event('play'))
    player.value.dispatchEvent(new Event('pause'))
    expect(fdata).toHaveLength(64)
  })
})
