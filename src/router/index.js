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
          path: '/coupon-edit',
          name: '创建与修改',
          component: () => import(/*webpackChunkName: 'coupon-edit'*/'../views/pages/coupon/coupon-edit.vue')
        },
        {
          path: '/coupon-distribution',
          name: '礼券分发',
          component: () => import(/*webpackChunkName: 'coupon-distribution'*/'../views/pages/coupon/coupon-distribution.vue')
        },
        {
          path: '/coupon-operating',
          name: '激活与撤销',
          component: () => import(/*webpackChunkName: 'coupon-operating'*/'../views/pages/coupon/coupon-operating.vue')
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
          component: () => import(/*webpackChunkName: 'dealer-account'*/'../views/pages/dealer/dealer-account.vue')
        },
        {
          path: '/payment-order',
          name: '支付订单',
          component: () => import(/*webpackChunkName: 'payment-order'*/'../views/pages/dealer/dealer-payment-order.vue')
        },
        {
          path: '/invoicing-report',
          name: '进销存报表',
          component: () => import(/*webpackChunkName: 'invoicing-report'*/'../views/pages/dealer/dealer-invoicing-report.vue')
        }
      ]
    },
    {
      path: '/',
      name: '消费者管理',
      component: Index,
      children: [
        {
          path: '/user-list',
          name: '用户列表',
          component: () => import(/*webpackChunkName: 'user-list'*/'../views/pages/consumer/consumer-user-list.vue')
        },
        // {
        //   path: '/dealer-account',
        //   name: '收货地址列表',
        //   component: () => import(/*webpackChunkName: 'dealer'*/'../views/pages/dealer/account/coupon-edit.vue')
        // },
        {
          path: '/exchange-order',
          name: '兑换订单',
          component: () => import(/*webpackChunkName: 'exchange-order'*/'../views/pages/consumer/consumer-exchange-order.vue')
        },
        {
          path: '/bulk-exchange',
          name: '批量兑换',
          component: () => import(/*webpackChunkName: 'bulk-exchange'*/'../views/pages/consumer/consumer-bulk-exchange.vue')
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
          component: () => import(/*webpackChunkName: 'ship'*/'../views/pages/ship/index.vue')
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
