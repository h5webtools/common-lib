/**
 * 分享模块，目前支持微信授权分享，QQ分享
 */

import * as util from './util';
import helper from './helper';

const ua = window.navigator.userAgent.toLowerCase();

const share = {
  _helper: {},
  init(options = {}) {
    for (const k in helper) {
      if (util.hasOwn.call(helper, k)) {
        const curr = new helper[k](ua);
        const name = curr.name;

        if (name && curr.test(ua) && !this._helper[name]) {
          this._helper[name] = curr;
          curr.init(options[name]);
        }
      }
    }
  },
  config(name = '', options = {}) {
    const curr = this._helper[name];

    if (curr) {
      curr.share(options);
    }
  }
};

export default share;
