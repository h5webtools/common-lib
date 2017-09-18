/**
 * onerror
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
 */

import env from '../util/env';

function onError(options, cb) {
  // 先存下旧的onerror事件处理函数
  const oldOnErrorHandler = window.onerror;

  /* eslint-disable space-before-function-paren */
  window.onerror = function (/* msg, url, line, col, err */) {
    /* eslint-disable prefer-rest-params */
    const args = Array.prototype.slice.call(arguments);

    if (oldOnErrorHandler) {
      oldOnErrorHandler.apply(window, args);
    }

    const error = processError.apply(window, args);
    if (error.msg.indexOf('Script error') > -1 && !error.url) {
      return false;
    }

    cb && cb(error);
    return false;
  };
}

function processError(msg, url, line, col, err) {
  let stack = '';

  if (env.ie) {
    const evt = window.event;
    msg = msg || evt.errorMessage || '';
    url = url || evt.errorUrl || '';
    line = line || evt.errorLine || '';
    col = col || evt.errorCharacter || '';
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    url = url || (err && err.fileName) || '';
    line = line || (err && err.lineNumber) || '';
    col = col || (err && err.columnNumber) || '';
    stack = (err && err.stack) || '';
  }

  return {
    msg,
    url,
    line,
    col,
    errStack: stack.toString()
  };
}

export default onError;
