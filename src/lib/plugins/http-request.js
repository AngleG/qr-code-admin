import axios from 'axios';
import config from '../../conf/config'
import { Message } from 'element-ui'
import qs from 'qs';
const singOut = () => {
  localStorage.removeItem('loginkey');
  window.location.href = '/';
};

axios.interceptors.response.use(data => {
  if (data.data.code === 900) {
    singOut()
  }
  return data
}, error => {
    return Promise.reject(error)
});

const getResult = res => {
  let result = res.data;
  let failResult = {
    flags: 'fail',
    data: null,
    message: result.error
  };
  if (result.state === 'success') {
    return {
      flags: 'success',
      data: result.data,
      message: '成功'
    }
  } else if(result.state === 'error') {
    return failResult
  } else if (result.state === 'fail'){
    let logoutErrorList = ['已过期', '已退出', '账号未授权登录本控制台'];
    if (logoutErrorList.includes(result.error)|| result.error.indexOf("禁用") !== -1) {
      let timer = setTimeout(() => {
        singOut();
        clearTimeout(timer)
      }, 500)
    }
    return failResult
  }
};
const getFinallyRequestData = (url, data) => {
  let loginkey = JSON.parse(localStorage.getItem('loginkey'));
  data = config.FREE_LOGIN_KEY_URL.includes(url) ? data : Object.assign({}, data, loginkey);
  return config.FILE_URL.includes(url) ? data : qs.stringify(data);
};
/**
 * 基于axios的http请求，默认方式为post
 * @param url
 * @param data
 * @param options
 * @param params
 * @returns {Promise}
 */
export const httpRequest = (url, data = {}, options = { method : 'post' }, params) => {
    return axios(Object.assign({
        baseURL: config.BASE_URL,
        url,
        data: getFinallyRequestData(url, data),
        params,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        timeout: 60000
    }, options))
    .then(getResult)
    .catch(err => {
      if (!err.response || ![401, 422].includes(err.response.status)) {
        return {
          flags: 'fail',
          message: '网络错误',
          code: err.response ? err.response.status : 0
        }
      }
      return {
        flags: 'fail',
        message: err.response.data.message,
        code: err.response.data.code
      }
    });
};
