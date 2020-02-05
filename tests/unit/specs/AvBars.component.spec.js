import Vue from 'vue'
import 'jest-canvas-mock'
import AvBars from '@/components/AvBars'
import { createLocalVue, mount } from '@vue/test-utils'
import Plugin from 'Plugin'

const localVue = createLocalVue()
localVue.use(Plugin)

describe('AvBars component insert', () => {
  it('should create audio element with source', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').src)
      .toMatch('/assets/foo.mp3')
  })

  it('should create audio with controls enabled', () => {
    const App = { template: `
      <av-bars audio-controls
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').hasAttribute('controls'))
      .toBe(true)
  })

  it('should create audio element with css class attribute', () => {
    const App = { template: `
      <av-bars audio-class="my-class0"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').getAttribute('class'))
      .toEqual('my-class0')
  })

  it('should create canvas element for visualization', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
  })

  it('should create canvas with default width and hight', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('300')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('80')
  })

  it('should set width and height canvas properties', () => {
    const App = { template: `
      <av-bars audio-class="my-class0"
          :canv-width="600" :canv-height="100"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('600')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('100')
  })

  it('should create canvas element with css class attribute', () => {
    const App = { template: `
      <av-bars canv-class="my-class"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('class'))
      .toEqual('my-class')
  })

  it('should create canvas element below the audio element by default', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLAudioElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLCanvasElement).toBeTruthy()
  })

  it('should create canvas element on top of the audio element', () => {
    const App = { template: `
      <av-bars canv-top
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLCanvasElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLAudioElement).toBeTruthy()
  })

  describe('#_drawCap', () => {
    it('draw caps on bars', () => {
      const Bars = Vue.extend(AvBars)
      const vm = new Bars()
      vm.caps = [1, 255, 3]
      vm.capsDropSpeed = 0
      vm.canvHeight = 100
      vm.ctx = {
        fillStyle: null,
        fillRect: jest.fn()
      }
      vm._drawCap(1, 2, 1, 1)
      expect(vm.ctx.fillRect).toHaveBeenCalledWith(1, 0, 2, 0)
      expect(vm.ctx.fillRect).toHaveBeenCalledTimes(1)
    })
    it('symetric draw caps on bars', () => {
      const Bars = Vue.extend(AvBars)
      const vm = new Bars()
      vm.caps = [1, 255, 3]
      vm.symmetric = true
      vm.ctx = {
        fillStyle: null,
        fillRect: jest.fn()
      }
      vm._drawCap(1, 2, 1, 1)
      expect(vm.ctx.fillRect).toHaveBeenCalledTimes(2)
    })
  })
})
