import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import Login from '../views/pages/global/login'
import Index from '../views/pages/index'
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '企业信息',
      component: Index,
      children: [
        {
          path: '/company-info',
          name: '客户账单',
          component: () => import(/*webpackChunkName: 'company-info'*/'../views/pages/company/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: '礼券管理',
      component: Index,
      children: [
        {
          path: '/coupon',
          name: '',
          component: () => import(/*webpackChunkName: 'coupon'*/'../views/pages/coupon/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: '经销商',
      component: Index,
      children: [
        {
          path: '/dealer',
          name: '',
          component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/dealer/index.vue')
        }
      ]
    },
  ]
})
