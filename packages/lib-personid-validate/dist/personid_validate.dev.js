(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.personidValidate = factory());
}(this, (function () { 'use strict';

/**
 * 校验
 */

/**
 * 校验身份证号是否符合规则
 * @param option 配置项
 */
function validatePersonId(option) {
  var age = 0;
  var year = option.personId.substr(6, 4);
  var month = parseInt(option.personId.substr(10, 2), 10);
  var day = parseInt(option.personId.substr(12, 2), 10);
  var birthday = option.personId.substr(6, 8);
  var date = new Date(year + '/' + month + '/' + day);

  // 先校验生日是否在正确范围内
  if (birthday !== dateToString(date)) {
    return option.errMsg;
  }

  // 有年龄判断要求
  if (option.minAge || option.maxAge) {
    // 判断用户的年龄
    var serverDate = new Date(option.timeStamp * 1000);
    var serverMonth = serverDate.getMonth() + 1;
    var serverDay = serverDate.getDate();

    age = serverDate.getFullYear() - year;
    // 判断月份是否满足条件，如果当前月份大于身份证内的月份，则年龄要减1
    if (serverMonth < month) {
      age -= 1;
    } else if (serverMonth === month) {
      // 月份相同的情况下，判断日期
      if (serverDay < day) {
        age -= 1;
      } else if (serverDay >= day) {
        age += 1;
      }
    } else {
      age += 1;
    }

    // 判断年龄在允许区间内，判断身份证格式
    if (option.minAge && option.minAge > age) {
      return option.ageMsg;
    }
    if (option.maxAge && option.maxAge <= age) {
      return option.ageMsg;
    }
  }

  return verify(option);
}

/**
 * 校验身份证号
 * @param option 配置项
 */
function verify(option) {
  var validStr = '10X98765432'; // 最后一位身份证的号码
  var baseNum = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 1-17系数
  var len = option.personId.length - 1;
  var sum = 0;

  for (var i = 0; i < len; i++) {
    sum += option.personId[i] * baseNum[i];
  }

  // 计算出来的最后一位身份证号码
  if (option.personId[len].toUpperCase() !== validStr[sum % 11]) {
    return option.errMsg;
  }
  return true;
}

/**
 * 日期转string
 * @param {Object} date
 * @return {String}
 */
function dateToString(date) {
  if (date instanceof Date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return String(year) + String(month) + String(day);
  }
  return '';
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * 校验身份证
 */

var defaultOptions = {
  minAge: 0, // 最小年龄
  maxAge: 0, // 最大年龄
  ageMsg: '', // 年龄判断失败提示信息
  timeStamp: Date.now() / 1000, // 时间戳，判断年龄区间的时候，会获取相对该时间的年龄进行判断，获取当前时间的时间戳应该为：Date.now()/1000
  personId: '0', // 身份证号码
  errMsg: '身份证号格式错误' // 身份证号码判断失败提示
};

function personIdValidate(options) {
  return validatePersonId(_extends({}, defaultOptions, options));
}

return personIdValidate;

})));
//# sourceMappingURL=personid_validate.dev.js.map
