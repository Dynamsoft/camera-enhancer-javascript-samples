import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Dynamsoft.DCE.CameraEnhancer.engineResourcePath = "https://unpkg.com/cube-dynamsoft-camera-enhancer@0.20220104111256.0/dist/"
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
