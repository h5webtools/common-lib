/**
 * build
 */

const path = require('path');
const rollup = require('rollup');
const rollupWatch = require('rollup-watch');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const vue = require('rollup-plugin-vue');
const getLibDefine = require('./get_define');
const dot = require('./plugin/dot');

const cwd = process.cwd();

// env
const isProd = process.env.NODE_ENV === 'production';
const isMin = process.env.NODE_ENV === 'min';

// 获取package libDefine字段
const libDefine = getLibDefine();

if (libDefine) {
  const rollupConfig = {
    entry: path.join(cwd, 'src/index.js'),
    plugins: [
      resolve(),
      commonjs(),
      eslint({
        include: path.join(cwd, 'src/**/**.js'),
        exclude: []
      }),
      dot({
        include: ['**/*.dot', '**/*.tpl'],
        exclude: ['**/index.html'],
        templateSettings: { selfcontained: true }
      }),
      vue({ css: path.join(cwd, 'dist/bundle.css') }),
      babel({
        exclude: path.join(cwd, 'node_modules/**')
      }),
      (isMin && uglify())
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
