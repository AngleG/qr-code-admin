import Vue from 'vue';
import { PAYMENT_ORDER_STATUS } from '../conf/config-list'
export const filters = {
  paymentOrderStatusToText(status) {
    if (status) {
      let statusIndex = PAYMENT_ORDER_STATUS.findIndex(item => item.value === status);
      return statusIndex > -1 ? PAYMENT_ORDER_STATUS[statusIndex].label : '';
    } else {
      return '';
    }
  },
  /**
   * 根据value返回label
   * @param value
   * @param configOptions
   */
  formatConfigValueToLabel(value, configOptions) {
    if (!Array.isArray(configOptions)) {
      return ''
    }
    let result = configOptions.find(item => item.value === value);
    return result ? result.label : '';
  },
  formatToFixed(value, len = 2) {
    if (typeof value !== 'number') {
      return '';
    }
    return value % 1 === 0 ? value : value.toFixed(len);
  }
};
// Vue上全局注册filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
