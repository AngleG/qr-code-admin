import axios from 'axios';
import qs from 'qs';
const loginkey = localStorage.getItem('loginkey');
const singOut = () => {
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
  if (result.state === 'success') {
    return {
      flags: 'success',
      data: result.data,
      message: '成功'
    }
  } else if(result.state === 'error') {
    return {
      flags: 'fail',
      data: null,
      message: result.error
    }
  }
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
    data = url === '/login' ? data : Object.assign({}, data, {loginkey});
    return axios(Object.assign({
        baseURL: 'http://data.jedge.cn:81',
        url,
        data: qs.stringify(data),
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
