/**
 * index unit test
 */

require('./helper/api');

const Bimta = require('../src/index');
const should = require('should');
const report = require('./helper/report');
const oImage = require('./helper/image');

describe('src/index.js', () => {
    const map = {
        home: {
            id: '30000',
            search: {
                id: '1',
                pv: { // 访问
                    id: '1'
                },
                btn: { // 按钮
                    id: '2'
                }
            }
        }
    };
    const timestamp = Date.now();

    function commonParams() {
        return {
            uuid: timestamp
        };
    }

    const bimta = new Bimta({
        configMap: map,
        platform: ['bi', 'mta'],
        createCommonParams: commonParams,
        debug: false
    });

    it('should parse option', () => {
        const o1 = '{"name": "canye", "age": 18}';
        const o2 = null;

        const r1 = bimta.parseOption(o1);
        const r2 = bimta.parseOption(o2);

        should(r1.name).be.equal('canye');
        should(r1.age).be.equal('18');
        should(r2.name).be.undefined();
    });

    it('should get common params', () => {
        const curr = bimta.getCommonParams();

        should(curr.uuid).be.equal(timestamp);
    });

    it('should get ids', () => {
        // pageview
        let arrIds = bimta._getIds('home', 'search', 'pv');
        let strIds = bimta._getIdsStr('home', 'search', 'pv');
        let ids = ['30000', '1', '1'];

        arrIds.forEach((id, i) => {
            should(id).be.equal(ids[i]);
        });
        should(strIds).be.equal(ids.join('.'));

        // event
        arrIds = bimta._getIds('home', 'search', 'btn');
        strIds = bimta._getIdsStr('home', 'search', 'btn');
        ids = ['30000', '1', '2'];

        arrIds.forEach((id, i) => {
            should(id).be.equal(ids[i]);
        });
        should(strIds).be.equal(ids.join('.'));
    });

    it('should check event id format', () => {
        const r1 = bimta._checkEventID('30000.1.1');
        const r2 = bimta._checkEventID('30000.1');
        const r3 = bimta._checkEventID({ ea: '30000', eb: '1', ec: '1' });
        const r4 = bimta._checkEventID({ ea: '30000', eb: '1', e: '1' });

        should(r1).be.equal(true);
        should(r2).be.equal(false);
        should(r3).be.equal(true);
        should(r4).be.equal(false);
    });

    it('should report bi by declare', () => {
        document.body.innerHTML = `
            <div data-stat-ea="home">
                <div data-stat-eb="search" data-stat-visit="pv">
                    <a class="search-btn" data-stat-ec="btn" data-stat-para="{'action': 'click'}" href="javascript:;">search</a>
                </div>
            </div>
        `;

        // BI上报
        // clear queue
        oImage.loadQueue.clear();

        // start
        bimta.start();

        // pv
        const objR1 = report.reportURLInverse(oImage.loadQueue.dequeue());
        const objR1Body = JSON.parse(objR1.body);

        should(objR1.ak).be.equal('KVQiUTJf');
        should(objR1Body.cmd).be.equal('65010000');
        should(objR1Body.data[0].op_object).be.equal('30000.1.1');

        // event
        document.querySelector('.search-btn').click();

        const objR2 = report.reportURLInverse(oImage.loadQueue.dequeue());
        const objR2Body = JSON.parse(objR2.body);

        should(objR2.ak).be.equal('KVQiUTJf');
        should(objR2Body.cmd).be.equal('65010000');
        should(objR2Body.data[0].op_object).be.equal('30000.1.2');
        should(objR2Body.data[0].op_params.action).be.equal('click');

        should(oImage.loadQueue.length()).be.equal(0);
    });

    it('should report bi by api', () => {
        // clear queue
        oImage.loadQueue.clear();

        // API track
        bimta.pageview({ ea: 'home', eb: 'search' }, { op_type: 'pv' });
        bimta.event({ ea: 'home', eb: 'search', ec: 'btn' });

        // pv
        const objR1 = report.reportURLInverse(oImage.loadQueue.dequeue());
        const objR1Body = JSON.parse(objR1.body);

        should(objR1.ak).be.equal('KVQiUTJf');
        should(objR1Body.cmd).be.equal('65010000');
        should(objR1Body.data[0].op_type).be.equal('pv');
        should(objR1Body.data[0].op_object).be.equal('30000.1.1');

        // event
        const objR2 = report.reportURLInverse(oImage.loadQueue.dequeue());
        const objR2Body = JSON.parse(objR2.body);

        should(objR2.ak).be.equal('KVQiUTJf');
        should(objR2Body.cmd).be.equal('65010000');
        should(objR2Body.data[0].op_object).be.equal('30000.1.2');

        should(oImage.loadQueue.length()).be.equal(0);
    });
});