import { createLocalVue, mount } from 'vue-test-utils'
import Plugin from '@/'

const localVue = createLocalVue()
localVue.use(Plugin)

describe('AvBars', () => {
  it('should throw when audio source not provided', () => {
    const App = { template: `<av-bars></av-bars>` }
    mount(App, { localVue })
  /*
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App')
  */
  })
})
