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

export default window.AudioContext
