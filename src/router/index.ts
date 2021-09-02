/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-01 15:57:02
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('@/views/history/index.vue')
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/detail/index.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
