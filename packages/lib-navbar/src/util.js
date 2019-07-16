
import detect from '@jyb/lib-detect';

const currentEnv = detect.env;

// 是否可以全屏
export function canFullScreen() {
  // 加油宝客户端和version >= 6.1.5才支持全屏
  if (currentEnv.jyb && currentEnv.version) {
    return compareVersion(currentEnv.version, '6.1.5') !== -1;
  }
  return false;
}

// 简单对比客户端版本，大于：1，等于：0，小于：-1
export function compareVersion(v1, v2) {
  v1 = Number(v1.replace(/\./g, ''));
  v2 = Number(v2.replace(/\./g, ''));
  if (v1 > v2) return 1;
  if (v1 === v2) return 0;
  if (v1 < v2) return -1;
}

export function throttle(fn, wait) {
  let timeout = null;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}

export function addCssText(cssText) {
  const styleEl = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText;
    }
  } else {
    try {
      styleEl.innerHTML = cssText;
    } catch (e) {
      styleEl.innerText = cssText;
    }
  }
}

export function wrapperElement(html = '', el = 'div') {
  const element = document.createElement(el);
  element.innerHTML = html;
  return element.children[0];
}

export function isIPhoneX() {
  if (!currentEnv.ios) return;
  // X XS, XS Max, XR
  const deviceInfo = [
    // iPhone X/iPhone XS
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    // iPhone XS Max
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    // iPhone XR
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
  ];
  const { devicePixelRatio, screen } = window;
  const { width, height } = screen;
  for (let i = 0, l = deviceInfo.length; i < l; i++) {
    const current = deviceInfo[i];
    if (current.devicePixelRatio === devicePixelRatio && current.width === width && current.height === height) {
      return true;
    }
  }
  return false;
}

export function createPageUrl(url, query = {}) {
  const queryStr = Object.keys(query).map(k => `${k}=${encodeURIComponent(query[k])}`).join('&');
  if (!queryStr) return url;
  return url + (url.indexOf('?') !== -1 ? `&${queryStr}` : `?${queryStr}`);
}
