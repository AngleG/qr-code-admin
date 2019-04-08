import axios from 'axios';
import store from '../../store/index'
import app from '../../main'
import config from '../../conf/config'
import qs from 'qs';
import {loginOut} from "../utils";

const globalStart = () => {
  app.$Progress.start();
  store.commit('changeGlobalLoading', true)
};

const globalFinish = () => {
  app.$Progress.finish();
  store.commit('changeGlobalLoading', false)
};

const globalFail = () => {
  app.$Progress.fail();
  store.commit('changeGlobalLoading', false)
};


axios.interceptors.request.use(config => {
  globalStart();
  return config;
}, error => {
  globalFail();
});

axios.interceptors.response.use(data => {
  if (data.data.code === 900) {
    loginOut()
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
  if (Object.prototype.toString.call(result).indexOf('Blob') > -1) {
    globalFinish();
    return {
      flags: 'success',
      data: result,
      message: '成功',
      url: `${res.config.url}?${res.config.data}`
    };
  }
  if (result.state === 'success') {
    globalFinish();
    return {
      flags: 'success',
      data: result.data,
      message: '成功'
    }
  } else if(result.state === 'error') {
    globalFail();
    return failResult
  } else if (result.state === 'fail'){
    globalFail();
    let logoutErrorList = ['已过期', '已退出', '账号未授权登录本控制台', '输入登录名和密码'];
    if (logoutErrorList.includes(result.error)|| result.error.indexOf("禁用") !== -1) {
      let timer = setTimeout(() => {
        loginOut();
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
const getFinallyParamsData = (url, params) => {
  let loginkey = JSON.parse(localStorage.getItem('loginkey'));
  return config.FILE_URL.includes(url) || config.DOWNLOAD_FILE_URL.includes(url) ? Object.assign({}, params, {loginkey: loginkey.loginkey, eid: loginkey.eid}) : params;
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
        params: getFinallyParamsData(url, params),
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        timeout: 60000
    }, options))
    .then(getResult)
    .catch(err => {
      globalFail();
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
