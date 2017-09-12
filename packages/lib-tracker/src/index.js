/**
 * 前端数据采集
 */

import ErrorTracker from './error';
import report from './report';

// 数据采集
const tracker = {
  log(options) {
    report(options);
  }
};

// error
const errorTracker = new ErrorTracker();
tracker.error = errorTracker;
tracker.Error = ErrorTracker;
tracker.captureException = errorTracker.captureException;

export default tracker;
