import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AVLine from '@/components/AVLine.vue'

describe('AVLine', () => {
  it('default properties', async () => {
    const wrapper = mount(AVLine)
    await wrapper.vm.$nextTick()

    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('300')
    expect(canv.attributes('height')).toBe('80')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBeUndefined()
    expect(audio.attributes('controls')).toBe('')
  })

  it('set properties', async () => {
    const wrapper = mount(AVLine, {
      props: {
        src: './music.mp3',
        canvWidth: 100,
        canvHeight: 55,
        audioControls: false
      }
    })
    await wrapper.vm.$nextTick()
    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('100')
    expect(canv.attributes('height')).toBe('55')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBe('./music.mp3')
    expect(audio.attributes('controls')).toBeUndefined()
  })
})
