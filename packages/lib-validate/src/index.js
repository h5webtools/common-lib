/**
 * 表单校验
 */

import extend from '@jyb/lib-extend';
import validatorsSet from './validator';
import * as util from './util';

/**
 * const validObj = new Validate([{
 *  node: '',
 *  event: ['input'],
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

const defaultOptions = {
  eventInterval: 200 // 事件触发间隔时间
};

class Validate {
  constructor(rules = [], options = {}) {
    if (!Array.isArray(rules)) {
      throw new Error('rules格式有误');
    }
    this.rules = extend(true, [], rules);
    this.options = extend({}, defaultOptions, options);
    this.allValidResult = []; // 所有校验结果
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
    this._bindEvent();
  }

  /**
   * 绑定事件
   */
  _bindEvent() {
    this.rules.forEach((rule) => {
      const node = this.getRealNode(rule.node);

      if (rule.event) {
        const eventFn = util.debounce(() => { this.executeRule(rule); }, this.options.eventInterval);
        util.uniqueArray(util.toArray(rule.event)).forEach((ev) => {
          node.addEventListener(ev, () => { eventFn(); });
        });
      }
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
    this.allValidResult = [];
    this.rules.forEach((rule) => {
      this.executeRule(rule);
    });

    return this.allValidResult;
  }

  /**
   * 执行规则
   * @param {Array} rule
   */
  executeRule(rule) {
    if (rule.disabled) return;

    let validResult = [];
    const validators = rule.validators || [];
    const node = this.getRealNode(rule.node);
    const val = node.value.trim();

    util.each(validators, (i, obj) => {
      const { name, options } = obj;
      const validator = this.validators[name];

      if (validator) {
        validResult = validResult.concat(validator.call(this, node, val, options || {}) || []);
        return validResult.length === 0;
      }
      return true;
    });

    this.allValidResult = this.allValidResult.concat(validResult);
    rule.callback && rule.callback(node, validResult, val);
  }
}

export default Validate;
