import {httpRequest} from './plugins/http-request';
let eid = localStorage.getItem('loginkey') ? JSON.parse(localStorage.getItem('loginkey')).eid : '';
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
    return httpRequest(url, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, Object.assign(params, {eid}))
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
  }
};
export default webApi;
