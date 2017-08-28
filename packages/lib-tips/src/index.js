import { createElement, isAndroid } from './util';
import tipTemplate from '../dot/tip.dot';

class Tips {
  constructor() {
    this.tipsHtml = null;
    this.ptr = null;
    this.config = {
      msg: '',
      isLoading: false,
      autoHide: true,
      hideTime: 1200
    };

    this.iconConf = {
      loading: isAndroid() ? 'rotate-svg' : 'rotate-icon',
      none: ''
    };
  }

  /**
   * @param {object} option
   */
  showTips(option) {
    if (this.tipsHtml) {
      return;
    }

    const conf = Object.assign({}, this.config, option);
    const html = tipTemplate({ text: conf.msg, icon: conf.isLoading ? this.iconConf.loading : '' });
    this.tipsHtml = createElement(html);
    document.body.insertBefore(this.tipsHtml, null);

    if (conf.autoHide) {
      setTimeout(() => {
        this.closeTips();
      }, conf.hideTime);
    }

    this.lock = true;
  }

  /**
   * @param {string} message
   */
  showLoading(message) {
    this.showTips({
      msg: message || '努力加载中...',
      isLoading: true,
      autoHide: false
    });
  }

  /**
   * @param {string} message
   */
  showError(message) {
    clearInterval(this.ptr);
    this.ptr = setInterval(() => {
      if (!this.tipsHtml) {
        this.showTips({
          msg: message
        });

        clearInterval(this.ptr);
        this.ptr = null;
      }
    }, 200);
  }

  closeTips() {
    if (!this.tipsHtml) {
      return this;
    }

    this.tipsHtml.parentNode.removeChild(this.tipsHtml);
    this.tipsHtml = null;
    this.lock = false;
    return this;
  }
}

export default new Tips();
