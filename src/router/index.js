import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
