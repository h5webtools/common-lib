/**
 * util
 */

export function extend(opt, target) {
  for (const name in opt) {
    target[name] = opt[name];
  }
}

// 绑定事件方法
export function bind(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent(`on${type}`, handler);
  } else {
    element[`on${type}`] = handler;
  }
}

// 修正超出边界的滚动
export function fixTarget(dir, target, max) {
  // left or up, 当元素offset=最大滚动值时将offset变为0
  if (dir < 0 && Math.abs(target) >= max) {
    return 0;
  }

  // right or down，当元素offset=0时将offset变为最大滚动值
  if (dir > 0 && target >= 0) {
    return -max;
  }
  return target;
}

