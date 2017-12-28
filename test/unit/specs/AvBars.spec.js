import { createLocalVue, mount } from 'vue-test-utils'
import AvBars from '@/components/AvBars'
import Plugin from '@/'

const localVue = createLocalVue()
localVue.use(Plugin)

describe('AvBars', () => {
  it('should create audio element with source', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.find('audio').element.getAttribute('src'))
          .toEqual('/assets/foo.mp3')
  })

  it('should create audio with controls enabled', () => {
    const App = { template: `
      <av-bars audio-controls
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.find('audio').element.hasAttribute('controls'))
          .toBe(true)
  })

  it('should create audio element with css class attribute', () => {
    const App = { template: `
      <av-bars audio-class="my-class0"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.find('audio').element.getAttribute('class'))
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
    expect(Comp.find('canvas').element.getAttribute('width'))
          .toEqual('300')
    expect(Comp.find('canvas').element.getAttribute('height'))
          .toEqual('80')
  })

  it('should set width and height canvas properties', () => {
    const App = { template: `
      <av-bars audio-class="my-class0"
          canv-width="600" canv-height="100"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.find('canvas').element.getAttribute('width'))
          .toEqual('600')
    expect(Comp.find('canvas').element.getAttribute('height'))
          .toEqual('100')
  })

  it('should create canvas element with css class attribute', () => {
    const App = { template: `
      <av-bars canv-class="my-class"
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.find('canvas').element.getAttribute('class'))
          .toEqual('my-class')
  })

  it('should create canvas element below the audio element by default', () => {
    const App = { template: `<av-bars audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.findAll('div').at(1).contains('audio')).toBe(true)
    expect(Comp.findAll('div').at(2).contains('canvas')).toBe(true)
  })

  it('should create canvas element on top of the audio element', () => {
    const App = { template: `
      <av-bars canv-top
          audio-src="/assets/foo.mp3"></av-bars>` }
    const Comp = mount(App, { localVue })
    expect(Comp.findAll('div').at(1).contains('canvas')).toBe(true)
    expect(Comp.findAll('div').at(2).contains('audio')).toBe(true)
  })

  it('should fill background canvas with color', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvFillColor: '#CCCCCC'
    }
    const Comp = mount(AvBars, { propsData: props })
  })
})
