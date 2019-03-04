import Vue from 'vue'
import App from './App'
import router from './router'
//按需导入element-ui 组件
import './lib/plugins/element'
//引入自定义初始化css
import './static/css/index.css'
//引入vue全局自定义方法
import './lib/plugins/vue-global'
//加载全局组件
import './lib/plugins/vue-components'
//加载全局filter方法
import './lib/filters'
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
