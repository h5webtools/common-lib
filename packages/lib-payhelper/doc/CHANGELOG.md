# 更新日志

## v0.1.0

- 初始版本

## v0.2.21

- 修改newWXPay的值，默认从全局`wxPayType`获取，全局变量定义在`/sinclude/wxpay_login.tpl`文件里

## v1.0.9

- 修改`getPayType`方法，判断在微信内时，优先判断是否定义了全局的wxpayType变量，否则返回内置的微信支付类型