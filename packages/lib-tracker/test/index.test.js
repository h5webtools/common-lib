/**
 * index unit test
 */

import should from 'should';
import track from '../src/index';

/* global describe,it,beforeEach,afterEach */
describe('src/index.js', () => {
  const queue = rewriteImage();
  let tracker = null;
  let params = null;

  beforeEach(() => {
    params = null;
    tracker = new track.Ctor();
    queue.clear();
  });

  afterEach(() => {
    if (!params) return;
    should(params.ak).be.equal('KVQiUTJf');
    should(params.body).be.Object();
    should(params.body.cmd).be.equal('65010000');
    should(params.body.data).be.Array();
    should(params.body.data.length).be.equal(1);
    should(params.body.data[0].sid).be.String();
    should(params.body.data[0].op_type).be.equal('error');
    should(params.body.data[0].op_result).be.String();
    should(params.body.data[0].op_time).be.String();
    should(params.body.data[0].op_object).be.String();
    should(params.body.data[0].op_page).be.String();
    should(params.body.data[0].op_params).be.Object();
    should(params.body.data[0].op_params.platform).be.String();
    should(params.body.data[0].op_params.in_app).be.equal(0);
    should(params.body.data[0].op_params.cust_id).be.String();
    should(params.body.data[0].op_params.uniq_id).be.String();
    should(params.body.data[0].op_params.source).be.String();
    should(params.body.data[0].op_params.act_id).be.String();
    should(params.body.data[0].op_params.group).be.String();
    should(params.body.data[0].op_params.link).be.String();
    should(params.body.data[0].op_params.ua).be.String();
    should(params.body.data[0].op_params.title).be.String();
    should(params.body.data[0].op_params.size).be.String();
    should(params.body.data[0].op_params.referer).be.String();
    should(params.body.data[0].op_params.timestamp).be.Number();
    should(params.body.data[0].op_params.network).be.String();
    should(params.body.data[0].op_params.badjs).be.equal('1');
    should(params.body.data[0].op_params.pid).be.String();
  });

  it('should report params', () => {
    tracker.init();
    tracker.log();
    should(queue.size()).be.equal(1);

    params = getParams(decodeURIComponent(queue.dequeue()));
    should(params.body.data[0].op_params.t_type).be.Undefined();
  });

  it('should report in test env', () => {
    tracker.init({
      env: 'test'
    });
    tracker.log();
    should(queue.size()).be.equal(1);
    should(queue.dequeue().indexOf('//172.16.1.16:8890')).be.equal(0);
  });

  it('should report in prod env', () => {
    tracker.init({
      env: 'prod'
    });
    tracker.log();
    should(queue.size()).be.equal(1);
    should(queue.dequeue().indexOf('//report.jyblife.com')).be.equal(0);
  });

  it('should report common params', () => {
    tracker.init({
      commonParams: {
        cc: 'haha'
      }
    });
    tracker.log();
    should(queue.size()).be.equal(1);

    // params
    params = getParams(decodeURIComponent(queue.dequeue()));
    should(params.body.data[0].op_params.cc).be.equal('haha');
  });

  it('should call log function', () => {
    tracker.init();
    tracker.log({
      c1: 't1',
      c2: 't2'
    });
    should(queue.size()).be.equal(1);

    // params
    params = getParams(decodeURIComponent(queue.dequeue()));
    should(params.body.data[0].op_params.c1).be.equal('t1');
    should(params.body.data[0].op_params.c2).be.equal('t2');
  });

  it('should call captureApi function', () => {
    tracker.init();
    tracker.captureApi({
      c1: '404',
      c2: 'Not Found'
    });
    should(queue.size()).be.equal(1);

    // params
    params = getParams(decodeURIComponent(queue.dequeue()));
    should(params.body.data[0].op_params.t_type).be.equal('2');
    should(params.body.data[0].op_params.c1).be.equal('404');
    should(params.body.data[0].op_params.c2).be.equal('Not Found');
  });

  it('should call captureError function', () => {
    tracker.init();
    tracker.captureError(new Error('canye'));
    should(queue.size()).be.equal(1);

    // params
    params = getParams(decodeURIComponent(queue.dequeue()));
    should(params.body.data[0].op_params.t_type).be.equal('1');
  });
});

/**
 * 获取参数
 * @param {String} url
 * @return {Object}
 */
function getParams(url = '') {
  const params = url.slice(url.indexOf('?') + 1);
  const arrParams = params.split('&');

  return arrParams.reduce((objs, val) => {
    const arrVal = val.split('=');
    try {
      objs[arrVal[0]] = JSON.parse(arrVal[1]);
    } catch (e) {
      objs[arrVal[0]] = arrVal[1];
    }
    return objs;
  }, {});
}

function rewriteImage() {
  const queue = installApi([]);

  function Image() {
    let srcStr = '';

    Object.defineProperty(this, 'src', {
      configurable: true,
      enumerable: true,
      get() {
        return srcStr;
      },
      set(newVal) {
        queue.enqueue(newVal);
        srcStr = newVal;
      }
    });
  }

  Image.prototype.onload = () => {
    console.log('onload');
  };

  Image.prototype.onerror = () => {
    console.log('onerror');
  };

  function installApi(ctx) {
    const apis = {
      enqueue(val) {
        ctx.push(val);
      },
      dequeue() {
        return ctx.shift();
      },
      size() {
        return ctx.length;
      },
      clear() {
        ctx.length = 0;
      }
    };
    for (const k in apis) {
      ctx[k] = apis[k];
    }

    return ctx;
  }

  window.Image = Image;

  return queue;
}
