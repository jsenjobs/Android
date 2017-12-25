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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apis = __webpack_require__(5);
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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(38)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(32),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f06c9c2", Component.options)
  } else {
    hotAPI.reload("data-v-3f06c9c2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
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

var SocketN = __webpack_require__(6);
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
var UrlTools = __webpack_require__(4);
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

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(10);
App.el = '#root';
new Vue(App);

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.wrapper {\n  background-color: #eeeeee;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.content{\n  position: absolute;\n  top:0px;\n  bottom:0px;\n  left: 0px;\n  right:0px;\n  flex-direction: column;\n  padding-top: 60px;\n}\n.button{\n  flex:1;\n  flex-direction: column;\n  width: 100%;\n  right: 0px;\n  background-color: #ffffff;\n  border-radius: 10px;\n  margin-bottom: 2px;\n}\n.button:active {\n  background-color: #eeeeee;\n}\n.row{\n  height: 180px;\n  flex-direction: row;\n}\n.v-h {\n  flex:1;\n}\n.button-text{\n  height: 80px;\n  text-align: center;\n  line-height: 80px;\n  color: #000000;\n  font-size: 35px;\n}\n.sider {\n  width:20px;\n}\n.sider-a {\n  background-color: #123456;\n}\n.sider-b {\n  background-color: #fed657;\n}\n.sider-c {\n  background-color: #97290f;\n}\n.text-right {\n  text-align: center;\n  padding-top: 80px;\n  color: #000000;\n  font-size: 28px;\n}\n", "", {"version":3,"sources":["/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/main.vue?569da098"],"names":[],"mappings":";AAgHA;EACA,0BAAA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;CACA;AACA;EACA,mBAAA;EACA,QAAA;EACA,WAAA;EACA,UAAA;EACA,UAAA;EACA,uBAAA;EACA,kBAAA;CACA;AACA;EACA,OAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,0BAAA;EACA,oBAAA;EACA,mBAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,cAAA;EACA,oBAAA;CACA;AACA;EACA,OAAA;CACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;CACA;AACA;EACA,WAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;CACA","file":"main.vue","sourcesContent":["<template>\n  <div class=\"wrapper\">\n    <div class=\"content\">\n      <div class=\"row\">\n        <div class=\"sider sider-a\"></div>\n        <div class=\"button\" @click=\"buy(0)\">\n          <div class='v-h'></div>\n          <text class=\"button-text\">订购大桶装水</text>\n          <div class='v-h'></div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"sider sider-b\"></div>\n        <div class=\"button\" @click=\"buy(1)\">\n          <div class='v-h'></div>\n          <text class=\"button-text\">订购中桶装水</text>\n          <div class='v-h'></div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"sider sider-c\"></div>\n        <div class=\"button\" @click=\"buy(2)\">\n          <div class='v-h'></div>\n          <text class=\"button-text\">订购小桶装水</text>\n          <div class='v-h'></div>\n        </div>\n      </div>\n      <text class=\"text-right\">Copyright(C) 2017 Chaos.</text>\n\n    </div>\n  </div>\n</template>\n\n<script>\n  let SocketN = require('./SocketN.js')\n  let navigator = weex.requireModule('navigator')\n  let modal = weex.requireModule('modal')\n  let UrlTools = require('./UrlTools.js')\n  const storage = weex.requireModule('storage')\n  let SimpleStore = weex.requireModule('simpleStore')\n  export default {\n    data: function () {\n      return {\n      }\n    },\n    methods: {\n      buy: function(type) {\n        navigator.push({\n          url: UrlTools.getUrlBase(weex.config.bundleUrl) + '/dist/postorder.js?type=' + type,\n          animated: 'true'\n        })\n      },\n      startWebSocketTask: function(openid) {\n        var self = this\n        SocketN.startWS(openid, {\n          onconnecting: function() {\n            console.log('connecting...')\n            // self.onopeninfo = 'connecting...'\n          },\n          onopen: function(e) {\n            console.log('websocket open')\n            // self.onopeninfo = 'websocket open';\n          },\n          onmessage: function(e) {\n            console.log(e.data)\n            // self.onmessage = e.data;\n          },\n          onerror: function(e) {\n            console.error(e.data)\n            // self.onerrorinfo = e.data;\n          },\n          onclose: function(e) {\n            console.log(e.code)\n            // self.onopeninfo = '';\n            // self.oncloseinfo = e.code;\n          },\n          cnotify: function(data) {\n            let order = data.data\n            let type = ['大桶水', '中桶水', '小桶水']\n            let str = '您订购的' + order.num + '桶[' + type[order.type] + ']即将配送'\n            modal.alert({\n              message: str,\n              okTitle: '确定'\n            })\n          }\n        })\n      }\n    },\n    mounted: function () {\n      if(weex.config.env.platform !== 'iOS') {\n        storage.getItem('userKey', data => {\n          if(result === 'success') {\n\n          }\n        })\n        navigator.setNavBarTitle('主页')\n        navigator.clearNavBarLeftItem()\n      } else {\n        SimpleStore.getItem('userKey', data => {\n          if(result === 'success') {\n\n          }\n        })\n        navigator.setNavBarTitle({title:'主页'})\n      }\n    }\n\n  }\n</script>\n\n<style>\n\n  .wrapper {\n    background-color: #eeeeee;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n  .content{\n    position: absolute;\n    top:0px;\n    bottom:0px;\n    left: 0px;\n    right:0px;\n    flex-direction: column;\n    padding-top: 60px;\n  }\n  .button{\n    flex:1;\n    flex-direction: column;\n    width: 100%;\n    right: 0px;\n    background-color: #ffffff;\n    border-radius: 10px;\n    margin-bottom: 2px;\n  }\n  .button:active {\n    background-color: #eeeeee;\n  }\n  .row{\n    height: 180px;\n    flex-direction: row;\n  }\n  .v-h {\n    flex:1;\n  }\n  .button-text{\n    height: 80px;\n    text-align: center;\n    line-height: 80px;\n    color: #000000;\n    font-size: 35px;\n  }\n  .sider {\n    width:20px;\n  }\n  .sider-a {\n    background-color: #123456;\n  }\n  .sider-b {\n    background-color: #fed657;\n  }\n  .sider-c {\n    background-color: #97290f;\n  }\n  .text-right {\n    text-align: center;\n    padding-top: 80px;\n    color: #000000;\n    font-size: 28px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "sider sider-a",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.buy(0)
      }
    }
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("订购大桶装水")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "sider sider-b",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.buy(1)
      }
    }
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("订购中桶装水")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "sider sider-c",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.buy(2)
      }
    }
  }, [_c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("订购小桶装水")]), _vm._v(" "), _c('div', {
    staticClass: "v-h",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('text', {
    staticClass: "text-right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("Copyright(C) 2017 Chaos.")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3f06c9c2", module.exports)
  }
}

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c92c294e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f06c9c2\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f06c9c2\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.web.js.map