/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-26 14:12:30
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
