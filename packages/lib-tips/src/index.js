import { createElement } from './util';

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
      loading: '<span class="rotate-icon"></span>',
      none: ''
    };

    this.tipTemplate = '<div id="bubble"><div class="mod-spinner">' +
      '<div class="spinner-wrap">{{icon}}' +
      '<p class="text" id="bubble-text">{{text}}</p>' +
      '</div></div></div>';
  }

  showTips(option) {
    if (this.tipsHtml) {
      return;
    }

    const conf = Object.assign({}, this.config, option);
    const html = this.tipTemplate
      .replace(/{{icon}}/, conf.isLoading ? this.iconConf.loading : '')
      .replace(/{{text}}/, conf.msg);

    this.tipsHtml = createElement(html);
    document.body.insertBefore(this.tipsHtml, null);

    if (conf.autoHide) {
      setTimeout(() => {
        this.closeTips();
      }, conf.hideTime);
    }

    this.lock = true;
  }

  showLoading(message) {
    this.showTips({
      msg: message || '努力加载中...',
      isLoading: true,
      autoHide: false
    });
  }

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
