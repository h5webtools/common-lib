/**
 * onerror
 */

function onError(options = {}, cb) {
  // 先存下旧的onerror事件处理函数
  const oldOnErrorHandler = window.onerror;

  /* eslint-disable space-before-function-paren */
  window.onerror = function(msg, url, line, col, err = {}) {
    /* eslint-disable prefer-rest-params */
    const args = Array.prototype.slice.call(arguments);

    if (oldOnErrorHandler) {
      oldOnErrorHandler.apply(window, args);
    }

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

    cb && cb({
      msg,
      url,
      line,
      col,
      errStack: stack.toString()
    });

    return !options.debug;
  };
}

export default onError;
