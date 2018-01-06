import Vue from 'vue'
import App from 'views/App/index.vue'
// import router from 'router/index'

const vm = new Vue({
  el: '#app',
  render(h) {
    return h(App)
  },
})
