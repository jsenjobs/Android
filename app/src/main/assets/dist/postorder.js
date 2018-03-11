// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var navigator = weex.requireModule('navigator');
var SimpleStore = weex.requireModule('simpleStore');
var storage = weex.requireModule('storage');
var modal = weex.requireModule('modal');

exports.formatDate = function (date, format) {
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }return format;
};

exports.setUp = function (title) {
  var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


  if (weex.config.env.platform !== 'iOS') {
    navigator.setNavBarTitle(title);
    if (clear) navigator.clearNavBarLeftItem();
  } else {
    navigator.setNavBarTitle({ title: title });
  }
};

exports.getItem = function (key, callback) {
  if (weex.config.env.platform !== 'iOS') {
    storage.getItem(key, callback);
  } else {
    SimpleStore.getItem(key, callback);
  }
};

exports.setItem = function (key, value, callback) {
  if (weex.config.env.platform !== 'iOS') {
    storage.setItem(key, value, callback);
  } else {
    SimpleStore.setItem(key, value, callback);
  }
};

exports.removeItem = function (key, callback) {
  if (weex.config.env.platform !== 'iOS') {
    storage.removeItem(key, callback);
  } else {
    SimpleStore.removeItem(key, callback);
  }
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
exports.getUrlBase = function(bundleUrl) {
  let isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0
  let isIOSAssets = bundleUrl.indexOf('file:///') >= 0

  if(isAndroidAssets) {
    return 'file://assets'
  } else if(isIOSAssets) {
    return bundleUrl.substring(0, bundleUrl.lastIndexOf('/') - 4)
  } else {
    let host = '127.0.0.1:8080'
    let matches = /\/\/([^\/]+?)\//.exec(bundleUrl)
    if(matches && matches.length >= 2) {
      host = matches[1]
    }
    return 'http://' + host
  }
}*/

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
exports.getBaseURL = function () {
  var bundleUrl = weex.config.bundleUrl;
  var nativeBase;
  var isAndroidAssets = bundleUrl.indexOf('jwxpage://assets/') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  if (isAndroidAssets) {
    nativeBase = 'jwxpage://assets/dist/';
  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/dist/') + 6);
  } else {
    var host = 'localhost:12580';
    var matches = /\/\/([^\/]+?)\//.exec(weex.config.bundleUrl);
    if (matches && matches.length >= 2) {
      host = matches[1];
    }
    nativeBase = 'http://' + host + '/dist/';
  }
  var h5Base = './vue.html?page=./dist/';
  // in Native
  var base = nativeBase;
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    // in Browser or WebView
    base = h5Base;
  }
  return base;
};
exports.getSub = function (url) {
  url = url.substring(0, url.lastIndexOf('/dist/'));
  url = url.substring(0, url.lastIndexOf('/'));
  return url + '/dist/';
};

exports.getBaseImageUrl = function () {
  var bundleUrl = weex.config.bundleUrl;
  var isAndroidAssets = bundleUrl.indexOf('jwxpage://assets/') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isIOSAssets = bundleUrl.indexOf('file:///') >= 0;

  if (isAndroidAssets) {
    return 'asset:///dist/';
  } else if (isIOSAssets) {
    return bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  } else {
    var host = '127.0.0.1:8080/dist/';
    var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
    if (matches && matches.length >= 2) {
      host = matches[1];
    }
    return 'http://' + host + '/dist/';
  }
};

exports.getImageBase = function (bundleUrl) {
  var isAndroidAssets = bundleUrl.indexOf('jwxpage://assets/') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isIOSAssets = bundleUrl.indexOf('file:///') >= 0;

  if (isAndroidAssets) {
    return 'asset://';
  } else if (isIOSAssets) {
    return bundleUrl.substring(0, bundleUrl.lastIndexOf('/') - 4);
  } else {
    var host = '127.0.0.1:8080';
    var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
    if (matches && matches.length >= 2) {
      host = matches[1];
    }
    return 'http://' + host;
  }
};

