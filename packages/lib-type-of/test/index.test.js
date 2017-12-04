/**
 * index unit test
 */

import should from 'should';
import typeOf from '../src/index';

describe('src/index.js', () => {
  it('should match objects', () => {
    function Foo() {}
    should(typeOf({})).be.equal('object');
    should(typeOf(new Foo)).be.equal('object');
    should(typeOf(new Boolean(true))).be.equal('object');
    should(typeOf(new Number(123))).be.equal('object');
  });

  it('should match numbers', () => {
    should(typeOf(12)).be.equal('number');
  });

  it('should match strings', () => {
    should(typeOf('test')).be.equal('string');
  });

  it('should match dates', () => {
    should(typeOf(new Date)).be.equal('date');
  });

  it('should match booleans', () => {
    should(typeOf(true)).be.equal('boolean')
    should(typeOf(false)).be.equal('boolean')
  });

  it('should match null', () => {
    should(typeOf(null)).be.equal('null');
  });

  it('should match undefined', () => {
    should(typeOf(undefined)).be.equal('undefined');
  });

  it('should match arrays', () => {
    should(typeOf([])).be.equal('array');
  });

  it('should match regexps', () => {
    should(typeOf(/asdf/)).be.equal('regexp');
    should(typeOf(new RegExp('weee'))).be.equal('regexp');
  });

  it('should match functions', () => {
    should(typeOf(function(){})).be.equal('function');
  })

  it('should match arguments', () => {
    should(typeOf((function(){ return arguments })())).be.equal('arguments');
  })

  if (typeof document !== 'undefined') {
    it('should match elements', () => {
      should(typeOf(document.createElement('div'))).be.equal('element');
    })
  }
});
