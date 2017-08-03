/**
 * 校验
 */

/**
 * 校验身份证号是否符合规则
 * @param option 配置项
 */
export function validatePersonId(option) {
  let age = 0;
  const year = option.personId.substr(6, 4);
  const month = parseInt(option.personId.substr(10, 2), 10);
  const day = parseInt(option.personId.substr(12, 2), 10);
  const birthday = option.personId.substr(6, 8);
  const date = new Date(`${year}/${month}/${day}`);

  // 先校验生日是否在正确范围内
  if (birthday !== dateToString(date)) {
    return option.errMsg;
  }

  // 有年龄判断要求
  if (option.minAge || option.maxAge) {
    // 判断用户的年龄
    const serverDate = new Date(option.timeStamp * 1000);
    const serverMonth = serverDate.getMonth() + 1;
    const serverDay = serverDate.getDate();

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
export function verify(option) {
  const validStr = '10X98765432'; // 最后一位身份证的号码
  const baseNum = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 1-17系数
  const len = option.personId.length - 1;
  let sum = 0;

  for (let i = 0; i < len; i++) {
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
export function dateToString(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return String(year) + String(month) + String(day);
  }
  return '';
}
