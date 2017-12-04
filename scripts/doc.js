/**
 * 生成文档
 */

const path = require('path');
const fse = require('fs-extra');

const root = path.join(__dirname, '..');
const catalogFile = path.join(root, 'CATALOG.md');
const summaryFile = path.join(root, 'SUMMARY.md');
const packagesPath = path.join(root, 'packages');

const indexs = [{
  title: '快速开始',
  url: '/packages/{{name}}/doc/QuickStart.md'
}, {
  title: 'API',
  url: '/packages/{{name}}/doc/API.md'
}, {
  title: '更新日志',
  url: '/packages/{{name}}/doc/CHANGELOG.md'
}, {
  title: '例子',
  url: '/packages/{{name}}/doc/Example.md'
}];

const summaryContent = [];
const catalogContent = [];
const dir = fse.readdirSync(packagesPath);

// summary
summaryContent.push('# 目录');
summaryContent.push('* [主页](/README.md)');
summaryContent.push('* [目录](/CATALOG.md)');

// catalog
catalogContent.push('# 目录');

dir.filter((d) => {
  try {
    return fse.statSync(path.join(packagesPath, d)).isDirectory();
  } catch (e) {
    return false;
  }
}).forEach((d) => {
  summaryContent.push(`* [${d}](/packages/${d}/README.md)`);
  indexs.forEach((idx) => {
    summaryContent.push(`  * [${idx.title}](${idx.url.replace('{{name}}', d)})`);
  });

  const pkgContent = tryRequire(path.join(packagesPath, d, 'package.json'));
  if (pkgContent) {
    catalogContent.push(`- ${pkgContent.name} - ${pkgContent.description}`);
  }
});

try {
  fse.outputFileSync(summaryFile, summaryContent.join('\n'));
  fse.outputFileSync(catalogFile, catalogContent.join('\n'));
  console.log('Output summary and catalog file successfully');
} catch (e) {
  throw new Error(e);
}

function tryRequire(file) {
  try {
    return require(file);
  } catch (e) {
    return false;
  }
}
