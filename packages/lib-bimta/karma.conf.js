// Karma configuration
// Generated on Sat Jul 01 2017 22:56:40 GMT+0800 (CST)

// rollup plugin
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

// karma plugin
const karmaMocha = require('karma-mocha');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaRollupPlugin = require('karma-rollup-plugin');
const karmaCoverage = require('karma-coverage');

const isCover = process.env.NODE_ENV === 'cover';

module.exports = function(config) {
    const karmaConfig = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser eg. "js/*.js" or "test/**/*Spec.js"
        files: ['test/**/*.test.js'],

        // list of files to exclude
        exclude: ['node_modules'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.test.js': ['rollup']
        },

        rollupPreprocessor: {
            plugins: [
                resolve(),
                babel({
                    exclude: 'node_modules/**'
                }),
                commonjs()
            ],
            format: 'umd',
            moduleName: 'Bimta',
            sourceMap: 'inline'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // plugins
        plugins: [
            karmaMocha,
            karmaChromeLauncher,
            karmaRollupPlugin
        ]
    };

    if (isCover) {
        karmaConfig['preprocessors']['src/**/*.js'] = ['coverage'];
        karmaConfig['coverageReporter'] = {
            type: 'html',
            dir: 'coverage/'
        };
        karmaConfig.singleRun = true;
        karmaConfig.reporters.push('coverage');
        karmaConfig.plugins.push(karmaCoverage);
    }

    config.set(karmaConfig);
};
