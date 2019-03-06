/**
 * 下载文件
 * @param url
 * @param outName
 * @param type
 * @param isBold
 */
export const downloadFile = (url, outName, type = 'blank', isBold = false) => {
  if (!url) {
    return
  }
  if(type === 'blank') {
    window.open(url);
  } else {
    let link = document.createElement('a');
    link.style.display = 'none';
    if(isBold) {
      url = window.URL.createObjectURL(new Blob([url]))
    }
    link.href = url;
    document.body.appendChild(link);
    if (outName) {
      link.setAttribute('download', outName);
    }
    link.click();
    link.remove();
  }
};

export const loginOut = () => {
  localStorage.removeItem('loginkey');
  window.location.href = '/';
};

//重置对象属性
export const restObjectAttribute = obj => {
  if (obj) {
    Object.keys(obj).forEach(key => {
      obj[key] = Array.isArray(obj[key]) ? [] : null;
    })
  }
};

export const isTypeof =  target => Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();

export const isObject = target => isTypeof(target) === 'object';

export const isArray = target => isTypeof(target) === 'array';

export const isSymbol = target => isTypeof(target) === 'symbol';
