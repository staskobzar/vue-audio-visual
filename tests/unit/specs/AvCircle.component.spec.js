import Vue from 'vue'
import 'jest-canvas-mock'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import AvCircle from '@/components/AvCircle'
import Plugin from 'Plugin'

const localVue = createLocalVue()
localVue.use(Plugin)

describe('AvCircle component insert', () => {
  it('should create audio element with source', () => {
    const App = { template: `<av-circle audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').src)
      .toMatch('/assets/foo.mp3')
  })

  it('should create audio with controls enabled', () => {
    const App = { template: `
      <av-circle audio-controls
          audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').hasAttribute('controls'))
      .toBe(true)
  })

  it('should create audio element with css class attribute', () => {
    const App = { template: `
      <av-circle audio-class="my-class0"
          audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').getAttribute('class'))
      .toEqual('my-class0')
  })

  it('should create canvas element for visualization', () => {
    const App = { template: `<av-circle audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    Comp.vm.$children[0].setAnalyser()
    Comp.vm.$children[0].mainLoop()
    expect(Comp.contains('canvas')).toBe(true)
  })

  it('should create canvas with default width and hight', () => {
    const App = { template: `<av-circle audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    Comp.vm.$children[0].setAnalyser()
    Comp.vm.$children[0].mainLoop()
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('100')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('100')
  })

  it('should set width and height canvas properties', () => {
    const App = { template: `
      <av-circle audio-class="my-class0"
          :canv-width="600" :canv-height="100"
          audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    Comp.vm.$children[0].setAnalyser()
    Comp.vm.$children[0].mainLoop()
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('600')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('100')
  })

  it('should create canvas element with css class attribute', () => {
    const App = { template: `
      <av-circle canv-class="my-class"
          audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    Comp.vm.$children[0].setAnalyser()
    Comp.vm.$children[0].mainLoop()
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('class'))
      .toEqual('my-class')
  })

  it('should create canvas element below the audio element by default', () => {
    const App = { template: `<av-circle audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLAudioElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLCanvasElement).toBeTruthy()
  })

  it('should create canvas element on top of the audio element', () => {
    const App = { template: `
      <av-circle canv-top
          audio-src="/assets/foo.mp3"></av-circle>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLCanvasElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLAudioElement).toBeTruthy()
  })

  it('should create canvas and fill gradient color', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvFillColor: ['black', '#CCC', 'rgb(255,255,255)']
    }
    AvCircle.methods.fillGradient = jest.fn()
    // mount(AvCircle, { propsData: props })
    const cmp = shallowMount(AvCircle, { propsData: props })
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvCircle.methods.fillGradient.mock.calls.length).toBe(1)
  })

  it('should draw playtime text', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      playtime: true
    }
    AvCircle.methods._drawPlaytime = jest.fn()
    const cmp = shallowMount(AvCircle, { propsData: props })
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvCircle.methods._drawPlaytime.mock.calls.length).toBe(1)
  })

  it('should rotate graph when enabled', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      rotateGraph: true,
      rotateSpeed: 1
    }
    const Comp = shallowMount(AvCircle, { propsData: props })
    Comp.vm.setAnalyser()
    Comp.vm.mainLoop()
    expect(Comp.vm.rotate).toBe(2.5)
  })

  it('should use solid bar color', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      barColor: '#00FFAA'
    }
    const Comp = shallowMount(AvCircle, { propsData: props })
    expect(Comp.vm.barColor).toEqual('#00FFAA')
  })

  it('#_drawProgress', () => {
    const Circle = Vue.extend(AvCircle)
    const vm = new Circle()
    vm.audio = { currentTime: 2, duration: 6 }
    vm.ctx = {
      lineWidth: null,
      strokeStyle: null,
      fillStyle: null,
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn()
    }
    vm._drawProgress(2, 3, 3)
    expect(vm.ctx.arc).toHaveBeenCalled()
  })
})
