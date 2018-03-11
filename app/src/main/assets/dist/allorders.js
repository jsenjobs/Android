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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.types = ['大桶水', '中桶水', '小桶水'];

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apis = __webpack_require__(2);
var ModalUtils = __webpack_require__(6);
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');

exports.getWaitOrders = function (openid, callback) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    url: apis.listNoOrder + '/' + openid
  }, function (res) {
    if (res.ok) {
      if (res.data.code === 0) {
        callback(res.data.data.reverse());
      } else {
        ModalUtils.mod(res.data.msg);
      }
    } else {
      ModalUtils.mod('无法获取信息');
    }
  });
};

exports.getAllOrders = function (openid, callback) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    url: apis.listAllOrders + '/' + openid
  }, function (res) {
    if (res.ok) {
      if (res.data.code === 0) {
        callback(res.data.data.reverse());
      } else {
        ModalUtils.mod(res.data.msg);
      }
    } else {
      ModalUtils.mod('无法获取信息');
    }
  });
};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = __webpack_require__(2);

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var stream = weex.requireModule('stream');
var PlatformTools = __webpack_require__(0);
var Constants = __webpack_require__(10);
var HttpUtils = __webpack_require__(11);
var ModalUtils = __webpack_require__(6);

exports.default = {
  data: function data() {
    return {
      noOrderData: [],
      openid: ''
    };
  },
  methods: {
    ok_pay: function ok_pay(index) {
      var _this = this;

      stream.fetch({
        method: 'GET',
        type: 'json',
        url: _apis2.default.orderFinished + '/' + this.noOrderData[index].id
      }, function (res) {
        if (res.ok) {
          _this.noOrderData.splice(index, 1);
          modal.toast({
            message: '确认收货'
          });
        } else {
          modal.toast({
            message: '请求出错'
          });
        }
      });
    },
    getNoOrders: function getNoOrders() {
      var _this2 = this;

      if (this.openid && this.openid !== '') {
        HttpUtils.getAllOrders(this.openid, function (data) {
          _this2.parserData(data);
        });
      }
    },
    getStat: function getStat(stat) {
      if (stat === 0) {
        return '已完成';
      } else if (stat === 1) {
        return '等待收货';
      } else if (stat === 2) {
        return '等待接单';
      } else {
        return '未知-' + stat;
      }
    },
    parserData: function parserData(datas) {
      var _this3 = this;

      this.noOrderData = [];
      datas.forEach(function (order) {
        //          {type:'大桶水', num:6, fee:'120', date:'2017年12月21日 14时3分58秒'},
        var stat = order.stat;
        var statStr = '未知-' + stat;
        var style = 'st-wait';
        if (stat === 0) {
          statStr = '已完成';
          style = 'st-waita';
        } else if (stat === 1) {
          statStr = '等待收货';
          style = 'st-waitb';
        } else if (stat === 2) {
          statStr = '等待接单';
          style = 'st-waitc';
        }
        _this3.noOrderData.push({
          id: order._id,
          type: Constants.types[order.type],
          num: order.num,
          fee: order.fee,
          date: PlatformTools.formatDate(new Date(order.date), 'yy年MM月dd日 hh时mm分ss秒'),
          statStr: statStr,
          style: style
        });
      });
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    PlatformTools.setUp('所有订单');
    PlatformTools.getItem('userKey', function (result) {
      if (result.result === 'success' && result.data && result.data != '') {
        _this4.openid = result.data;
        _this4.getNoOrders();
      } else {
        ModalUtils.mod('无法获取用户信息');
      }
    });
  }

};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {"login":"https://deliverwater.sanliyunkeji.com/dwssserveruser/login","userbase":"https://deliverwater.sanliyunkeji.com/dwssserveruser","listNoOrder":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/list/tobe","orderFinished":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/sended","listAllOrders":"https://deliverwater.sanliyunkeji.com/dwssserveruser/order/listall","webSocket":"wss://deliverwater.sanliyunkeji.com/dwss","getAliPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/ali","getWxPreOrder":"https://deliverwater.sanliyunkeji.com/dwssserver/prepay/wx","ok_client":"https://deliverwater.sanliyunkeji.com/dwssserverso/ok_client_notify","getAliPreOrder2":"http://192.168.1.104:7082/prepay/ali"}

/***/ }),

