import 'jest-canvas-mock'
import { mount } from '@vue/test-utils'
import AvBars from '@/components/AvBars'

describe('AvBars canvas build', () => {
  it('should not draw caps by default', () => {
    AvBars.methods._drawCap = jest.fn()
    const cmp = mount(AvBars)
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvBars.methods._drawCap.mock.calls.length).toBe(0)
  })

  it('should draw caps when caps-height property is set', () => {
    AvBars.methods._drawCap = jest.fn()
    const cmp = mount(AvBars, { propsData: { capsHeight: 4 } })
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvBars.methods._drawCap.mock.calls.length)
      .toBe(1)
  })

  it('canvas draw rectangle bricks for each bar', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvWidth: 10,
      canvHeight: 10,
      barWidth: 10,
      brickHeight: 1
    }
    const Comp = mount(AvBars, { propsData: props })
    Comp.vm.setAnalyser()
    Comp.vm.mainLoop()
    expect(Comp.vm.ctx.fillRect.mock.calls.length).toBe(2)
  })

  it('should fill gradient canvas background', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvFillColor: ['black', '#CCC', 'rgb(255,255,255)']
    }
    const Comp = mount(AvBars, { propsData: props })
    Comp.vm.setAnalyser()
    Comp.vm.mainLoop()
    expect(Comp.vm.ctx.createLinearGradient).toBeCalledWith(150, 0, 150, 80)
  })

  it('should not draw brick bar by default', () => {
    AvBars.methods._drawBrickBar = jest.fn()
    const cmp = mount(AvBars)
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvBars.methods._drawBrickBar.mock.calls.length).toBe(0)
  })

  it('should draw brick bar by when brick-height is set', () => {
    AvBars.methods._drawBrickBar = jest.fn()
    // const frqBitCount = AudioContext().createAnalyser().frequencyBinCount
    const cmp = mount(AvBars, { propsData: { brickHeight: 4 } })
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvBars.methods._drawBrickBar.mock.calls.length).toBe(1)
  })

  it('should create gradient when canvFillColor is an array', () => {
    const props = {
      audioSrc: '/assets/foo.mp3',
      canvFillColor: ['black', '#CCC', 'rgb(255,255,255)']
    }
    AvBars.methods.fillGradient = jest.fn()
    const cmp = mount(AvBars, { propsData: props })
    cmp.vm.setAnalyser()
    cmp.vm.mainLoop()
    expect(AvBars.methods.fillGradient.mock.calls.length).toBe(1)
  })
})
