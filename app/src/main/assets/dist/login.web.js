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
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = {"login":"https://aaa.bigfacewo.com/dwssserveruser/login","userbase":"https://aaa.bigfacewo.com/dwssserveruser","webSocket":"wss://aaa.bigfacewo.com/dwss"}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(39)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(33),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ceeedb0", Component.options)
  } else {
    hotAPI.reload("data-v-4ceeedb0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
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
//
//
//
//
//
//
//
//
//
//
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
var apis = __webpack_require__(5);
var UrlTools = __webpack_require__(4);
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(9);
App.el = '#root';
new Vue(App);

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.wrapper {\n    background-color: #ce5959;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.login-text {\n  width: 750px;\n  padding-top: 180px;\n  color: #ffffff;\n  font-size: 48px;\n  text-align: center;\n}\n.login{\n    margin-top: 60px;\n}\n.input-wrapper{\n    width: 550px;\n    margin-left: 100px;\n    margin-right: 100px;\n    margin-bottom: 30px;\n}\n.input {\n    font-size: 30px;\n    height: 80px;\n    width: 550px;\n    padding-left: 90px;\n    padding-top: 15px;\n    padding-bottom: 15px;\n    border-width:1px;\n    border-color: #ffffff;\n    border-radius:10px;\n    outline: none;\n    color: #ffffff;\n    placeholder-color: #eeeeee;\n}\n.input-img{\n    position: absolute;\n    top:10px;\n    left: 15px;\n    width: 48px;\n    height: 48px;\n}\n.input-login{\n    height: 80px;\n    width: 550px;\n    background-color: #48c9bf;\n    border-radius: 10px;\n    margin-top: 40px;\n}\n.input-login-text{\n    height: 80px;\n    width: 550px;\n    text-align: center;\n    line-height: 80px;\n    color: white;\n    font-size: 35px;\n}\n.input-forget{\n    position: absolute;\n    left: 30px;\n    font-size: 20px;\n    color: #ffffff;\n}\n.input-lic{\n    position: absolute;\n    right: 30px;\n    font-size: 20px;\n    color: #ffffff;\n}\n", "", {"version":3,"sources":["/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/login.vue?5ffe767b"],"names":[],"mappings":";AA2HA;IACA,0BAAA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;IACA,UAAA;IACA,QAAA;CACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;CACA;AACA;IACA,iBAAA;CACA;AACA;IACA,aAAA;IACA,mBAAA;IACA,oBAAA;IACA,oBAAA;CACA;AACA;IACA,gBAAA;IACA,aAAA;IACA,aAAA;IACA,mBAAA;IACA,kBAAA;IACA,qBAAA;IACA,iBAAA;IACA,sBAAA;IACA,mBAAA;IACA,cAAA;IACA,eAAA;IACA,2BAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,WAAA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,aAAA;IACA,aAAA;IACA,0BAAA;IACA,oBAAA;IACA,iBAAA;CACA;AACA;IACA,aAAA;IACA,aAAA;IACA,mBAAA;IACA,kBAAA;IACA,aAAA;IACA,gBAAA;CACA;AACA;IACA,mBAAA;IACA,WAAA;IACA,gBAAA;IACA,eAAA;CACA;AACA;IACA,mBAAA;IACA,YAAA;IACA,gBAAA;IACA,eAAA;CACA","file":"login.vue","sourcesContent":["<template>\n    <div class=\"wrapper\">\n      <text class=\"login-text\">用户登入</text>\n        <div class=\"login\">\n            <div class=\"input-wrapper\">\n                <input @input=\"onchangeUserNumber\" class=\"input\" type=\"text\" placeholder=\"ID\" autofocus=\"true\" value=\"\"/>\n                <image class=\"input-img\" :src=\"getImage('account.png')\"></image>\n            </div>\n            <div class=\"input-wrapper\">\n                <input @input=\"onchangeUserPassword\" class=\"input\" type=\"password\" placeholder=\"密码\" value=\"\"/>\n                <image class=\"input-img\" :src=\"getImage('password.png')\"></image>\n            </div>\n            <div class=\"input-wrapper\">\n                <div class=\"input-login\" @click=\"login\">\n                    <text class=\"input-login-text\">登录</text>\n                </div>\n            </div>\n            <div class=\"input-wrapper\">\n                <text class=\"input-forget\" >忘记密码请联系管理员</text>\n                <text class=\"input-lic\">登入表示同意本软件使用协议</text>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\n    let modal = weex.requireModule('modal')\n    let stream = weex.requireModule('stream')\n    let SimpleStore = weex.requireModule('simpleStore')\n    let navigator = weex.requireModule('navigator')\n    const storage = weex.requireModule('storage')\n    let apis = require('./apis.json')\n    let UrlTools = require('./UrlTools.js')\n    module.exports = {\n        data:{\n            userNumber:'',\n            userPassword:''\n        },\n        methods:{\n            onchangeUserNumber:function (event) {\n                this.userNumber = event.value\n            },\n            onchangeUserPassword:function (event) {\n                this.userPassword = event.value\n            },\n            /*处理登录*/\n            login: function () {\n                if(this.userNumber.length < 1){\n                    modal.toast({\n                      message: '请输入登入账号',\n                      duration: 0.3\n                    })\n                    return\n                }\n                if(this.userPassword.length < 1){\n                    modal.toast({\n                      message: '请输入登入密码',\n                      duration: 0.3\n                    })\n                    return\n                }\n                this.handleLogin()\n            },\n            getImage: function(imageName) {\n              return UrlTools.getImageBase(weex.config.bundleUrl) + '/dist/' + imageName\n            },\n            handleLogin: function () {\n              stream.fetch({\n                method: 'GET',\n                type: 'json',\n                url: apis.login + '/' + this.userNumber + '/' + this.userPassword\n              }, res => {\n                if(res.ok && res.data && res.data.code === 0) {\n                    /*modal.toast({\n                      message: '登入成功',\n                      duration: 0.3\n                    })*/\n                    if(weex.config.env.platform !== 'iOS') {\n                      storage.setItem('userKey', this.userNumber)\n                      storage.setItem('time', Date.now() + '')\n                    } else {\n                      SimpleStore.setItem('userKey', this.userNumber)\n                      SimpleStore.setItem('time', Date.now() + '')\n                    }\n                    navigator.open({\n                      url: UrlTools.getUrlBase(weex.config.bundleUrl) + '/dist/main.js',\n                      animated: 'true'\n                    })\n                } else {\n                    modal.toast({\n                      message: '登入失败',\n                      duration: 0.3\n                    })\n                }\n              })\n            },\n            getDate:function(str) {\n              try{\n                let strd = parseInt(str)\n                return new Date(strd)\n              } catch(e) {\n                return null\n              }\n            },\n            getDays: function(date) {\n              return parseInt((Date.now() - date) / (1000 * 60 * 60 * 24))\n            }\n        },\n        mounted: function() {\n          if(weex.config.env.platform !== 'iOS') {\n            navigator.setNavBarTitle('登入')\n            navigator.clearNavBarLeftItem()\n          } else {\n            navigator.setNavBarTitle({title:'登入'})\n          }\n        }\n    }\n    // 206\n    // 89\n    // 89\n</script>\n\n<style>\n    .wrapper {\n        background-color: #ce5959;\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n    }\n    .login-text {\n      width: 750px;\n      padding-top: 180px;\n      color: #ffffff;\n      font-size: 48px;\n      text-align: center;\n    }\n    .login{\n        margin-top: 60px;\n    }\n    .input-wrapper{\n        width: 550px;\n        margin-left: 100px;\n        margin-right: 100px;\n        margin-bottom: 30px;\n    }\n    .input {\n        font-size: 30px;\n        height: 80px;\n        width: 550px;\n        padding-left: 90px;\n        padding-top: 15px;\n        padding-bottom: 15px;\n        border-width:1px;\n        border-color: #ffffff;\n        border-radius:10px;\n        outline: none;\n        color: #ffffff;\n        placeholder-color: #eeeeee;\n    }\n    .input-img{\n        position: absolute;\n        top:10px;\n        left: 15px;\n        width: 48px;\n        height: 48px;\n    }\n    .input-login{\n        height: 80px;\n        width: 550px;\n        background-color: #48c9bf;\n        border-radius: 10px;\n        margin-top: 40px;\n    }\n    .input-login-text{\n        height: 80px;\n        width: 550px;\n        text-align: center;\n        line-height: 80px;\n        color: white;\n        font-size: 35px;\n    }\n    .input-forget{\n        position: absolute;\n        left: 30px;\n        font-size: 20px;\n        color: #ffffff;\n    }\n    .input-lic{\n        position: absolute;\n        right: 30px;\n        font-size: 20px;\n        color: #ffffff;\n    }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "login-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("用户登入")]), _vm._v(" "), _c('div', {
    staticClass: "login",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "input-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    staticClass: "input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "type": "text",
      "placeholder": "ID",
      "autofocus": "true",
      "value": ""
    },
    on: {
      "input": _vm.onchangeUserNumber
    }
  }), _vm._v(" "), _c('image', {
    staticClass: "input-img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getImage('account.png')
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    staticClass: "input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "type": "password",
      "placeholder": "密码",
      "value": ""
    },
    on: {
      "input": _vm.onchangeUserPassword
    }
  }), _vm._v(" "), _c('image', {
    staticClass: "input-img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getImage('password.png')
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "input-login",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.login
    }
  }, [_c('text', {
    staticClass: "input-login-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("登录")])])]), _vm._v(" "), _c('div', {
    staticClass: "input-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "input-forget",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("忘记密码请联系管理员")]), _vm._v(" "), _c('text', {
    staticClass: "input-lic",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("登入表示同意本软件使用协议")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4ceeedb0", module.exports)
  }
}

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1063f8db", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ceeedb0\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ceeedb0\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);
//# sourceMappingURL=login.web.js.map