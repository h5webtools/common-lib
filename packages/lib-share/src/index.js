/**
 * 分享模块，目前支持微信授权分享，QQ分享
 */

import extend from '@jyb/lib-extend';
import * as util from './util';
import helper from './helper';

const ua = window.navigator.userAgent.toLowerCase();
const defaultOptions = {
  common: {
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
  }
};

/**
 * 分享
 * @param {Object} options
 */
function share(options = {}) {
  const opts = extend(true, {}, defaultOptions, options);

  for (const k in helper) {
    if (util.hasOwn.call(helper, k)) {
      const curr = helper[k];
      const name = curr.name;

      if (util.checkFunctionArray([curr.test, curr.init]) && name && curr.test(ua)) {
        curr.init(extend({}, opts.common, opts[name] || {}), ua);
      }
    }
  }
}

export default share;
