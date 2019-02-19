import {httpRequest} from './plugins/http-request';
let webApi = {
  //用户登录
  login(data) {
    return httpRequest(`/login`, data)
  },
};
export default webApi;
