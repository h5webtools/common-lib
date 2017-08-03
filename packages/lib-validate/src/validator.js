/**
 * 校验器
 */

import * as util from './util';

const validators = [{
  /**
   * required validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {String} options.errMsg
   * @param {String} options.itemName
   */
  name: 'required',
  callback(el, value, options) {
    const tagName = el.tagName;
    const validResult = [];

    if (value === '') {
      validResult.push(options.errMsg || `您输入的${options.itemName}不能为空`);
    } else if (tagName === 'SELECT' && !options.reg.test(value)) {
      validResult.push(options.errMsg || `请选择${options.itemName}`);
    }

    return validResult;
  }
}, {
  /**
   * format validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Regex} options.reg
   * @param {String} options.itemName
   * @param {String} options.errMsg
   */
  name: 'format',
  callback(el, value, options) {
    const validResult = [];

    if (!options.reg.test(value)) {
      validResult.push(options.errMsg || `您输入的${options.itemName}格式有误`);
    }

    return validResult;
  }
}, {
  /**
   * length validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.dByte
   * @param {Number} options.maxLen
   * @param {Number} options.minLen
   * @param {String} options.errMsg
   * @param {String} options.itemName
   */
  name: 'length',
  callback(el, value, options) {
    const validResult = [];
    let valLen = value.length;

    if (options.dByte) {
      valLen = (value.replace(/[\u0391-\uFFE5]/g, '__')).length;
    }

    if (options.maxLen && valLen > options.maxLen) {
      validResult.push(options.errMsg || `您输入的${options.itemName}超过${options.maxLen}个字符`);
    } else if (options.minLen && valLen < options.minLen) {
      validResult.push(options.errMsg || `您输入的${options.itemName}不足${options.minLen}个字符`);
    }

    return validResult;
  }
}, {
  /**
   * range validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Number} options.minVal
   * @param {Number} options.maxVal
   * @param {String} options.errMsg
   */
  name: 'range',
  callback(el, value, options) {
    const validResult = [];

    if ((options.minVal && value < options.minVal) || (options.maxVal && value > options.maxVal)) {
      validResult.push(options.errMsg || `请输入${options.minVal}-${options.maxVal}的数字`);
    }

    return validResult;
  }
}, {
  /**
   * compare validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Object|String} options.compareWith
   * @param {String} options.itemName
   * @param {String} options.errMsg
   */
  name: 'compare',
  callback(el, value, options) {
    const validResult = [];

    if (options.compareWith) {
      const targetNode = this.cacheNodes[options.compareWith] || util.getElement(options.compareWith);

      if (targetNode.value.trim() !== value) {
        validResult.push(options.errMsg || `两次输入的${options.itemName}不一致`);
      }
    }

    return validResult;
  }
}];

export default validators;
