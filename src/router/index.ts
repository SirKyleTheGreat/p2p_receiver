import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import OperationVue from '@/views/Operation.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'operation',
    component: OperationVue
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
