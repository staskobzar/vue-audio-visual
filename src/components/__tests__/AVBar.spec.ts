import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
global.MediaStream = {}
import AVBars from '@/components/AVBars.vue'

describe('AVBars', () => {
  it('default properties', async () => {
    const wrapper = mount(AVBars)
    await wrapper.vm.$nextTick()

    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('300')
    expect(canv.attributes('height')).toBe('80')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBeUndefined()
    expect(audio.attributes('controls')).toBe('')
  })

  it('set properties', async () => {
    const wrapper = mount(AVBars, {
      props: {
        src: './sound.mp3',
        canvWidth: 200,
        canvHeight: 75,
        audioControls: false
      }
    })
    await wrapper.vm.$nextTick()
    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('200')
    expect(canv.attributes('height')).toBe('75')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBe('./sound.mp3')
    expect(audio.attributes('controls')).toBeUndefined()
  })
})
