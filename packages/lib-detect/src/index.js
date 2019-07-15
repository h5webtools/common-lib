/**
 * 环境
 */

let env = null;

function detect(regain = false, ua = '') {
  if (!regain && env) return env;

  env = {};
  ua = ua || window.navigator.userAgent;

  const ualc = ua.toLowerCase();

  /* eslint-disable no-useless-escape */
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const jyb = ua.match(/jiayoubao[^\d]*(\d+\.\d+\.\d+)/);
  const inJybApp = /jiayoubao/.test(ualc); // 加油宝app
  const inWX = /micromessenger/.test(ualc); // 微信
  const inQQ = /qq\//.test(ualc); // QQ

  env.weixin = inWX;
  env.qq = inQQ;

  // jyb
  if (inJybApp) {
    env.jyb = true;
    env.version = jyb ? jyb[1] : null;
  }

  // android
  if (android) {
    env.android = true;
    env.version = android[2];
  }

  // ios
  if (iphone && !ipod) {
    env.ios = env.iphone = true;
    env.version = iphone[2].replace(/_/g, '.');
  }

  if (ipad) {
    env.ios = env.ipad = true;
    env.version = ipad[2].replace(/_/g, '.');
  }

  if (ipod) {
    env.ios = env.ipod = true;
    env.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }

  return env;
}

detect.env = detect();

export default detect;
