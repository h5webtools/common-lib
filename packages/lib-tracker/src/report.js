/**
 * 上报
 */

function report(options = {}) {
  const commonParams = {
    link: location.href,
    ua: navigator.userAgent,
    title: document.title,
    size: `${document.documentElement.clientWidth}*${document.documentElement.clientHeight}`,
    referer: document.referer || '',
    timestamp: new Date().getTime(),
    // msg,
    // url,
    // line,
    // col,
    // errStack: stack.toString(),
  };
  const reportInfo = Object.assign(commonParams, options);
  const params = [];
  for (const key in reportInfo) {
    params.push(`${key}=${encodeURIComponent(reportInfo[key])}`);
  }

  const url = `/report/errors?${params.join('&')}`;
  const img = new Image();

  img.src = url;
}

export default report;
