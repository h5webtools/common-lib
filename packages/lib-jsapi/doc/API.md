# API

地址：svn://172.16.1.13/docs/项目文档/加油宝/04设计文档/11客户端/加油宝app页面交互协议.docx

```text
页面跳转
协议可用于以下场景：
首页配置项、首页运营标、产品列表Banner、加油列表Banner、收益列表Banner、下单页通知(加油)、下单页活动(收益)、余额账户活动、提现活动、我的红包、消息中心、购买结果活动以及H5页面跳转。若页面跳转是从H5发起，且支持版本>=3.0.0，建议使用javascriptSDK，用法请参考javascriptSDK部分。
协议支持通用参数login=true，如果是页面跳转协议还支持通用参数title=xxxxx。
由于2.3.0以下版本已停用，故此协议不再考虑2.3.0以下版本。

1.加油或理财列表页
跳转协议：jtjr:// prdSelect
功能描述：跳转至app我的红包页面
参数：type  --  1：加油，2：理财
		prdId 	-- 产品id，type==1时有效
		prdValue	--默认金额，type==1时有效
		returnType –返还类型（type=2有效，3.5.0及以上版本）
支持版本：全量版本支持

2.下单页面
跳转协议：jtjr:// makeOrder
功能描述：跳转到具体id下单页面 
参数：prdId  --	产品id
		prdType – 产品类型
		couponId – 红包id
		prdValue – 默认金额
（prdId、prdType必须有，couponId和prdValue可选）
支持版本：全量版本支持


3.支付页面
跳转协议：jtjr:// pay
功能描述：跳转到对应参数订单支付页面，完成支付后页面显示两个按钮描述与链接
参数：ord_id – 订单id 
		button – json格式[{"name":"","url":""},{"name":"","url":""}]
支持版本：全量版本支持

4.我的红包页面
跳转协议：jtjr://coupon
功能描述：跳转至app我的红包页面
参数：无
支持版本：全量版本支持

5.账户余额页面
跳转协议：jtjr:// balance
功能描述：跳转至账户余额页
参数：无
支持版本：全量版本支持

6.注册页面
跳转协议：jtjr:// register
功能描述：跳转至注册页
参数：无
支持版本：全量版本支持



7.订单列表页面（页面已废弃）
跳转协议：jtjr:// orders
功能描述：根据订单状态跳转到订单列表页
参数：orderStatus – 0：未支付订单，1：已支付订单
支持版本：全量版本支持

8.订单详情页面（页面已废弃）
跳转协议：jtjr:// order
功能描述：跳转到参数对于id的订单详情页
参数：orderId – 订单id 
支持版本：全量版本支持


9.购买详情页面
跳转协议：jtjr:// prdDetail
功能描述：跳转到参数对于id的产品详情页
参数：prdType – 产品类型：1-加油，2-理财，12-房贷宝(必须)
prdInstId – 产品详情id(prdType=1,2时必须)
returnType-收益产品返还类型：1-整存整取，2-等额本息 3-每月付息, 4-月薪宝 (>=3.4.0, prdType=2时必须)
		orderId-订单号 (>=3.4.0，prdType=12时必须或者returnType=2,3,4时必须)
支持版本：全量版本支持

10.显示右键菜单
跳转协议：jtjr:// showMenu
功能描述：H5页面触发拉取菜单数据接口（/appH/getAppMenu） 
参数：无 
支持版本：全量版本支持

11.打开H5页面跳转
跳转协议：jtjr:// web
功能描述：app内打开指定参数url的h5页面 ，并会带上urserid，token，ver和platform
参数：url，如果url本身又带了参数时，需做encode
title，h5页面title(可选)，没有title时取页面title
		login，是否需要登录，默认不登录
支持版本：全量版本支持

12.关闭页面
跳转协议：jtjr:// close
功能描述：关闭当前页面
参数：无
支持版本：全量版本支持

13.版本更新
跳转协议：jtjr:// updateVer
功能描述：检查版本更新
参数：无
支持版本：全量版本支持

14.评分
跳转协议：jtjr:// score
功能描述：去评分
参数：无
支持版本：全量版本支持


15.打开短信页面
跳转协议：jtjr:// sms
功能描述：打开短信页面
参数：无
支持版本：全量版本支持

16.获取短信联系人 
跳转协议：jtjr:// contacts
功能描述：获取短信联系人传递给H5页面
参数：无
支持版本：全量版本支持

17.在线客服
跳转协议：jtjr:// chat
功能描述：打开百川客服聊天
参数：无
支持版本：>=3.1.0

18.实名认证
跳转协议：jtjr:// identityAuth
功能描述：打开实名认证页面
参数：无
支持版本：>=3.0.0

19.我的加油 
跳转协议：jtjr:// myRecharge
功能描述：打开我的加油页面
参数：无
支持版本：>=3.0.0

20.我的收益 
跳转协议：jtjr:// myProfit
功能描述：打开我的收益页面
参数：无
支持版本：>=3.0.0

21.问题详情 
跳转协议：jtjr:// questionDetail?faqId=xxxx
功能描述：打开问题详情
参数：faqId-问题id
支持版本：>=3.5.0

22.分享 
跳转协议：
jtjr:// share?title=xxxx&content=xxx&image=xxxx&url=xxxx&cp=xxx
功能描述：打开问题详情
参数：title –分享title
content–分享content 
image–分享图标
url–分享链接
cp–分享拷贝内容
支持版本：>=3.5.0
23.零钱 
跳转协议：
jtjr://change
功能描述：打开零钱首页
参数：无
支持版本：>=4.4.0
23.白拿商城
跳转协议：
jtjr://freeMall
功能描述：打开白拿商城首页
参数：无
支持版本：>=4.5.0







JavascriptSDK
适用于H5调用客户端功能及页面。
SDK提供给web端两种调用方式：
内置快捷方法---参数和回调一起作为第一个参数 
Invoke/on方法---参数1为方法名, 参数2为业务参数, 参数3为回调方法。其中invoke关键字进行方法调用- wv.invoke("key", {}, {})；on关键字进行回调设置，操作触发时进行异步通知- wv.on("key", {})。SDK同时支持页面跳转协议，调用key为jtjr://xxx中的协议名称

回调函数说明---success-调用成功、failure-调用失败、cancel-用户取消、complete-异步完成、trigger-菜单触发

返回值说明---返回值为javascript对象，对于需要返回值的操作会存在data对象，无需返回值的操作则没有。需要注意的是各回调的参数是data对象。具体定义如下： 
{
"code":"0",		// 0为成功, -1为取消,  1为完成,其他为失败
	"msg": "completed",	// 失败原因
	"data":{
		"参数名1": "参数值1",
		"参数名2": "参数值2"
	}
}
1.初始化 
wv.config({debug:true/false})
功能描述：初始化javascriptSDK
参数：debug–true/false: 是否为debug模式，不调用默认release模式。
支持版本：>=3.0.0

2.初始化完成
wv.ready(function () {
//	回调处理
})
功能描述：初始化完成后执行操作 
参数：无
返回值：无
支持版本：>=3.0.0

3.返回上页
wv.goBack({
	update:xxx
});
或
wv.invoke("goBack", {update: xxx}, {
		success: function () {
			alert("goBack success");
		}
});
功能描述：返回上一级页面，若H5页面没有上一级则执行关闭操作 
参数：update	–true/false：是否刷新上一个页面
返回值：无
支持版本：>=3.0.0

4.定制返回按钮
wv.backExec({
	complete: function () {
		alert("user back");
	}
});
或
wv.on("backExec", {
	complete: function () {
		alert("user back");
	}
});
功能描述：返回上一级页面时屏蔽默认返回，执行定制的操作
参数：无
返回值：无
支持版本：>=3.0.0

5.打开H5页面
wv.open({
	modal:xxx,
	login:xxx,
	url:"xxx",
	success: function () {
		alert("success");
	}
});
wv.invoke("open", {modal:xxx, url:"xxxx"}, {
	success: function () {
	}
});
功能描述：打开一个H5页面 
参数：modal–true/false:是否为模态页面
		login–true/false:是否需要登录
		url–打开H5页面链接
返回值：无
支持版本：>=3.0.0

6.关闭H5页面
wv.close({
success: function () {
	}
});
wv.invoke("close", {}, { 
success: function () {
	}
});
功能描述：关闭一个H5页面 
参数：无
返回值：无
支持版本：>=3.0.0
7.内容拷贝
wv.copy({
	content:"xxxx", 
	success: function () {
		alert("copy success");
	}
});
或
wv.invoke("copy", {content:"xxxx"}, {
	success: function () {
		alert("copy success");
	}
});
功能描述：内容拷贝 
参数：content–拷贝内容
返回值：无
支持版本：>=3.0.0

8.版本更新 
wv.update({refresh:xxx, 
complete: function () {
				alert("update success");
}
});
或
wv.invoke("update", {refresh:xxx}, {
	complete: function () {
		alert("update success");
	}
});
功能描述：检测版本 
参数：refresh–true/false:是否重新从后台取版本信息。版本更新检测时长为24小时，当为false时，如果客户端24小时内有从后台取过版本信息则根据上一次信息进行版本判断。
返回值：无
支持版本：>=3.0.0

9.分享
wv.showShareMenu({
	title:"title",// 分享标题
	content: "content",// 分享内容
	image: "http://xxxxxx",// 分享图标
	url: "http://xxxxx",// 分享链接
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
或
wv.invoke("showShareMenu", {
		title:"title",
		content: "content",
		image: "http://xxxx",
		url: "http://xxxxx",
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
功能描述：显示分享菜单 
参数：title–分享内容标题
content–分享内容，分享的内容，如果有特殊字符，如%之类的，需要encodeURIComponent编码后传递，否则app会crash
		image–分享图标
		url–分享链接
		sina–新浪分享内容
		cp–拷贝内容
		sms–短信分享内容

		menuItems–需要打开的分享项
			wxmsg–微信消息
			wxtml–微信朋友圈
			qq–QQ消息
			qzone–QQ空间
			sina–新浪
			copy–拷贝
			mail–邮件
			sms–短信

返回值：无
支持版本：>=3.0.0

10.注册
wv.register({
	phoneNo:"18682232832",// 注册手机号
	complete: function (a) {
		alert("userid:"+a.userid+", token"+a.token);
	}
});
或
wv.invoke("register", {phoneNo:"18682232832"}, {
	complete: function (a) {
		alert("userid:"+a.userid+", token"+a.token);	
	}
}); 
功能描述：内容拷贝 
参数：phoneNo–电话号码
返回值：userid–用户id
			token–用户token
支持版本：>=3.0.0


11.登录
wv.login({
	phoneNo:"18682232832", // 登录手机号
	complete: function (a) {
		alert("userid:"+a.userid+", token"+a.token);	}
});
或
wv.invoke("login", {phoneNo:"18682232832"}, {
	complete: function (a) {
		alert("userid:"+a.userid+", token"+a.token);
	}
}); 
功能描述：内容拷贝 
参数：phoneNo–电话号码
返回值：userid–用户id
			token–用户token
支持版本：>=3.0.0

12.实名认证
wv.identityAuth({
	complete: function (a) {
		alert("name:"+a. name +", id:"+a. identityNo);
	}
});
或
wv.invoke("identityAuth", { }, {
	complete: function (a) {
		alert("name:"+a. name +", id:"+a. identityNo);
	}
});
功能描述：调起实名认证 
参数：cardEnable–true/false:是否需要填写银行卡号
返回值：name–用户名
			identityNo–身份证号
支持版本：>=3.0.0

13.交易密码验证
wv.passwordAuth({
	scene: "xxx",//验证场景-接口标识，如351
	title: "xxxx",//验证标题
	desp: "建设银行",//验证内容说明
	complete: function (a) {
		alert("token:"+a.token);
	}
}); 
或
wv.invoke("passwordAuth", {
		scene: "xxx",
		title: "xxxx",
		desp: "建设银行"
	}, {
	complete: function () {
		alert("token:"+a.token);
	}
});
功能描述：调起密码认证 
参数：scene–验证场景，接口命令号
		title–标题
		desp–描述
返回值：token–密码验证结果
支持版本：>=3.0.0
14.支付
wv.pay({
	orderId:"xxxxx",//支付订单号
	buttons:[{name:"查看详情", url:"xxxx"}, {name:"继续购买", url:"xxxxx"}], //结果页面按钮及链接
extra:{"txt1":"xxx","txt2":"xxx","txt3":"xxx","txt4":"xxx","txt5":"xxx",”success_tips”:”xxx”},
	success: function (a) {
		alert("show pay success");
	}
}); 
或
wv.invoke("pay", {
	orderId:"xxxxx",
	buttons:[{name:"查看详情", url:"xxxx"}, {name:"继续购买", url:"xxxxx"}] 
extra:{"txt1":"xxx","txt2":"xxx","txt3":"xxx","txt4":"xxx","txt5":"xxx",”success_tips”:”xxx”}
}, {
	success: function (a) {
		alert("show pay success");
	}
});
功能描述：调起支付 
参数：orderId–订单号
		buttons–结果页面按钮
		name–按钮名称
extra-支付页面显示参数, 需版本>=3.4.0
		url–按钮url
返回值：无
支持版本：>=3.0.0

15.显示右键菜单
wv.showOptionMenu({
  icon: "XXX"
title: "XXX"
  menuItems: [
	{key: "menuItem:menuItem1", name: "菜单项1", url: "xxxx"},
	{key: "menuItem:menuItem2", name: "菜单项2", url: "xxxx"},
	{key: "menuItem:menuItem3", name: "菜单项3", url: "xxxx"}
  ],
  success: function (a) {
	alert("show success");
  }
});
或
wv.invoke("showOptionMenu", {
   icon: "XXX"
title: "XXX"
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
功能描述：显示右键菜单
参数：
icon-图标 >=4.5.0
title-标题 >=4.5.0
menuItems–菜单项
key–菜单标识，格式为menuItem:xxxxxx
name–菜单名称
url–菜单链接
当url为空时，需设置key，以方便对菜单项进行事件绑定。需注意的是key值需和显示右键菜单showOptionMenu的menuItems中的key值一致
事件绑定操作：
wv.on("menuItem:xxxxxx", {
	complete: function (a) {
		alert("user click");
	}
});

返回值：无
支持版本：>=3.0.0

16.隐藏右键菜单
wv.hideOptionMenu({
	success: function (a) {
		alert("show success");
	}
}); 
或
wv.invoke("hideOptionMenu", {}, {
	success: function (a) {
		alert("show success");
	}
});
功能描述：隐藏菜单
参数：无
返回值：无
支持版本：>=3.0.0

17.获取网络类型
wv.getNetworkType({
	complete: function(a) {
		alert("network type:"+a.networkType);
	}
});
或
wv.invoke("getNetworkType", {}, {
	complete: function(a) {
		alert("network type:"+a.networkType);
	}
});
功能描述：获取网络类型
参数：无
返回值：networkType-wifi、2G、3G、4G、wwan(数据网络)、unreachable(网络不可用)
支持版本：>=3.0.0


18. 打开定位
wv.openLocation({
enableHighAccuracy: true,
timeout:15000, //超时时间，单位毫秒
maximumAge:5*60*1000//缓存时间，单位毫秒
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("latitude:"+ a.latitude + ", longitude:" +a. longitude);
	}
}); 
或
wv.invoke("openLocation", { enableHighAccuracy: true,
timeout:15000,
maximumAge:5*60*1000 }, {
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("latitude:"+ a.latitude + ", longitude:" + a.longitude);
	}
});
功能描述：打开定位
参数：enableHighAccuracy-高精度 true/false
timeout -超时时间，单位毫秒
maximumAge-缓存时间，单位毫秒
返回值：	latitude-经度值
longitude-纬度值
			error-1:用户拒绝定位、2:定位超时、3:定位不可用
支持版本：>=3.0.0


19. 在线客服
wv. chat ({
	success: function (a) {
		alert("open success");
	}
});
或
wv.invoke("chat", {}, {
	success: function (a) {
		alert("open success");
	}
});
功能描述：添加银行卡 
参数：无
返回值：无
支持版本：>=3.3.0
20.银行卡选择
wv. selectBankCard ({
	title:"xxxxx", 
	type: 1, 
cardId: "xxxxx",
prdId: "xxxxx",
	success: function (a) {
		alert("open success");
	},
complete: function (a) {
		alert("cardId:"+ a. cardId + ", cardNo:" +a. cardNo);
	}
}); 
或
wv.invoke("selectBankCard", { title:"xxx", type:"xxx" cardId:"xxx", prdId:"xxxx"}, {
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("cardId:"+ a. cardId + ", cardNo:" +a. cardNo);
	}
});
功能描述：添加银行卡 
参数：title-标题
type-页面类型，0为全部列表，1为还贷列表，默认0
channel-添加类型，0为加油宝添加，1为存管添加
cardId-当前已选定银行卡id（可选）
prdId-当前绑定套餐 id（可选）

返回值：cardId –卡id
cardNo –卡号
bankCode–银行编码
bankName–银行名称

支持版本：>=3.4.0

21.设置交易密码
wv. setupPassword ({
	success: function (a) {
		alert("open success");
	}
});
或
wv.invoke("setupPassword", { }, {
	success: function (a) {
		alert("setup success");
	},
	complete: function (a) {
		alert("setup complete ");
	}
});
功能描述：设置交易密码 
参数：无 
返回值：无

支持版本：>=3.4.0


22.事件上报
wv.invoke("reportEvent", { page:”xxx”, name:”xxx”, param:”xxx” }, {
	success: function (a) {
		alert("report success");
	}
});
功能描述：事件收集上报 
参数：page-页面标识 >4.5.0
name-事件标识
		param-事件上报参数, json格式数据

返回值：无

支持版本：>4.3.0


23.加油卡选择
wv. selectGasCard ({
	title:"xxxxx", 
cardNo: "xxxxx",
	success: function (a) {
		alert("open success");
	},
complete: function (a) {
		alert("cardNo:" +a. cardNo);
	}
}); 
或
wv.invoke("selectGasCard", { title:"xxx", cardNo:"xxx"}, {
	success: function (a) {
		alert("open success");
	},
	complete: function (a) {
		alert("cardNo:" +a. cardNo);
	}
});
功能描述：添加银行卡 
参数：title-标题
cardNo-当前已选定加油卡号（可选）

返回值：cardNo –卡号
name–加油卡用户名
phoneNo–加油卡绑定手机号
provider–0为中石化，1为中石油
cardType–1为主卡，2为副卡

支持版本：>=4.0.0
24. 零钱首页
wv. change ({
	success: function (a) {
		alert("open success");
	}
});
或
wv.invoke("change", {}, {
	success: function (a) {
		alert("open success");
	}
});
功能描述：打开零钱首页 
参数：无
返回值：无
支持版本：>=4.4.0

25. 白拿首页
wv. freeMall ({
	success: function (a) {
		alert("open success");
	}
});
或
wv.invoke("freeMall", {}, {
	success: function (a) {
		alert("open success");
	}
});
功能描述：打开白拿首页 
参数：无
返回值：无
支持版本：>=4.5.0

26. 配置iOS WebView
wv. configWebView ({
	bounces:false,
   title:”xxxxx”,
	success: function (a) {
	}
});
或
wv.invoke("configWebView", {bounces:false , title:”xxxxx”}, {
	success: function (a) {
	}
});
功能描述：配置iOS WebView 
参数：bounces-弹性效果，false关闭，true打开
返回值：无
支持版本：>=4.5.0

27. 设置iOS WebView 标题
wv. setWebViewTitle({
   title:”xxxxx”,
	success: function (a) {
	}
});
功能描述：配置iOS WebView标题
参数：title-标题
返回值：无
支持版本：>=4.5.0
```
