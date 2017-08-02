/**
 * 环境
 */

const ua = window.navigator.userAgent;

/* eslint-disable no-useless-escape */
const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
const inApp = /jiayoubao/.test(ua.toLowerCase());

const os = {};

// jyb app
os.jyb = inApp;

// android
if (android) {
  os.android = true;
  os.version = android[2];
}

// ios
if (iphone && !ipod) {
  os.ios = os.iphone = true;
  os.version = iphone[2].replace(/_/g, '.');
}

if (ipad) {
  os.ios = os.ipad = true;
  os.version = ipad[2].replace(/_/g, '.');
}

if (ipod) {
  os.ios = os.ipod = true;
  os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
}

export default os;