/***/ 22:
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
  "row": {
    "marginBottom": 2,
    "backgroundColor": "#ffffff",
    "flexDirection": "column"
  },
  "v-h": {
    "flex": 1
  },
  "text-info": {
    "textAlign": "left",
    "paddingTop": 28,
    "paddingRight": 40,
    "paddingBottom": 28,
    "paddingLeft": 40
  },
  "order": {
    "marginBottom": 2,
    "backgroundColor": "#ffffff",
    "flexDirection": "column",
    "paddingTop": 20,
    "paddingRight": 40,
    "paddingBottom": 20,
    "paddingLeft": 40
  },
  "order-line": {
    "flexDirection": "row"
  },
  "sbuttonHis": {
    "marginTop": 20,
    "marginRight": 50,
    "marginBottom": 20,
    "marginLeft": 60,
    "backgroundColor": "#2595c9",
    "boxSizing": "border-box",
    "fontSize": 18,
    "borderRadius": 5,
    "WebkitTapHighlightColor": "transparent",
    "height": 90,
    "textAlign": "center",
    "opacity": 1,
    "opacity:active": 0.8
  },
  "sb-txt": {
    "color": "#FFFFFF",
    "textAlign": "center"
  },
  "ok_pay": {
    "boxSizing": "border-box",
    "fontSize": 26,
    "borderRadius": 5,
    "WebkitTapHighlightColor": "transparent",
    "color": "#ffffff",
    "opacity": 0.4
  },
  "st-wait": {
    "backgroundColor": "#eb8c1d"
  },
  "st-waita": {
    "backgroundColor": "#48a443"
  },
  "st-waitb": {
    "backgroundColor": "#43a2a4"
  },
  "st-waitc": {
    "backgroundColor": "#a44355"
  }
}

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_vm._m(0), _c('scroller', {
    staticClass: ["scroller"]
  }, _vm._l((_vm.noOrderData), function(order, index) {
    return _c('div', {
      ref: 'item' + index,
      refInFor: true,
      staticClass: ["order"]
    }, [_c('div', {
      staticClass: ["order-line"]
    }, [_c('text', {
      staticStyle: {
        padding: "20px",
        fontSize: "42px"
      }
    }, [_vm._v(_vm._s(order.type))])]), _c('div', {
      staticClass: ["order-line"]
    }, [_c('text', {
      staticStyle: {
        padding: "20px"
      }
    }, [_vm._v("购买数量：" + _vm._s(order.num) + "桶")]), _c('div', {
      staticClass: ["v-h"]
    }), _c('button', {
      staticStyle: {
        padding: "20px"
      }
    }, [_vm._v("金额：" + _vm._s(order.fee) + "元")])], 1), _c('div', {
      staticClass: ["order-line"]
    }, [_c('text', {
      staticStyle: {
        padding: "20px",
        fontSize: "22px"
      }
    }, [_vm._v("时间：" + _vm._s(order.date))]), _c('div', {
      staticClass: ["v-h"]
    }), _c('text', {
      class: ['ok_pay', order.style],
      staticStyle: {
        padding: "20px"
      }
    }, [_vm._v(_vm._s(order.statStr))])])])
  }))])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["row"]
  }, [_c('div', {
    staticClass: ["v-h"]
  }), _c('text', {
    staticClass: ["text-info"]
  }, [_vm._v("所有订单")]), _c('div', {
    staticClass: ["v-h"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(22)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(28)
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
__vue_options__.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/allorders.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-71fa79a3"
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


var modal = weex.requireModule('modal');

exports.mod = function (msg) {
  modal.toast({
    message: msg, duration: 1
  });
};

/***/ })

/******/ });