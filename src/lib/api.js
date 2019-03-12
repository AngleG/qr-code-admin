import {httpRequest} from './plugins/http-request';
let webApi = {
  //用户登录
  login(data) {
    return httpRequest(`/login`, data)
  },
  //修改密码
  changePassword(data) {
    return httpRequest(`/cp`, data)
  },
  //获取公司信息
  getCompanyInfo() {
    return httpRequest(`/rcc`, {})
  },
  //创建公司信息
  createCompanyInfo(data) {
    return httpRequest(`/ccc`, data)
  },
  //保存公司信息
  saveCompanyInfo(data) {
    return httpRequest(`/mcc`, data)
  },
  //礼券管理
  //创建礼券
  createCoupon(data){
    return httpRequest(`/cc`, data)
  },
  //获取礼券列表
  getCouponList(data){
    return httpRequest(`/rc`, data)
  },
  //获取礼券列表
  modifyCoupon(data){
    return httpRequest(`/mc`, data)
  },
  //上传文件
  upload(file, params, url) {
    let data = new FormData();
    data.append('file', file);
    return httpRequest(url, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, params)
  },
  //获取经销商列表
  getDealerList() {
    return httpRequest(`/rac`, {})
  },
  //保存经销商信息修改
  saveDealerByCompanyKey(data) {
    return httpRequest(`/mac`, data)
  },
  //重置经销商密码
  resetDealerPassword(data) {
    return httpRequest(`/raap`, data)
  },
  //创建经销商用户
  createDealer(data) {
    return httpRequest(`/cac`, data)
  },
  //获取支付订单列表
  getPaymentOrderList(data){
    return httpRequest(`/rpo`, data)
  },
  //下载支付订单
  downloadPaymentOrder(data){
    return httpRequest(`/dpo`, {}, {method: 'get', responseType: 'blob'}, data)
  },
  //保存修改订单（问题排查）
  saveQuestionExChangedOrder(data) {
    return httpRequest(`/mco`, Object.assign({}, data, {action: 'deliver'}))
  },
  //删除兑换订单（问题排查）
  deleteQuestionExChangedOrder(data) {
    return httpRequest(`/mco`, Object.assign({}, data, {action: 'reexchange'}))
  },
  //删除支付订单（问题排查）
  deleteQuestionPayOrder(data) {
    return httpRequest(`/mco`, Object.assign({}, data, {action: 'repay'}))
  },
  //根据二维码文本查询问题排查详情（问题排查）
  getTroubleshootDetail(data) {
    return httpRequest(`/rqrcbc`, data)
  },
  //手动激活支付订单（问题排查）
  manualQuestionPayOrder(data) {
    return httpRequest(`/mco`, Object.assign({}, data, {action: 'manual'}))
  },
  //发货管理
  // 获取发货订单列表
  getShipList(data) {
    return httpRequest(`/reotd`, data)
  },
  //保存发货信息
  saveShipInformation(data){
    return httpRequest(`/deliver`, data)
  },
  //获取兑换订单分页列表
  getExchangeOrderList(data) {
    return httpRequest(`/reo`, data)
  },
  //下载兑换订单
  downloadExchangeOrder(data) {
    return httpRequest(`/deo`, {}, {method: 'get', responseType: 'blob'}, data)
  },
  //获取礼劵激活和撤销列表
  getCouponOperatingList(data) {
    return httpRequest(`/rcto`, Object.assign({}, data, {type: 'm'}))
  },
  //设置礼劵为激活
  setCouponForActivation(data) {
    return httpRequest(`/rflc`, Object.assign({}, data, {action: 'a'}))
  },
  //设置礼劵为撤销
  setCouponForCancel(data) {
    return httpRequest(`/rflc`, Object.assign({}, data, {action: 'c'}))
  },
  enterCouponStatus(data) {
    return httpRequest(`/cctm`, data)
  }
};
export default webApi;
