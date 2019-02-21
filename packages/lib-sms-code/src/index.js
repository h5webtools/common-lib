/**
 * 短信验证码
 */

import DxCaptcha from '@jyb/lib-dx-captcha';
import tips from '@jyb/lib-tips';
import CountDown from '@jyb/lib-countdown';
import { ajaxPost, addCssText, normalizeElement } from './util';

/* eslint max-len: "off" */
const DX_CAPTCHA_ID = '__dx-captcha';
const defaultOptions = {
  el: `#${DX_CAPTCHA_ID}`,
  disabled: false,
  cssText: '.dx_captcha_clickword_msg{font-size: 0;}.dx_captcha_clickword_msg .dx-msg-info,.dx_captcha_clickword_msg .dx-msg-error{font-size: 12px !important;}',
  reqHost: window.interface_env || '',
  captchaOptions: {
    appId: 'f57049edfd9daf906079dd8442fabd92'
  }
};

const BASE_INDEX_URL = '/base/index';
const BASE_CODE_URL = '/base/code';
const SMS_CODE_CMD = '42010101';
const SMS_CODE_BY_VERFIY_CMD = '42010121';

class SmsCode {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.captchaOptions = Object.assign({}, defaultOptions.captchaOptions, this.options.captchaOptions);

    this.$dxCaptcha = document.querySelector(this.options.el);
    this.dxCaptcha = null;
    this.init();
  }
  initCssText() {
    // 修改验证码部分默认样式
    addCssText(this.options.cssText);
  }
  initCaptchaElement() {
    if (!this.$dxCaptcha) {
      this.$dxCaptcha = document.createElement('div');
      this.$dxCaptcha.setAttribute('id', DX_CAPTCHA_ID);
      document.body.appendChild(this.$dxCaptcha);
    }
  }
  init() {
    // 初始化滑动验证码
    if (!this.options.disabled) {
      this.initCssText();
      this.initCaptchaElement();
      this.dxCaptcha = new DxCaptcha(this.options.el, {
        captchaOptions: this.captchaOptions
      });
    }
  }
  getCode(node, mobile, options = {}) {
    const getCodeDefaultOptions = {
      scene: 1,
      mobileReg: /^1[23456789]\d{9}$/,
      disabledCls: 'btn-disabled',
      countDownTime: 60,
      countDownProcessCallback(el, time) {
        el.innerText = `${time}s`;
      },
      countDownEndCallback(el) {
        el.innerText = '获取验证码';
      }
    };

    node = normalizeElement(node);
    options = Object.assign({}, getCodeDefaultOptions, options);

    if (!options.mobileReg.test(mobile)) {
      tips.showError('请输入正确的手机号码');
      return false;
    }
    if (node.classList.contains(options.disabledCls)) {
      return false;
    }

    if (this.dxCaptcha) {
      this.dxCaptcha.show((token) => {
        this._getSmsCode(BASE_CODE_URL, {
          cmd: SMS_CODE_BY_VERFIY_CMD,
          scene: options.scene,
          tel: mobile,
          verify_token: token
        }, node, options);
      });
    } else {
      this._getSmsCode(BASE_INDEX_URL, {
        cmd: SMS_CODE_CMD,
        tel: mobile
      }, node, options);
    }
  }
  _getSmsCode(url, params, node, options) {
    const countDownProcessCallback = options.countDownProcessCallback;
    const countDownEndCallback = options.countDownEndCallback;
    node.classList.add(options.disabledCls);
    ajaxPost({
      url: `${this.options.reqHost}${url}?_ts=${Date.now()}`,
      data: params
    }, (json) => {
      /* eslint eqeqeq: "off" */
      if (json.code == 0) {
        tips.showError('发送成功');
        /* eslint no-new: "off" */
        new CountDown({
          time: options.countDownTime,
          processCallback(time) {
            if (typeof countDownProcessCallback === 'function') {
              countDownProcessCallback(node, time);
            }
          },
          endCallback() {
            node.classList.remove(options.disabledCls);
            if (typeof countDownProcessCallback === 'function') {
              countDownEndCallback(node);
            }
          }
        });
      } else {
        tips.showError(json.msg);
        node.classList.remove(options.disabledCls);
      }
    }, () => {
      tips.showError('网络错误');
      node.classList.remove(options.disabledCls);
    });
  }
}


export default SmsCode;
