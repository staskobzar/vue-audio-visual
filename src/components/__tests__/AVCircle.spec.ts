import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AVCircle from '@/components/AVCircle.vue'

describe('AVCircle', () => {
  it('default properties', async () => {
    const wrapper = mount(AVCircle)
    await wrapper.vm.$nextTick()

    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('100')
    expect(canv.attributes('height')).toBe('100')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBeUndefined()
    expect(audio.attributes('controls')).toBe('')
  })

  it('set properties', async () => {
    const wrapper = mount(AVCircle, {
      props: {
        src: './sound.mp3',
        canvWidth: 200,
        canvHeight: 200,
        audioControls: false
      }
    })
    await wrapper.vm.$nextTick()
    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('200')
    expect(canv.attributes('height')).toBe('200')

    const audio = wrapper.get('audio')
    expect(audio.attributes('src')).toBe('./sound.mp3')
    expect(audio.attributes('controls')).toBeUndefined()
  })
})
