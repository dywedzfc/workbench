import Vue from 'vue'
import App from './renderer/App.vue'
import router from './renderer/router'
import store from './renderer/store'
import './renderer/plugins/element.js'
import hotkeys from 'hotkeys-js'

Vue.config.productionTip = false

// hotkeys('*', { keyup: true }, event => {
//   if (event.type == 'keydown') store.commit('hotkey/SET_HOTKEYS', event.key)
//   else store.commit('hotkey/CLOSE_HOTKEYS', event.key)
// })

// window.addEventListener('blur', () => {
//   store.commit('hotkey/CLOSE_HOTKEYS')
// })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
