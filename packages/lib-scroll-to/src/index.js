/**
 * 滚动到指定位置
 */

function doScroll(element, target, attr) {
  let curLeft = element[attr]; // 当前滚动条的位置
  const diff = target - curLeft; // 目标差值

  if (diff === 0) {
    return;
  }
  // 步长重新计算
  const step = Math.abs(diff / 10);
  const scroll = () => {
    if (diff > 0) {
      curLeft += step;
      if (curLeft >= target) {
        curLeft = target;
      }
    } else if (diff < 0) {
      curLeft -= step;
      if (curLeft <= target) {
        curLeft = target;
      }
    }

    element[attr] = curLeft;
    if (curLeft !== target) {
      requestAnimationFrame(scroll);
    }
  };
  scroll();
}

/**
 * scrollLeft
 * @param {HTMLElement} element 元素
 * @param {Number} target 滚动到的位置
 */
function left(element, target) {
  doScroll(element, target, 'scrollLeft');
}

/**
 * scrollTop
 * @param {HTMLElement} element 元素
 * @param {Number} target 滚动到的位置
 */
function top(element, target) {
  doScroll(element, target, 'scrollTop');
}

export default {
  left,
  top
};
