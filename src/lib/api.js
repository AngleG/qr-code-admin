import {httpRequest} from './plugins/http-request';
let eid = JSON.parse(localStorage.getItem('loginkey')).eid;
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
  //上传文件
  upload(file, params) {
    let data = new FormData();
    data.append('file', file);
    return httpRequest(`/mccl`, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, Object.assign(params, {eid}))
  }
};
export default webApi;
