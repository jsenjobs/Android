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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
var stream = weex.requireModule('stream');
var SimpleStore = weex.requireModule('simpleStore');
var navigator = weex.requireModule('navigator');
var storage = weex.requireModule('storage');
var apis = __webpack_require__(2);
var UrlTools = __webpack_require__(1);
var PlatformTools = __webpack_require__(0);
module.exports = {
  data: {
    userNumber: '',
    userPassword: ''
  },
  methods: {
    onchangeUserNumber: function onchangeUserNumber(event) {
      this.userNumber = event.value;
    },
    onchangeUserPassword: function onchangeUserPassword(event) {
      this.userPassword = event.value;
    },
    /*处理登录*/
    login: function login() {
      if (this.userNumber.length < 1) {
        modal.toast({
          message: '请输入登入账号',
          duration: 0.3
        });
        return;
      }
      if (this.userPassword.length < 1) {
        modal.toast({
          message: '请输入登入密码',
          duration: 0.3
        });
        return;
      }
      this.handleLogin();
    },
    getImage: function getImage(imageName) {
      return UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/' + imageName;
    },
    handleLogin: function handleLogin() {
      var _this = this;

      stream.fetch({
        method: 'GET',
        type: 'json',
        url: apis.login + '/' + this.userNumber + '/' + this.userPassword
      }, function (res) {
        if (res.ok && res.data && res.data.code === 0) {
          modal.toast({
            message: '登入成功',
            duration: 0.3
          });
          PlatformTools.setItem('userKey', _this.userNumber);
          PlatformTools.setItem('time', Date.now() + '');
          PlatformTools.setItem('name', res.data.name);
          PlatformTools.setItem('address', res.data.address);
          navigator.open({
            url: UrlTools.getBaseURL() + 'mainContainer.js',
            // url: UrlTools.getUrlBase(weex.config.bundleUrl) + '/dist/mainContainer.js',
            animated: 'true'
          });
        } else {
          modal.toast({
            message: '登入失败',
            duration: 0.3
          });
        }
      });
    },
    getDate: function getDate(str) {
      try {
        var strd = parseInt(str);
        return new Date(strd);
      } catch (e) {
        return null;
      }
    },
    getDays: function getDays(date) {
      return parseInt((Date.now() - date) / (1000 * 60 * 60 * 24));
    }
  },
  mounted: function mounted() {
    // PlatformTools.setUp('登入', true)
  }
  // 206
  // 89
  // 89

};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {"login":"https://deliverwater.sanliyunkeji.com/dwssserveruser/login","userbase":"https://deliverwater.sanliyunkeji.com/dwssserveruser","listNoOrder":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/list/tobe","orderFinished":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/sended","listAllOrders":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/listall","webSocket":"wss://deliverwater.sanliyunkeji.com/dwss","getAliPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/ali","getWxPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/wx","ok_client":"https://deliverwater.sanliyunkeji.com/dwssserverso/ok_client_notify","getAliPreOrder2":"http://192.168.1.104:7082/prepay/ali"}

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "backgroundColor": "#ce5959",
    "position": "absolute",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  },
  "login-text": {
    "width": 750,
    "paddingTop": 180,
    "color": "#ffffff",
    "fontSize": 48,
    "textAlign": "center"
  },
  "login": {
    "marginTop": 60
  },
  "input-wrapper": {
    "width": 550,
    "marginLeft": 100,
    "marginRight": 100,
    "marginBottom": 30
  },
  "input": {
    "fontSize": 30,
    "height": 80,
    "width": 550,
    "paddingLeft": 90,
    "paddingTop": 15,
    "paddingBottom": 15,
    "borderWidth": 1,
    "borderColor": "#ffffff",
    "borderRadius": 10,
    "outline": "none",
    "color": "#ffffff",
    "placeholderColor": "#eeeeee"
  },
  "input-img": {
    "position": "absolute",
    "top": 10,
    "left": 15,
    "width": 48,
    "height": 48
  },
  "input-login": {
    "height": 80,
    "width": 550,
    "backgroundColor": "#48c9bf",
    "borderRadius": 10,
    "marginTop": 40
  },
  "input-login-text": {
    "height": 80,
    "width": 550,
    "textAlign": "center",
    "lineHeight": 80,
    "color": "#FFFFFF",
    "fontSize": 35
  },
  "input-forget": {
    "position": "absolute",
    "left": 30,
    "fontSize": 20,
    "color": "#ffffff"
  },
  "input-lic": {
    "position": "absolute",
    "right": 30,
    "fontSize": 20,
    "color": "#ffffff"
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('text', {
    staticClass: ["login-text"]
  }, [_vm._v("用户登入")]), _c('div', {
    staticClass: ["login"]
  }, [_c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('input', {
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "placeholder": "ID",
      "autofocus": "true",
      "value": ""
    },
    on: {
      "input": _vm.onchangeUserNumber
    }
  }), _c('image', {
    staticClass: ["input-img"],
    attrs: {
      "src": _vm.getImage('account.png')
    }
  })]), _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('input', {
    staticClass: ["input"],
    attrs: {
      "type": "password",
      "placeholder": "密码",
      "value": ""
    },
    on: {
      "input": _vm.onchangeUserPassword
    }
  }), _c('image', {
    staticClass: ["input-img"],
    attrs: {
      "src": _vm.getImage('password.png')
    }
  })]), _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('div', {
    staticClass: ["input-login"],
    on: {
      "click": _vm.login
    }
  }, [_c('text', {
    staticClass: ["input-login-text"]
  }, [_vm._v("登录")])])]), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('text', {
    staticClass: ["input-forget"]
  }, [_vm._v("忘记密码请联系管理员")]), _c('text', {
    staticClass: ["input-lic"]
  }, [_vm._v("登入表示同意本软件使用协议")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(26)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/login.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7ce66a46"
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