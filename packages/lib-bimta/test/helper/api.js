/**
 * window API
 */

window.setTimeout = function(cb) {
  if (typeof cb === 'function') {
    cb();
  }
};
