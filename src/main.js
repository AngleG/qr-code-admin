import Vue from 'vue'
import App from './App'
import router from './router'
//按需导入element-ui 组件
import './lib/plugins/element-import'
//引入自定义初始化css
import './static/css/index.css'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
