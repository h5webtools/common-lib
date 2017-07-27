/**
 * 自定义数据属性处理测试
 */

import should from 'should';
import DataAttribute from '../../src/dataset/index';

describe('src/dataset/index.js', () => {
  const dataAttr = new DataAttribute();
  const alias = dataAttr.alias;

  it('should create alias', () => {
    should(alias['ea']).be.equal('statEa');
    should(alias['eb']).be.equal('statEb');
    should(alias['ec']).be.equal('statEc');
    should(alias['visit']).be.equal('statVisit');
    should(alias['para']).be.equal('statPara');
  });

  it('should get dataset obj', () => {
    let obj = {};
    const dataSetObj = dataAttr.getDataSetObj(obj, [alias.ea, alias.eb, alias.ec], {
      statEa: 'ea',
      statEb: 'eb',
      statEc: 'ec'
    });

    should(dataSetObj.statEa).be.equal('ea');
    should(dataSetObj.statEb).be.equal('eb');
    should(dataSetObj.statEc).be.equal('ec');
  });

  it('should get dataset arr', () => {
    let obj = {
      statEa: 'ea',
      statEb: 'eb',
      statEc: 'ec'
    };
    const arr = dataAttr.getDataSetArr(obj, [alias.ea]);

    should(arr.length).be.equal(1);
    should(arr[0]).be.equal('ea');
  });

  it('should check dataset value', () => {
    let obj = {
      statEa: 'ea'
    };
    const res = dataAttr.checkDataSetValue(obj, [alias.ea, alias.eb]);

    should(res).be.equal(false);
  });
});
