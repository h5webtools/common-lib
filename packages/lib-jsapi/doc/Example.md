# 例子

```javascript
import jybwv from '@jyb/lib-jsapi'
```

## 调用

地址：svn://172.16.1.13/docs/项目文档/加油宝/04设计文档/11客户端/JSAPI-Demo.js

使用`jybwv`替换下面代码中的`wv`来调用

```javascript
// 一、调用成功返回参数约定
// 参数1:方法名
// 参数2:invoke或on
// 参数3:调用结果JSON字符串，如下所示：
//{
//	"code":"0",		// 返回值 	-1为取消，	0为调用成功，	1为异步通知，	其他值为失败
//	"msg": "",		// 对应上面 cancel，	ok，			completed，		failed或失败原因
//	"data":{
//		// 具体业务返回数据，据具体接口而定
//	}
//}

// 1.Android callback回调参数说明
//   1.1 invoke回调格式-以登录为例
//    (1).回调登录界面显示成功
window.NativeBridge.callback("login", "invoke", "{'code':'0', 'msg':'ok'}");

//    (2).回调用户登录成功
window.NativeBridge.callback("login", "invoke", "{'code':'1', 'msg':'completed'}");

//    (3).回调用户取消登录
window.NativeBridge.callback("login", "invoke", "{'code':'-1', 'msg':'cancel'}");

//   1.2 on回调格式-返回定制为例
//    (1).返回定制成功
window.NativeBridge.callback("backExec", "on", "{'code':'0', 'msg':'ok'}");

//    (2).用户执行了返回操作
window.NativeBridge.callback("backExec", "on", "{'code':'1', 'msg':'completed'}");


// 2.iOS 回调参数说明
// Native通过JavascriptcCore框架直接记录JSValue回调地址


// 二、web端调用约定
// 1.初始化调用：
//	 1.1 sdk-debug模式：wv.config({debug:true}), 不调用或参数为false为release模式
//   1.2 sdk-redy: sdk初始化完成调用
//		 wv.ready(function () {
//	
//		 })

// 2.业务参数视具体接口而定
// 3.回调函数：success-调用成功、failure-调用失败、cancel-用户取消、complete-异步完成、trigger-菜单触发
// 4.sdk提供给web端两种调用方式：
//   4.1 内置快捷方法，参数和回调一起作为第一个参数  
//   4.2 invoke方法: 参数1为方法名, 参数2为业务参数, 参数3为回调方法
//   4.3 on方法: 参数1为方法名, 参数2回调方法
// 5.调用demo
// 5.1 返回			
wv.goBack({
	update:true // 是否刷新页面
});
wv.invoke("goBack", {update: true}, {
		success: function () {
			alert("goBack success");
		}
});

// 5.2 返回定制
// 需页面完全加载完后执行
wv.backExec({
	complete: function () {
		alert("user back");
	}
});
wv.on("backExec", {
	complete: function () {
		alert("user back");
	}
});

// 5.3 打开
wv.open({
	modal:true,// 是否是模态打开
	login:true,// 是否登录
	url:"http://www.qq.com"// 打开链接
});
wv.invoke("open", {modal:true, url:"http://www.qq.com"}, {});


// 5.4 关闭
wv.close({});
wv.invoke("close", {}, {});

// 5.5 拷贝内容
wv.copy({
	content:"aaaaaa",//拷贝内容
	success: function () {
		alert("copy success");
	}
});
wv.invoke("copy", {content:"aaaaaa"}, {
	success: function () {
		alert("copy success");
	}
});

// 5.6 版本更新-refresh
wv.update({refresh:true // 是否重新从后台取数据 版本检测时间间隔是24小时
});
wv.invoke("update", {refresh:true}, {
	complete: function () {
		alert("update success");
	}
});

// 5.7 显示分享菜单
 wv.showShareMenu({
	title:"title",// 分享标题
	content: "content",// 分享内容
	image: "http://172.16.1.16:8082/active/publish/img/share.png",// 分享图标
	url: "http://172.16.1.16:8082/active/publish/img/share.png",// 分享链接
	sina: "aaaaaaaaaaaaaaaaa",// 新浪分享内容
	cp: "bbbbbbbbbbbbbbb",// 拷贝内容
	sms: "cccccccccccccc",// 短信分享内容
	menuItems: [
	"wxmsg",	// 微信消息
	"wxtml",	// 微信朋友圈
	"qq",		// QQ
	"qzone",	// QQ空间
	"sina",		// 新浪
	"copy",		// 拷贝
	"mail",		// 邮件
	"sms"		// 短信
  ]
});

wv.invoke("showShareMenu", {
		title:"title",
		content: "content",
		image: "http://172.16.1.16:8082/active/publish/img/share.png",
		url: "http://172.16.1.16:8082/active/publish/img/share.png",
		sina: "aaaaaaaaaaaaaaaaa",
		cp: "bbbbbbbbbbbbbbb",
		sms: "cccccccccccccc",
		menuItems:[
			"wxmsg",	// 微信消息
			"wxtml",	// 微信朋友圈
			"qq",		// QQ
			"qzone",	// QQ空间
			"sina",		// 新浪
			"copy",		// 拷贝
			"mail",		// 邮件
			"sms"		// 短信
		]
	}, 
	{}
);


 
// 5.8 注册
wv.register({
	phoneNo:"18682232832",// 注册手机号
	complete: function () {
		alert("register success");
	}
});
wv.invoke("register", {phoneNo:"18682232832"}, {
	complete: function () {
		alert("register success");
	}
});
// 注册成功返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"userid": "472",
		"token": "xxxxxxx"
	}
}



// 5.9 登录
wv.login({
	phoneNo:"18682232832", // 登录手机号
	complete: function (a) {
		alert("login success");
	}
});
wv.invoke("login", {phoneNo:"18682232832"}, {
	complete: function () {
		alert("login success");
	}
});
// 登录成功返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"userId": "472",
		"token": "xxxxxxx"
	}
}



// 5.10 实名认证
wv.identityAuth({
	cardEnable:true, // 是否填卡认证
	complete: function () {
		alert("identity authenticate success");
	}
});
wv.invoke("identityAuth", {cardEnable:true}, {
	complete: function () {
		alert("identity authenticate success");
	}
});
// 认证成功返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"name": "diao",
		"identityNo": "xxxxxxx"
	}
}


// 5.11 密码验证
wv.passwordAuth({
	scene: "xxx",//验证场景-接口标识，如351
	title: "xxxx",//验证标题
	desp: "建设银行",//验证内容说明
	complete: function () {
		alert("password authenticate success");
	}
}); 
wv.invoke("passwordAuth", {
		scene: "xxx",
		title: "xxxx",
		desp: "建设银行"
	}, {
	complete: function () {
		alert("password authenticate success");
	}
});
// 认证成功返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"token": "xxxxxx"
	}
}



// 5.12 支付
wv.pay({
	orderId:"xxxxx",//支付订单号
	buttons:[{name:"查看详情", url:"xxxx"}, {name:"继续购买", url:"xxxxx"}], //结果页面按钮及链接
	extra:{"txt1":"xxx","txt2":"xxx","txt3":"xxx","txt4":"xxx","txt5":"xxx"},
	success: function (a) {
		alert("show pay success");
	}
}); 
wv.invoke("pay", {
	orderId:"xxxxx",
	buttons:[{name:"查看详情", url:"xxxx"}, {name:"继续购买", url:"xxxxx"}],
	extra:{"txt1":"xxx","txt2":"xxx","txt3":"xxx","txt4":"xxx","txt5":"xxx"},
}, {
	success: function (a) {
		alert("show pay success");
	}
});

// 5.13 显示右键菜单
// 注意key格式需要为menuItem:xxxxx
wv.showOptionMenu({
  menuItems: [
	{key: "menuItem:menuItem1", name: "菜单项1", url: "xxxx"},
	{key: "menuItem:menuItem2", name: "菜单项2", url: "xxxx"},
	{key: "menuItem:menuItem3", name: "菜单项3", url: "xxxx"}
  ],
  success: function (a) {
	alert("show success");
  }
});
wv.invoke("showOptionMenu", {
	menuItems: [
		{key:"menuItem:menuItem1", name:"菜单项1", url: "xxxx"},
		{key:"menuItem:menuItem2", name:"菜单项2", url: "xxxx"},
		{key:"menuItem:menuItem3", name:"菜单项3", url: "xxxx"}
	]
}, {
	success: function (a) {
		alert("show success");
	}
});
// wv.on("menuItem:menuItem1", {});
// 点击具体菜单项返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"key":"menuItem:menuItem1"
	}
}


// 5.14 隐藏菜单
wv.hideOptionMenu({
	success: function (a) {
		alert("show success");
	}
}); 
wv.invoke("hideOptionMenu", {}, {
	success: function (a) {
		alert("show success");
	}
});

// 5.15 获取网络类型
wv.getNetworkType({
	complete: function(a) {
		alert(a.networkType);
	}
});
wv.invoke("getNetworkType", {}, {
	complete: function(a) {
		alert(a.networkType);
	}
});
// 返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"networkType":"wifi" // wifi、2G、3G、4G、wwan(数据网络)、unreachable(网络不可用)
	}
}

// 5.16 打开定位
wv.openLocation({
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("locate complete");
	}
}); 
wv.invoke("openLocation", {}, {
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("locate complete");
	}
});
// 返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"latitude":"xxx", "longitude":"xxx" // latitude经度 longitude纬度
	}
}

// 5.17 在线客服
wv.invoke("chat", {}, {
	success: function (a) {
		alert("open success");
	}
});

// 5.18 选择银行卡
wv.invoke("selectBankCard", {cardId:"xxx", type:"xxx", prdId:"xxxx"}, {
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("select complete");
	}
});
// 返回内容
{
	"code":"1",
	"msg": "completed",
	"data":{
		"cardId":"xxx", // cardId卡id 
		"cardNo":"xxx", // cardNo卡号
		"bankCode":"xxx", // bankCode银行编码
		"bankName":"xxx"  // bankName银行名称
	}
}


// 设置交易密码
wv.invoke("setupPassword", {}, {
	success: function (a) {
		alert("setup success");
	},
	complete: function (a) {
		alert("setup complete");
	}
});
```