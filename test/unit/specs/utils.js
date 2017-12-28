window.AudioContext = jest.fn().mockImplementation(() => {
  return {
    createMediaElementSource: () => {
      return { connect: () => {} }
    },
    createAnalyser: () => {
      return { connect: () => {} }
    }
  }
})
export default window.AudioContext
