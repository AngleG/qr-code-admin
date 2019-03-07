import Vue from 'vue';
export const filters = {
  paymentOrderStatusToText(status) {
    let statusList = [
      {label: '已支付', value: 'd'},
      {label: '支付中', value: 'i'},
      {label: '已取消', value: 'c'},
      {label: '支付失败', value: 'f'},
    ];
    if (status) {
      let statusIndex = statusList.findIndex(item => item.value === status);
      return statusIndex > -1 ? statusList[statusIndex].label : '';
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
};
// Vue上全局注册filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
