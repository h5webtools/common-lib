(function (exports) {
  const rule2 = [{
    node: '#username2',
    validators: [{
      name: 'required',
      options: {
        itemName: '用户名'
      }
    }, {
      name: 'format',
      options: {
        errMsg: '用户名必须为小写字母',
        reg: /^[a-z]*$/
      }
    }],
    callback: validateCallback
  }, {
    node: '#age2',
    validators: [{
      name: 'range',
      options: {
        itemName: '年龄',
        maxVal: 100,
        minVal: 1
      }
    }],
    callback: validateCallback
  }, {
    node: '#phone2',
    validators: [{
      name: 'format',
      options: {
        itemName: '联系手机',
        reg: /^1[0-9]{10}$/
      }
    }],
    callback: validateCallback
  }, {
    node: '#pwd2',
    validators: [{
      name: 'length',
      options: {
        itemName: '密码',
        maxLen: 10,
        minLen: 6
      }
    }],
    callback: validateCallback
  }, {
    node: '#cpwd2',
    validators: [{
      name: 'compare',
      options: {
        compareWith: '#pwd2',
        itemName: '密码'
      }
    }],
    callback: validateCallback
  }];

  function validateCallback(el, validResult) {
    // el.parentNode.querySelector('span').innerHTML = validResult.join(';');
  }

  exports.rule2 = rule2;
})(window);
