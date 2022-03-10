import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getInit, getUserInfo } from './login'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
  // },
  // { path: '/', redirect: { name: 'Home' } }
  {
    path: '/orderGroup',
    name: 'OrderGroup',
    component: () => import(/* webpackChunkName: "Home" */ '@views/orderGroup/orderGroup.vue')
  }, {
    path: '/',
    name: 'Index',
    redirect: { name: 'OrderGroup' }
    // redirect: { name: 'Goods' }
  }, {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Home" */ '@views/order/order.vue')
  }, {
    path: '/goods',
    name: 'Goods',
    component: () => import(/* webpackChunkName: "Home" */ '@views/goods/goods.vue')
  }, {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "Home" */ '@views/user/user.vue')

  }, {
    path: "/user/order",
    name: "UserOrder",
    component: () => import(/* webpackChunkName: "Home" */ '@views/user/order.vue'),
  }
  //  {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import(/* webpackChunkName: "Home" */ '@views/user/login.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
getInit()

getUserInfo()

export default router
