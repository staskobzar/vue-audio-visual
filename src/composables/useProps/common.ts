/**
 * Common properties for all components
 */
export const commonProps = {
  /**
   * prop: 'src'
   * Audio element src attribute. When provided creates audio element
   */
  src: {
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
    default: true
  },
  /**
   * prop: 'cors-anonym'
   * CORS requests for this element will not have the credentials flag set.
   * Set crossOrigin property of audio element to 'anonymous'.
   * Default: null
   */
  corsAnonym: {
    type: Boolean,
    default: false
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
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transparent.
   */
  canvFillColor: {
    type: [String, Array],
    default: ''
  },
  /**
   * prop: 'placeholder'
   * Draw initial state of visualization. Like line in the middle for line plugin.
   * Default is true
   */
  placeholder: {
    type: Boolean,
    default: true
  }
}
