# 例子

## 校验身份证号码

```javascript
import personidValidate from '@jyb/lib-personid-validate'

const result = personidValidate({
  personId: '123456',
  errMsg: '身份证号码格式有误！'
});

console.log(result);
```

## 校验身份证号码年龄区间

```javascript
import personidValidate from '@jyb/lib-personid-validate'

const result = personidValidate({
  minAge: 18,
  maxAge: 28,
  ageMsg: '身份证号码年龄必须为18-28，不包括28',
  personId: '140729198902182447',
  errMsg: '身份证号码格式有误！'
});

console.log(result);
```