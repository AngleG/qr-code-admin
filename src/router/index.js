import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import Login from '../views/pages/global/login'
import Index from '../views/pages/index'
export const routes = [
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
    component: Index,
    children: [
      {
        path: '/welcome',
        name: '欢迎页',
        component: () => import(/*webpackChunkName: 'welcome'*/'../views/pages/global/welcome.vue')
      }
    ]
  },
  {
    path: '/',
    name: '账号管理',
    iconClass: 'iconfont icon-qiye1',
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
    iconClass: "iconfont icon-youhuiquan",
    component: Index,
    children: [
      {
        path: '/coupon-edit',
        name: '创建与修改',
        component: () => import(/*webpackChunkName: 'coupon-edit'*/'../views/pages/coupon/coupon-edit.vue')
      },
      {
        path: '/coupon-distribution-recall',
        name: '分发与召回',
        component: () => import(/*webpackChunkName: 'coupon-distribution-recall'*/'../views/pages/coupon/coupon-distribution-recall.vue')
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
    iconClass: "iconfont icon-jingxiaoshang",
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
    iconClass: "iconfont icon-xiaofeizhe1",
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
    component: Index,
    iconClass: "iconfont icon-fahuo",
    children: [
      {
        path: '/ship',
        name: '发货',
        component: () => import(/*webpackChunkName: 'ship'*/'../views/pages/ship/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Index,
    iconClass: "iconfont icon-fahuo",
    children: [
      {
        path: '/automatic-delivery',
        name: '自动发货',
        component: () => import(/*webpackChunkName: 'automatic-delivery'*/'../views/pages/automatic-delivery')
      }
    ]
  },
  {
    path: '/',
    component: Index,
    iconClass: "iconfont icon-paicha",
    children: [
      {
        path: '/troubleshoot',
        name: '问题排查',
        component: () => import(/*webpackChunkName: 'troubleshoot'*/'../views/pages/troubleshoot/index.vue')
      }
    ]
  }
];
export default new Router({
  routes
})
