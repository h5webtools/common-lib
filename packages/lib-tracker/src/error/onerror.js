/**
 * onerror
 */

/**
 * onerror事件
 * @param {String} msg 信息
 * @param {String} url 链接
 * @param {String} line 行号
 * @param {String} col 列号
 * @param {Object} err 错误对象
 */
function errorHandler(cb, msg, url, line, col, err) {
  if (msg !== 'Script error.' && !url) {
    return;
  }
  // 不一定所有浏览器都支持 col 参数
  col = col || (window.event && window.event.errorCharacter) || 0;
  let stack = '';
  if (!err.stack) {
    // 通过 callee 获取堆栈信息
    const ext = [];

    /* eslint-disable no-caller,no-restricted-properties */
    let f = arguments.callee.caller;
    let c = 3; // 拿3层信息
    while (f && (--c > 0)) {
      ext.push(f.toString());
      if (f === f.caller) {
        break;
      }
      f = f.caller;
    }
    stack = ext.join('');
  } else {
    stack = err.stack;
  }

  cb && cb(stack);
}

function onError(cb) {
  window.addEventListener('error', errorHandler.bind(null, cb));
}

export default onError;
