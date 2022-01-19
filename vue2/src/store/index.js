import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        enhancer: {},
        decoratorIsDisabled: true,
        lineWidthIsDisabled: true,
        strokeStyleIsDisabled: true,
        fillStyleIsDisabled: true,
        maskFillStyleIsDisabled: true,
    },

    actions: {
        
    },

    mutations: {
        setEnhancer(state, newValue) {
            state.enhancer = newValue;
        }
    },
})

export default store
