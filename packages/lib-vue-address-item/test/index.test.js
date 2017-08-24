/**
 * index unit test
 */

import should from 'should';
import LibDemo from '../src/index';

describe('src/index.js', () => {
  it('should a object', () => {
    should(LibDemo).be.Function();
  });
});
