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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getUrlBase = function (bundleUrl) {
  var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
  var isIOSAssets = bundleUrl.indexOf('file:///') >= 0;

  if (isAndroidAssets) {
    return 'file://assets';
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

exports.getImageBase = function (bundleUrl) {
  var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = {"login":"https://aaa.bigfacewo.com/dwssserveruser/login","userbase":"https://aaa.bigfacewo.com/dwssserveruser","webSocket":"wss://aaa.bigfacewo.com/dwss"}

/***/ }),

/***/ 15:
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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(9)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(15)
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


/***/ }),

/***/ 5:
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
var apis = __webpack_require__(1);
var UrlTools = __webpack_require__(0);
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
          /*modal.toast({
            message: '登入成功',
            duration: 0.3
          })*/
          if (weex.config.env.platform !== 'iOS') {
            storage.setItem('userKey', _this.userNumber);
            storage.setItem('time', Date.now() + '');
          } else {
            SimpleStore.setItem('userKey', _this.userNumber);
            SimpleStore.setItem('time', Date.now() + '');
          }
          navigator.open({
            url: UrlTools.getUrlBase(weex.config.bundleUrl) + '/dist/main.js',
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
    if (weex.config.env.platform !== 'iOS') {
      navigator.setNavBarTitle('登入');
      navigator.clearNavBarLeftItem();
    } else {
      navigator.setNavBarTitle({ title: '登入' });
    }
  }
  // 206
  // 89
  // 89

};

/***/ }),

/***/ 9:
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

/***/ })

/******/ });