/**
 * rollup config
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

const isProd = process.env.NODE_ENV === 'production';

export default {
    entry: 'src/index.js',
    format: 'umd',
    plugins: [
        resolve(),
        eslint({
            include: 'src/**/**.js',
            exclude: []
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        (isProd && uglify())
    ],
    moduleName: 'Bimta',
    dest: isProd ? 'dist/bimta.js' : 'dist/bimta.dev.js'
};
