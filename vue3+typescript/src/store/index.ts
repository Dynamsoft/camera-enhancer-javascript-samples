import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      decoratorIsDisabled: true,
      lineWidthIsDisabled: true,
      strokeStyleIsDisabled: true,
      fillStyleIsDisabled: true,
      maskFillStyleIsDisabled: true,
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
