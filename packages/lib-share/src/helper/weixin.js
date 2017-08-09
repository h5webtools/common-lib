/**
 * 微信授权分享
 */

import * as util from '../util';

const defaultOptions = {
  reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign',
  scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
};

/* global wx */
export default {
  name: 'weixin',
  /**
   * 测试是否执行init
   * @param {String} ua
   * @return {Boolean}
   */
  test(ua) {
    return /micromessenger/.test(ua);
  },
  /**
   * 初始化
   * @param {Object} options
   * @param {String} options.title 标题
   * @param {String} options.desc 描述
   * @param {String} options.link 链接
   * @param {String} options.imgUrl 图片地址
   * @param {String} options.reqUrl 请求地址
   * @param {String} options.scriptUrl 微信jssdk地址
   */
  init(options) {
    const opts = Object.assign({}, defaultOptions, options);
    const scriptUrl = opts.scriptUrl;

    loadWeixinScript(scriptUrl);
    util.ajaxGet({
      url: opts.reqUrl,
      data: {
        url: location.href,
        t: +new Date()
      }
    }, (json) => {
      const isLoaded = loadWeixinScript(scriptUrl, () => {
        weixinAuth(json, opts);
      });

      if (isLoaded) {
        weixinAuth(json, opts);
      }
    });
  }
};

/**
 * 微信验证
 * @param {Object} authData
 * @param {Object} shareData
 */
function weixinAuth(authData, shareData) {
  wx.config({
    debug: false,
    appId: authData.appId,
    timestamp: authData.timestamp,
    nonceStr: authData.nonceStr,
    signature: authData.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'hideAllNonBaseMenuItem'
    ]
  });
  wx.ready(() => {
    wx.onMenuShareTimeline({
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    wx.onMenuShareAppMessage({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
  });
}

/**
 * 加载微信脚本
 * @param {String} url
 * @param {Function} fnSuccess
 * @param {Function} fnFailed
 */
function loadWeixinScript(url, fnSuccess, fnFailed) {
  if (typeof window.wx === 'undefined') {
    util.loadScript(url, fnSuccess, fnFailed);
    return false;
  }

  return true;
}
