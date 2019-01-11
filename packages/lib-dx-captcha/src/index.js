
import extend from '@jyb/lib-extend';
import EventEmit from '@jyb/lib-event-emit';

const defaultOptions = {
  isAuto: false,
  scriptUrl: 'https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js',
  captchaOptions: {}
};

class Captcha extends EventEmit {
  constructor(el, options = {}) {
    super();
    this.$el = document.querySelector(el);
    this.options = extend({}, defaultOptions, options);
    this.captchaOptions = this.options.captchaOptions || {};
    this.dxCaptcha = null;

    loadScript(this.options.scriptUrl, () => {
      this.init();
    }, (e) => {
      console.log(`Error: ${e.toString()}`);
    });
  }
  init() {
    // 初始化验证码
    if (window._dx && typeof window._dx.Captcha === 'function') {
      if (!this.options.isAuto) Captcha.clear();

      this.dxCaptcha = window._dx.Captcha(this.$el, extend(true, {
        style: 'popup',
        customLanguage: {
          pass_by_server: '验证成功'
        }
      }, this.captchaOptions));

      this.dxCaptcha.on('verifySuccess', (token) => {
        this.successCallback(token);
      });

      if (this.options.isAuto) {
        this.dxCaptcha.on('passByServer', (token) => {
          setTimeout(() => {
            this.successCallback(token);
          }, 1000);
        });
      }
    }
  }
  static clear() {
    if (window._dx && typeof window._dx.Captcha._clearVID === 'function') {
      // 这个貌似是私有方法，看demo里面用了
      window._dx.Captcha._clearVID();
    }
  }
  successCallback(token) {
    if (this.has('success')) {
      this.hide();
      this.emit('success', token);
      if (!this.options.isAuto) {
        Captcha.clear();
        this.reload();
      }
    }
  }
  reload() {
    if (this.dxCaptcha) {
      this.dxCaptcha.reload();
    }
  }
  show(fn) {
    if (this.dxCaptcha) {
      if (typeof fn === 'function') {
        this.off('success');
        this.on('success', fn);
      }
      this.dxCaptcha.show();
    }
  }
  hide() {
    if (this.dxCaptcha) {
      this.dxCaptcha.hide();
    }
  }
}

function loadScript(url, fnSuccess, fnFailed) {
  const oScript = document.createElement('script');
  if (typeof fnSuccess === 'function') {
    oScript.onload = fnSuccess;
  }
  if (typeof fnFailed === 'function') {
    oScript.onerror = fnFailed;
  }
  oScript.src = url;
  document.querySelector('head').appendChild(oScript);
}

export default Captcha;
