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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = {"login":"https://deliverwater.sanliyunkeji.com/dwssserveruser/login","userbase":"https://deliverwater.sanliyunkeji.com/dwssserveruser","listNoOrder":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/list/tobe","orderFinished":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/sended","listAllOrders":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/listall","webSocket":"wss://deliverwater.sanliyunkeji.com/dwss","getAliPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/ali","getWxPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/wx","ok_client":"https://deliverwater.sanliyunkeji.com/dwssserverso/ok_client_notify","getAliPreOrder2":"http://192.168.1.104:7082/prepay/ali"}

/***/ }),
/* 3 */
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

module.exports = {
  props: {
    index: { default: 0 },
    title: { default: '' },
    titleColor: { default: '#000000' },
    icon: { default: '' },
    backgroundColor: { default: '#ffffff' }
  },
  methods: {
    onclickitem: function onclickitem(e) {
      var params = {
        index: this.index
      };
      this.$emit('tabItemOnClick', params);
    }
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "height": 88
  },
  "top-line": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "height": 2
  },
  "tab-icon": {
    "marginTop": 5,
    "width": 40,
    "height": 40
  },
  "tab-text": {
    "marginTop": 5,
    "textAlign": "center",
    "fontSize": 20
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"],
    style: {
      backgroundColor: _vm.backgroundColor
    },
    on: {
      "click": _vm.onclickitem
    }
  }, [_c('image', {
    staticClass: ["top-line"],
    attrs: {
      "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
    }
  }), _c('image', {
    staticClass: ["tab-icon"],
    attrs: {
      "src": _vm.icon
    }
  }), _c('text', {
    staticClass: ["tab-text"],
    style: {
      color: _vm.titleColor
    }
  }, [_vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 6 */,
/* 7 */
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

module.exports = {
  props: {
    tabItems: { default: [] },
    selectedColor: { default: '#ce5959' },
    unselectedColor: { default: '#594945' }
  },
  data: function data() {
    return {
      selectedIndex: 0
    };
  },
  components: {
    tabitem: __webpack_require__(12)
  },
  created: function created() {
    this.select(this.selectedIndex);
  },
  methods: {
    tabItemOnClick: function tabItemOnClick(e) {
      this.selectedIndex = e.index;
      this.select(e.index);
      this.$emit('tabBarOnClick', e);
    },
    select: function select(index) {
      for (var i = 0; i < this.tabItems.length; i++) {
        var tabItem = this.tabItems[i];
        if (i == index) {
          tabItem.icon = tabItem.selectedImage;
          tabItem.titleColor = this.selectedColor;
          tabItem.visibility = 'visible';
        } else {
          tabItem.icon = tabItem.image;
          tabItem.titleColor = this.unselectedColor;
          tabItem.visibility = 'hidden';
        }
      }
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "width": 750,
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "content": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "marginTop": 0,
    "marginBottom": 88
  },
  "tabbar": {
    "flexDirection": "row",
    "position": "fixed",
    "bottom": 0,
    "left": 0,
    "right": 0,
    "height": 88
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_vm._l((_vm.tabItems), function(item, i) {
    return _c('embed', {
      key: i,
      staticClass: ["content"],
      style: {
        visibility: item.visibility
      },
      attrs: {
        "src": item.src,
        "type": "weex"
      }
    })
  }), _c('div', {
    staticClass: ["tabbar"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, _vm._l((_vm.tabItems), function(item) {
    return _c('tabitem', {
      key: item.index,
      attrs: {
        "index": item.index,
        "icon": item.icon,
        "title": item.title,
        "titleColor": item.titleColor
      },
      on: {
        "tabItemOnClick": _vm.tabItemOnClick
      }
    })
  }))], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(5)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/comp/tabitem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-27b3d14a"
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


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//

var modal = weex.requireModule('modal');
var navigator = weex.requireModule('navigator');
var getBaseURL = __webpack_require__(1).getBaseURL;
var getBaseImageUrl = __webpack_require__(1).getBaseImageUrl;
var PlatformTools = __webpack_require__(0);
var SocketN = __webpack_require__(34);
var stream = weex.requireModule('stream');
var apis = __webpack_require__(2);
var UnionPay = weex.requireModule('unionPay');

module.exports = {
  data: function data() {
    return {
      openid: '',
      dir: 'examples',
      tabItems: [{
        index: 0,
        title: '订水',
        titleColor: '#000000',
        icon: '',
        image: 'imgs/tab-home0.png',
        selectedImage: 'imgs/tab-home.png',
        src: 'pages/main.js',
        visibility: 'visible'
      }, {
        index: 1,
        title: '订单',
        titleColor: '#000000',
        icon: '',
        image: 'imgs/tab-order0.png',
        selectedImage: 'imgs/tab-order.png',
        src: 'pages/order.js',
        visibility: 'hidden'
      }, {
        index: 2,
        title: '我的',
        titleColor: '#000000',
        icon: '',
        image: 'imgs/tab-me0.png',
        selectedImage: 'imgs/tab-me.png',
        src: 'pages/me.js',
        visibility: 'hidden'
      }]
    };
  },
  components: {
    TBB: __webpack_require__(36)
  },
  created: function created() {
    var _this = this;

    PlatformTools.getItem('userKey', function (result) {
      if (result.result === 'success' && result.data) {
        _this.startWebSocketTask(result.data);
      }
    });
    var baseURL = getBaseURL();
    var baseImageUrl = getBaseImageUrl();
    for (var i = 0; i < this.tabItems.length; i++) {
      var tabItem = this.tabItems[i];
      tabItem.image = baseImageUrl + tabItem.image;
      tabItem.selectedImage = baseImageUrl + tabItem.selectedImage;
      tabItem.src = baseURL + tabItem.src;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    PlatformTools.getItem('userKey', function (result) {
      if (result.result === 'success' && result.data && result.data != '') {
        _this2.openid = result.data;
      }
    });
  },
  methods: {
    tabBarOnClick: function tabBarOnClick(e) {
      var index = e.index;
      if (index === 0) {
        PlatformTools.setUp('主页', true);
      } else if (index === 1) {
        PlatformTools.setUp('订单', true);
      } else if (index === 2) {
        PlatformTools.setUp('我的', true);
      }
    },
    startWebSocketTask: function startWebSocketTask(openid) {
      var self = this;
      UnionPay.printLog('start+' + openid);
      SocketN.startWS(openid, {
        onconnecting: function onconnecting() {
          UnionPay.printLog('connecting...');
          console.log('connecting...');
          // self.onopeninfo = 'connecting...'
        },
        onopen: function onopen(e) {
          UnionPay.printLog('websocket open');
          console.log('websocket open');
          // self.onopeninfo = 'websocket open';
        },
        onmessage: function onmessage(e) {
          console.log(e.data);
          UnionPay.printLog('onmessage' + JSON.stringify(e));
          // self.onmessage = e.data;
        },
        onerror: function onerror(e) {
          console.error(e.data);
          UnionPay.printLog('onerror' + JSON.stringify(e));
          // self.onerrorinfo = e.data;
        },
        onclose: function onclose(e) {
          UnionPay.printLog('onclose' + JSON.stringify(e));
          console.log(e.code);
          // self.onopeninfo = '';
          // self.oncloseinfo = e.code;
        },
        cnotify: function cnotify(data) {
          var order = data.data;
          var type = ['大桶水', '中桶水', '小桶水'];
          var str = '您订购的' + order.num + '桶[' + type[order.type] + ']即将配送';
          modal.alert({
            message: str,
            okTitle: '确定'
          }, function (_) {
            if (!self.openid || self.openid === '') {
              modal.toast({
                message: '无法获取用户信息',
                duration: 1
              });
            } else {
              stream.fetch({
                method: 'GET',
                url: apis.ok_client + '/' + order._id + '/' + self.openid
              });
            }
          });
        }
      });
    }
  }
};

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      flexDirection: "column"
    }
  }, [_c('TBB', {
    attrs: {
      "tabItems": _vm.tabItems
    },
    on: {
      "tabBarOnClick": _vm.tabBarOnClick
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apis = __webpack_require__(2);
var webSocket = weex.requireModule('webSocket');
var modal = weex.requireModule('modal');
var openid = null;
var stat = false;
var instance = false;
var loginData = '{}';
exports.startWS = function (id, callback) {
  if (!id || !callback) return;
  openid = id;
  loginData = JSON.stringify({ type: 'clogin', id: openid });
  // modal.toast({message:loginData})
  checkStat(callback);
  // webSocket.WebSocket(apis.webSocket,'')

  webSocket.onopen = function (e) {
    stat = true;
    startHB();
    login();
    if (callback.onopen) {
      callback.onopen(e);
    }
  };
  webSocket.onerror = function (e) {
    // webSocket.close()
    // stat = false
    // instance = false
    if (callback.onerror) {
      callback.onerror(e);
    }
  };
  webSocket.onclose = function (e) {
    stat = false;
    instance = false;
    if (callback.onclose) {
      callback.onclose(e);
    }
  };
  webSocket.onmessage = function (e) {
    var data = e.data;
    if (callback.onmessage) {
      callback.onmessage(e);
    }
    try {
      data = JSON.parse(data);
      if (data.type === 'cnotify') {
        if (callback.cnotify) {
          callback.cnotify(data);
          webSocket.send(ok_cnotify);
        }
      }
    } catch (e) {
      console.error('not json data');
    }
  };
};

function checkStat(callback) {
  if (!stat && !instance) {
    instance = true;
    webSocket.WebSocket(apis.webSocket, '');
    if (callback.onconnecting) {
      callback.onconnecting();
    }
  }
  setInterval(function (_) {
    if (!stat && !instance) {
      instance = true;
      webSocket.WebSocket(apis.webSocket, '');
      if (callback.onconnecting) {
        callback.onconnecting();
      }
    }
  }, 10000);
}

var hbTask = null;
var hbdata = JSON.stringify({ type: 'ping', data: 'hb' });
var ok_cnotify = JSON.stringify({ type: 'ok_cnotify', data: 'ok' });
function startHB() {
  if (hbTask != null) {
    clearInterval(hbTask);
    hbTask = null;
  }
  hbTask = setInterval(function (_) {
    if (!stat) {
      clearInterval(hbTask);
      hbTask = null;
      return;
    }
    webSocket.send(hbdata);
  }, 60000);
}

function login() {
  if (!stat) return;
  webSocket.send(loginData);
}

/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(8)
)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(9)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/comp/TBB.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3222e247"
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


/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(29)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/mainContainer.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
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
/******/ ]);