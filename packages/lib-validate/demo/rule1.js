(function (exports) {
  const rule1 = [{
    node: '#username',
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
    node: '#age',
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
    node: '#phone',
    event: ['input'],
    validators: [{
      name: 'format',
      options: {
        itemName: '联系手机',
        reg: /^1[0-9]{10}$/
      }
    }],
    callback: validateCallback
  }, {
    node: '#pwd',
    event: ['input'],
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
    node: '#cpwd',
    validators: [{
      name: 'compare',
      options: {
        compareWith: '#pwd',
        itemName: '密码'
      }
    }],
    callback: validateCallback
  }];

  function validateCallback(el, validResult) {
    el.parentNode.querySelector('span').innerHTML = validResult.join(';');
  }

  exports.rule1 = rule1;
})(window);
