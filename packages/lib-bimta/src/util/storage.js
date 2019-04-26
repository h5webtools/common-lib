import * as _ from './index';

export default class Storage {
  constructor(key) {
    this._data = {};
    this._key = key;
    const str = _.getCookie(this._key);
    if (str) {
      try {
        this._data = JSON.parse(str);
      } catch (e) {
        this._data = {};
      }
    }
  }

  get(k) {
    return this._data[k] || '';
  }

  set(k, val) {
    this._data[k] = val;
    _.setCookie(this._key, JSON.stringify(this._data), 1);
  }
}
