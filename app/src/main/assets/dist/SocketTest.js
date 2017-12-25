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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = {"login":"https://aaa.bigfacewo.com/dwssserveruser/login","userbase":"https://aaa.bigfacewo.com/dwssserveruser","webSocket":"wss://aaa.bigfacewo.com/dwss"}

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = {
  "input": {
    "fontSize": 40,
    "height": 80,
    "width": 600
  },
  "button": {
    "fontSize": 36,
    "width": 150,
    "color": "#41B883",
    "textAlign": "center",
    "paddingTop": 25,
    "paddingBottom": 25,
    "borderWidth": 2,
    "borderStyle": "solid",
    "marginRight": 20,
    "borderColor": "rgb(162,217,192)",
    "backgroundColor": "rgba(162,217,192,0.2)"
  }
}

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

/***/ 20:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', [_c('div', [_vm._m(0), _c('input', {
    ref: "input",
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "placeholder": "please input message to send",
      "autofocus": "false",
      "value": ""
    },
    on: {
      "change": _vm.onchange,
      "input": _vm.oninput
    }
  }), _c('div', {
    staticStyle: {
      flexDirection: "row",
      justifyContent: "center"
    }
  }, [_c('text', {
    staticClass: ["button"],
    on: {
      "click": _vm.connect
    }
  }, [_vm._v("connect")]), _c('text', {
    staticClass: ["button"],
    on: {
      "click": _vm.send
    }
  }, [_vm._v("send")]), _c('text', {
    staticClass: ["button"],
    on: {
      "click": _vm.close
    }
  }, [_vm._v("close")])]), _vm._m(1), _c('text', {
    staticStyle: {
      color: "black",
      height: "80px"
    }
  }, [_vm._v(_vm._s(_vm.sendinfo))]), _vm._m(2), _c('text', {
    staticStyle: {
      color: "black",
      height: "80px"
    }
  }, [_vm._v(_vm._s(_vm.onopeninfo))]), _vm._m(3), _c('text', {
    staticStyle: {
      color: "black",
      height: "400px"
    }
  }, [_vm._v(_vm._s(_vm.onmessage))]), _vm._m(4), _c('text', {
    staticStyle: {
      color: "black",
      height: "80px"
    }
  }, [_vm._v(_vm._s(_vm.oncloseinfo))]), _vm._m(5), _c('text', {
    staticStyle: {
      color: "black",
      height: "80px"
    }
  }, [_vm._v(_vm._s(_vm.onerrorinfo))]), _vm._m(6), _c('text', {
    staticStyle: {
      color: "black",
      height: "80px"
    }
  }, [_vm._v(_vm._s(_vm.closeinfo))])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "#286090"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "white"
    }
  }, [_vm._v("websocket")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = send")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = onopen")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = onmessage")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = onclose")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = onerror")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      backgroundColor: "lightgray"
    }
  }, [_c('text', {
    staticClass: ["title"],
    staticStyle: {
      height: "80px",
      padding: "20px",
      color: "black"
    }
  }, [_vm._v("method = close")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(14)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(20)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/SocketTest.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1ee7cd90"
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

/***/ 3:
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

var SocketN = __webpack_require__(2);
exports.default = {
  data: function data() {
    return {
      connectinfo: '',
      sendinfo: '',
      onopeninfo: '',
      onmessage: '',
      oncloseinfo: '',
      onerrorinfo: '',
      closeinfo: '',
      txtInput: '',
      navBarHeight: 88,
      title: 'Navigator',
      dir: 'examples',
      baseURL: ''
    };
  },

  methods: {
    connect: function connect() {
      var self = this;
      SocketN.startWS('seherwildvfsfs', {
        onconnecting: function onconnecting() {
          self.onopeninfo = 'connecting...';
        },
        onopen: function onopen(e) {
          self.onopeninfo = 'websocket open';
        },
        onmessage: function onmessage(e) {
          self.onmessage = e.data;
        },
        onerror: function onerror(e) {
          self.onerrorinfo = e.data;
        },
        onclose: function onclose(e) {
          self.onopeninfo = '';
          self.oncloseinfo = e.code;
        },
        cnotify: function cnotify(e) {
          modal.toast({
            message: e.data,
            duration: 0.3
          });
        }
      });
    },
    send: function send(e) {
      var input = this.$refs.input;
      input.blur();

      websocket.send(hbdata);
      this.sendinfo = hbdata;
    },
    oninput: function oninput(event) {
      this.txtInput = event.value;
    },
    close: function close(e) {
      websocket.close();
    }
  }
};

/***/ })

/******/ });