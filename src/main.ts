import Vue from 'vue'
import App from 'views/App/index.vue'
import router from 'router'

const vm = new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  },
})
