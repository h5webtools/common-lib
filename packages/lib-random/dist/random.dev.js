(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.random = factory());
}(this, (function () { 'use strict';

/**
 * random
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */

/**
 * 得到一个大于等于0，小于1之间的随机数
 * @return {Number}
 */
function getRandom() {
  return Math.random();
}

/**
 * 得到一个两数之间的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机数。这个值比min大（可能与min相等）, 以及比max小(但是不等于max).
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * 得到一个两数之间的随机整数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机整数。这个值比min大（可能与min相等，如果min不是整数，那么下一个整数大于min）, 以及比max小(但是不等于max).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机整数。返回值可能与最小值或者最大值相等
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取一个随机布尔值
 * @return {boolean} 随机true/false
 */
function getRandomBool() {
  return Math.random() >= 0.5;
}

var index = {
  getRandom: getRandom,
  getRandomArbitrary: getRandomArbitrary,
  getRandomInt: getRandomInt,
  getRandomIntInclusive: getRandomIntInclusive,
  getRandomBool: getRandomBool
};

return index;

})));
//# sourceMappingURL=random.dev.js.map
