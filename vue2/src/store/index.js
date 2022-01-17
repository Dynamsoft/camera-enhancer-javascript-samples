import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        decoratorIsDisabled: true,
        lineWidthIsDisabled: true,
        strokeStyleIsDisabled: true,
        fillStyleIsDisabled: true,
        maskFillStyleIsDisabled: true,
    },
    actions: {

    },
    mutations: {

    }
})

export default store