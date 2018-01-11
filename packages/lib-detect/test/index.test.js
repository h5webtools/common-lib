/**
 * index unit test
 */

import should from 'should';
import detect from '../src/index';

const IPHONE6 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25';
const IPAD = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25';
const IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53';

const ANDROID = 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36';
const JYBAPP = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 jiayoubao';

const WEIXIN = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A372 MicroMessenger/6.5.17 NetType/WIFI Language/zh_CN';
const QQ = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A372 QQ/7.2.0.439 V1_IPH_SQ_7.2.0_1_APP_A Pixel/750 Core/UIWebView NetType/WIFI QBWebViewType/1';

describe('src/index.js', () => {
  it('should detect iphone6', () => {
    const env = detect(true, IPHONE6);

    should(env.ios).be.equal(true);
    should(env.iphone).be.equal(true);
    should(env.version).be.equal('6.0');
  });

  it('should detect ipad', () => {
    const env = detect(true, IPAD);

    should(env.ios).be.equal(true);
    should(env.ipad).be.equal(true);
    should(env.version).be.equal('6.0');
  });

  it('should detect ipod', () => {
    const env = detect(true, IPOD);

    should(env.ios).be.equal(true);
    should(env.ipod).be.equal(true);
    should(env.version).be.equal('7.0.3');
  });

  it('should detect android', () => {
    const env = detect(true, ANDROID);

    should(env.android).be.equal(true);
    should(env.version).be.equal('4.4.2');
  });

  it('should detect jybapp', () => {
    const env = detect(true, JYBAPP);

    should(env.jyb).be.equal(true);
    should(env.ios).be.equal(true);
    should(env.iphone).be.equal(true);
    should(env.version).be.equal('6.0');
  });

  it('should detect weixin', () => {
    const env = detect(true, WEIXIN);

    should(env.weixin).be.equal(true);
    should(env.ios).be.equal(true);
    should(env.iphone).be.equal(true);
    should(env.version).be.equal('11.0');
  });

  it('should detect qq', () => {
    const env = detect(true, QQ);

    should(env.qq).be.equal(true);
    should(env.ios).be.equal(true);
    should(env.iphone).be.equal(true);
    should(env.version).be.equal('11.0');
  });
});
