/**
 * performance
 * @see https://www.w3.org/TR/navigation-timing/#sec-window.performance-attribute
 */

/**
 * 性能数据，使用Navigation Timing API
 * @return {Object}
 */
function getTiming() {
  const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

  if (typeof performance === 'undefined') {
    return {};
  }

  const timing = performance.timing;
  const api = {};

  if (timing) {
    // Time to first paint
    if (typeof api.firstPaint === 'undefined') {
      // All times are relative times to the start time within the
      // same objects
      let firstPaint = 0;

      if (window.chrome && window.chrome.loadTimes) { // Chrome
        // Convert to ms
        firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
        api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
      } else if (typeof window.performance.timing.msFirstPaint === 'number') { // IE
        firstPaint = window.performance.timing.msFirstPaint;
        api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
      }
    }

    // Total time from start to load
    api.loadTime = timing.loadEventEnd - timing.fetchStart;
    // Time spent constructing the DOM tree
    api.domReadyTime = timing.domComplete - timing.domInteractive;
    // Time consumed preparing the new page
    api.readyStart = timing.fetchStart - timing.navigationStart;
    // Time spent during redirection
    api.redirectTime = timing.redirectEnd - timing.redirectStart;
    // AppCache
    api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
    // Time spent unloading documents
    api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
    // DNS query time
    api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
    // TCP connection time
    api.connectTime = timing.connectEnd - timing.connectStart;
    // Time spent during the request
    api.requestTime = timing.responseEnd - timing.requestStart;
    // Request to completion of the DOM loading
    api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
    // Load event time
    api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
  }

  return api;
}

export default getTiming;

