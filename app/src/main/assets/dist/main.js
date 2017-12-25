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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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

/***/ 12:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "backgroundColor": "#eeeeee",
    "position": "absolute",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  },
  "content": {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0,
    "flexDirection": "column",
    "paddingTop": 60
  },
  "button": {
    "flex": 1,
    "flexDirection": "column",
    "width": 100,
    "right": 0,
    "backgroundColor": "#ffffff",
    "borderRadius": 10,
    "marginBottom": 2,
    "backgroundColor:active": "#eeeeee"
  },
  "row": {
    "height": 180,
    "flexDirection": "row"
  },
  "v-h": {
    "flex": 1
  },
  "button-text": {
    "height": 80,
    "textAlign": "center",
    "lineHeight": 80,
    "color": "#000000",
    "fontSize": 35
  },
  "sider": {
    "width": 20
  },
  "sider-a": {
    "backgroundColor": "#123456"
  },
  "sider-b": {
    "backgroundColor": "#fed657"
  },
  "sider-c": {
    "backgroundColor": "#97290f"
  },
  "text-right": {
    "textAlign": "center",
    "paddingTop": 80,
    "color": "#000000",
    "fontSize": 28
  }
}

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('div', {
    staticClass: ["content"]
  }, [_c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["sider", "sider-a"]
  }), _c('div', {
    staticClass: ["button"],
    on: {
      "click": function($event) {
        _vm.buy(0)
      }
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["button-text"]
  }, [_vm._v("订购大桶装水")]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["sider", "sider-b"]
  }), _c('div', {
    staticClass: ["button"],
    on: {
      "click": function($event) {
        _vm.buy(1)
      }
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["button-text"]
  }, [_vm._v("订购中桶装水")]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["sider", "sider-c"]
  }), _c('div', {
    staticClass: ["button"],
    on: {
      "click": function($event) {
        _vm.buy(2)
      }
    }
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["button-text"]
  }, [_vm._v("订购小桶装水")]), _c('div', {
    staticClass: ["v-h"]
  })])]), _c('text', {
    staticClass: ["text-right"]
  }, [_vm._v("Copyright(C) 2017 Chaos.")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apis = __webpack_require__(1);
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
  modal.toast({ message: loginData });
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
    webSocket.close();
    stat = false;
    instance = false;
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(12)
)

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(18)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/main.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-02fb3b28"
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

/***/ 6:
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

var SocketN = __webpack_require__(2);
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
var UrlTools = __webpack_require__(0);
var storage = weex.requireModule('storage');
var SimpleStore = weex.requireModule('simpleStore');
exports.default = {
  data: function data() {
    return {};
  },
  methods: {
    buy: function buy(type) {
      navigator.push({
        url: UrlTools.getUrlBase(weex.config.bundleUrl) + '/dist/postorder.js?type=' + type,
        animated: 'true'
      });
    },
    startWebSocketTask: function startWebSocketTask(openid) {
      var self = this;
      SocketN.startWS(openid, {
        onconnecting: function onconnecting() {
          console.log('connecting...');
          // self.onopeninfo = 'connecting...'
        },
        onopen: function onopen(e) {
          console.log('websocket open');
          // self.onopeninfo = 'websocket open';
        },
        onmessage: function onmessage(e) {
          console.log(e.data);
          // self.onmessage = e.data;
        },
        onerror: function onerror(e) {
          console.error(e.data);
          // self.onerrorinfo = e.data;
        },
        onclose: function onclose(e) {
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
          });
        }
      });
    }
  },
  mounted: function mounted() {
    if (weex.config.env.platform !== 'iOS') {
      storage.getItem('userKey', function (data) {
        if (result === 'success') {}
      });
      navigator.setNavBarTitle('主页');
      navigator.clearNavBarLeftItem();
    } else {
      SimpleStore.getItem('userKey', function (data) {
        if (result === 'success') {}
      });
      navigator.setNavBarTitle({ title: '主页' });
    }
  }

};

/***/ })

/******/ });