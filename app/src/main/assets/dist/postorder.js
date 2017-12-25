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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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

/***/ 13:
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

/***/ 19:
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
    staticClass: ["sb-txt"],
    on: {
      "click": _vm.pay
    }
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(13)
)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(19)
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


/***/ }),

/***/ 7:
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
var UrlTools = __webpack_require__(0);
var price = [2000, 1000, 500];
var UnionPay = weex.requireModule('unionPay');
var stream = weex.requireModule('stream');
var globalEvent = weex.requireModule('globalEvent');
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

      nowSubBack: 'sbAli'
    };
  },
  methods: {
    pay: function pay() {
      var _this = this;

      var platform = this.isAliPay ? 'ali' : 'wx';
      if (UnionPay) {
        UnionPay.pay({
          platform: platform,
          type: this.index,
          num: this.num
        }, function (result) {
          if (_this.isAliPay) {
            if (result && result.resultStatus === '9000') {
              modal.toast({
                message: '支付成功',
                duration: 1
              });
              setItem(function (_) {
                navigator.pop();
              }, 500);
            } else {
              modal.toast({
                message: '支付失败',
                duration: 1
              });
            }
          } else {
            modal.toast({
              message: '微信支付还未实现',
              duration: 1
            });
          }
          /*
          if(result === 'success') {
            modal.toast({
              message:'支付成功',
              duration: 0.3
            })
            navigator.pop()
          } else {
            modal.toast({
              message:'支付失败',
              duration: 0.3
            })
          }
          */
        });
      } else {
        modal.toast({
          message: '当前环境不支持支付操作'
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
    globalEvent.addEventListener("PayResult", function (result) {
      console.log(result);
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

/***/ })

/******/ });