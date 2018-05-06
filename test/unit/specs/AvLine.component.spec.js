import { createLocalVue, mount } from 'vue-test-utils'
import Plugin from '@/'

const localVue = createLocalVue()
localVue.use(Plugin)

describe('AvLine component insert', () => {
  it('should use a preexisting audio element', () => {
    let audio = new Audio()
    audio.src = '/assets/foo.mp3'
    const App = {
      template: `<av-line v-bind:audio-element="audio"></av-line>`,
      data: () => ({
        audio: audio
      })
    }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(false)
  })

  it('should create audio element with source', () => {
    const App = { template: `<av-line audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').src)
      .toEqual('/assets/foo.mp3')
  })

  it('should create audio with controls enabled', () => {
    const App = { template: `
      <av-line audio-controls
          audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').hasAttribute('controls'))
      .toBe(true)
  })

  it('should create audio element with css class attribute', () => {
    const App = { template: `
      <av-line audio-class="my-class0"
          audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('audio')).toBe(true)
    expect(Comp.vm.$el.querySelector('audio').getAttribute('class'))
      .toEqual('my-class0')
  })

  it('should create canvas element for visualization', () => {
    const App = { template: `<av-line audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
  })

  it('should create canvas with default width and hight', () => {
    const App = { template: `<av-line audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('300')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('80')
  })

  it('should set width and height canvas properties', () => {
    const App = { template: `
      <av-line audio-class="my-class0"
          canv-width="600" canv-height="100"
          audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('width'))
      .toEqual('600')
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('height'))
      .toEqual('100')
  })

  it('should create canvas element with css class attribute', () => {
    const App = { template: `
      <av-line canv-class="my-class"
          audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    expect(Comp.contains('canvas')).toBe(true)
    expect(Comp.vm.$el.querySelector('canvas').getAttribute('class'))
      .toEqual('my-class')
  })

  it('should create canvas element below the audio element by default', () => {
    const App = { template: `<av-line audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLAudioElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLCanvasElement).toBeTruthy()
  })

  it('should create canvas element on top of the audio element', () => {
    const App = { template: `
      <av-line canv-top
          audio-src="/assets/foo.mp3"></av-line>` }
    const Comp = mount(App, { localVue })
    const divs = Comp.vm.$el.querySelectorAll('div')
    expect(divs[0].firstChild instanceof HTMLCanvasElement).toBeTruthy()
    expect(divs[1].firstChild instanceof HTMLAudioElement).toBeTruthy()
  })
})
