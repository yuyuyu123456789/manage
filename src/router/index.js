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
    children:[
      {
        path: '/',
        redirect: 'default',
      },
      {
        path: 'default',
        component: () => import('@/components/default/default.vue'),
      },
      {
        path: 'users',
        component: () => import('@/components/users/users.vue'),
      },
      {
        path: 'roles',
        component: () => import('@/components/rights/roles.vue'),
      },
      {
        path: 'rights',
        component: () => import('@/components/rights/rights.vue'),
      },
      {
        path: 'goods',
        component: () => import('@/components/goods/goods.vue'),
      },
      {
        path: 'params',
        component: () => import('@/components/goods/params.vue'),
      },
      {
        path: 'categories',
        component: () => import('@/components/goods/categories.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/components/orders/orders.vue'),
      },
      {
        path: 'reports',
        component: () => import('@/components/reports/reports.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
