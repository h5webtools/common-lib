# API

```javascript
import personidValidate from '@jyb/lib-personid-validate'
```

## 调用

### personidValidate(options);

options 选项
- Type: `Object`
- Default: 

```javascript
const defaultOptions = {
  minAge: 0, // 最小年龄，包括该值
  maxAge: 0, // 最大年龄，不包括该值
  ageMsg: '', // 年龄判断失败提示信息
  timeStamp: Date.now() / 1000, // 时间戳，判断年龄区间的时候，会获取相对该时间的年龄进行判断，获取当前时间的时间戳应该为：Date.now()/1000
  personId: '0', // 身份证号码
  errMsg: '身份证号格式错误' // 身份证号码判断失败提示
};
```

校验年龄失败，会返回`ageMsg`

校验身份证号码失败，会返回`errMsg`

校验成功，会返回true

