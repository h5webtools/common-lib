/**
 * 工具库测试
 */

const should = require('should');
const util = require('../../src/util/index');

describe('src/util/index.js', () => {
    it('should assign', () => {
        const from = {name: 'haha', age: 18};
        const to = {name: 'xixi', profile: ''};
        const res = util.assign(from, to);

        should(res.name).be.equal('xixi');
        should(res.age).be.equal(18);
        should(res.profile).be.equal('');
    });
});