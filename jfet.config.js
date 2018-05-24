/**
 * jfet配置
 */

const pkg = require('./package.json');

module.exports = {
  doc() {
    return {
      name: pkg.name,
      title: '前端公共库',
      desc: '公共库文档，包含每个模块的使用，API，例子等等。',
      token: '21232F297A57A5A743894A0E4A801FC3',
      uploadUrl: 'http://doc.fe.jyb.com/api/upload'
    };
  }
};
