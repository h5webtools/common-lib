/**
 * build
 */

const path = require('path');
const rollup = require('rollup');
const rollupWatch = require('rollup-watch');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const eslint = require('rollup-plugin-eslint');
const getLibDefine = require('./get_define');

const cwd = process.cwd();

// env
const isProd = process.env.NODE_ENV === 'production';

// 获取package libDefine字段
const libDefine = getLibDefine();

if (libDefine) {
  const rollupConfig = {
    entry: path.join(cwd, 'src/index.js'),
    plugins: [
      resolve(),
      eslint({
        include: path.join(cwd, 'src/**/**.js'),
        exclude: []
      }),
      babel({
        exclude: path.join(cwd, 'node_modules/**')
      }),
      (isProd && uglify())
    ]
  };

  const outputConfig = {
    format: 'umd',
    moduleName: libDefine.moduleName,
    dest: isProd ? path.join(cwd, libDefine.prodDest) : path.join(cwd, libDefine.devDest),
    sourceMap: !isProd
  };

  if (isProd) {
    rollup.rollup(rollupConfig).then((bundle) => {
      bundle.write(outputConfig);
    });
  } else {
    rollupWatch(rollup, Object.assign({}, rollupConfig, outputConfig)).on('event', (ev) => {
      console.log(ev);
    });
  }
}
