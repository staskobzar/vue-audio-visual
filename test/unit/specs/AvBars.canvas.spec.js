import { mount } from 'vue-test-utils'
import AvBars from '@/components/AvBars'
import AudioContext from './utils'

window.requestAnimationFrame = jest.fn()

describe('AvBars canvas build', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should create gradient when canvFillColor is an array', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvFillColor: ['black', '#CCC', 'rgb(255,255,255)']
    }
    AvBars.methods._fillGradient = jest.fn()
    const Comp = mount(AvBars, { propsData: props })
    expect(AvBars.methods._fillGradient.mock.calls.length).toBe(1)
  })
})
