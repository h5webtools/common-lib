/**
 * jfet配置
 */

const pkg = require('./package.json');

module.exports = {
  doc() {
    return {
      name: pkg.name,
      token: '21232F297A57A5A743894A0E4A801FC3',
      uploadUrl: 'http://fe.doc.jyb.com/api/upload'
    };
  }
};
