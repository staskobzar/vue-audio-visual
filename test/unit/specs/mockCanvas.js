/**
 * Taken from project jest-canvas-mock
 * https://github.com/hustcc/jest-canvas-mock
 */
const context2d = {
  fillRect: () => {},
  clearRect: () => {},
  getImageData: (x = 0, y = 0, w = 0, h = 0) => ({
    data: new Array(w * h * 4)
  }),
  setLineDash: () => {},
  getLineDash: () => [],
  measureText: (text = '') => ({
    width: 12 * (text.length || 0),
    height: 14
  }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  resetTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  strokeRect: () => {},
  strokeText: () => {},
  t2: () => {},
  transform: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  arcTo: () => {},
  fill: () => {},
  rect: () => {},
  quadraticCurveTo: () => {},
  createLinearGradient: () => ({
    addColorStop: () => {}
  }),
  createPattern: () => ({}),
  createRadialGradient: () => ({
    addColorStop: () => {}
  }),
  bezierCurveTo: () => {},
  drawFocusIfNeeded: () => {},
  clip: () => {},
  ellipse: () => {},
  isPointInPath: () => true,
  isPointInStroke: () => true
}

const jestWrapper = obj => {
  Object.keys(obj).forEach(key => {
    obj[key] = jest.fn(obj[key])
  })
  return obj
}

const createContext2d = jest.fn(() => jestWrapper(context2d))

const createCanvas = () => {
  const div = document.createElement('div') // use div to mock it's api

  div.getContext = param => param === '2d' ? createContext2d('2d') : {}
  return div
}

export default jest.fn(createCanvas)
