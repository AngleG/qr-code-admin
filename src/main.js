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

//引入vuex
import store from './store/index'

//引入全局vue-progressBar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
