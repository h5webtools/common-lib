(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.scrollTo = factory());
}(this, (function () { 'use strict';

/**
 * 滚动到指定位置
 */

function doScroll(element, target, attr) {
  var curLeft = element[attr]; // 当前滚动条的位置
  var diff = target - curLeft; // 目标差值

  if (diff === 0) {
    return;
  }
  // 步长重新计算
  var step = Math.abs(diff / 10);
  var scroll = function scroll() {
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

function left(element, target) {
  doScroll(element, target, 'scrollLeft');
}

function top(element, target) {
  doScroll(element, target, 'scrollTop');
}

var index = {
  left: left,
  top: top
};

return index;

})));
//# sourceMappingURL=scroll_to.dev.js.map
