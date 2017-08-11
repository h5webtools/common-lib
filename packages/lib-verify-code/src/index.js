/**
 * 验证码
 */

import extend from '@jyb/lib-extend';
import util from './util';
import { getTypes } from './types';

const defaultOptions = {
  ajax: {}, // ajax配置
  onBefore() { return true; }, // 发送请求前，如果return false将不执行
  onSuccess() {}, // 请求成功，参数为响应的数据
  onError() {} // 请求失败，参数为错误信息
};

class VerifyCode {
  /**
   * 获取验证码
   * @param {String} type 类型，取值可以有sms,img,voice
   * @param {Object} [options] 选项
   * @param {String} [env] 接口环境，默认prod
   */
  constructor(type = '', options = {}, env = 'prod') {
    const ajaxOptions = getTypes(env, type);

    this.type = type;
    this.options = extend(true, defaultOptions, { ajax: ajaxOptions }, options);
    this._ajaxLock = false;
    this._init();
  }

  _init() {
    const { ajax, onBefore, onSuccess, onError } = this.options;

    if (this._ajaxLock || !onBefore()) {
      return false;
    }

    this._ajaxLock = true;
    util.ajaxPost(ajax, (json) => {
      this._ajaxLock = false;
      onSuccess(json);
    }, (e) => {
      this._ajaxLock = false;
      onError(e);
    });
    return true;
  }

  refresh() {
    this._init();
  }
}

export default VerifyCode;
