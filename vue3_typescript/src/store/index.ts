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
    setEnhancer(state: any, newValue: object) {
      state.enhancer = newValue;
    }
  },
  actions: {
  },
  modules: {
  }
})
