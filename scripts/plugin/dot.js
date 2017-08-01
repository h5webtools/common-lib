/**
 * rollup plugin
 */

const pluginUtils = require('rollup-pluginutils');
const doT = require('dot');

/**
 * @param {Object} [options={}]
 * @param {string|Array.<string>} [options.include]
 * @param {string|Array.<string>} [options.exclude]
 * @param {Object} [options.templateSettings]
 * @return {Object}
 */
function dotPlugin(options = {}) {
  if (!options.include) {
    options.include = '**/*.dot';
  }

  const filter = pluginUtils.createFilter(options.include, options.exclude);

  return {
    name: 'dot',
    transform(code, id) {
      if (filter(id)) {
        let templateSettings = null;

        if (options.templateSettings) {
          templateSettings = Object.assign({}, doT.templateSettings, options.templateSettings);
        }

        return {
          code: `export default ${doT.template(code, templateSettings)};`,
          map: { mappings: '' }
        };
      }
    }
  };
}

module.exports = dotPlugin;
