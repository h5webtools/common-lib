/**
 * 工具库测试
 */

import should from 'should';
import * as util from '../../src/util/index';

describe('src/util/index.js', () => {
  it('should assign', () => {
    const from = { name: 'foo', age: 18 };
    const to = { name: 'bar', profile: '' };
    const res = util.assign(from, to);

    should(res.name).be.equal('bar');
    should(res.age).be.equal(18);
    should(res.profile).be.equal('');
  });
});
