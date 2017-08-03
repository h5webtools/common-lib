/**
 * 校验身份证
 */

import * as validate from './validate';

const defaultOptions = {
  minAge: 0, // 最小年龄
  maxAge: 0, // 最大年龄
  ageMsg: '', // 年龄判断失败提示信息
  timeStamp: Date.now() / 1000, // 时间戳，判断年龄区间的时候，会获取相对该时间的年龄进行判断，获取当前时间的时间戳应该为：Date.now()/1000
  personId: '0', // 身份证号码
  errMsg: '身份证号格式错误' // 身份证号码判断失败提示
};

function personIdValidate(options) {
  return validate.validatePersonId(Object.assign({}, defaultOptions, options));
}

export default personIdValidate;