exports.getParams = function (url) {
  var params = url.split('?');
  if (params.length > 0) {
    var res = {};
    params = params[1];
    var paramSplit = params.split('&');
    paramSplit.forEach(function (param) {
      var ps = param.split('=');
      if (ps.length === 2) {
        res[ps[0]] = ps[1];
      }
    });
    return res;
  }
  return {};
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');
var picker = weex.requireModule('picker');
var navigator = weex.requireModule('navigator');
var price = [2000, 1000, 500];
var UnionPay = weex.requireModule('unionPay');
var stream = weex.requireModule('stream');
var globalEvent = weex.requireModule('globalEvent');
var PayTools = __webpack_require__(33);
var PlatformTools = __webpack_require__(0);
var UrlTools = __webpack_require__(1);
exports.default = {
  data: function data() {
    return {
      total: 10,
      num: 1,
      index: 1,
      typeStr: '中桶水',
      types: ['大桶水', '中桶水', '小桶水'],
      isAliPay: true,
      isAliPayUrl: '',
      isWxPayUrl: '',

      nowSubBack: 'sbAli',
      openid: '',
      isPaying: false
    };
  },
  methods: {
    pay: function pay() {
      var _this = this;

      if (this.isPaying) return;
      if (!this.openid || this.openid === '') {
        modal.alert({
          message: '无法获取用户信息',
          okTitle: '确定'
        });
        return;
      }
      if (this.num > 2000 || this.num < 1) {
        modal.alert({
          message: '单次购买数量不超过2000',
          okTitle: '确定'
        });
        return;
      }
      if (this.index > 2 || this.index < 0) {
        modal.alert({
          message: '不支持的购买类型',
          okTitle: '确定'
        });
        return;
      }

      if (this.isAliPay) {
        PayTools.getAliPreOrder(this.openid, this.index, 1, function (result) {
          if (result) {
            UnionPay.printLog(JSON.stringify(result));
            _this.isPaying = true;
            UnionPay.pay(result);
          }
        });
      } else {
        PayTools.getWxPreOrder(this.openid, this.index, this.num, function (result) {
          if (result) {
            UnionPay.printLog(JSON.stringify(result));
            _this.isPaying = true;
            UnionPay.pay(result);
          }
        });
      }
    },
    getStarCount: function getStarCount(repo, callback) {
      return stream.fetch({
        method: 'GET',
        type: 'json',
        url: 'https://aaa.bigfacewo.com/dwssserver/prepay/ali/jsen/0/1'
      }, callback);
    },

    pickType: function pickType() {
      var _this2 = this;

      picker.pick({
        index: 1,
        items: this.types
      }, function (event) {
        if (event.result === 'success') {
          _this2.index = event.data;
          _this2.typeStr = _this2.types[_this2.index];
          _this2.total = _this2.calPrice();
        }
      });
    },
    calPrice: function calPrice() {
      var p = parseFloat(price[this.index] * this.num) / 100.0;
      return p;
    },
    onNumChange: function onNumChange(e) {
      if (this.checkNum(e.value)) {
        this.num = parseInt(e.value);
      } else {
        this.$refs.num.value('1');
      }
      this.total = this.calPrice();
    },
    checkNum: function checkNum(txt) {
      var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

      if (!re.test(txt)) {
        return false;
      }
      return true;
    },
    getImage: function getImage(imageName) {
      return UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/' + imageName;
    },
    changePayWay: function changePayWay(index) {
      if (index === 0) {
        this.nowSubBack = 'sbAli';
        this.isAliPay = true;
        this.isAliPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/checked.png';
        this.isWxPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/check.png';
      } else {
        this.nowSubBack = 'sbWx';
        this.isAliPay = false;
        this.isAliPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/check.png';
        this.isWxPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/checked.png';
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    PlatformTools.getItem('userKey', function (result) {
      if (result.result === 'success' && result.data && result.data != '') {
        _this3.openid = result.data;
      }
    });
    globalEvent.addEventListener("PayResult", function (result) {
      _this3.isPaying = false;
      if (result) {
        if (result.code === 0) {
          modal.alert({
            message: result.msg
          }, function (_) {
            navigator.pop({ animated: 'true' });
          });
        } else {
          modal.alert({
            message: result.msg
          });
        }
      }
    });

    if (weex.config.env.platform !== 'iOS') {
      navigator.setNavBarTitle('订单支付');
      // navigator.clearNavBarLeftItem()
    } else {
      navigator.setNavBarTitle({ title: '订单支付' });
    }
    var params = UrlTools.getParams(weex.config.bundleUrl);
    if (params.type) {
      var type = parseInt(params.type);
      this.index = type;
      this.typeStr = this.types[this.index];
      this.total = this.calPrice();
    }
    this.changePayWay(0);
  }
};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {"login":"https://deliverwater.sanliyunkeji.com/dwssserveruser/login","userbase":"https://deliverwater.sanliyunkeji.com/dwssserveruser","listNoOrder":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/list/tobe","orderFinished":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/sended","listAllOrders":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/listall","webSocket":"wss://deliverwater.sanliyunkeji.com/dwss","getAliPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/ali","getWxPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/wx","ok_client":"https://deliverwater.sanliyunkeji.com/dwssserverso/ok_client_notify","getAliPreOrder2":"http://192.168.1.104:7082/prepay/ali"}

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = {
  "scroller": {
    "position": "absolute",
    "top": 0,
    "bottom": 110,
    "left": 0,
    "right": 0
  },
  "wrapper": {
    "position": "absolute",
    "backgroundColor": "#eeeeee",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  },
  "order-order": {
    "flex": 1,
    "flexDirection": "column",
    "width": 100,
    "right": 0,
    "backgroundColor": "#ffffff",
    "height": 100
  },
  "order-info": {
    "flex": 1,
    "flexDirection": "column",
    "width": 100,
    "right": 0,
    "backgroundColor": "#ffffff",
    "height": 100
  },
  "order-num": {
    "flex": 1,
    "flexDirection": "column",
    "width": 100,
    "right": 0,
    "backgroundColor": "#ffffff",
    "height": 100
  },
  "nums": {
    "paddingLeft": 60,
    "paddingRight": 60,
    "color": "#000000",
    "placeholderColor": "#bbbbbb"
  },
  "pay-item": {
    "height": 120,
    "flex": 1,
    "width": 100,
    "right": 0,
    "paddingLeft": 40,
    "paddingRight": 40,
    "backgroundColor": "#ffffff",
    "marginBottom": 2
  },
  "h-container": {
    "flexDirection": "row"
  },
  "pay-text": {
    "flex": 1,
    "paddingLeft": 20
  },
  "pay-tip": {
    "paddingLeft": 20,
    "paddingTop": 20,
    "paddingBottom": 8,
    "fontSize": 28,
    "color": "#888888"
  },
  "tip-main": {
    "marginTop": 40
  },
  "tip-head": {
    "marginTop": 0
  },
  "tip-pay": {
    "marginTop": 40
  },
  "tip": {
    "fontSize": 22
  },
  "v-h-top": {
    "flex": 0.2
  },
  "v-h-bottom": {
    "flex": 0.3
  },
  "row": {
    "flexDirection": "row"
  },
  "v-h": {
    "flex": 1
  },
  "button-text": {
    "paddingLeft": 60,
    "paddingRight": 60,
    "color": "#000000",
    "fontSize": 35
  },
  "button-order-text": {
    "paddingLeft": 60,
    "paddingRight": 60,
    "color": "#000000",
    "fontSize": 42
  },
  "submit-btn": {
    "position": "absolute",
    "bottom": 10,
    "left": 120,
    "right": 120,
    "backgroundColor": "#2595c9",
    "display": "block",
    "boxSizing": "border-box",
    "fontSize": 18,
    "borderRadius": 5,
    "WebkitTapHighlightColor": "transparent",
    "height": 90,
    "textAlign": "center"
  },
  "sbAli": {
    "zIndex": 1000,
    "position": "absolute",
    "bottom": 10,
    "left": 120,
    "right": 120,
    "backgroundColor": "#2595c9",
    "display": "block",
    "boxSizing": "border-box",
    "fontSize": 18,
    "borderRadius": 5,
    "WebkitTapHighlightColor": "transparent",
    "height": 90,
    "textAlign": "center",
    "opacity": 1,
    "opacity:active": 0.8
  },
  "sbWx": {
    "zIndex": 1000,
    "position": "absolute",
    "bottom": 10,
    "left": 120,
    "right": 120,
    "backgroundColor": "#48a443",
    "display": "block",
    "boxSizing": "border-box",
    "fontSize": 18,
    "borderRadius": 5,
    "WebkitTapHighlightColor": "transparent",
    "height": 90,
    "textAlign": "center",
    "opacity": 1
  },
  "bt-submit": {
    "backgroundColor:active": "#0A9D09"
  },
  "sb-txt": {
    "color": "#FFFFFF",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('scroller', {
    staticClass: ["scroller"]
  }, [_c('text', {
    staticClass: ["pay-tip", "tip-head"]
  }, [_vm._v("订单信息")]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["order-order"]
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["button-order-text"]
  }, [_vm._v(_vm._s(_vm.num) + "桶" + _vm._s(_vm.typeStr) + " 总价" + _vm._s(_vm.total) + "元")]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('text', {
    staticClass: ["pay-tip", "tip-main"]
  }, [_vm._v("选择桶装水类型")]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["order-info"],
    on: {
      "click": _vm.pickType
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["button-text"]
  }, [_vm._v("点击选择：" + _vm._s(_vm.typeStr))]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('text', {
    staticClass: ["pay-tip"]
  }, [_vm._v("选择订购数量")]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["order-num"]
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('input', {
    ref: "num",
    staticClass: ["nums"],
    attrs: {
      "type": "number",
      "placeholder": "输入数量，默一桶",
      "value": ""
    },
    on: {
      "input": _vm.onNumChange
    }
  }), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('text', {
    staticClass: ["pay-tip", "tip-pay"]
  }, [_vm._v("选择支付方式")]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["pay-item"]
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('div', {
    staticClass: ["h-container"]
  }, [_c('image', {
    staticStyle: {
      width: "88px",
      height: "88px"
    },
    attrs: {
      "src": _vm.getImage('alipay.png')
    }
  }), _vm._m(0), _c('div', {
    staticStyle: {
      height: "88px"
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('image', {
    staticStyle: {
      width: "48px",
      height: "48px"
    },
    attrs: {
      "src": _vm.isAliPayUrl
    },
    on: {
      "click": function($event) {
        _vm.changePayWay(0)
      }
    }
  }), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["pay-item"]
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('div', {
    staticClass: ["h-container"]
  }, [_c('image', {
    staticStyle: {
      width: "88px",
      height: "88px"
    },
    attrs: {
      "src": _vm.getImage('wxpay.png')
    }
  }), _vm._m(1), _c('div', {
    staticStyle: {
      height: "88px"
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('image', {
    staticStyle: {
      width: "48px",
      height: "48px"
    },
    attrs: {
      "src": _vm.isWxPayUrl
    },
    on: {
      "click": function($event) {
        _vm.changePayWay(1)
      }
    }
  }), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('div', {
    staticClass: ["v-h"]
  })])])]), _c('div', {
    class: [_vm.nowSubBack],
    on: {
      "click": _vm.pay
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["sb-txt"]
  }, [_vm._v("确认支付  ￥" + _vm._s(_vm.total) + "元")]), _c('div', {
    staticClass: ["v-h"]
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["pay-text"],
    staticStyle: {
      height: "88px"
    }
  }, [_c('div', {
    staticClass: ["v-h", "v-h-top"]
  }), _c('text', {
    staticClass: ["pay-way"]
  }, [_vm._v("支付宝")]), _c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["pay-way", "tip"]
  }, [_vm._v("亿万用户都在用，安全可托付")]), _c('div', {
    staticClass: ["v-h", "v-h-bottom"]
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["pay-text"],
    staticStyle: {
      height: "88px"
    }
  }, [_c('div', {
    staticClass: ["v-h", "v-h-top"]
  }), _c('text', {
    staticClass: ["pay-way"]
  }, [_vm._v("微信支付")]), _c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["pay-way", "tip"]
  }, [_vm._v("亿万用户的选择，安全快捷")]), _c('div', {
    staticClass: ["v-h", "v-h-bottom"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apis = __webpack_require__(2);
var stream = weex.requireModule('stream');

exports.getAliPreOrder = function (id, type, num, callback) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    url: apis.getAliPreOrder + '/' + id + '/' + type + '/' + num
  }, function (res) {
    if (res.ok && res.data && res.data.code === 0 && res.data.data) {
      callback({ platform: 'ali', orderStr: res.data.data });
    } else {
      callback();
    }
  });
};

exports.getWxPreOrder = function (id, type, num, callback) {
  callback({ platform: 'wx', orderStr: 'hold' });
  return;
  stream.fetch({
    method: 'GET',
    type: 'json',
    url: apis.getWxPreOrder + '/' + id + '/' + type + '/' + num
  }, function (res) {
    if (res.ok && res.data && res.data.code === 0) {
      callback({ platform: 'wx', data: res.data });
    } else {
      callback();
    }
  });
};

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(23)
)

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(30)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/postorder.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-00ccb88b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ })

/******/ });