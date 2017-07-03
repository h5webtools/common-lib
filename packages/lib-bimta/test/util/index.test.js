/**
 * 工具库测试
 */

const should = require('should');
const util = require('../../src/util/index');

describe('src/util/index.js', () => {
    it('should assign', () => {
        const from = {name: 'haha', age: 18};
        const to = {name: 'xixi', profile: ''};

        util.assign(from, to);
        should(to.name).be.equal('xixi');
        should(to.age).be.equal(18);
        should(to.profile).be.equal('');
    });
});