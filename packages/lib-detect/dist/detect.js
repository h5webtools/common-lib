(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.detect = factory());
}(this, (function () { 'use strict';

/**
 * 环境
 */

var env = null;

function detect() {
  var regain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var ua = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!regain && env) return env;

  env = {};
  ua = ua || window.navigator.userAgent;

  var ualc = ua.toLowerCase();

  /* eslint-disable no-useless-escape */
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var jyb = ua.match(/jiayoubao[^\d]*(\d+\.\d+\.\d+)/);
  var inJybApp = /jiayoubao/.test(ualc); // 加油宝app
  var inWX = /micromessenger/.test(ualc); // 微信
  var inQQ = /qq\//.test(ualc); // QQ

  env.weixin = inWX;
  env.qq = inQQ;

  // jyb
  if (inJybApp) {
    env.jyb = true;
    env.version = jyb ? jyb[1] : null;
  }

  // android
  if (android) {
    env.android = true;
    env.version = android[2];
  }

  // ios
  if (iphone && !ipod) {
    env.ios = env.iphone = true;
    env.version = iphone[2].replace(/_/g, '.');
  }

  if (ipad) {
    env.ios = env.ipad = true;
    env.version = ipad[2].replace(/_/g, '.');
  }

  if (ipod) {
    env.ios = env.ipod = true;
    env.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }

  return env;
}

detect.env = detect();

return detect;

})));
