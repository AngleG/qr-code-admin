import axios from 'axios';

const loginkey = localStorage.getItem('loginkey');
const singOut = () => {
  window.location.href = '/';
};

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  return config
}, error => {
  return Promise.reject(error)
});

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
  let code = result.code;
  if (!res.config.baseURL) {
    return {
      flags: 'success',
      data: result.results || result.result,
      message: '成功'
    }
  }
  if (Object.prototype.toString.call(result).indexOf('Blob') > -1) {
    return {
      flags: 'success',
      data: result,
      message: '成功'
    };
  }
  if (result && (code === 0 || code === 404)) {
    let data = code === 0 ? (result.results || result.result) : null;
    return {
      flags: 'success',
      data,
      message: result.message,
      code
    };
  } else if (result && code === 400) {
    let {message, results} = result;
    if (results && results.length) {
      message = results.reduce((startValue, currentValue) => [...startValue, currentValue.message], []).toString();
    }
    return {
      flags: 'fail',
      code,
      message
    };
  } else if (result && code === 900) {
    singOut();
  }
  else {
    return {
      flags: 'fail',
      message: result.message,
      code
    };
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
    return axios(Object.assign({
        baseURL: 'http://data.jedge.cn:81',
        url,
        data,
        params: Object.assign({}, params, {loginkey}),
        timeout: 60000,
        options
    }))
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
