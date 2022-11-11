import { vi, beforeAll } from 'vitest'

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn()
  // global.MediaStream = new MediaStream()
})
