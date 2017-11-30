/**
 * 表单校验
 */

import validatorsSet from './validator';
import * as util from './util';

/**
 * const validObj = new Validate([{
 *  node: '',
 *  validators: [{
 *    name: 'required',
 *    disabled: true,
 *    options: {
 *      itemName: '',
 *      emptyMsg: ''
 *    }
 *  }],
 *  callback(el, validResult) {}
 * }]);
 * validObj.addValidator('required', (el, value, options) => {});
 * validObj.validate();
 */
class Validate {
  constructor(rules = []) {
    this.rules = rules;
    this.validators = {};
    this.cacheNodes = {};
    this._init();
  }

  /**
   * 初始化
   */
  _init() {
    validatorsSet.forEach((validator) => {
      this.addValidator(validator.name, validator.callback);
    });
  }

  /**
   * 添加校验器
   * @param {String} name 名称
   * @param {Function} validator 函数
   */
  addValidator(name, validator) {
    if (this.validators[name]) {
      throw new Error(`名称为${name}的校验器已经存在`);
    }
    this.validators[name] = validator;
  }

  /**
   * 获取元素
   * @param {String|HTMLElement} node
   * @return {HTMLElement}
   */
  getRealNode(node) {
    if (util.isString(node)) {
      if (this.cacheNodes[node]) {
        node = this.cacheNodes[node];
      } else {
        this.cacheNodes[node] = util.getElement(node);
        node = this.cacheNodes[node];
      }
    } else {
      node = util.getElement(node);
    }
    return node;
  }

  /**
   * 设置规则状态
   * @param {String|Number} node 字符串或者rule数组下标
   * @param {Boolean} 是否禁用，默认为false
   */
  setRuleStatus(node, isDisable = false) {
    const rules = this.rules;

    if (util.isString(node)) {
      rules.forEach((rule) => {
        if (rule.node === node) {
          // 规则设置为禁用
          rule.disabled = isDisable;
        }
      });
    } else if (util.isNumber(node)) {
      if (util.isObject(rules[node])) {
        // 规则设置为禁用
        rules[node].disabled = isDisable;
      }
    } else {
      throw new Error('找不到规则');
    }
  }

  /**
   * 校验
   */
  validate() {
    let results = [];

    this.rules.forEach((rule) => {
      if (rule.disabled) return;
      const node = this.getRealNode(rule.node);
      const validators = rule.validators || [];
      const val = node.value.trim();
      let validResult = [];

      util.each(validators, (i, obj) => {
        const { name, options } = obj;
        const validator = this.validators[name];

        if (validator) {
          validResult = validResult.concat(validator.call(this, node, val, options || {}) || []);
          return validResult.length === 0;
        }
        return true;
      });

      results = results.concat(validResult);
      rule.callback && rule.callback(node, validResult, val);
    });

    return results;
  }
}

export default Validate;
