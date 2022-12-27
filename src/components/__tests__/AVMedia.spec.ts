import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AVMedia from '@/components/AVMedia.vue'

describe('AVMedia', () => {
  it('default properties', async () => {
    const wrapper = mount(AVMedia)
    await wrapper.vm.$nextTick()

    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('200')
    expect(canv.attributes('height')).toBe('40')
  })

  it('set properties', async () => {
    const wrapper = mount(AVMedia, {
      props: {
        canvWidth: 200,
        canvHeight: 200
      }
    })
    await wrapper.vm.$nextTick()
    const canv = wrapper.get('canvas')
    expect(canv.attributes('width')).toBe('200')
    expect(canv.attributes('height')).toBe('200')
  })
})
