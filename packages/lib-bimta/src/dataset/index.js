/**
 * 自定义数据属性处理
 */

import * as _ from '../util/index';
import * as log from '../util/log';

const DATA_REGEX = /data\-(\w*)\-(\w*)/;

// 定义自定义属性
const customAttr = {
  ea: 'data-stat-ea',
  eb: 'data-stat-eb',
  ec: 'data-stat-ec',
  visit: 'data-stat-visit',
  para: 'data-stat-para'
};

// 默认配置
const defaultOptions = {
  debug: false // 是否调试
};

class DataAttribute {
  /**
   * 数据属性
   * @param {Object} options
   * @param {Boolean} options.debug 是否调试
   */
  constructor(options) {
    this.options = _.assign(defaultOptions, options || {});
    this.attrs = customAttr;
    this.alias = {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    const { debug } = this.options;

    // 生成alias
    for (let k in customAttr) {
      const curr = customAttr[k];

      if (DATA_REGEX.test(curr)) {
        this.alias[k] = customAttr[k].replace(DATA_REGEX, function(m, $1, $2) {
          return $1 + $2.charAt(0).toUpperCase() + $2.slice(1);
        });
      } else if (debug) {
        log.warn(`${k}, ${curr} 格式有误`);
      }
    }
  }

  /**
   * 获取数据属性的值，返回对象
   * @param {Object} obj 用来保存数据属性的值
   * @param {Array} attrs 用于数据属性顺序
   * @param {Object} dataset 获取到的数据集合
   * @return {Object}
   */
  getDataSetObj(obj = {}, attrs = [], dataset = {}) {
    attrs.forEach((attr) => {
      if (dataset[attr] !== void 0) {
        obj[attr] = dataset[attr];
      }
    });

    return obj;
  }

  /**
   * 处理数据属性的值，返回数组
   * @param {Object} obj 数据属性的值
   * @param {Array} attrs 用于数据属性顺序
   * @return {Array}
   */
  getDataSetArr(obj = {}, attrs = []) {
    return attrs.map((attr) => {
      return obj[attr];
    });
  }

  /**
   * 检查数据属性的值
   * @param {Object} obj 数据属性的值
   * @param {Array} attrs 用于数据属性顺序
   * @return {Boolean}
   */
  checkDataSetValue(obj = {}, attrs = []) {
    let isOk = true;

    for (let i = 0, l = attrs.length; i < l; i++) {
      if (obj[attrs[i]] === void 0) {
        isOk = false;
        break;
      }
    }

    return isOk;
  }
}

export default DataAttribute;
