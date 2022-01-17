import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

(window as any).Dynamsoft.DCE.CameraEnhancer.engineResourcePath = "https://unpkg.com/cube-dynamsoft-camera-enhancer@0.20220104111256.0/dist/"
createApp(App).use(store as any).mount('#app')
