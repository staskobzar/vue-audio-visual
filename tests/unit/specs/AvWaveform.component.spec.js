import axios from 'axios'
import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import 'jest-canvas-mock'
import AvWaveform from '@/components/AvWaveform'

import Plugin from 'Plugin'

const localVue = createLocalVue()
localVue.use(Plugin)

let mockCanv
let vm

jest.mock('axios')

describe('AvWaveform component', () => {
  beforeEach(() => {
    mockCanv = {
      fillStyle: null,
      font: null,
      lineWidth: null,
      strokeStyle: null,
      fillText: jest.fn(),
      beginPath: jest.fn(),
      clearRect: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      measureText: (text) => {
        return { width: 50 }
      }
    }
    const Waveform = Vue.extend(AvWaveform)
    vm = new Waveform()
    vm.ctx = mockCanv
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Component', () => {
    it('should create audio element with source', (done) => {
      axios.get.mockResolvedValue('foo bar')

      const decode = jest.fn()
      AvWaveform.methods.decode = decode
      mount(AvWaveform, { localVue })

      localVue.nextTick(() => {
        expect(decode).toHaveBeenCalledWith('foo bar')
        done()
      })
    })
  })

  describe('#setPeaks', () => {
    it('set array', () => {
      const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.01]
      const buffer = {
        length: data.length,
        numberOfChannels: 1,
        getChannelData: () => data
      }
      vm.canvWidth = 5
      vm.canvHeight = 4
      vm.audio = { duration: 100 }
      vm.peaks = []
      vm.ctxWrapper = { addEventListener: () => jest.fn() }
      vm.waveform = jest.fn()
      vm.setPeaks(buffer)
      expect(vm.peaks[0]).toEqual([1.6, 2])
    })
  })

  describe('#waveform', () => {
    it('draw wave', () => {
      vm.peaks = [[1.5, 2.5], [1.5, 2.5], [3.5, 0.5], [3.5, 0.5]]
      vm.audio = { currentTime: 100 }
      vm.playX = jest.fn(() => 2)
      vm.draw = jest.fn()
      vm.drawSlider = jest.fn()
      vm.drawTime = jest.fn()

      vm.waveform()

      expect(vm.draw).toHaveBeenCalledTimes(2)
      expect(vm.draw).toHaveBeenCalledWith([[1.5, 2.5], [1.5, 2.5]], 0.5, 'navy', 0)
    })
  })

  describe('#draw', () => {
    it('draw canvas segment', () => {
      const data = [[1.5, 2.5], [1.5, 2.5], [3.5, 0.5], [3.5, 0.5]]
      const x = vm.draw(data, 1, 'lime', 0)
      expect(mockCanv.moveTo).toHaveBeenCalledTimes(4)
      expect(x).toBe(4)
    })
  })

  describe('#timeFormat', () => {
    it('by default with milliseconds', () => {
      expect(vm.timeFormat('invalid')).toBe('')
      expect(vm.timeFormat(0)).toBe('00:00.000')
      expect(vm.timeFormat(60)).toBe('01:00.000')
      expect(vm.timeFormat(20.1245058)).toBe('00:20.124')
      expect(vm.timeFormat(5.00123)).toBe('00:05.001')
      expect(vm.timeFormat(68.045058)).toBe('01:08.045')
      expect(vm.timeFormat(7580.0509547)).toBe('126:20.050')
    })
    it('without milliseconds', () => {
      vm.playtimeWithMs = false
      expect(vm.timeFormat(0)).toBe('00:00')
      expect(vm.timeFormat(60)).toBe('01:00')
      expect(vm.timeFormat(20.1245058)).toBe('00:20')
      expect(vm.timeFormat(68.045058)).toBe('01:08')
      expect(vm.timeFormat(7580.0509547)).toBe('126:20')
    })
  })

  describe('#drawTime', () => {
    it('with default settings', () => {
      vm.duration = 220.081667
      const time = 123.456789
      vm.drawTime(time)
      expect(mockCanv.fillText).toHaveBeenCalledWith('02:03.456', 283, 12 + 3)
      expect(mockCanv.fillStyle).toBe('grey')
      expect(mockCanv.font).toBe('12px monospace')
    })
    it('at the end of file', () => {
      vm.duration = 220.081667
      const time = 213.456789
      vm.drawTime(time)
      expect(mockCanv.fillText).toHaveBeenCalledWith('03:33.456', 431, 12 + 3)
    })
    it('at the bottom', () => {
      vm.duration = 220.081667
      vm.playtimeTextBottom = true
      const time = 213.456789
      vm.drawTime(time)
      expect(mockCanv.fillText).toHaveBeenCalledWith('03:33.456', 431, 80 - 12 + 3)
    })
    it('skipped when disabled playtime', () => {
      vm.playtime = false
      expect(mockCanv.fillText).not.toHaveBeenCalled()
    })
  })

  describe('#drawSlider', () => {
    it('default slider settings', () => {
      vm.duration = 220.081667
      const time = 123.456789
      vm.drawSlider(time)
      expect(mockCanv.lineWidth).toBe(vm.playtimeSliderWidth)
      expect(mockCanv.strokeStyle).toBe(vm.playtimeSliderColor)
      expect(mockCanv.beginPath).toHaveBeenCalled()
      expect(mockCanv.moveTo).toHaveBeenCalledWith(280, 0)
      expect(mockCanv.lineTo).toHaveBeenCalledWith(280, 80)
      expect(mockCanv.stroke).toHaveBeenCalled()
    })
  })

  describe('#downloadProgress', () => {
    it('draw progress callbeck for axios get', () => {
      vm.downloadProgress({ loaded: 5, total: 10 })
      expect(mockCanv.clearRect).toHaveBeenCalled()
      expect(mockCanv.lineTo).toHaveBeenCalledWith(250, 40)
    })
  })
})
