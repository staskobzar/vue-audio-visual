/**
 * Base and common properties and functions.
 */

/**
 * Base properties common for the components
 */
const baseProps = {
  /**
   * prop: 'audio-src'
   * Audio element src attribute. When provided creates audio element
   */
  audioSrc: {
    type: String,
    default: null
  },
  /**
   * prop: 'audio-controls'
   * Audio element controls attribute. When provided should
   * display audio element with controls
   */
  audioControls: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'audio-class'
   * Audio element css class name.
   */
  audioClass: {
    type: String,
    default: null
  },
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 300
   */
  canvWidth: {
    type: Number,
    default: 300
  },
  /**
   * prop: 'canv-height'
   * Canvas element height. Default 80
   */
  canvHeight: {
    type: Number,
    default: 80
  },
  /**
   * prop: 'canv-class'
   * Canvas element css class name.
   */
  canvClass: {
    type: String,
    default: null
  },
  /**
   * prop: 'canv-top'
   * Canvas element position on top relatively to audio element.
   * Default: false
   */
  canvTop: {
    type: Boolean,
    default: false
  },
  /**
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transperent.
   */
  canvFillColor: {
    type: [String, Array],
    default: null
  }
}

/**
 * Create audio and canvas elements and insert in the HTML template.
 * Using document.createElement to avoid Vue virtual DOM re-rendering
 * which and lead to infinit loops.
 */
function createHTMLElements (comp) {
  const audio = document.createElement('audio')
  const audioDiv = document.createElement('div')
  const canv = document.createElement('canvas')
  const canvDiv = document.createElement('div')

  audio.setAttribute('src', comp.audioSrc)
  if (comp.audioControls) audio.setAttribute('controls', true)
  if (comp.audioClass) audio.setAttribute('class', comp.audioClass)
  audioDiv.appendChild(audio)
  comp.$el.appendChild(audioDiv)

  if (comp.canvClass) canv.setAttribute('class', comp.canvClass)
  if (comp.canvWidth) canv.setAttribute('width', comp.canvWidth)
  if (comp.canvHeight) canv.setAttribute('height', comp.canvHeight)
  canvDiv.appendChild(canv)

  if (comp.canvTop) {
    comp.$el.insertBefore(canvDiv, audioDiv)
  } else {
    comp.$el.appendChild(canvDiv)
  }
  comp.ctx = canv.getContext('2d')
  comp.audio = audio
}

/**
 * Set audio context analyser.
 */
function setAnalyser (comp) {
  const ctx = new AudioContext()
  const src = ctx.createMediaElementSource(comp.audio)
  comp.analyser = ctx.createAnalyser()

  src.connect(comp.analyser)
  comp.analyser.fftSize = comp.fftSize
  comp.analyser.connect(ctx.destination)
}

/**
 * Canvas gradient. Vertical, from top down
 */
function fillGradient (colorsArray, comp) {
  const w = comp.canvWidth
  const h = comp.canvHeight
  const gradient = comp.ctx.createLinearGradient(w / 2, 0, w / 2, h)
  let offset = 0
  colorsArray.forEach(color => {
    gradient.addColorStop(offset, color)
    offset += (1 / colorsArray.length)
  })
  return gradient
}

export {
  baseProps,
  createHTMLElements,
  setAnalyser,
  fillGradient
}
