/**
 * qq分享
 * @see https://open.mobile.qq.com/api/mqq/index#api:setShareInfo
 * @see https://open.mobile.qq.com/api/common/index#api:setOnShareHandler
 */

import * as util from '../util';
import Queue from '../queue';
import STATUS from '../status';

const defaultInitOptions = {
  scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152'
};

const defaultShareOptions = {
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接
  imgUrl: '', // 分享图标
  callback() {} // 回调
};

/* global mqq */
export default class QQShare {
  constructor(ua) {
    this.ua = ua;
    this.status = STATUS.NORMAL;
    this.name = 'qq';
    this.queue = new Queue();
  }

  /**
   * 测试是否QQ客户端
   * @return {Boolean}
   */
  test() {
    return /qq\//.test(this.ua);
  }

  /**
   * 初始化
   * @param {Object} options
   * @param {String} options.scriptUrl QQ jssdk地址
   */
  init(options = {}) {
    if (this.status === STATUS.INIT) return;
    const opts = Object.assign({}, defaultInitOptions, options);
    const isLoaded = loadQQScript(opts.scriptUrl, () => {
      let curr = null;

      /* eslint-disable no-cond-assign */
      while (curr = this.queue.dequeue()) {
        util.isFunction(curr) && curr();
      }
      this.status = STATUS.INIT;
    });

    if (isLoaded) {
      this.status = STATUS.INIT;
    }
  }

  /**
   * 分享
   * @param {Object} options
   */
  share(options = {}) {
    const opts = Object.assign({}, defaultShareOptions, options);

    if (this.status === STATUS.NORMAL) {
      this.queue.enqueue(() => {
        qqShare(opts);
      });
      return;
    }

    qqShare(opts);
  }
}

/**
 * QQ分享
 * @param {Object} options
 */
function qqShare(options) {
  mqq.data.setShareInfo({
    title: options.title,
    desc: options.desc,
    share_url: options.link,
    image_url: options.imgUrl,
    callback: options.callback
  });
}

/**
 * 加载QQ脚本
 * @param {String} url
 * @param {Function} fnSuccess
 * @param {Function} fnFailed
 */
function loadQQScript(url, fnSuccess, fnFailed) {
  if (typeof window.mqq === 'undefined') {
    util.loadScript(url, fnSuccess, fnFailed);
    return false;
  }

  return true;
}
