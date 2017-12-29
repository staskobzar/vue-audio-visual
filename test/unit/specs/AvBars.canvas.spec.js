import { mount } from 'vue-test-utils'
import AvBars from '@/components/AvBars'
import AudioContext from './utils'

window.requestAnimationFrame = jest.fn()

describe('AvBars canvas build', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should not draw caps by default', () => {
    AvBars.methods._drawCap = jest.fn()
    const Comp = mount(AvBars)
    expect(AvBars.methods._drawCap.mock.calls.length).toBe(0)
  })

  it('should draw caps when caps-height property is set', () => {
    AvBars.methods._drawCap = jest.fn()
    const frqBitCount = AudioContext().createAnalyser().frequencyBinCount
    const Comp = mount(AvBars, { propsData: {capsHeight: 4} })
    expect(AvBars.methods._drawCap.mock.calls.length)
          .toBe(frqBitCount)
  })

  it('should not draw brick bar by default', () => {
    AvBars.methods._drawBrickBar = jest.fn()
    const Comp = mount(AvBars)
    expect(AvBars.methods._drawBrickBar.mock.calls.length).toBe(0)
  })

  it('should draw brick bar by when brick-height is set', () => {
    AvBars.methods._drawBrickBar = jest.fn()
    const frqBitCount = AudioContext().createAnalyser().frequencyBinCount
    const Comp = mount(AvBars, { propsData: {brickHeight: 4} })
    expect(AvBars.methods._drawBrickBar.mock.calls.length).toBe(frqBitCount)
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
