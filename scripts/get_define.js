/**
 * 获取库信息
 */

const path = require('path');

const hasOwn = Object.prototype.hasOwnProperty;

// 必须定义的字段
const libDefineFields = ['moduleName', 'devDest', 'prodDest'];

function checkFields(obj) {
  let counter = 0;

  for (const k in obj) {
    if (hasOwn.call(obj, k) && libDefineFields.indexOf(k) > -1) {
      counter++;
    }
  }

  return libDefineFields.length === counter;
}

function getLibDefine() {
  const libPackage = require(path.join(process.cwd(), 'package.json'));
  const libDefine = libPackage.libDefine || {};

  if (!checkFields(libDefine)) {
    console.log(`libDefine中必须定义${libDefineFields.join(',')}`);
    return null;
  }

  return libDefine;
}

module.exports = getLibDefine;
