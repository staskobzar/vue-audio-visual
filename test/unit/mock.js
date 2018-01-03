/* Mock animation frame */
window.requestAnimationFrame = jest.fn()

/* Mock Audio Context */

window.AudioContext = jest.fn().mockImplementation(() => {
  return {
    createMediaElementSource: () => {
      return { connect: () => {} }
    },
    createAnalyser: () => {
      return {
        connect: () => {},
        frequencyBinCount: 4,
        getByteFrequencyData: (array) => {
          array.set([128, 187, 59, 247])
        }
      }
    }
  }
})

