/**
 * lib
 */

class EventEmit {
  constructor() {
    this.listeners = {};
  }

  /**
   * 自定义事件绑定
   * @param {String} name
   * @param {Function} fn
   * @param {Boolean} [one]
   */
  on(name, fn, one) {
    let ls = this.listeners[name];

    // 如果该eventName已经存在，则将该fn转换为数组
    if (!ls) {
      ls = this.listeners[name] = [];
    }
    ls.push(fn);
    if (one) {
      ls.once = true;
    }
  }

  /**
   * 是否有事件
   * @param {String} name
   */
  has(name) {
    return this.listeners[name];
  }

  /**
   * 事件只执行一次
   * @param {String} name
   * @param {Function} fn
   */
  once(name, fn) {
    this.on(name, fn, true);
  }

  /**
   * 触发事件
   * @param {String} name
   */
  emit(name, ...args) {
    const ls = this.listeners[name];

    if (!ls) {
      return;
    }

    for (let i = 0, l = ls.length; i < l; i++) {
      ls[i].apply(this, args);
    }
    if (ls.once) {
      delete this.listeners[name];
    }
  }

  /**
   * 关闭指定的自定义事件
   * @param name
   */
  off(name) {
    delete this.listeners[name];
  }

  /**
   * 关闭所有的自定义事件
   */
  offAll() {
    this.listeners = {};
  }
}

export const instanceEvent = new EventEmit();
export default EventEmit;
