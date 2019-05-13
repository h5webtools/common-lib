/* eslint-disable */

/**
 * 获取红包列表
 * @param couponData  红包数据
 * @param prdId       当前选中的套餐id
 * @param amount      当前套餐金额（分）
 * @param callback    回调函数
 */
function getCouponList(couponData, prdId, amount) {
  if (!couponData || !couponData.length) {
    return [];
  }

  let matchItem = [],
    typeId, // 红包类型
    amountLimit, // 红包使用条件
    fitPrds; // 匹配的产品列表
  couponData.forEach((item) => {
    // 红包金额转整数
    item.couponAmount = parseInt(item.amount, 10);
    amountLimit = item.ord_amt_lmt && JSON.parse(item.ord_amt_lmt);
    fitPrds = item.fit_prds ? item.fit_prds.split(',') : []; // 转换成数组
    typeId = item.type_id;
    /**
       * fit_type=0   全部通用红包
       * fit_type=1   加油通用（H5不适用）
       * fit_type=2   投资通用（H5不适用）
       * fit_type=3   指定套餐使用
       */
    if (item.fit_type == 3) {
      // 套餐不满足匹配
      if (fitPrds && fitPrds.indexOf(prdId) == -1) {
        return false;
      }
    } else if (item.fit_type == 1 || item.fit_type == 2) {
      return false;
    }

    // 满足上述条件之后，判断套餐金额是否满足该红包的使用条件
    const limit = amountLimit && (amountLimit[prdId] || amountLimit[0]);
    if (limit) {
      // 找到对应套餐的红包，判断其金额，记录该红包信息
      item.amountVal = parseInt(limit, 10);
      if (parseInt(limit, 10) <= amount) {
        matchItem.push(item);
      }
    } else {
      // 通用红包
      matchItem.push(item);
    }

    // 处理按比例红包
    if (typeId == 4) {
      const reduce = getRatioMatch(item, amount);
      if (reduce == 0) {
        matchItem.pop();
      }
    }
    // 处理折扣红包
    if (typeId == 5 || typeId == 7) {
      const reduce = getDiscountMatch(item, amount);
      if (reduce == 0) {
        matchItem.pop();
      } else if (!item.amount) {
        item.amount = reduce;
      }
    }

    if (matchItem.length > 0) {
      // 找到金额最大的一个
      matchItem.sort((a, b) => {
        if (a.couponAmount * 1 > b.couponAmount * 1) {
          return -1;
        }
        return 1;
      });
    }
  });

  // 过滤出当前周期内不可以用的折扣红包
  const curNotUseCoupons = matchItem.filter(item => (item.type_id == 5 && item.is_period_use == 0));

  // 过滤出可以用的折扣红包
  const curUseCoupons = matchItem.filter(item => (item.type_id == 5 && item.is_period_use == 1));

  // 过滤出当前可用的非折扣红包
  const curCommonCoupons = matchItem.filter(item => (item.type_id != 5));

  // 将三种红包按照序列排序 可用的折扣红包 》 普通红包 》 不可用的折扣红包
  const filterCoupons = curUseCoupons.concat(curCommonCoupons).concat(curNotUseCoupons);

  return filterCoupons;
}


// 获取比例红包数据
function getRatioMatch(item, amount) {
  let rule = item.detail,
    reduceAmount = (amount * rule.deduct_amt) / 100,
    remain = parseInt(rule.remain_amt, 10);
  if (remain > 0) {
    reduceAmount = reduceAmount > remain ? remain : reduceAmount;
    item.couponAmount = +reduceAmount.toFixed(2);
  } else {
    reduceAmount = 0;
  }
  return reduceAmount;
}

// 获取折扣红包
function getDiscountMatch(item, amount) {
  // if(item.is_period_use == 0){//在本周期是否可用了，当type_id=5时有效。1-可用、0-不可用
  //     return 0;
  // }
  let rule = item.detail,
    reduceAmount = amount - (amount * rule.value / 100),
    max_deduct_lmt = parseInt(rule.max_deduct_lmt, 10);
  item.max_deduct_lmt = +(max_deduct_lmt).toFixed(2);
  if (max_deduct_lmt > 0) {
    reduceAmount = reduceAmount > max_deduct_lmt ? max_deduct_lmt : reduceAmount;
    item.couponAmount = +reduceAmount.toFixed(2);
  } else {
    reduceAmount = 0;
  }

  return reduceAmount;
}

exports.getCouponList = getCouponList;
