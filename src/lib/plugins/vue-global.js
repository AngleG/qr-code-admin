import Vue from 'vue';
import { Message } from 'element-ui'
import config from '../../conf/config'
import {
  downloadFile,
  restObjectAttribute} from "../utils";
import _ from 'lodash'
/**
 * 自定义Vue全局toast方法 element message
 * @param message 用户自定义内容
 * @param type 可选：success/warning/info/error，默认warning
 */
Vue.prototype.$toast = function (message, type = 'warning') {
    Message({
      message,
      type,
      customClass: 'custom-toast'
    })
};
Vue.prototype.$downloadFile = downloadFile;

Vue.prototype.$restObjectAttribute = restObjectAttribute;

Vue.prototype.$_ = _;

Vue.prototype.$config = config;
