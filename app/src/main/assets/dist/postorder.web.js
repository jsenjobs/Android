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
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(40)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(34),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/postorder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postorder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e9d1216", Component.options)
  } else {
    hotAPI.reload("data-v-6e9d1216", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 17:
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
var UrlTools = __webpack_require__(4);
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

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(11);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.scroller {\n    position: absolute;\n    top:0px;\n    bottom:110px;\n    left: 0px;\n    right:0px;\n}\n.wrapper {\n  position: absolute;\n  background-color: #eeeeee;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.order-order {\n  flex: 1;\n  flex-direction: column;\n  width: 100%;\n  right: 0px;\n  background-color: #ffffff;\n  height:100px;\n}\n.order-info{\n  flex: 1;\n  flex-direction: column;\n  width: 100%;\n  right: 0px;\n  background-color: #ffffff;\n  height:100px;\n}\n.order-num{\n  flex: 1;\n  flex-direction: column;\n  width: 100%;\n  right: 0px;\n  background-color: #ffffff;\n  height:100px;\n}\n.nums {\n  padding-left: 60px;\n  padding-right: 60px;\n  color: #000000;\n  placeholder-color: #bbbbbb;\n}\n.pay-item {\n  height:120px;\n  flex: 1;\n  width: 100%;\n  right: 0px;\n  padding-left: 40px;\n  padding-right: 40px;\n  background-color: #ffffff;\n  margin-bottom: 2px;\n}\n.h-container {\n  flex-direction: row;\n}\n.pay-text {\n  flex: 1;\n  padding-left: 20px;\n}\n.pay-way {\n}\n.pay-tip {\n  padding-left: 20px;\n  padding-top: 20px;\n  padding-bottom: 8px;\n  font-size: 28px;\n  color: #888888;\n}\n.tip-main {\n  margin-top: 40px;\n}\n.tip-head {\n  margin-top: 0px;\n}\n.tip-pay {\n  margin-top: 40px;\n}\n.tip {\n  font-size: 22px;\n}\n.v-h-top {\n  flex: 0.2;\n}\n.v-h-bottom {\n  flex: 0.3;\n}\n.row{\n  flex-direction: row;\n}\n.v-h {\n  flex:1;\n}\n.button-text{\n  padding-left: 60px;\n  padding-right: 60px;\n  color: #000000;\n  font-size: 35px;\n}\n.button-order-text{\n  padding-left: 60px;\n  padding-right: 60px;\n  color: #000000;\n  font-size: 42px;\n}\n.submit-btn {\n  position: absolute;\n  bottom: 10px;\n  left: 120px;\n  right: 120px;\n  background-color: #2595c9;\n\n  display:block;\n  box-sizing:border-box;\n  font-size:18px;\n  border-radius:5px;\n  -webkit-tap-highlight-color:transparent;\n  height: 90px;\n  text-align: center;\n}\n.sbAli {\n  z-index: 1000;\n  position: absolute;\n  bottom: 10px;\n  left: 120px;\n  right: 120px;\n  background-color: #2595c9;\n\n  display:block;\n  box-sizing:border-box;\n  font-size:18px;\n  border-radius:5px;\n  -webkit-tap-highlight-color:transparent;\n  height: 90px;\n  text-align: center;\n  opacity: 1;\n}\n.sbAli:active {\n  opacity: 0.8;\n}\n.sbWx {\n  z-index: 1000;\n  position: absolute;\n  bottom: 10px;\n  left: 120px;\n  right: 120px;\n  background-color: #48a443;\n\n  display:block;\n  box-sizing:border-box;\n  font-size:18px;\n  border-radius:5px;\n  -webkit-tap-highlight-color:transparent;\n  height: 90px;\n  text-align: center;\n  opacity: 1;\n}\n.bt-submit:active {\n  background-color: #0A9D09;\n}\n.sb-txt {\n  color:#FFFFFF;\n  text-align: center;\n}\n", "", {"version":3,"sources":["/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/postorder.vue?208e8b8a"],"names":[],"mappings":";AAgPA;IACA,mBAAA;IACA,QAAA;IACA,aAAA;IACA,UAAA;IACA,UAAA;CACA;AACA;EACA,mBAAA;EACA,0BAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;CACA;AACA;EACA,QAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,0BAAA;EACA,aAAA;CACA;AACA;EACA,QAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,0BAAA;EACA,aAAA;CACA;AACA;EACA,QAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,0BAAA;EACA,aAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,eAAA;EACA,2BAAA;CACA;AACA;EACA,aAAA;EACA,QAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,oBAAA;EACA,0BAAA;EACA,mBAAA;CACA;AACA;EACA,oBAAA;CACA;AACA;EACA,QAAA;EACA,mBAAA;CACA;AACA;CACA;AACA;EACA,mBAAA;EACA,kBAAA;EACA,oBAAA;EACA,gBAAA;EACA,eAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,UAAA;CACA;AACA;EACA,UAAA;CACA;AACA;EACA,oBAAA;CACA;AACA;EACA,OAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;CACA;AACA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;;EAEA,cAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;EACA,wCAAA;EACA,aAAA;EACA,mBAAA;CACA;AACA;EACA,cAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;;EAEA,cAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;EACA,wCAAA;EACA,aAAA;EACA,mBAAA;EACA,WAAA;CACA;AACA;EACA,aAAA;CACA;AACA;EACA,cAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;;EAEA,cAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;EACA,wCAAA;EACA,aAAA;EACA,mBAAA;EACA,WAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,cAAA;EACA,mBAAA;CACA","file":"postorder.vue","sourcesContent":["<template>\n  <div class=\"wrapper\">\n      <scroller class=\"scroller\">\n      <text class='pay-tip tip-head'>订单信息</text>\n      <div class=\"row\">\n        <div class=\"order-order\">\n          <div class='v-h'></div>\n          <text class=\"button-order-text\">{{num}}桶{{typeStr}} 总价{{total}}元</text>\n          <div class='v-h'></div>\n        </div>\n      </div>\n\n      <text class='pay-tip tip-main'>选择桶装水类型</text>\n      <div class=\"row\">\n        <div class=\"order-info\" @click=\"pickType\">\n          <div class='v-h'></div>\n          <text class=\"button-text\">点击选择：{{typeStr}}</text>\n          <div class='v-h'></div>\n        </div>\n      </div>\n        <text class='pay-tip'>选择订购数量</text>\n        <div class=\"row\">\n          <div class=\"order-num\">\n            <div class='v-h'></div>\n            <input @input=\"onNumChange\" ref='num' class=\"nums\" type=\"number\" placeholder=\"输入数量，默一桶\" value=\"\"/>\n            <div class='v-h'></div>\n          </div>\n        </div>\n\n\n        <text class='pay-tip tip-pay'>选择支付方式</text>\n          <div class=\"row\">\n            <div class=\"pay-item\">\n              <div class='v-h'></div>\n              <div class=\"h-container\">\n                <image style=\"width: 88px;height: 88px;\" :src=\"getImage('alipay.png')\"></image>\n                <div class='pay-text' style=\"height: 88px;\">\n                  <div class='v-h v-h-top'></div>\n                  <text class='pay-way'>支付宝</text>\n                  <div class='v-h'></div>\n                  <text class='pay-way tip'>亿万用户都在用，安全可托付</text>\n                  <div class='v-h v-h-bottom'></div>\n                </div>\n                <div style=\"height: 88px;\">\n                  <div class='v-h'></div>\n                  <image style=\"width: 48px;height: 48px;\" :src=\"isAliPayUrl\"  @click='changePayWay(0)'></image>\n                  <div class='v-h'></div>\n                </div>\n              </div>\n              <div class='v-h'></div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"pay-item\">\n              <div class='v-h'></div>\n              <div class=\"h-container\">\n                <image style=\"width: 88px;height: 88px;\" :src=\"getImage('wxpay.png')\"></image>\n                <div class='pay-text' style=\"height: 88px;\">\n                  <div class='v-h v-h-top'></div>\n                  <text class='pay-way'>微信支付</text>\n                  <div class='v-h'></div>\n                  <text class='pay-way tip'>亿万用户的选择，安全快捷</text>\n                  <div class='v-h v-h-bottom'></div>\n                </div>\n                <div style=\"height: 88px;\">\n                  <div class='v-h'></div>\n                  <image style=\"width: 48px;height: 48px;\" :src=\"isWxPayUrl\"  @click='changePayWay(1)'></image>\n                  <div class='v-h'></div>\n              </div>\n              </div>\n              <div class='v-h'></div>\n            </div>\n          </div>\n        </scroller>\n\n      <div :class=\"[nowSubBack]\" @click=\"pay\">\n        <div class='v-h'></div>\n        <text class=\"sb-txt\" @click=\"pay\">确认支付  ￥{{total}}元</text>\n        <div class='v-h'></div>\n      </div>\n  </div>\n</template>\n\n<script>\n  let modal = weex.requireModule('modal')\n  const picker = weex.requireModule('picker')\n  let navigator = weex.requireModule('navigator')\n  let UrlTools = require('./UrlTools.js')\n  let price = [2000, 1000, 500]\n  let UnionPay = weex.requireModule('unionPay')\n  var stream = weex.requireModule('stream')\n  var globalEvent = weex.requireModule('globalEvent');\n  export default {\n    data: function () {\n      return {\n        total: 10,\n        num: 1,\n        index: 1,\n        typeStr: '中桶水',\n        types: ['大桶水', '中桶水', '小桶水'],\n        isAliPay: true,\n        isAliPayUrl:'',\n        isWxPayUrl:'',\n\n        nowSubBack: 'sbAli'\n      }\n    },\n    methods: {\n      pay: function() {\n        let platform = this.isAliPay ? 'ali':'wx'\n        if(UnionPay) {\n          UnionPay.pay({\n            platform: platform,\n            type: this.index,\n            num: this.num\n          }, result => {\n            if (this.isAliPay) {\n              if(result && result.resultStatus === '9000') {\n                modal.toast({\n                  message:'支付成功',\n                  duration: 1\n                })\n                setItem(_=>{\n                  navigator.pop()\n                }, 500)\n              } else {\n                modal.toast({\n                  message:'支付失败',\n                  duration: 1\n                })\n              }\n            } else {\n              modal.toast({\n                message:'微信支付还未实现',\n                duration: 1\n              })\n\n            }\n            /*\n            if(result === 'success') {\n              modal.toast({\n                message:'支付成功',\n                duration: 0.3\n              })\n              navigator.pop()\n            } else {\n              modal.toast({\n                message:'支付失败',\n                duration: 0.3\n              })\n            }\n            */\n          })\n        } else {\n          modal.toast({\n            message:'当前环境不支持支付操作'\n          })\n        }\n      },\n      getStarCount (repo, callback) {\n        return stream.fetch({\n          method: 'GET',\n          type: 'json',\n          url: 'https://aaa.bigfacewo.com/dwssserver/prepay/ali/jsen/0/1'\n        }, callback)\n      },\n      pickType: function() {\n        picker.pick({\n          index: 1,\n          items: this.types\n        }, event => {\n          if (event.result === 'success') {\n            this.index = event.data\n            this.typeStr = this.types[this.index]\n            this.total = this.calPrice()\n          }\n        })\n      },\n      calPrice: function() {\n        let p = parseFloat(price[this.index] * this.num) / 100.0\n        return p\n      },\n      onNumChange: function(e) {\n        if(this.checkNum(e.value)) {\n          this.num = parseInt(e.value)\n        } else {\n          this.$refs.num.value('1')\n        }\n        this.total = this.calPrice()\n      },\n      checkNum: function (txt) {\n    　　var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/\n\n    　　if (!re.test(txt)) {\n  　　　　return false\n    　　}\n        return true\n      },\n      getImage: function(imageName) {\n        return UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/' + imageName\n      },\n      changePayWay: function(index) {\n        if(index === 0) {\n          this.nowSubBack = 'sbAli'\n          this.isAliPay = true\n          this.isAliPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/checked.png'\n          this.isWxPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/check.png'\n        } else {\n          this.nowSubBack = 'sbWx'\n          this.isAliPay = false\n          this.isAliPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/check.png'\n          this.isWxPayUrl = UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/checked.png'\n        }\n      }\n    },\n    mounted: function() {\n      globalEvent.addEventListener(\"PayResult\", result => {\n        console.log(result)\n      });\n\n      if(weex.config.env.platform !== 'iOS') {\n        navigator.setNavBarTitle('订单支付')\n        // navigator.clearNavBarLeftItem()\n      } else {\n        navigator.setNavBarTitle({title:'订单支付'})\n      }\n      let params = UrlTools.getParams(weex.config.bundleUrl)\n      if(params.type) {\n        let type = parseInt(params.type)\n        this.index = type\n        this.typeStr = this.types[this.index]\n        this.total = this.calPrice()\n      }\n      this.changePayWay(0)\n    }\n  }\n</script>\n\n<style>\n\n  .scroller {\n      position: absolute;\n      top:0px;\n      bottom:110px;\n      left: 0px;\n      right:0px;\n  }\n  .wrapper {\n    position: absolute;\n    background-color: #eeeeee;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n  .order-order {\n    flex: 1;\n    flex-direction: column;\n    width: 100%;\n    right: 0px;\n    background-color: #ffffff;\n    height:100px;\n  }\n  .order-info{\n    flex: 1;\n    flex-direction: column;\n    width: 100%;\n    right: 0px;\n    background-color: #ffffff;\n    height:100px;\n  }\n  .order-num{\n    flex: 1;\n    flex-direction: column;\n    width: 100%;\n    right: 0px;\n    background-color: #ffffff;\n    height:100px;\n  }\n  .nums {\n    padding-left: 60px;\n    padding-right: 60px;\n    color: #000000;\n    placeholder-color: #bbbbbb;\n  }\n  .pay-item {\n    height:120px;\n    flex: 1;\n    width: 100%;\n    right: 0px;\n    padding-left: 40px;\n    padding-right: 40px;\n    background-color: #ffffff;\n    margin-bottom: 2px;\n  }\n  .h-container {\n    flex-direction: row;\n  }\n  .pay-text {\n    flex: 1;\n    padding-left: 20px;\n  }\n  .pay-way {\n  }\n  .pay-tip {\n    padding-left: 20px;\n    padding-top: 20px;\n    padding-bottom: 8px;\n    font-size: 28px;\n    color: #888888;\n  }\n  .tip-main {\n    margin-top: 40px;\n  }\n  .tip-head {\n    margin-top: 0px;\n  }\n  .tip-pay {\n    margin-top: 40px;\n  }\n  .tip {\n    font-size: 22px;\n  }\n  .v-h-top {\n    flex: 0.2;\n  }\n  .v-h-bottom {\n    flex: 0.3;\n  }\n  .row{\n    flex-direction: row;\n  }\n  .v-h {\n    flex:1;\n  }\n  .button-text{\n    padding-left: 60px;\n    padding-right: 60px;\n    color: #000000;\n    font-size: 35px;\n  }\n  .button-order-text{\n    padding-left: 60px;\n    padding-right: 60px;\n    color: #000000;\n    font-size: 42px;\n  }\n  .submit-btn {\n    position: absolute;\n    bottom: 10px;\n    left: 120px;\n    right: 120px;\n    background-color: #2595c9;\n\n    display:block;\n    box-sizing:border-box;\n    font-size:18px;\n    border-radius:5px;\n    -webkit-tap-highlight-color:transparent;\n    height: 90px;\n    text-align: center;\n  }\n  .sbAli {\n    z-index: 1000;\n    position: absolute;\n    bottom: 10px;\n    left: 120px;\n    right: 120px;\n    background-color: #2595c9;\n\n    display:block;\n    box-sizing:border-box;\n    font-size:18px;\n    border-radius:5px;\n    -webkit-tap-highlight-color:transparent;\n    height: 90px;\n    text-align: center;\n    opacity: 1;\n  }\n  .sbAli:active {\n    opacity: 0.8;\n  }\n  .sbWx {\n    z-index: 1000;\n    position: absolute;\n    bottom: 10px;\n    left: 120px;\n    right: 120px;\n    background-color: #48a443;\n\n    display:block;\n    box-sizing:border-box;\n    font-size:18px;\n    border-radius:5px;\n    -webkit-tap-highlight-color:transparent;\n    height: 90px;\n    text-align: center;\n    opacity: 1;\n  }\n  .bt-submit:active {\n    background-color: #0A9D09;\n  }\n  .sb-txt {\n    color:#FFFFFF;\n    text-align: center;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('scroller', {
    staticClass: "scroller",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "pay-tip tip-head",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("订单信息")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "order-order",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "button-order-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.num) + "桶" + _vm._s(_vm.typeStr) + " 总价" + _vm._s(_vm.total) + "元")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('text', {
    staticClass: "pay-tip tip-main",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("选择桶装水类型")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "order-info",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.pickType
    }
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("点击选择：" + _vm._s(_vm.typeStr))]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('text', {
    staticClass: "pay-tip",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("选择订购数量")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "order-num",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('input', {
    ref: "num",
    staticClass: "nums",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "type": "number",
      "placeholder": "输入数量，默一桶",
      "value": ""
    },
    on: {
      "input": _vm.onNumChange
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('text', {
    staticClass: "pay-tip tip-pay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("选择支付方式")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "pay-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    staticClass: "h-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticStyle: _vm.$processStyle({
      "width": "88px",
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getImage('alipay.png')
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "pay-text",
    staticStyle: _vm.$processStyle({
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h v-h-top",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "pay-way",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("支付宝")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "pay-way tip",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("亿万用户都在用，安全可托付")]), _vm._v(" "), _c('div', {
    staticClass: "v-h v-h-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('image', {
    staticStyle: _vm.$processStyle({
      "width": "48px",
      "height": "48px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.isAliPayUrl
    },
    on: {
      "click": function($event) {
        _vm.changePayWay(0)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "pay-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    staticClass: "h-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticStyle: _vm.$processStyle({
      "width": "88px",
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getImage('wxpay.png')
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "pay-text",
    staticStyle: _vm.$processStyle({
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h v-h-top",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "pay-way",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("微信支付")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "pay-way tip",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("亿万用户的选择，安全快捷")]), _vm._v(" "), _c('div', {
    staticClass: "v-h v-h-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "height": "88px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('image', {
    staticStyle: _vm.$processStyle({
      "width": "48px",
      "height": "48px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.isWxPayUrl
    },
    on: {
      "click": function($event) {
        _vm.changePayWay(1)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])])]), _vm._v(" "), _c('div', {
    class: [_vm.nowSubBack],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.pay
    }
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "sb-txt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.pay
    }
  }, [_vm._v("确认支付  ￥" + _vm._s(_vm.total) + "元")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6e9d1216", module.exports)
  }
}

/***/ }),

/***/ 4:
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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("efc2089c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e9d1216\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./postorder.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e9d1216\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./postorder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=postorder.web.js.map