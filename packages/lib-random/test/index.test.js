/**
 * index unit test
 */

import should from 'should';
import random from '../src/index';

describe('src/index.js', () => {
  it('should get a random number in [0, 1)', () => {
    const num = random.getRandom();
    should(num >= 0 && num < 1).be.true();
  });

  it('should get a random number in [1, 3)', () => {
    const min = 1;
    const max = 3;
    const num = random.getRandomArbitrary(min, max);
    should(num >= min && num < max).be.true();
  });

  it('should get a random int number in [1, 3)', () => {
    const min = 1;
    const max = 3;
    const num = random.getRandomInt(min, max);
    should([1, 2].indexOf(num) > -1).be.true();
  });

  it('should get a random int number in [1, 3]', () => {
    const min = 1;
    const max = 3;
    const num = random.getRandomIntInclusive(min, max);
    should([1, 2, 3].indexOf(num) > -1).be.true();
  });

  it('should get a random boolean value', () => {
    const result = random.getRandomBool();
    should([true, false].indexOf(result) > -1).be.true();
  });
});
