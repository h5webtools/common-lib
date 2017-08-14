/**
 * 微信授权分享
 * @see https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

import * as util from '../util';
import Queue from '../queue';
import STATUS from '../status';

const defaultInitOptions = {
  debug: false, // 开启debug模式，页面会alert出错误信息
  reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign',
  scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
};

const defaultShareOptions = {
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  success() {}, // 用户确认分享后执行的回调函数
  cancel() {} // 用户取消分享后执行的回调函数
};

/* global wx */
export default class WXShare {
  constructor(ua) {
    this.ua = ua;
    this.status = STATUS.NORMAL;
    this.name = 'weixin';
    this.queue = new Queue();
  }

  /**
   * 测试是否微信客户端
   * @return {Boolean}
   */
  test() {
    return /micromessenger/.test(this.ua);
  }

  /**
   * 初始化
   * @param {Object} options
   * @param {Boolean} options.debug 开启debug模式，页面会alert出错误信息
   * @param {String} options.reqUrl 请求地址
   * @param {String} options.scriptUrl 微信jssdk地址
   */
  init(options = {}) {
    if (this.status === STATUS.INIT) return;
    const opts = Object.assign({}, defaultInitOptions, options);
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
        this._auth(json, opts);
      });

      if (isLoaded) {
        this._auth(json, opts);
      }
    });
  }

  /**
   * 分享
   * @param {Object} options
   */
  share(options = {}) {
    const opts = Object.assign({}, defaultShareOptions, options);

    // 没有初始化，入列
    if (this.status === STATUS.NORMAL) {
      this.queue.enqueue(() => {
        weixinShare(opts);
      });
      return;
    }

    weixinShare(opts);
  }

  /**
   * 验证
   * @param {Object} json
   * @param {Object} opts
   */
  _auth(json, opts) {
    weixinAuth(json, opts, () => {
      let curr = null;

      /* eslint-disable no-cond-assign */
      while (curr = this.queue.dequeue()) {
        util.isFunction(curr) && curr();
      }
      this.status = STATUS.INIT;
    });
  }
}

/**
 * 微信验证
 * @param {Object} authData
 * @param {Object} options
 */
function weixinAuth(authData, options, cb) {
  wx.config({
    debug: options.debug,
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
  cb && cb();
}

/**
 * 微信分享
 * @param {Object} shareData
 */
function weixinShare(shareData) {
  wx.ready(() => {
    wx.onMenuShareTimeline({
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: shareData.success,
      cancel: shareData.cancel
    });
    wx.onMenuShareAppMessage({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: shareData.success,
      cancel: shareData.cancel
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
