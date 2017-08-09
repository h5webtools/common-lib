/**
 * qq分享
 */

import * as util from '../util';

const defaultOptions = {
  scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152'
};

/* global mqq */
export default {
  name: 'qq',
  /**
   * 测试是否执行init
   * @param {String} ua
   * @return {Boolean}
   */
  test(ua) {
    return /qq\//.test(ua);
  },
  /**
   * 初始化
   * @param {Object} options
   * @param {String} options.title 标题
   * @param {String} options.desc 描述
   * @param {String} options.link 链接
   * @param {String} options.imgUrl 图片地址
   * @param {String} options.scriptUrl QQ jssdk地址
   */
  init(options, ua) {
    const opts = Object.assign({}, defaultOptions, options);
    const isLoaded = loadQQScript(opts.scriptUrl, () => {
      qqShare(opts, ua);
    });

    if (isLoaded) {
      qqShare(opts, ua);
    }
  }
};

/**
 * QQ分享
 * @param {Object} options
 * @param {String} ua
 */
function qqShare(options, ua) {
  if (/android/.test(ua)) {
    mqq.data.setShareInfo({
      title: options.title,
      desc: options.desc,
      share_url: options.link,
      image_url: options.imgUrl
    });
  } else {
    mqq.ui.setOnShareHandler((type) => {
      mqq.ui.shareMessage({
        title: options.title,
        desc: options.desc,
        share_type: type,
        share_url: options.link,
        image_url: options.imgUrl,
        back: true
      });
    });
  }
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
