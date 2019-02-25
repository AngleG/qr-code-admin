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
  upload(file, params) {
    let data = new FormData();
    data.append('file', file);
    return httpRequest(`/mccl`, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, Object.assign(params, {eid}))
  },
  uploadCoupon(file, params){
    let data = new FormData();
    data.append('file', file);
    return httpRequest(`/mcp`, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, params)
  }
};
export default webApi;
