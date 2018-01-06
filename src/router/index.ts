import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/demo',
      component: () => import('views/Index/index.vue'),
    },
  ],
})

export default router
