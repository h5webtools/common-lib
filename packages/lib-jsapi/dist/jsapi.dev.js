(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jybwv = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * js api
 */

/* eslint-disable */

// 2015年09月14日JavaScript APIv1.0.0: 创建文档
// 2016年04月04日JavaScript APIv1.1.0: 新增获取网络类型、定位
// 2016年12月01日JavaScript APIv1.2.0: 新增在线客服、银行卡选择、设置交易密码、事件上报、加油卡选择
// 2017年04月19日JavaScript APIv1.3.0: 新增零钱首页、白拿首页；删除实名认证选卡参数
// 2017年05月18日JavaScript APIv1.3.1: 分享菜单支持自定义图标和标题
// 2017年05月23日JavaScript APIv1.4.0: iOS版本提供webview配置和title设置；银行卡列表添加存管支持
// 2017年06月09日JavaScript APIv1.4.0: 事件上报添加页面参数
// 2017年07月18日JavaScript APIv1.5.0: 新增获取App信息；
// 2017年08月16日JavaScript APIv1.5.1：实名认证增加存管channel参数；选择银行卡增加cardType参数；
// 2017年08月25日JavaScript APIv1.6.0: 新增风控API; 白拿商城新增classId和subClassId参数; 新增react通用跳转API
// 2017年12月21日JavaScript APIv1.7.0: 新增授信API; 支付新增是否跳转结果页面参数
// 2018年01月27日JavaScript APIv1.8.0: 新增授权API; 设置交易密码支持存管参数; App信息接口新增返回存管相关信息
function jybWebview(context, b) {
  function invoke(name, params, obj) {
    if (context.NativeBridge) {
      log(name, params);
      NativeBridge.invoke(name, params, function (a) {
        response(name, a, obj);
      });
    } else {
      log(name, obj);
    }
  }

  function on(name, obj) {
    if (context.NativeBridge) {
      NativeBridge.on(name, function (a) {
        response(name, a, obj);
      });
    } else {
      log(name, obj);
    }
  }

  function log(name, obj) {
    if (configuration.debug) {
      var apiName = name;
      var supportApi = supportApiList[apiName];
      if (supportApi) {
        apiName = supportApi;
      }
      if (obj && obj._complete) {
        delete obj._complete;
      }
      console.log('"' + apiName + '",', obj || "");
    }
  }

  function callAfterBridgeReady(func) {
    if (jiayoubao) {
      context.NativeBridge ? func() : doc.addEventListener && doc.addEventListener("NativeBridgeReady", func, false);
    } else {
      console.log("App not jiayoubao");
    }
  }

  function response(name, result, obj) {
    var resp = obj ? obj : {};
    if (resp._complete) {
      resp._complete(result);
    }
    if (configuration.debug) {
      alert(JSON.stringify(result));
    }
    var code = result.code ? result.code : "2";
    switch (code) {
      case "0":
        {
          if (resp.success) {
            resp.success(result.data);
          }
          break;
        }
      case "-1":
        {
          if (resp.cancel) {
            resp.cancel(result.data);
          }
          break;
        }
      case "1":
        {
          if (resp.trigger) {
            resp.trigger(result.data);
          } else if (resp.complete) {
            resp.complete(result.data);
          }
          break;
        }
      default:
        {
          if (resp.failure) {
            resp.failure(result.data);
          }
        }
    }
  }

  function bind() {
    if (!WebViewBridge.invoke) {
      WebViewBridge.invoke = invoke;
      WebViewBridge.on = on;
    }
  }
  if (!context.jWebView) {
    var supprotApis = {
      config: "config",
      configWebView: "configWebView",
      setWebViewTitle: "setWebViewTitle",
      goBack: "goBack",
      backExec: "backExec",
      open: "open",
      close: "close",
      copy: "copy",
      update: "update",
      showShareMenu: "showShareMenu",
      register: "register",
      login: "login",
      identityAuth: "identityAuth",
      passwordAuth: "passwordAuth",
      pay: "pay",
      showOptionMenu: "showOptionMenu",
      hideOptionMenu: "hideOptionMenu",
      getNetworkType: "getNetworkType",
      openLocation: "openLocation",
      chat: "chat",
      selectBankCard: "selectBankCard",
      setupPassword: "setupPassword",
      reportEvent: "reportEvent",
      selectGasCard: "selectGasCard",
      change: "change",
      freeMall: "freeMall",
      getAppInfo: "getAppInfo",
      riskValidate: "riskValidate",
      credit: "credit",
      custodyAuthorize: "custodyAuthorize"
    };
    var supportApiList = function () {
      var api,
          apis = {};
      for (api in supprotApis) {
        apis[supprotApis[api]] = api;
      }return apis;
    }();
    var doc = context.document;
    var title = doc.title;
    var userAgent = navigator.userAgent.toLowerCase();
    var jiayoubao = -1 != userAgent.indexOf("jiayoubao");
    var android = -1 != userAgent.indexOf("android");
    var iOS = -1 != userAgent.indexOf("iphone") || -1 != userAgent.indexOf("ipad") || -1 != userAgent.indexOf("ipod");
    var version = function () {
      var a = userAgent.match(/jiayoubao\/(\d+\.\d+\.\d+)/) || userAgent.match(/jiayoubao\/(\d+\.\d+)/);
      return a ? a[1] : "";
    }();
    var configuration = {};
    var bridgeReadyHandlers = {
      _completes: []
    };
    var bridgeState = {
      state: 0
    };
    var WebViewBridge = {
      config: function config(cfg) {
        configuration = cfg;
        log("config", cfg);
        callAfterBridgeReady(function () {
          bridgeState.state = 1;
          var a = bridgeReadyHandlers._completes;
          for (var i = 0; i < a.length; i++) {
            a[i]();
          }
          bridgeReadyHandlers._completes = [];
        });
      },
      ready: function ready(a) {
        if (configuration.debug || bridgeState.state == 1) {
          a();
        } else {
          bridgeReadyHandlers._completes.push(a);
        }
      },
      error: function error(a) {
        -1 == bridgeState.state ? a() : bridgeReadyHandlers._fail = a;
      },
      configWebView: function configWebView(a) {
        invoke("configWebView", {
          bounces: a.bounces == undefined ? true : a.bounces,
          title: a.title
        }, a);
      },
      setWebViewTitle: function setWebViewTitle(a) {
        invoke("configWebView", {
          title: a.title
        }, a);
      },
      goBack: function goBack(a) {
        invoke("goBack", {
          update: a.update
        }, a);
      },
      backExec: function backExec(a) {
        on("backExec", a);
      },
      open: function open(a) {
        invoke("open", {
          modal: a.modal,
          login: a.login,
          url: a.url
        }, a);
      },
      close: function close(a) {
        invoke("close", {}, a);
      },
      copy: function copy(a) {
        invoke("copy", {
          content: a.content
        }, a);
      },
      update: function update(a) {
        invoke("update", {
          refresh: a.refresh
        }, a);
      },
      showShareMenu: function showShareMenu(a) {
        invoke("showShareMenu", {
          title: a.title,
          content: a.content,
          image: a.image,
          url: a.url,
          sina: a.sina,
          cp: a.cp,
          sms: a.sms,
          menuItems: a.menuItems
        }, a);
      },
      register: function register(a) {
        invoke("register", {
          phoneNo: a.phoneNo
        }, a);
      },
      login: function login(a) {
        invoke("login", {
          phoneNo: a.phoneNo
        }, a);
      },
      identityAuth: function identityAuth(a) {
        invoke("identityAuth", {
          channel: a.channel
        }, a);
      },
      passwordAuth: function passwordAuth(a) {
        invoke("passwordAuth", {
          scene: a.scene,
          title: a.title,
          desp: a.desp
        }, a);
      },
      pay: function pay(a) {
        invoke("pay", {
          orderId: a.orderId,
          redirectURL: a.redirectURL,
          buttons: a.buttons,
          extra: a.extra
        }, a);
      },
      showOptionMenu: function showOptionMenu(a) {
        invoke("showOptionMenu", {
          icon: a.icon,
          title: a.title,
          menuItems: a.menuItems
        }, a);
      },
      hideOptionMenu: function hideOptionMenu(a) {
        invoke("hideOptionMenu", {}, a);
      },
      getNetworkType: function getNetworkType(a) {
        invoke("getNetworkType", {}, a);
      },
      openLocation: function openLocation(a) {
        invoke("openLocation", {}, a);
      },
      chat: function chat(a) {
        invoke("chat", {}, a);
      },
      selectBankCard: function selectBankCard(a) {
        invoke("selectBankCard", {
          title: a.title,
          type: a.type,
          prdId: a.prdId,
          channel: a.channel,
          cardId: a.cardId,
          cardType: a.cardType
        }, a);
      },
      setupPassword: function setupPassword(a) {
        invoke("setupPassword", {}, a);
      },
      reportEvent: function reportEvent(a) {
        invoke("reportEvent", {
          page: a.page,
          name: a.name,
          param: a.param
        }, a);
      },
      selectGasCard: function selectGasCard(a) {
        invoke("selectGasCard", {
          title: a.title,
          cardNo: a.cardNo
        }, a);
      },
      change: function change(a) {
        invoke("change", {}, a);
      },
      freeMall: function freeMall(a) {
        invoke("freeMall", {
          classId: a.classId,
          subClassId: a.subClassId
        }, a);
      },
      getAppInfo: function getAppInfo(a) {
        invoke("getAppInfo", {}, a);
      },
      react: function react(a) {
        invoke("react", {
          moduleName: a.moduleName,
          subModuleName: a.moduleName,
          title: a.title
        }, a);
      },
      riskValidate: function riskValidate(a) {
        invoke("riskValidate", {
          token: a.token
        }, a);
      },
      credit: function credit(a) {
        invoke("credit", {}, a);
      },
      custodyAuthorize: function custodyAuthorize(a) {
        invoke("custodyAuthorize", {}, a);
      }
    };
    if (b) {
      context.wv = context.jWebView = WebViewBridge;
      bind();
    }
    return WebViewBridge;
  }
}

var wv = jybWebview(window, true);
wv.config(_extends({ debug: false }, window._jybwv));

return wv;

})));
//# sourceMappingURL=jsapi.dev.js.map
