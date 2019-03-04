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
