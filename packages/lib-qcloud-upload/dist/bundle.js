(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('crypto')) :
	typeof define === 'function' && define.amd ? define(['crypto'], factory) :
	(global.LibQcloudUpload = factory(global.crypto));
}(this, (function (crypto) { 'use strict';

crypto = crypto && 'default' in crypto ? crypto['default'] : crypto;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var cosJsSdkV4 = createCommonjsModule(function (module, exports) {
/* cos-js-sdk-v4 1.1.11 */
(function(){var $=function(){function e(e){var t=e.length,n=D.type(e);return"function"!==n&&!D.isWindow(e)&&(!(1!==e.nodeType||!t)||("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e))}function t(e){var t=M[e]={};return D.each(e.match(P)||[],function(e,n){t[n]=!0;}),t}function n(){q.addEventListener?(q.removeEventListener("DOMContentLoaded",r,!1),window.removeEventListener("load",r,!1)):(q.detachEvent("onreadystatechange",r),window.detachEvent("onload",r));}function r(){(q.addEventListener||"load"===event.type||"complete"===q.readyState)&&(n(),D.ready());}function a(e,t,n){if(void 0===n&&1===e.nodeType){var r="data-"+t.replace(B,"-$1").toLowerCase();if(n=e.getAttribute(r),"string"==typeof n){try{n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:$.test(n)?D.parseJSON(n):n);}catch(a){}D.data(e,t,n);}else n=void 0;}return n}function i(e){var t;for(t in e)if(("data"!==t||!D.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function o(e,t,n,r){if(D.acceptData(e)){var a,i,o=D.expando,s=e.nodeType,c=s?D.cache:e,u=s?e[o]:e[o]&&o;if(u&&c[u]&&(r||c[u].data)||void 0!==n||"string"!=typeof t)return u||(u=s?e[o]=g.pop()||D.guid++:o),c[u]||(c[u]=s?{}:{toJSON:D.noop}),"object"!=typeof t&&"function"!=typeof t||(r?c[u]=D.extend(c[u],t):c[u].data=D.extend(c[u].data,t)),i=c[u],r||(i.data||(i.data={}),i=i.data),void 0!==n&&(i[D.camelCase(t)]=n),"string"==typeof t?(a=i[t],null==a&&(a=i[D.camelCase(t)])):a=i,a}}function s(e,t,n){if(D.acceptData(e)){var r,a,o=e.nodeType,s=o?D.cache:e,c=o?e[D.expando]:D.expando;if(s[c]){if(t&&(r=n?s[c]:s[c].data)){D.isArray(t)?t=t.concat(D.map(t,D.camelCase)):t in r?t=[t]:(t=D.camelCase(t),t=t in r?[t]:t.split(" ")),a=t.length;for(;a--;)delete r[t[a]];if(n?!i(r):!D.isEmptyObject(r))return}(n||(delete s[c].data,i(s[c])))&&(o?D.cleanData([e],!0):C.deleteExpando||s!=s.window?delete s[c]:s[c]=null);}}}function c(){return!0}function u(){return!1}function l(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,a=0,i=t.toLowerCase().match(P)||[];if(D.isFunction(n))for(;r=i[a++];)"+"===r.charAt(0)?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n);}}function d(e,t,n,r){function a(s){var c;return i[s]=!0,D.each(e[s]||[],function(e,s){var u=s(t,n,r);return"string"!=typeof u||o||i[u]?o?!(c=u):void 0:(t.dataTypes.unshift(u),a(u),!1)}),c}var i={},o=e===ce;return a(t.dataTypes[0])||!i["*"]&&a("*")}function f(e,t){var n,r,a=D.ajaxSettings.flatOptions||{};for(r in t)void 0!==t[r]&&((a[r]?e:n||(n={}))[r]=t[r]);return n&&D.extend(!0,e,n),e}function p(e,t,n){for(var r,a,i,o,s=e.contents,c=e.dataTypes;"*"===c[0];)c.shift(),void 0===a&&(a=e.mimeType||t.getResponseHeader("Content-Type"));if(a)for(o in s)if(s[o]&&s[o].test(a)){c.unshift(o);break}if(c[0]in n)i=c[0];else{for(o in n){if(!c[0]||e.converters[o+" "+c[0]]){i=o;break}r||(r=o);}i=i||r;}if(i)return i!==c[0]&&c.unshift(i),n[i]}function h(e,t,n,r){var a,i,o,s,c,u={},l=e.dataTypes.slice();if(l[1])for(o in e.converters)u[o.toLowerCase()]=e.converters[o];for(i=l.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!c&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=i,i=l.shift())if("*"===i)i=c;else if("*"!==c&&c!==i){if(o=u[c+" "+i]||u["* "+i],!o)for(a in u)if(s=a.split(" "),s[1]===i&&(o=u[c+" "+s[0]]||u["* "+s[0]])){o===!0?o=u[a]:u[a]!==!0&&(i=s[0],l.unshift(s[1]));break}if(o!==!0)if(o&&e["throws"])t=o(t);else try{t=o(t);}catch(d){return{state:"parsererror",error:o?d:"No conversion from "+c+" to "+i}}}return{state:"success",data:t}}function v(e,t,n,r){var a;if(D.isArray(t))D.each(t,function(t,a){n||fe.test(e)?r(e,a):v(e+"["+("object"==typeof a?t:"")+"]",a,n,r);});else if(n||"object"!==D.type(t))r(e,t);else for(a in t)v(e+"["+a+"]",t[a],n,r);}function y(){try{return new window.XMLHttpRequest}catch(e){}}function m(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}var g=[],x=g.slice,b=g.concat,w=g.push,j=g.indexOf,T={},E=T.toString,S=T.hasOwnProperty,C={},k="1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap",D=function(e,t){return new D.fn.init(e,t)},_=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,L=/^-ms-/,A=/-([\da-z])/gi,N=function(e,t){return t.toUpperCase()};D.fn=D.prototype={jquery:k,constructor:D,selector:"",length:0,toArray:function(){return x.call(this)},get:function(e){return null!=e?e<0?this[e+this.length]:this[e]:x.call(this)},pushStack:function(e){var t=D.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return D.each(this,e,t)},map:function(e){return this.pushStack(D.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(x.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:w,sort:g.sort,splice:g.splice},D.extend=D.fn.extend=function(){var e,t,n,r,a,i,o=arguments[0]||{},s=1,c=arguments.length,u=!1;for("boolean"==typeof o&&(u=o,o=arguments[s]||{},s++),"object"==typeof o||D.isFunction(o)||(o={}),s===c&&(o=this,s--);s<c;s++)if(null!=(a=arguments[s]))for(r in a)e=o[r],n=a[r],o!==n&&(u&&n&&(D.isPlainObject(n)||(t=D.isArray(n)))?(t?(t=!1,i=e&&D.isArray(e)?e:[]):i=e&&D.isPlainObject(e)?e:{},o[r]=D.extend(u,i,n)):void 0!==n&&(o[r]=n));return o},D.extend({expando:"jQuery"+(k+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===D.type(e)},isArray:Array.isArray||function(e){return"array"===D.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!D.isArray(e)&&e-parseFloat(e)>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==D.type(e)||e.nodeType||D.isWindow(e))return!1;try{if(e.constructor&&!S.call(e,"constructor")&&!S.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(C.ownLast)for(t in e)return S.call(e,t);for(t in e);return void 0===t||S.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?T[E.call(e)]||"object":typeof e},globalEval:function(e){e&&D.trim(e)&&(window.execScript||function(e){window.eval.call(window,e);})(e);},camelCase:function(e){return e.replace(L,"ms-").replace(A,N)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(t,n,r){var a,i=0,o=t.length,s=e(t);if(r){if(s)for(;i<o&&(a=n.apply(t[i],r),a!==!1);i++);else for(i in t)if(a=n.apply(t[i],r),a===!1)break}else if(s)for(;i<o&&(a=n.call(t[i],i,t[i]),a!==!1);i++);else for(i in t)if(a=n.call(t[i],i,t[i]),a===!1)break;return t},trim:function(e){return null==e?"":(e+"").replace(_,"")},makeArray:function(t,n){var r=n||[];return null!=t&&(e(Object(t))?D.merge(r,"string"==typeof t?[t]:t):w.call(r,t)),r},inArray:function(e,t,n){var r;if(t){if(j)return j.call(t,e,n);for(r=t.length,n=n?n<0?Math.max(0,r+n):n:0;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,r=0,a=e.length;r<n;)e[a++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[a++]=t[r++];return e.length=a,e},grep:function(e,t,n){for(var r,a=[],i=0,o=e.length,s=!n;i<o;i++)r=!t(e[i],i),r!==s&&a.push(e[i]);return a},map:function(t,n,r){var a,i=0,o=t.length,s=e(t),c=[];if(s)for(;i<o;i++)a=n(t[i],i,r),null!=a&&c.push(a);else for(i in t)a=n(t[i],i,r),null!=a&&c.push(a);return b.apply([],c)},guid:1,proxy:function(e,t){var n,r,a;if("string"==typeof t&&(a=e[t],t=e,e=a),D.isFunction(e))return n=x.call(arguments,2),r=function(){return e.apply(t||this,n.concat(x.call(arguments)))},r.guid=e.guid=e.guid||D.guid++,r},now:function(){return+new Date},support:C}),D.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){T["[object "+t+"]"]=t.toLowerCase();});var O,q=window.document,H=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,F=D.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:H.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||O).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof D?t[0]:t,D.merge(this,D.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:q,!0)),rsingleTag.test(n[1])&&D.isPlainObject(t))for(n in t)D.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}if(r=q.getElementById(n[2]),r&&r.parentNode){if(r.id!==n[2])return O.find(e);this.length=1,this[0]=r;}return this.context=q,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):D.isFunction(e)?"undefined"!=typeof O.ready?O.ready(e):e(D):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),D.makeArray(e,this))};F.prototype=D.fn,O=D(q);var P=/\S+/g,M={};D.Callbacks=function(e){e="string"==typeof e?M[e]||t(e):D.extend({},e);var n,r,a,i,o,s,c=[],u=!e.once&&[],l=function(t){for(r=e.memory&&t,a=!0,o=s||0,s=0,i=c.length,n=!0;c&&o<i;o++)if(c[o].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,c&&(u?u.length&&l(u.shift()):r?c=[]:d.disable());},d={add:function(){if(c){var t=c.length;!function a(t){D.each(t,function(t,n){var r=D.type(n);"function"===r?e.unique&&d.has(n)||c.push(n):n&&n.length&&"string"!==r&&a(n);});}(arguments),n?i=c.length:r&&(s=t,l(r));}return this},remove:function(){return c&&D.each(arguments,function(e,t){for(var r;(r=D.inArray(t,c,r))>-1;)c.splice(r,1),n&&(r<=i&&i--,r<=o&&o--);}),this},has:function(e){return e?D.inArray(e,c)>-1:!(!c||!c.length)},empty:function(){return c=[],i=0,this},disable:function(){return c=u=r=void 0,this},disabled:function(){return!c},lock:function(){return u=void 0,r||d.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!c||a&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):l(t)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!a}};return d},D.extend({Deferred:function(e){var t=[["resolve","done",D.Callbacks("once memory"),"resolved"],["reject","fail",D.Callbacks("once memory"),"rejected"],["notify","progress",D.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return a.done(arguments).fail(arguments),this},then:function(){var e=arguments;return D.Deferred(function(n){D.each(t,function(t,i){var o=D.isFunction(e[t])&&e[t];a[i[1]](function(){var e=o&&o.apply(this,arguments);e&&D.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[i[0]+"With"](this===r?n.promise():this,o?[e]:arguments);});}),e=null;}).promise()},promise:function(e){return null!=e?D.extend(e,r):r}},a={};return r.pipe=r.then,D.each(t,function(e,i){var o=i[2],s=i[3];r[i[1]]=o.add,s&&o.add(function(){n=s;},t[1^e][2].disable,t[2][2].lock),a[i[0]]=function(){return a[i[0]+"With"](this===a?r:this,arguments),this},a[i[0]+"With"]=o.fireWith;}),r.promise(a),e&&e.call(a,a),a},when:function(e){var t,n,r,a=0,i=x.call(arguments),o=i.length,s=1!==o||e&&D.isFunction(e.promise)?o:0,c=1===s?e:D.Deferred(),u=function(e,n,r){return function(a){n[e]=this,r[e]=arguments.length>1?x.call(arguments):a,r===t?c.notifyWith(n,r):--s||c.resolveWith(n,r);}};if(o>1)for(t=new Array(o),n=new Array(o),r=new Array(o);a<o;a++)i[a]&&D.isFunction(i[a].promise)?i[a].promise().done(u(a,r,i)).fail(c.reject).progress(u(a,n,t)):--s;return s||c.resolveWith(r,i),c.promise()}});var W;D.fn.ready=function(e){return D.ready.promise().done(e),this},D.extend({isReady:!1,readyWait:1,holdReady:function(e){e?D.readyWait++:D.ready(!0);},ready:function(e){if(e===!0?!--D.readyWait:!D.isReady){if(!q.body)return setTimeout(D.ready);D.isReady=!0,e!==!0&&--D.readyWait>0||(W.resolveWith(q,[D]),D.fn.triggerHandler&&(D(q).triggerHandler("ready"),D(q).off("ready")));}}}),D.ready.promise=function(e){if(!W)if(W=D.Deferred(),"complete"===q.readyState)setTimeout(D.ready);else if(q.addEventListener)q.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",r,!1);else{q.attachEvent("onreadystatechange",r),window.attachEvent("onload",r);var t=!1;try{t=null==window.frameElement&&q.documentElement;}catch(a){}t&&t.doScroll&&!function i(){if(!D.isReady){try{t.doScroll("left");}catch(e){return setTimeout(i,50)}n(),D.ready();}}();}return W.promise(e)};var R,X="undefined";for(R in D(C))break;C.ownLast="0"!==R,C.inlineBlockNeedsLayout=!1,D(function(){var e,t,n,r;n=q.getElementsByTagName("body")[0],n&&n.style&&(t=q.createElement("div"),r=q.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==X&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",C.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(r));}),function(){var e=q.createElement("div");if(null==C.deleteExpando){C.deleteExpando=!0;try{delete e.test;}catch(t){C.deleteExpando=!1;}}e=null;}(),D.acceptData=function(e){var t=D.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return(1===n||9===n)&&(!t||t!==!0&&e.getAttribute("classid")===t)};var $=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,B=/([A-Z])/g;D.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?D.cache[e[D.expando]]:e[D.expando],!!e&&!i(e)},data:function(e,t,n){return o(e,t,n)},removeData:function(e,t){return s(e,t)},_data:function(e,t,n){return o(e,t,n,!0)},_removeData:function(e,t){return s(e,t,!0)}}),D.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=D.data(o),1===o.nodeType&&!D._data(o,"parsedAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=D.camelCase(r.slice(5)),a(o,r,i[r])));D._data(o,"parsedAttrs",!0);}return i}return"object"==typeof e?this.each(function(){D.data(this,e);}):arguments.length>1?this.each(function(){D.data(this,e,t);}):o?a(o,e,D.data(o,e)):void 0},removeData:function(e){return this.each(function(){D.removeData(this,e);})}}),D.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=D._data(e,t),n&&(!r||D.isArray(n)?r=D._data(e,t,D.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=D.queue(e,t),r=n.length,a=n.shift(),i=D._queueHooks(e,t),o=function(){D.dequeue(e,t);};"inprogress"===a&&(a=n.shift(),r--),a&&("fx"===t&&n.unshift("inprogress"),delete i.stop,a.call(e,o,i)),!r&&i&&i.empty.fire();},_queueHooks:function(e,t){var n=t+"queueHooks";return D._data(e,n)||D._data(e,n,{empty:D.Callbacks("once memory").add(function(){D._removeData(e,t+"queue"),D._removeData(e,n);})})}}),D.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?D.queue(this[0],e):void 0===t?this:this.each(function(){var n=D.queue(this,e,t);D._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&D.dequeue(this,e);})},dequeue:function(e){return this.each(function(){D.dequeue(this,e);})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,a=D.Deferred(),i=this,o=this.length,s=function(){--r||a.resolveWith(i,[i]);};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";o--;)n=D._data(i[o],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),a.promise(t)}}),D.event={global:{},add:function(e,t,n,r,a){var i,o,s,c,u,l,d,f,p,h,v,y=D._data(e);if(y){for(n.handler&&(c=n,n=c.handler,a=c.selector),n.guid||(n.guid=D.guid++),(o=y.events)||(o=y.events={}),(l=y.handle)||(l=y.handle=function(e){return typeof D===X||e&&D.event.triggered===e.type?void 0:D.event.dispatch.apply(l.elem,arguments)},l.elem=e),t=(t||"").match(P)||[""],s=t.length;s--;)i=U.exec(t[s])||[],p=v=i[1],h=(i[2]||"").split(".").sort(),p&&(u=D.event.special[p]||{},p=(a?u.delegateType:u.bindType)||p,u=D.event.special[p]||{},d=D.extend({type:p,origType:v,data:r,handler:n,guid:n.guid,selector:a,needsContext:a&&D.expr.match.needsContext.test(a),namespace:h.join(".")},c),(f=o[p])||(f=o[p]=[],f.delegateCount=0,u.setup&&u.setup.call(e,r,h,l)!==!1||(e.addEventListener?e.addEventListener(p,l,!1):e.attachEvent&&e.attachEvent("on"+p,l))),u.add&&(u.add.call(e,d),d.handler.guid||(d.handler.guid=n.guid)),a?f.splice(f.delegateCount++,0,d):f.push(d),D.event.global[p]=!0);e=null;}},remove:function(e,t,n,r,a){var i,o,s,c,u,l,d,f,p,h,v,y=D.hasData(e)&&D._data(e);if(y&&(l=y.events)){for(t=(t||"").match(P)||[""],u=t.length;u--;)if(s=U.exec(t[u])||[],p=v=s[1],h=(s[2]||"").split(".").sort(),p){for(d=D.event.special[p]||{},p=(r?d.delegateType:d.bindType)||p,f=l[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),c=i=f.length;i--;)o=f[i],!a&&v!==o.origType||n&&n.guid!==o.guid||s&&!s.test(o.namespace)||r&&r!==o.selector&&("**"!==r||!o.selector)||(f.splice(i,1),o.selector&&f.delegateCount--,d.remove&&d.remove.call(e,o));c&&!f.length&&(d.teardown&&d.teardown.call(e,h,y.handle)!==!1||D.removeEvent(e,p,y.handle),delete l[p]);}else for(p in l)D.event.remove(e,p+t[u],n,r,!0);D.isEmptyObject(l)&&(delete y.handle,D._removeData(e,"events"));}},trigger:function(e,t,n,r){var a,i,o,s,c,u,l,d=[n||q],f=S.call(e,"type")?e.type:e,p=S.call(e,"namespace")?e.namespace.split("."):[];if(o=u=n=n||q,3!==n.nodeType&&8!==n.nodeType&&!K.test(f+D.event.triggered)&&(f.indexOf(".")>=0&&(p=f.split("."),f=p.shift(),p.sort()),i=f.indexOf(":")<0&&"on"+f,e=e[D.expando]?e:new D.Event(f,"object"==typeof e&&e),e.isTrigger=r?2:3,e.namespace=p.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:D.makeArray(t,[e]),c=D.event.special[f]||{},r||!c.trigger||c.trigger.apply(n,t)!==!1)){if(!r&&!c.noBubble&&!D.isWindow(n)){for(s=c.delegateType||f,K.test(s+f)||(o=o.parentNode);o;o=o.parentNode)d.push(o),u=o;u===(n.ownerDocument||q)&&d.push(u.defaultView||u.parentWindow||window);}for(l=0;(o=d[l++])&&!e.isPropagationStopped();)e.type=l>1?s:c.bindType||f,a=(D._data(o,"events")||{})[e.type]&&D._data(o,"handle"),a&&a.apply(o,t),a=i&&o[i],a&&a.apply&&D.acceptData(o)&&(e.result=a.apply(o,t),e.result===!1&&e.preventDefault());if(e.type=f,!r&&!e.isDefaultPrevented()&&(!c._default||c._default.apply(d.pop(),t)===!1)&&D.acceptData(n)&&i&&n[f]&&!D.isWindow(n)){u=n[i],u&&(n[i]=null),D.event.triggered=f;try{n[f]();}catch(h){}D.event.triggered=void 0,u&&(n[i]=u);}return e.result}},dispatch:function(e){e=D.event.fix(e);var t,n,r,a,i,o=[],s=x.call(arguments),c=(D._data(this,"events")||{})[e.type]||[],u=D.event.special[e.type]||{};if(s[0]=e,e.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,e)!==!1){for(o=D.event.handlers.call(this,e,c),t=0;(a=o[t++])&&!e.isPropagationStopped();)for(e.currentTarget=a.elem,i=0;(r=a.handlers[i++])&&!e.isImmediatePropagationStopped();)e.namespace_re&&!e.namespace_re.test(r.namespace)||(e.handleObj=r,e.data=r.data,n=((D.event.special[r.origType]||{}).handle||r.handler).apply(a.elem,s),void 0!==n&&(e.result=n)===!1&&(e.preventDefault(),e.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,a,i,o=[],s=t.delegateCount,c=e.target;if(s&&c.nodeType&&(!e.button||"click"!==e.type))for(;c!=this;c=c.parentNode||this)if(1===c.nodeType&&(c.disabled!==!0||"click"!==e.type)){for(a=[],i=0;i<s;i++)r=t[i],n=r.selector+" ",void 0===a[n]&&(a[n]=r.needsContext?D(n,this).index(c)>=0:D.find(n,this,null,[c]).length),a[n]&&a.push(r);a.length&&o.push({elem:c,handlers:a});}return s<t.length&&o.push({elem:this,handlers:t.slice(s)}),o},fix:function(e){if(e[D.expando])return e;var t,n,r,a=e.type,i=e,o=this.fixHooks[a];for(o||(this.fixHooks[a]=o=z.test(a)?this.mouseHooks:J.test(a)?this.keyHooks:{}),r=o.props?this.props.concat(o.props):this.props,e=new D.Event(i),t=r.length;t--;)n=r[t],e[n]=i[n];return e.target||(e.target=i.srcElement||q),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,o.filter?o.filter(e,i):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,a,i=t.button,o=t.fromElement;return null==e.pageX&&null!=t.clientX&&(r=e.target.ownerDocument||q,a=r.documentElement,n=r.body,e.pageX=t.clientX+(a&&a.scrollLeft||n&&n.scrollLeft||0)-(a&&a.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(a&&a.scrollTop||n&&n.scrollTop||0)-(a&&a.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&o&&(e.relatedTarget=o===e.target?t.toElement:o),e.which||void 0===i||(e.which=1&i?1:2&i?3:4&i?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==safeActiveElement()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){if(this===safeActiveElement()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if(D.nodeName(this,"input")&&"checkbox"===this.type&&this.click)return this.click(),!1},_default:function(e){return D.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result);}}},simulate:function(e,t,n,r){var a=D.extend(new D.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?D.event.trigger(a,null,t):D.event.dispatch.call(t,a),a.isDefaultPrevented()&&n.preventDefault();}},D.removeEvent=q.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1);}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===X&&(e[r]=null),e.detachEvent(r,n));},D.Event=function(e,t){return this instanceof D.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?c:u):this.type=e,t&&D.extend(this,t),this.timeStamp=e&&e.timeStamp||D.now(),void(this[D.expando]=!0)):new D.Event(e,t)};var I=/^(?:input|select|textarea)$/i,J=/^key/,z=/^(?:mouse|pointer|contextmenu)|click/,K=/^(?:focusinfocus|focusoutblur)$/,U=/^([^.]*)(?:\.(.+)|)$/;D.Event.prototype={isDefaultPrevented:u,isPropagationStopped:u,isImmediatePropagationStopped:u,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=c,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1);},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=c,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0);},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=c,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation();}},C.submitBubbles||(D.event.special.submit={setup:function(){return!D.nodeName(this,"form")&&void D.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=D.nodeName(t,"input")||D.nodeName(t,"button")?t.form:void 0;n&&!D._data(n,"submitBubbles")&&(D.event.add(n,"submit._submit",function(e){e._submit_bubble=!0;}),D._data(n,"submitBubbles",!0));})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&D.event.simulate("submit",this.parentNode,e,!0));},teardown:function(){return!D.nodeName(this,"form")&&void D.event.remove(this,"._submit")}}),C.changeBubbles||(D.event.special.change={setup:function(){return I.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(D.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0);}),D.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),D.event.simulate("change",this,e,!0);})),!1):void D.event.add(this,"beforeactivate._change",function(e){var t=e.target;I.test(t.nodeName)&&!D._data(t,"changeBubbles")&&(D.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||D.event.simulate("change",this.parentNode,e,!0);}),D._data(t,"changeBubbles",!0));})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type)return e.handleObj.handler.apply(this,arguments)},teardown:function(){return D.event.remove(this,"._change"),!I.test(this.nodeName)}}),C.focusinBubbles||D.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){D.event.simulate(t,e.target,D.event.fix(e),!0);};D.event.special[t]={setup:function(){var r=this.ownerDocument||this,a=D._data(r,t);a||r.addEventListener(e,n,!0),D._data(r,t,(a||0)+1);},teardown:function(){var r=this.ownerDocument||this,a=D._data(r,t)-1;a?D._data(r,t,a):(r.removeEventListener(e,n,!0),D._removeData(r,t));}};}),D.fn.extend({on:function(e,t,n,r,a){var i,o;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(i in e)this.on(i,t,n,e[i],a);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=u;else if(!r)return this;return 1===a&&(o=r,r=function(e){return D().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=D.guid++)),this.each(function(){D.event.add(this,e,r,n,t);})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,a;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,D(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(a in e)this.off(a,t,e[a]);return this}return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=u),this.each(function(){D.event.remove(this,e,n,t);})},trigger:function(e,t){return this.each(function(){D.event.trigger(e,t,this);})},triggerHandler:function(e,t){var n=this[0];if(n)return D.event.trigger(e,t,n,!0)}}),D.fn.delay=function(e,t){return e=D.fx?D.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r);};})};var Y=D.now(),G=/\?/,V=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;D.parseJSON=function(e){if(window.JSON&&window.JSON.parse)return window.JSON.parse(e+"");var t,n=null,r=D.trim(e+"");return r&&!D.trim(r.replace(V,function(e,r,a,i){return t&&r&&(n=0),0===n?e:(t=a||r,n+=!i-!a,"")}))?Function("return "+r)():D.error("Invalid JSON: "+e)},D.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{window.DOMParser?(n=new DOMParser,t=n.parseFromString(e,"text/xml")):(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e));}catch(r){t=void 0;}return t&&t.documentElement&&!t.getElementsByTagName("parsererror").length||D.error("Invalid XML: "+e),t};var Q,Z,ee=/#.*$/,te=/([?&])_=[^&]*/,ne=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,re=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ae=/^(?:GET|HEAD)$/,ie=/^\/\//,oe=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,se={},ce={},ue="*/".concat("*");try{Z=location.href;}catch(le){Z=q.createElement("a"),Z.href="",Z=Z.href;}Q=oe.exec(Z.toLowerCase())||[],D.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Z,type:"GET",isLocal:re.test(Q[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ue,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":D.parseJSON,"text xml":D.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?f(f(e,D.ajaxSettings),t):f(D.ajaxSettings,e)},ajaxPrefilter:l(se),ajaxTransport:l(ce),ajax:function(e,t){function n(e,t,n,r){var a,l,d,b,w,T=t;2!==j&&(j=2,s&&clearTimeout(s),u=void 0,o=r||"",E.readyState=e>0?4:0,a=e>=200&&e<300||304===e,n&&(b=p(f,E,n)),b=h(f,b,E,a),a?(f.ifModified&&(w=E.getResponseHeader("Last-Modified"),w&&(D.lastModified[i]=w),w=E.getResponseHeader("etag"),w&&(D.etag[i]=w)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=b.state,l=b.data,d=b.error,a=!d)):(d=T,!e&&T||(T="error",e<0&&(e=0))),E.status=e,E.statusText=(t||T)+"",a?m.resolveWith(v,[l,T,E]):m.rejectWith(v,[E,T,d]),E.statusCode(x),x=void 0,c&&y.trigger(a?"ajaxSuccess":"ajaxError",[E,f,a?l:d]),g.fireWith(v,[E,T]),c&&(y.trigger("ajaxComplete",[E,f]),--D.active||D.event.trigger("ajaxStop")));}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,a,i,o,s,c,u,l,f=D.ajaxSetup({},t),v=f.context||f,y=f.context&&(v.nodeType||v.jquery)?D(v):D.event,m=D.Deferred(),g=D.Callbacks("once memory"),x=f.statusCode||{},b={},w={},j=0,T="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(2===j){if(!l)for(l={};t=ne.exec(o);)l[t[1].toLowerCase()]=t[2];t=l[e.toLowerCase()];}return null==t?null:t},getAllResponseHeaders:function(){return 2===j?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return j||(e=w[n]=w[n]||e,b[e]=t),this},overrideMimeType:function(e){return j||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(j<2)for(t in e)x[t]=[x[t],e[t]];else E.always(e[E.status]);return this},abort:function(e){var t=e||T;return u&&u.abort(t),n(0,t),this}};if(m.promise(E).complete=g.add,E.success=E.done,E.error=E.fail,f.url=((e||f.url||Z)+"").replace(ee,"").replace(ie,Q[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=D.trim(f.dataType||"*").toLowerCase().match(P)||[""],null==f.crossDomain&&(r=oe.exec(f.url.toLowerCase()),f.crossDomain=!(!r||r[1]===Q[1]&&r[2]===Q[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(Q[3]||("http:"===Q[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=D.param(f.data,f.traditional)),d(se,f,t,E),2===j)return E;c=f.global,c&&0===D.active++&&D.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!ae.test(f.type),i=f.url,f.hasContent||(f.data&&(i=f.url+=(G.test(i)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=te.test(i)?i.replace(te,"$1_="+Y++):i+(G.test(i)?"&":"?")+"_="+Y++)),f.ifModified&&(D.lastModified[i]&&E.setRequestHeader("If-Modified-Since",D.lastModified[i]),D.etag[i]&&E.setRequestHeader("If-None-Match",D.etag[i])),(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&E.setRequestHeader("Content-Type",f.contentType),E.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+ue+"; q=0.01":""):f.accepts["*"]);for(a in f.headers)E.setRequestHeader(a,f.headers[a]);if(f.beforeSend&&(f.beforeSend.call(v,E,f)===!1||2===j))return E.abort();T="abort";for(a in{success:1,error:1,complete:1})E[a](f[a]);if(u=d(ce,f,t,E)){E.readyState=1,c&&y.trigger("ajaxSend",[E,f]),f.async&&f.timeout>0&&(s=setTimeout(function(){E.abort("timeout");},f.timeout));try{j=1,u.send(b,n);}catch(S){if(!(j<2))throw S;n(-1,S);}}else n(-1,"No Transport");return E},getJSON:function(e,t,n){return D.get(e,t,n,"json")},getScript:function(e,t){return D.get(e,void 0,t,"script")}}),D.each(["get","post"],function(e,t){D[t]=function(e,n,r,a){return D.isFunction(n)&&(a=a||r,r=n,n=void 0),D.ajax({url:e,type:t,dataType:a,data:n,success:r})};}),D.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){D.fn[t]=function(e){return this.on(t,e)};}),D._evalUrl=function(e){return D.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})};var de=/%20/g,fe=/\[\]$/,pe=/\r?\n/g,he=/^(?:submit|button|image|reset|file)$/i,ve=/^(?:input|select|textarea|keygen)/i;D.param=function(e,t){var n,r=[],a=function(e,t){t=D.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t);};if(void 0===t&&(t=D.ajaxSettings&&D.ajaxSettings.traditional),D.isArray(e)||e.jquery&&!D.isPlainObject(e))D.each(e,function(){a(this.name,this.value);});else for(n in e)v(n,e[n],t,a);return r.join("&").replace(de,"+")},D.fn.extend({serialize:function(){return D.param(this.serializeArray());
},serializeArray:function(){return this.map(function(){var e=D.prop(this,"elements");return e?D.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!D(this).is(":disabled")&&ve.test(this.nodeName)&&!he.test(e)&&(this.checked||!rcheckableType.test(e))}).map(function(e,t){var n=D(this).val();return null==n?null:D.isArray(n)?D.map(n,function(e){return{name:t.name,value:e.replace(pe,"\r\n")}}):{name:t.name,value:n.replace(pe,"\r\n")}}).get()}}),D.ajaxSettings.xhr=void 0!==window.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&y()||m()}:y;var ye=0,me={},ge=D.ajaxSettings.xhr();window.ActiveXObject&&D(window).on("unload",function(){for(var e in me)me[e](void 0,!0);}),C.cors=!!ge&&"withCredentials"in ge,ge=C.ajax=!!ge,ge&&D.ajaxTransport(function(e){if(!e.crossDomain||C.cors){var t;return{send:function(n,r){var a,i=e.xhr(),o=++ye;if(i.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)i[a]=e.xhrFields[a];e.mimeType&&i.overrideMimeType&&i.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(a in n)void 0!==n[a]&&i.setRequestHeader(a,n[a]+"");i.send(e.hasContent&&e.data||null),t=function(n,a){var s,c,u;if(t&&(a||4===i.readyState))if(delete me[o],t=void 0,i.onreadystatechange=D.noop,a)4!==i.readyState&&i.abort();else{u={},s=i.status,"string"==typeof i.responseText&&(u.text=i.responseText);try{c=i.statusText;}catch(l){c="";}s||!e.isLocal||e.crossDomain?1223===s&&(s=204):s=u.text?200:404;}u&&r(s,c,u,i.getAllResponseHeaders());},e.async?4===i.readyState?setTimeout(t):i.onreadystatechange=me[o]=t:t();},abort:function(){t&&t(void 0,!0);}}}}),D.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return D.globalEval(e),e}}}),D.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1);}),D.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=q.head||D("head")[0]||q.documentElement;return{send:function(r,a){t=q.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||a(200,"success"));},n.insertBefore(t,n.firstChild);},abort:function(){t&&t.onload(void 0,!0);}}}});var xe=[],be=/(=)\?(?=&|$)|\?\?/;return D.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=xe.pop()||D.expando+"_"+Y++;return this[e]=!0,e}}),D.ajaxPrefilter("json jsonp",function(e,t,n){var r,a,i,o=e.jsonp!==!1&&(be.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&be.test(e.data)&&"data");if(o||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=D.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,o?e[o]=e[o].replace(be,"$1"+r):e.jsonp!==!1&&(e.url+=(G.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return i||D.error(r+" was not called"),i[0]},e.dataTypes[0]="json",a=window[r],window[r]=function(){i=arguments;},n.always(function(){window[r]=a,e[r]&&(e.jsonpCallback=t.jsonpCallback,xe.push(r)),i&&D.isFunction(a)&&a(i[0]),i=a=void 0;}),"script"}),D.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||q;var r=rsingleTag.exec(e),a=!n&&[];return r?[t.createElement(r[1])]:(r=D.buildFragment([e],t,a),a&&a.length&&D(a).remove(),D.merge([],r.childNodes))},D}();
var jsSHA=function(){function r(r,i,f){var s,l,E,b,v,g,A,d,F,w=0,R=[],B=0,U=!1,y=[],H=[],T=!1;if(f=f||{},s=f.encoding||"UTF8",F=f.numRounds||1,F!==parseInt(F,10)||1>F)throw Error("numRounds must a integer >= 1");if("SHA-1"!==r)throw Error("Chosen SHA variant is not supported");v=512,g=h,A=p,b=160,d=function(r){return r.slice()},E=u(i,s),l=c(r),this.setHMACKey=function(t,n,e){var o;if(!0===U)throw Error("HMAC key already set");if(!0===T)throw Error("Cannot set HMAC key after calling update");if(s=(e||{}).encoding||"UTF8",n=u(n,s)(t),t=n.binLen,n=n.value,o=v>>>3,e=o/4-1,o<t/8){for(n=A(n,t,0,c(r),b);n.length<=e;)n.push(0);n[e]&=4294967040;}else if(o>t/8){for(;n.length<=e;)n.push(0);n[e]&=4294967040;}for(t=0;t<=e;t+=1)y[t]=909522486^n[t],H[t]=1549556828^n[t];l=g(y,l),w=v,U=!0;},this.update=function(r){var t,n,e,o=0,a=v>>>5;for(t=E(r,R,B),r=t.binLen,n=t.value,t=r>>>5,e=0;e<t;e+=a)o+v<=r&&(l=g(n.slice(e,e+a),l),o+=v);w+=o,R=n.slice(o>>>5),B=r%v,T=!0;var u=function(r){for(var t="",n=0;n<5;n++)for(var e=0;e<4;e++){var o=r[n]>>>8*e;o=255&o;var a=Number(o).toString(16);a=a.length<2?"0"+a:a,t+=a;}return t};return u(l)},this.getHash=function(u,i){var f,s,h,p;if(!0===U)throw Error("Cannot call getHash after setting HMAC key");switch(h=a(i),u){case"HEX":f=function(r){return t(r,b,h)};break;case"B64":f=function(r){return n(r,b,h)};break;case"BYTES":f=function(r){return e(r,b)};break;case"ARRAYBUFFER":try{s=new ArrayBuffer(0);}catch(E){throw Error("ARRAYBUFFER not supported by this environment")}f=function(r){return o(r,b)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER")}for(p=A(R.slice(),B,w,d(l),b),s=1;s<F;s+=1)p=A(p,b,0,c(r),b);return f(p)},this.getHMAC=function(u,i){var f,s,h,p;if(!1===U)throw Error("Cannot call getHMAC without first setting HMAC key");switch(h=a(i),u){case"HEX":f=function(r){return t(r,b,h)};break;case"B64":f=function(r){return n(r,b,h)};break;case"BYTES":f=function(r){return e(r,b)};break;case"ARRAYBUFFER":try{f=new ArrayBuffer(0);}catch(E){throw Error("ARRAYBUFFER not supported by this environment")}f=function(r){return o(r,b)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER")}return s=A(R.slice(),B,w,d(l),b),p=g(H,c(r)),p=A(s,b,v,p,b),f(p)};}function t(r,t,n){var e="";t/=8;var o,a;for(o=0;o<t;o+=1)a=r[o>>>2]>>>8*(3+o%4*-1),e+="0123456789abcdef".charAt(a>>>4&15)+"0123456789abcdef".charAt(15&a);return n.outputUpper?e.toUpperCase():e}function n(r,t,n){var e,o,a,u="",i=t/8;for(e=0;e<i;e+=3)for(o=e+1<i?r[e+1>>>2]:0,a=e+2<i?r[e+2>>>2]:0,a=(r[e>>>2]>>>8*(3+e%4*-1)&255)<<16|(o>>>8*(3+(e+1)%4*-1)&255)<<8|a>>>8*(3+(e+2)%4*-1)&255,o=0;4>o;o+=1)u+=8*e+6*o<=t?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6*(3-o)&63):n.b64Pad;return u}function e(r,t){var n,e,o="",a=t/8;for(n=0;n<a;n+=1)e=r[n>>>2]>>>8*(3+n%4*-1)&255,o+=String.fromCharCode(e);return o}function o(r,t){var n,e=t/8,o=new ArrayBuffer(e);for(n=0;n<e;n+=1)o[n]=r[n>>>2]>>>8*(3+n%4*-1)&255;return o}function a(r){var t={outputUpper:!1,b64Pad:"=",shakeLen:-1};if(r=r||{},t.outputUpper=r.outputUpper||!1,!0===r.hasOwnProperty("b64Pad")&&(t.b64Pad=r.b64Pad),"boolean"!=typeof t.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!=typeof t.b64Pad)throw Error("Invalid b64Pad formatting option");return t}function u(r,t){var n;switch(t){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(r){case"HEX":n=function(r,t,n){var e,o,a,u,i,f=r.length;if(0!==f%2)throw Error("String of HEX type must be in byte increments");for(t=t||[0],n=n||0,i=n>>>3,e=0;e<f;e+=2){if(o=parseInt(r.substr(e,2),16),isNaN(o))throw Error("String of HEX type contains invalid characters");for(u=(e>>>1)+i,a=u>>>2;t.length<=a;)t.push(0);t[a]|=o<<8*(3+u%4*-1);}return{value:t,binLen:4*f+n}};break;case"TEXT":n=function(r,n,e){var o,a,u,i,f,s,c,h,p=0;if(n=n||[0],e=e||0,f=e>>>3,"UTF8"===t)for(h=3,u=0;u<r.length;u+=1)for(o=r.charCodeAt(u),a=[],128>o?a.push(o):2048>o?(a.push(192|o>>>6),a.push(128|63&o)):55296>o||57344<=o?a.push(224|o>>>12,128|o>>>6&63,128|63&o):(u+=1,o=65536+((1023&o)<<10|1023&r.charCodeAt(u)),a.push(240|o>>>18,128|o>>>12&63,128|o>>>6&63,128|63&o)),i=0;i<a.length;i+=1){for(c=p+f,s=c>>>2;n.length<=s;)n.push(0);n[s]|=a[i]<<8*(h+c%4*-1),p+=1;}else if("UTF16BE"===t||"UTF16LE"===t)for(h=2,u=0;u<r.length;u+=1){for(o=r.charCodeAt(u),"UTF16LE"===t&&(i=255&o,o=i<<8|o>>>8),c=p+f,s=c>>>2;n.length<=s;)n.push(0);n[s]|=o<<8*(h+c%4*-1),p+=2;}return{value:n,binLen:8*p+e}};break;case"B64":n=function(r,t,n){var e,o,a,u,i,f,s,c=0;if(-1===r.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");if(o=r.indexOf("="),r=r.replace(/\=/g,""),-1!==o&&o<r.length)throw Error("Invalid '=' found in base-64 string");for(t=t||[0],n=n||0,f=n>>>3,o=0;o<r.length;o+=4){for(i=r.substr(o,4),a=u=0;a<i.length;a+=1)e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(i[a]),u|=e<<18-6*a;for(a=0;a<i.length-1;a+=1){for(s=c+f,e=s>>>2;t.length<=e;)t.push(0);t[e]|=(u>>>16-8*a&255)<<8*(3+s%4*-1),c+=1;}}return{value:t,binLen:8*c+n}};break;case"BYTES":n=function(r,t,n){var e,o,a,u,i;for(t=t||[0],n=n||0,a=n>>>3,o=0;o<r.length;o+=1)e=r.charCodeAt(o),i=o+a,u=i>>>2,t.length<=u&&t.push(0),t[u]|=e<<8*(3+i%4*-1);return{value:t,binLen:8*r.length+n}};break;case"ARRAYBUFFER":try{n=new ArrayBuffer(0);}catch(e){throw Error("ARRAYBUFFER not supported by this environment")}n=function(r,t,n){var e,o,a,u;for(t=t||[0],n=n||0,o=n>>>3,e=0;e<r.byteLength;e+=1)u=e+o,a=u>>>2,t.length<=a&&t.push(0),t[a]|=r[e]<<8*(3+u%4*-1);return{value:t,binLen:8*r.byteLength+n}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER")}return n}function i(r,t){return r<<t|r>>>32-t}function f(r,t){var n=(65535&r)+(65535&t);return((r>>>16)+(t>>>16)+(n>>>16)&65535)<<16|65535&n}function s(r,t,n,e,o){var a=(65535&r)+(65535&t)+(65535&n)+(65535&e)+(65535&o);return((r>>>16)+(t>>>16)+(n>>>16)+(e>>>16)+(o>>>16)+(a>>>16)&65535)<<16|65535&a}function c(r){var t=[];if("SHA-1"!==r)throw Error("No SHA variants supported");return t=[1732584193,4023233417,2562383102,271733878,3285377520]}function h(r,t){var n,e,o,a,u,c,h,p=[];for(n=t[0],e=t[1],o=t[2],a=t[3],u=t[4],h=0;80>h;h+=1)p[h]=16>h?r[h]:i(p[h-3]^p[h-8]^p[h-14]^p[h-16],1),c=20>h?s(i(n,5),e&o^~e&a,u,1518500249,p[h]):40>h?s(i(n,5),e^o^a,u,1859775393,p[h]):60>h?s(i(n,5),e&o^e&a^o&a,u,2400959708,p[h]):s(i(n,5),e^o^a,u,3395469782,p[h]),u=a,a=o,o=i(e,30),e=n,n=c;return t[0]=f(n,t[0]),t[1]=f(e,t[1]),t[2]=f(o,t[2]),t[3]=f(a,t[3]),t[4]=f(u,t[4]),t}function p(r,t,n,e){var o;for(o=(t+65>>>9<<4)+15;r.length<=o;)r.push(0);for(r[t>>>5]|=128<<24-t%32,t+=n,r[o]=4294967295&t,r[o-1]=t/4294967296|0,t=r.length,o=0;o<t;o+=16)e=h(r.slice(o,o+16),e);return e}return r}();
!function(e,t){module.exports=t();}(this,function(){"use strict";function e(e){this.appid=e.appid,this.bucket=e.bucket,this.region=e.region,this.sha1CacheExpired=259200,this.uploadMaxThread=5,this.uploadMaxRetryTimes=3,this._uploadingThreadCount=0,this.tasks=[],e.getAppSign&&(this.getAppSign=t(e.getAppSign,this)),e.getAppSignOnce&&(this.getAppSignOnce=t(e.getAppSignOnce,this));}function t(e,t){return function(a){e.call(t,function(e){decodeURIComponent(e)===e&&(e=encodeURIComponent(e)),a(e);});}}function a(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function n(e,t){if(!e)return"";var a=this;return e=e.replace(/(^\/*)/g,""),e="folder"==t?encodeURIComponent(e+"/").replace(/%2F/g,"/"):encodeURIComponent(e).replace(/%2F/g,"/"),a&&(a.path="/"+a.appid+"/"+a.bucket+"/"+e),e}function o(e){var t,a=$.Deferred(),n=new jsSHA("SHA-1","BYTES"),o=0,s=e.sliceSize,i=new FileReader,r=[],p=e.file,l=p.size;e.session&&(t=h(e.session));var u=function(e){r.push(e);var a=e.offset+"-"+e.datalen;return!t||!t[a]||e.datasha===t[a]};return i.onload=function(t){if("cancel"!==e.globalTask.state&&p&&!(p.length<1)){var d=n.update(this.content||this.result),f=o+s>l?l-o:s,g=o+f<l,h=g?d:n.getHash("HEX");if(!u({offset:o,datalen:f,datasha:h}))return void a.reject("sha1 not match");o+=f,e.onprogress(0,o/l),g?c.call(i,p.slice(o,Math.min(o+s,l))):a.resolve(r);}},c.call(i,p.slice(o,o+s)),i.onerror=function(){a.reject();},a.promise()}function s(e){var t=$.Deferred(),a=e.file,n=this,o=this.getCgiUrl(e.path,e.sign),s=new FormData,r=e.uploadparts;return s.append("uploadparts",JSON.stringify(r)),s.append("sha",e.sha),s.append("op","upload_slice_init"),s.append("filesize",a.size),s.append("slice_size",e.sliceSize),s.append("biz_attr",e.biz_attr),s.append("insertOnly",e.insertOnly),$.ajax({type:"POST",dataType:"JSON",url:o,data:s,success:function(a){if("cancel"!==e.globalTask.state)if(a=a||{},0==a.code){if(a.data.access_url)return void t.resolve(a);var o=a.data.session,s=parseInt(a.data.slice_size),r=a.data.offset||0;e.session=o,e.slice_size=s,e.offset=r,i.call(n,e).done(function(e){t.resolve(e);}).fail(function(e){t.reject(e);});for(var p,c={},l=1;l<e.uploadparts.length;l*=2)p=e.uploadparts[l-1],c[p.offset+"-"+p.datalen]=p.datasha;p=e.uploadparts[e.uploadparts.length-1],c[p.offset+"-"+p.datalen]=p.datasha,g(e.session,c,n.sha1CacheExpired);}else t.reject(a);},error:function(){t.reject();},processData:!1,contentType:!1}),t.promise()}function i(e){var t,a=this,n=e.file,o=$.Deferred(),s={opt:e,uploadingAjax:[],uploadingCount:0,currentIndex:0,chunkCount:Math.ceil(n.size/e.slice_size),chunks:[],loadedSize:0,uploadError:!1,onTaskProgress:function(a){var o=function(){t=0,e.onprogress&&e.onprogress(s.loadedSize/n.size,1);};if(a)clearTimeout(t),o();else{if(t)return;t=setTimeout(o,100);}}};!function(){var t,a={};if(e.listparts)for(t=0;t<e.listparts.length;t++)a[e.listparts[t].offset]=e.listparts[t];for(t=0;t<s.chunkCount;t++){var o=t*e.slice_size,i=Math.min(o+e.slice_size,n.size),r={start:o,end:i,size:i-o};a[o]?(s.loadedSize+=r.size,r.state="online"):r.state="waiting",s.chunks.push(r);}}();var i=function(){s.onTaskProgress(!0),o.resolve();},r=function(e,t){s.uploadError="error";for(var a=s.uploadingAjax.length-1;a>=0;a--){var n=s.uploadingAjax[a];n&&n.abort();}s.onTaskProgress(!0),o.reject(t);};e.globalTask.cancelRequests=function(){for(var e=s.uploadingAjax.length-1;e>=0;e--){var t=s.uploadingAjax[e];t&&t.abort();}};var p=function(){if("cancel"!==e.globalTask.state){for(;a._uploadingThreadCount<a.uploadMaxThread&&s.currentIndex<s.chunkCount;s.currentIndex++){var t=s.chunks[s.currentIndex];"waiting"===t.state&&!function(e){e.state="uploading",s.uploadingCount++,a._uploadingThreadCount++,v.call(a,s,e,function(t,n){s.uploadingCount--,a._uploadingThreadCount--,t?(e.state="error",r(t,n)):(e.state="success",s.uploadingCount<=0&&s.currentIndex>=s.chunkCount?i():p());});}(t);}0===s.uploadingCount&&s.currentIndex===s.chunks.length&&i();}};return p(),o.promise()}function r(e){var t=this,a=$.Deferred(),n=e.file;return t.getAppSign(function(o){e.sign=o;var s=t.getCgiUrl(e.path,e.sign),i=new FormData;i.append("op","upload_slice_list"),$.ajax({type:"POST",dataType:"JSON",url:s,data:i,success:function(t){if(t=t||{},0==t.code){e.session=t.data.session,e.slice_size=t.data.slice_size;var o=t.data.listparts||[];e.listparts=o;var s=o.length;if(s){var i=e.listparts[s-1],r=i.offset;if(r+i.datalen>n.size)return a.resolve(),a.promise();e.offset=r;}a.resolve(t);}else a.reject(t);},error:function(){a.reject();},processData:!1,contentType:!1});}),a.promise()}function p(e){var t=this,a=$.Deferred(),n=e.file;return t.getAppSign(function(o){e.sign=o;var s=e.session,i=t.getCgiUrl(e.path,e.sign),r=new FormData;e.sha&&r.append("sha",e.sha),r.append("op","upload_slice_finish"),r.append("filesize",n.size),r.append("session",s),$.ajax({type:"POST",dataType:"JSON",url:i,data:r,success:function(e){e=e||{},0==e.code?a.resolve(e):a.reject(e);},error:function(){a.reject();},processData:!1,contentType:!1});}),a.promise()}function c(e){var t;FileReader.prototype.readAsBinaryString?t=FileReader.prototype.readAsBinaryString:FileReader.prototype.readAsArrayBuffer?t=function(e){var t="",a=this,n=new FileReader;n.onload=function(e){for(var o=new Uint8Array(n.result),s=o.byteLength,i=0;i<s;i++)t+=String.fromCharCode(o[i]);a.content=t,a.onload();},n.readAsArrayBuffer(e);}:console.error("FileReader not support readAsBinaryString"),t.call(this,e);}var l=524288,u=1048576,d=20971520;e.version="1.1.11",e.prototype.cosapi_cgi_url=("https:"===location.protocol?"https:":"http:")+"//REGION.file.myqcloud.com/files/v2/",e.prototype.slice=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,e.prototype.sliceSize=3145728,e.prototype.getExpired=function(e){return(new Date).getTime()/1e3+(e||60)},e.prototype.getSliceSize=function(e){var t=u;return t=e<=l?l:e<=u?u:u},e.prototype.set=function(e){e&&(this.appid=e.appid,this.bucket=e.bucket,this.region=e.region,e.getAppSign&&(this.getAppSign=e.getAppSign),e.getAppSignOnce&&(this.getAppSignOnce=e.getAppSignOnce));},e.prototype.getCgiUrl=function(e,t){var a=this.region,n=this.bucket,o=this.cosapi_cgi_url;return o=o.replace("REGION",a),o+this.appid+"/"+n+"/"+e+"?sign="+t},e.prototype.getAppSign=function(e,t,a){var n=this.getExpired(),o=this.sign_url+"?sign_type=appSign&expired="+n+"&bucketName="+a;$.ajax({url:o,type:"GET",success:e,error:t});},e.prototype.getAppSignOnce=function(e,t,a,n){var o=this.sign_url+"?sign_type=appSign_once&path="+encodeURIComponent(a)+"&bucketName="+n;$.ajax({url:o,type:"GET",success:e,error:t});},e.prototype.updateFolder=function(e,t,a,o,s){o=n.call(this,o,"folder"),this.updateBase(e,t,a,o,s);},e.prototype.updateFile=function(e,t,a,o,s){o=n.call(this,o),this.updateBase(e,t,a,o,s);},e.prototype.updateBase=function(e,t,a,n,o,s,i){var r=this;r.getAppSignOnce(function(a){var p=r.getCgiUrl(n,a),c=new FormData;c.append("op","update"),o&&c.append("biz_attr",o),s&&c.append("authority",s),i&&(i=JSON.stringify(i),c.append("customHeaders",i)),$.ajax({type:"POST",url:p,processData:!1,contentType:!1,data:c,success:e,error:t});});},e.prototype.deleteFolder=function(e,t,a,o){o=n.call(this,o,"folder"),this.deleteBase(e,t,a,o);},e.prototype.deleteFile=function(e,t,a,o){o=n.call(this,o),this.deleteBase(e,t,a,o);},e.prototype.deleteBase=function(e,t,a,n){if("/"==n)return void t({code:10003,message:"不能删除Bucket"});var o=this;this.getAppSignOnce(function(a){var s=o.getCgiUrl(n,a),i=new FormData;i.append("op","delete"),$.ajax({type:"POST",url:s,data:i,processData:!1,contentType:!1,success:e,error:t});});},e.prototype.getFolderStat=function(e,t,a,o){o=n(o,"folder"),this.statBase(e,t,a,o);},e.prototype.getFileStat=function(e,t,a,o){o=n(o),this.statBase(e,t,a,o);},e.prototype.statBase=function(e,t,a,n){var o=this;this.getAppSign.call(o,function(a){var s=o.getCgiUrl(n,a),i={op:"stat"};$.ajax({url:s,type:"GET",data:i,success:e,error:t});});},e.prototype.createFolder=function(e,t,a,o,s){var i=this;this.getAppSign(function(a){o=n(o,"folder");var r=i.getCgiUrl(o,a),p=new FormData;p.append("op","create"),p.append("biz_attr",s||""),$.ajax({type:"POST",url:r,data:p,processData:!1,contentType:!1,success:e,error:t});});},e.prototype.copyFile=function(e,t,a,o,s,i){var r=this;this.getAppSign(function(a){o=n(o);var p=r.getCgiUrl(o,a),c=new FormData;c.append("op","copy"),c.append("dest_fileid",s),c.append("to_over_write",i),$.ajax({type:"POST",url:p,data:c,processData:!1,contentType:!1,success:e,error:t});});},e.prototype.moveFile=function(e,t,a,o,s,i){var r=this;this.getAppSign(function(a){o=n(o);var p=r.getCgiUrl(o,a),c=new FormData;c.append("op","move"),c.append("dest_fileid",s),c.append("to_over_write",i),$.ajax({type:"POST",url:p,data:c,processData:!1,contentType:!1,success:e,error:t});});},e.prototype.getFolderList=function(e,t,a,o,s,i,r,p,c){var l=this;o=n(o,"folder"),l.listBase(e,t,a,o,s,i,r,p);},e.prototype.listBase=function(e,t,a,n,o,s,i,r,p){var c=this;c.getAppSign(function(a){var p=c.getCgiUrl(n,a);o=o||20,i=i||0,r=r||"eListBoth";var l={op:"list",num:o,context:s,order:i,pattern:r};$.ajax({url:p,type:"GET",data:l,success:e,error:t});});},e.prototype.uploadFile=function(e,t,o,s,i,r,p,c){var l=this;if(r.size>d)return void l.sliceUploadFile(e,t,o,s,i,r,p,void 0,void 0,c);if("/"===i.substr(i.length-1))return void t({code:-1,message:'path not allow end with "/"'});i=n(i);var u,f=a(),g={id:f,state:"uploading",cancel:function(){u&&u.abort();}};this.tasks[f]=g,c&&"function"==typeof c&&c(f),l.getAppSign(function(t){var a=l.getCgiUrl(i,t),n=new FormData;p=0===p?0:1,n.append("op","upload"),n.append("fileContent",r),n.append("insertOnly",p),u=$.ajax({type:"POST",url:a,data:n,processData:!1,contentType:!1,xhr:function(){var e=$.ajaxSettings.xhr();return e.upload.onprogress=function(e){var t=e.loaded/e.total;"function"==typeof o&&o(t,0);},e},success:function(){"cancel"!==g.state&&e.apply(this,arguments);},error:function(){"cancel"!==g.state&&e.apply(this,arguments);}});});},e.prototype.sliceUploadFile=function(e,t,c,l,u,d,f,g,h,v){if("/"===u.substr(u.length-1))return void t({code:-1,message:'path not allow end with "/"'});var y=a(),S={id:y,state:"uploading",cancelRequests:null,cancel:function(){S.cancelRequests&&S.cancelRequests();}};this.tasks[y]=S,v&&"function"==typeof v&&v(y);var m=this;u=n(u),m.getAppSign(function(a){var n={};n.globalTask=S,"cancel"!==n.globalTask.state&&(g=m.getSliceSize(g),n.bucket=l,n.path=u,n.file=d,n.insertOnly=0===f?0:1,n.sliceSize=g||1048576,n.appid=m.appid,n.sign=a,n.biz_attr=h||"",n.onprogress=function(e,t){void 0===t&&(t=1),c(e,t);},r.call(m,n).always(function(a){if("cancel"!==n.globalTask.state){a=a||{};var r=a.data;if(r&&r.session){if(r.filesize!==n.file.size)return t({code:-1,message:"filesize not match"});var c=n.listparts||[];if(n.session=r.session,n.listparts=c,c&&c.length){var l=c.length;n.offset=c[l-1].offset;}r.sha&&(n.onlineSha=r.sha.split("_")[0]),o.call(m,n).done(function(a){if("cancel"!==n.globalTask.state){n.uploadparts=a;var o=a.length;n.sha=a[o-1].datasha,i.call(m,n).done(function(){p.call(m,n).done(function(t){e(t);}).fail(function(e){t({code:-1,message:e&&e.message||"slice finish error"});});}).fail(function(e){t({code:-1,message:e&&e.message||"slice upload file error"});});}}).fail(function(e){t({code:-1,message:e||"get slice sha1 error"});});}else r&&r.access_url&&0!==f?("function"==typeof n.onprogress&&n.onprogress(1,0),e(a)):o.call(m,n).done(function(a){if("cancel"!==n.globalTask.state){n.uploadparts=a;var o=a.length;n.sha=a[o-1].datasha,s.call(m,n).done(function(a){if("cancel"!==n.globalTask.state){a=a||{};var o=a.data||{};o&&o.access_url?("function"==typeof n.onprogress&&n.onprogress(1,0),e(a)):p.call(m,n).done(function(t){e(t);}).fail(function(e){t({code:-1,message:e.message||"slice finish error"});});}}).fail(function(e){e=e||{},t({code:e.code||-1,message:e.message||"upload slice file error"});});}}).fail(function(){t({code:-1,message:"get slice sha1 error"});});}}));});},e.prototype.cancelTask=function(e){var t=this.tasks[e];t&&(t.state="cancel",t.cancel());};var f="_cos_sdk_sha1_",g=function(e,t,a){try{var n=JSON.parse(localStorage.getItem(f))||{};}catch(o){}var s=Date.now();t.update_time=s,n[e]=t;for(var i=localStorage.length-1;i>=0;i--){var r=localStorage.key(i),p=localStorage.getItem(r);s-p.update_time>a&&localStorage.removeItem(r);}localStorage.setItem(f,JSON.stringify(n));},h=function(e){try{var t=JSON.parse(localStorage.getItem(f))||{};}catch(a){}return t[e]},v=function(e,t,a){var n=this,o=new FormData,s=e.opt,i=s.file,r=s.slice_size,p=s.session,c=i.size,l=t.start,u=Math.min(l+r,c),d=n.slice.call(i,l,u),f=d.size,g=function(t){for(var a=e.uploadingAjax.length-1;a>=0;a--)t===e.uploadingAjax[a]&&e.uploadingAjax.splice(a,1);},h=0,v=function(t,a){e.loadedSize+=t-h,h=t,e.onTaskProgress&&e.onTaskProgress(a);},y=function(t){o.append("sliceSize",r),o.append("op","upload_slice_data"),o.append("session",p),o.append("offset",l),s.sha&&o.append("sha",s.sha),o.append("fileContent",d),n.getAppSign(function(a){s.sign=a;var i=n.getCgiUrl(s.path,s.sign),r=$.ajax({type:"POST",dataType:"JSON",url:i,data:o,xhr:function(){var t=$.ajaxSettings.xhr();return t.upload.onprogress=function(t){v(t.loaded),e.onTaskProgress&&e.onTaskProgress();},t},success:function(e){v(f,!0),e=e||{},0===e.code?t(null,e):t("error",e);},error:function(){v(0,!0),t("error");},complete:function(){g(r);},processData:!1,contentType:!1});e.uploadingAjax.push(r);});},S=function(t){"cancel"!==s.globalTask.state&&y(function(o,i){o?t>=n.uploadMaxRetryTimes||e.uploadError||"cancel"===s.globalTask.state?a(o,i):S(t+1):a(o,i);});};S(1);};return e});})();
});

var extend = createCommonjsModule(function (module, exports) {
!function(o,t){module.exports=t();}(commonjsGlobal,function(){"use strict";function o(o){return Array.isArray(o)}function t(o){if(!o||"[object Object]"!==e.call(o))return!1;var t=n.call(o,"constructor"),r=o.constructor&&o.constructor.prototype&&n.call(o.constructor.prototype,"isPrototypeOf");if(o.constructor&&!t&&!r)return!1;var i=void 0;for(i in o);return void 0===i||n.call(o,i)}function r(){var n=void 0,e=void 0,c=void 0,f=void 0,u=void 0,y=void 0,p=arguments[0],l=1,d=!1,s=arguments.length;for("boolean"==typeof p&&(d=p,p=arguments[1]||{},l=2),(null==p||"object"!==(void 0===p?"undefined":i(p))&&"function"!=typeof p)&&(p={});l<s;++l)if(null!=(n=arguments[l]))for(e in n)c=p[e],p!==(f=n[e])&&(d&&f&&(t(f)||(u=o(f)))?(u?(u=!1,y=c&&o(c)?c:[]):y=c&&t(c)?c:{},p[e]=r(d,y,f)):void 0!==f&&(p[e]=f));return p}var n=Object.prototype.hasOwnProperty,e=Object.prototype.toString,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};return r});
});

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.



var rng = function nodeRNG() {
  return crypto.randomBytes(16);
};

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

var exif = createCommonjsModule(function (module, exports) {
(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    {
        if ('object' !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
               var xmpdata= findXMPinJPEG(binFile);
               img.xmpdata = xmpdata || {};               
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd);

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength);
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10;
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp);

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};
      
        if (xml.nodeType == 1) { // element node
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) { // text node
          return xml.nodeValue;
        }
      
        // deal with children
        if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
            var child = xml.childNodes.item(i);
            var nodeName = child.nodeName;
            if (json[nodeName] == null) {
              json[nodeName] = xml2json(child);
            } else {
              if (json[nodeName].push == null) {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xml2json(child));
            }
          }
        }
        
        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.enableXmp = function() {
        EXIF.isXmpEnabled = true;
    };

    EXIF.disableXmp = function() {
        EXIF.isXmpEnabled = false;
    };

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    };

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    };
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    };

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    };
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    };

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    };

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    };

    if (typeof undefined === 'function' && undefined.amd) {
        undefined('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(commonjsGlobal));
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/* eslint-disable */

function createObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }

  return url;
}

function noop() {}

var Upload = function () {
  function Upload(options) {
    classCallCheck(this, Upload);

    this.options = {
      appid: '',
      bucket: ''
    };
    this.init(options);
  }

  createClass(Upload, [{
    key: 'compress',
    value: function compress(file, urlData) {
      var quantify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var ratio = arguments[3];
      var minWidth = arguments[4];
      var minHeight = arguments[5];

      if (/^image/.test(file.type)) {
        return this.compressImage(file, urlData, quantify, ratio, minWidth, minHeight);
      } else {
        return urlData;
      }
    }
  }, {
    key: 'compressImage',
    value: function compressImage(file, urlData) {
      var quantify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var ratio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
      var minWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var minHeight = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      var image = new Image();
      image.src = urlData;

      var Orientation = null;
      exif.getData(file, function () {
        Orientation = exif.getTag(this, 'Orientation');
      });

      return new Promise(function (resolve, reject) {
        image.onload = function () {
          var iw = image.width;
          var ih = image.height;

          var cw = void 0,
              ch = void 0;

          // 大于400万像素，需要等比压缩到400万像素
          // iphone限制canvas最大400万像素画布

          // if ((ratio = iw * ih / 4000000) > 1) {
          //   ratio = Math.sqrt(ratio);
          // } else {
          //   ratio = 5;
          // }
          // console.log('>>>>', ratio)
          cw = parseInt(iw / ratio, 10);
          ch = parseInt(ih / ratio, 10);

          if (cw < minWidth) {
            ratio = iw / minWidth;
          }

          if (ch < minHeight) {
            ratio = ih / minHeight;
          }

          cw = parseInt(iw / ratio, 10);
          ch = parseInt(ih / ratio, 10);

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = cw;
          canvas.height = ch;
          if (Orientation && Orientation != 1) {
            switch (Orientation) {
              case 6:
                // 旋转90度
                canvas.width = ch;
                canvas.height = cw;
                ctx.rotate(Math.PI / 2);
                // (0,-imgHeight) 从旋转原理图那里获得的起始点
                ctx.drawImage(this, 0, -ch, cw, ch);
                break;
              case 3:
                // 旋转180度
                ctx.rotate(Math.PI);
                ctx.drawImage(this, -cw, -ch, cw, ch);
                break;
              case 8:
                // 旋转-90度
                canvas.width = ch;
                canvas.height = cw;
                ctx.rotate(3 * Math.PI / 2);
                ctx.drawImage(this, -cw, 0, cw, ch);
                break;
            }
          } else {
            ctx.drawImage(this, 0, 0, cw, ch);
          }

          resolve(canvas.toDataURL('image/jpeg', quantify));
        };

        image.onerror = function () {
          reject('加载图片失败');
        };
      });
    }
  }, {
    key: 'createPreview',
    value: function createPreview(file) {
      var quantify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .6;
      var ratio = arguments[2];
      var minWidth = arguments[3];
      var minHeight = arguments[4];

      if (!file || !window.FileReader) return Promise.resolve();
      if (/^image/.test(file.type)) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        var that = this;
        return new Promise(function (resolve, reject) {
          reader.onload = function () {
            resolve(that.compress(file, this.result, quantify, ratio, minWidth, minHeight));
          };

          reader.onerror = function () {
            reject(this.error.toString());
          };
        });
      } else if (/^video/.test(file.type)) {
        var url = createObjectURL(file);
        return Promise.resolve(url);
      }

      return Promise.resolve();
    }
  }, {
    key: 'toBlob',
    value: function toBlob(data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/jpeg';

      data = data.split(',')[1];
      data = window.atob(data);
      var array = new Uint8Array(data.length);
      for (var i = 0, len = data.length; i < len; i++) {
        array[i] = data.charCodeAt(i);
      }

      Blob = window.Blob || window.WebkitBlob;
      return new Blob([array], { type: type });
    }
  }, {
    key: 'doUpload',
    value: function doUpload(file, urlData, progressCallback) {
      if (!this.cos || !file) {
        return Promise.resolve();
      }

      var data = /^image/.test(file.type) ? this.toBlob(urlData, file.type) : file;
      return this.cosUpload(data, this.getFileName(file), progressCallback);
    }
  }, {
    key: 'cosUpload',
    value: function cosUpload(data, name) {
      var _this = this;

      var progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

      return new Promise(function (resolve, reject) {
        _this.cos.uploadFile(function (ret) {
          if (ret.code == 0) {
            resolve(ret.data.source_url);
          } else {
            reject(ret.message);
          }
        }, function (ret) {
          if (ret != 'SUCCESS') {
            reject(ret.responseText);
          }
        }, progressCallback, _this.options.bucket, name, data);
      });
    }
  }, {
    key: 'getFileName',
    value: function getFileName(file) {
      return v4_1() + file.name;
    }
  }, {
    key: 'init',
    value: function init(options) {
      var _this2 = this;

      extend(this.options, options);
      this.cos = new cosJsSdkV4({
        appid: this.options.appid,
        bucket: this.options.bucket,
        region: 'sh',
        getAppSign: function getAppSign(callback) {
          //获取签名 必填参数
          callback(_this2.options.authorization);
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.cos = null;
    }
  }]);
  return Upload;
}();

var index = (function () {
  var inst = null;
  return function (options) {
    if (inst) {
      return inst;
    }

    return new Upload(options);
  };
})();

return index;

})));
