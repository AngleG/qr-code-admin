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
      name: '账号管理',
      component: Index,
      children: [
        {
          path: '/company-info',
          name: '企业信息',
          component: () => import(/*webpackChunkName: 'company-info'*/'../views/pages/account/company/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: '礼券管理',
      component: Index,
      children: [
        {
          path: '/coupon-creation-modification',
          name: '创建与修改',
          component: () => import(/*webpackChunkName: 'coupon'*/'../views/pages/coupon/creation-modification/index.vue')
        },
        {
          path: '/coupon-activation-revocation',
          name: '激活与撤销',
          component: () => import(/*webpackChunkName: 'coupon'*/'../views/pages/coupon/activation-revocation/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: '经销商管理',
      component: Index,
      children: [
        {
          path: '/dealer-account',
          name: '经销商账号',
          component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/dealer/account/index.vue')
        },
        {
          path: '/payment-order',
          name: '支付订单',
          component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/dealer/payment-order/index.vue')
        },
      ]
    },
    {
      path: '/',
      name: '消费者管理',
      component: Index,
      children: [
        // {
        //   path: '/dealer-account',
        //   name: '收货地址列表',
        //   component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/dealer/account/index.vue')
        // },
        {
          path: '/exchange-order',
          name: '兑换订单',
          component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/consumer/exchange-order/index.vue')
        },
      ]
    },
    {
      path: '/',
      name: '发货',
      component: Index,
      children: [
        {
          path: '/ship',
          name: '',
          component: () => import(/*webpackChunkName: 'troubleshoot'*/'../views/pages/ship/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: '问题排查',
      component: Index,
      children: [
        {
          path: '/troubleshoot',
          name: '',
          component: () => import(/*webpackChunkName: 'troubleshoot'*/'../views/pages/troubleshoot/index.vue')
        }
      ]
    },
  ]
})
