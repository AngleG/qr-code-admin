import {httpRequest} from './plugins/http-request';
let webApi = {
  //用户登录
  login(data) {
    return httpRequest(`/login`, data)
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
  getTroubleshootDetail(data) {
    return httpRequest(`/rqrcbc`, data)
  }
};
export default webApi;
