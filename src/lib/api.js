import {httpRequest} from './plugins/http-request';
let eid = {eid: 'test'};
let webApi = {
  //用户登录
  login(data) {
    return httpRequest(`/login`, data)
  },
  //获取公司信息
  getCompanyInfo() {
    return httpRequest(`/rcc`, eid)
  },
  //保存公司信息
  saveCompanyInfo(data) {
    return httpRequest(`/mcc`, Object.assign(data, eid))
  },
  //上传文件
  upload(file, params) {
    let data = new FormData();
    data.append('file', file);
    return httpRequest(`/mccl`, data, {method: 'post',  headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}}, Object.assign(params, eid))
  }
};
export default webApi;
