/**
 * types
 */

// 接口环境
const urlEnv = {
  proxy: '/proxy/base/index',
  test: 'https://swebsit.jyblife.com/base/index',
  prod: 'https://sweb.jyblife.com/base/index'
};

/**
 * 类型
 */
export const types = {
  sms: { // 短信验证码
    data: {
      cmd: '42010101'
    }
  },
  img: { // 图形验证码
    data: {
      cmd: '42010102'
    }
  },
  voice: { // 语音验证码
    data: {
      cmd: '42010106'
    }
  }
};

/**
 * 获取类型
 * @param {String} env 当前接口环境，test/prod
 * @param {String} name 类型名称
 * @return {Object}
 */
export function getTypes(env, name) {
  if (!urlEnv[env]) {
    throw new Error(`${env}环境不存在，取值必须为：${Object.keys(urlEnv).join(',')}`);
  }

  if (!types[name]) {
    throw new Error(`${name}类型不存在，取值必须为：${Object.keys(types).join(',')}`);
  }

  return {
    url: urlEnv[env],
    data: types[name].data
  };
}
