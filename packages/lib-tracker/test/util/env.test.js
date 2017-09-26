/**
 * util env unit test
 */

import should from 'should';
import env, { getEnv } from '../../src/util/env';

/* global describe,it */
describe('src/util/env.js', () => {
  const uas = {
    android: 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
    iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
    ipad: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
    ipod: 'Mozilla/5.0 (iPod; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
    jyb: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 jiayoubao'
  };

  it('should current env', () => {
    should(env.jyb).be.equal(false);
    should(env.ie).be.equal(false);
  });

  it('should env is android', () => {
    const currentEnv = getEnv(uas.android);
    should(currentEnv.android).be.equal(true);
    should(currentEnv.version).be.equal('4.4.2');
    should(currentEnv.jyb).be.equal(false);
    should(currentEnv.ie).be.equal(false);
  });

  it('should env is iphone', () => {
    const currentEnv = getEnv(uas.iphone);
    should(currentEnv.iphone).be.equal(true);
    should(currentEnv.ios).be.equal(true);
    should(currentEnv.version).be.equal('6.0');
    should(currentEnv.jyb).be.equal(false);
    should(currentEnv.ie).be.equal(false);
  });

  it('should env is ipad', () => {
    const currentEnv = getEnv(uas.ipad);
    should(currentEnv.ipad).be.equal(true);
    should(currentEnv.ios).be.equal(true);
    should(currentEnv.version).be.equal('6.0');
    should(currentEnv.jyb).be.equal(false);
    should(currentEnv.ie).be.equal(false);
  });

  it('should env is ipod', () => {
    const currentEnv = getEnv(uas.ipod);
    should(currentEnv.ipod).be.equal(true);
    should(currentEnv.ios).be.equal(true);
    should(currentEnv.version).be.equal('6.0');
    should(currentEnv.jyb).be.equal(false);
    should(currentEnv.ie).be.equal(false);
  });

  it('should env is jyb app', () => {
    const currentEnv = getEnv(uas.jyb);
    should(currentEnv.iphone).be.equal(true);
    should(currentEnv.ios).be.equal(true);
    should(currentEnv.version).be.equal('6.0');
    should(currentEnv.jyb).be.equal(true);
    should(currentEnv.ie).be.equal(false);
  });
});
