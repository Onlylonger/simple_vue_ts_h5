import Vue from 'vue'
import App from 'views/App/index.vue'

const vm = new Vue({
  el: '#app',
  render(h) {
    return h(App)
  },
})
