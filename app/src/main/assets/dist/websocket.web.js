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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f3d9e8e4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/websocket.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] websocket.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f3d9e8e4", Component.options)
  } else {
    hotAPI.reload("data-v-f3d9e8e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var websocket = weex.requireModule('webSocket');
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
      websocket.WebSocket('ws://echo.websocket.org', '');
      var self = this;
      self.onopeninfo = 'connecting...';
      websocket.onopen = function (e) {
        self.onopeninfo = 'websocket open';
      };
      websocket.onmessage = function (e) {
        console.log(_typeof(e.data));
        if (typeof e.data === 'string') {
          self.onmessage = e.data;
        } else {
          var str = 'receive array buffer show with string:' + String.fromCharCode.apply(null, new Float32Array(e.data));
          self.onmessage = str;
        }
      };
      websocket.onerror = function (e) {
        self.onerrorinfo = e.data;
      };
      websocket.onclose = function (e) {
        self.onopeninfo = '';
        self.oncloseinfo = e.code;
      };
    },
    send: function send(e) {
      var input = this.$refs.input;
      input.blur();
      websocket.send(this.txtInput);
      this.sendinfo = this.txtInput;
    },
    sendArrayBuffer: function sendArrayBuffer(e) {
      var input = this.$refs.input;
      input.blur();
      var buffer = new ArrayBuffer(16);
      var view = new Float32Array(buffer);
      view.set([4, 89, 36.9, 0.765]);
      console.log(buffer);
      var str = 'send array buffer show with string:' + String.fromCharCode.apply(null, new Float32Array(buffer));
      this.sendinfo = str;
      websocket.send(buffer);
    },
    oninput: function oninput(event) {
      this.txtInput = event.value;
    },
    close: function close(e) {
      this.closeinfo = 'close connect';
      websocket.close();
    }
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(12);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.input[data-v-f3d9e8e4] {\n  font-size: 40px;\n  height: 80px;\n  width: 600px;\n}\n.button[data-v-f3d9e8e4] {\n  font-size: 36px;\n  width: 150px;\n  color: #41B883;\n  text-align: center;\n  padding-top: 25px;\n  padding-bottom: 25px;\n  border-width: 2px;\n  border-style: solid;\n  margin-right: 20px;\n  border-color: rgb(162, 217, 192);\n  background-color: rgba(162, 217, 192, 0.2);\n}\n", "", {"version":3,"sources":["/Users/jsen/Documents/GitProjects/POJ/DeliverWater/Weex/DeliverWaterWeex/src/websocket.vue?5a5c28f0"],"names":[],"mappings":";AA0CA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;CACA;AAEA;EACA,gBAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,qBAAA;EACA,kBAAA;EACA,oBAAA;EACA,mBAAA;EACA,iCAAA;EACA,2CAAA;CACA","file":"websocket.vue","sourcesContent":["<template>\n  <scroller>\n    <div>\n      <div style=\"background-color: #286090\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: white\">websocket</text>\n      </div>\n      <input type=\"text\" placeholder=\"please input message to send\" class=\"input\" autofocus=\"false\" value=\"\" @input=\"oninput\" ref=\"input\" />\n      <div style=\"flex-direction: row; justify-content: center;\">\n        <text class=\"button\" @click=\"connect\">connect</text>\n        <text class=\"button\" @click=\"send\">send</text>\n        <text class=\"button\" @click=\"sendArrayBuffer\">sendArrayBuffer</text>\n        <text class=\"button\" @click=\"close\">close</text>\n      </div>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = close</text>\n      </div>\n      <text style=\"color: black;height: 80px\">{{closeinfo}}</text>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = send</text>\n      </div>\n      <text style=\"color: black;height: 80px\">{{sendinfo}}</text>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = onopen</text>\n      </div>\n      <text style=\"color: black;height: 80px\">{{onopeninfo}}</text>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = onmessage</text>\n      </div>\n      <text style=\"color: black;height: 400px\">{{onmessage}}</text>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = onclose</text>\n      </div>\n      <text style=\"color: black;height: 80px\">{{oncloseinfo}}</text>\n      <div style=\"background-color: lightgray\">\n        <text class=\"title\" style=\"height: 80px ;padding: 20px;color: black\">method = onerror</text>\n      </div>\n      <text style=\"color: black;height: 80px\">{{onerrorinfo}}</text>\n    </div>\n  </scroller>\n</template>\n\n<style scoped>\n  .input {\n    font-size: 40px;\n    height: 80px;\n    width: 600px;\n  }\n  \n  .button {\n    font-size: 36px;\n    width: 150px;\n    color: #41B883;\n    text-align: center;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    border-width: 2px;\n    border-style: solid;\n    margin-right: 20px;\n    border-color: rgb(162, 217, 192);\n    background-color: rgba(162, 217, 192, 0.2);\n  }\n</style>\n\n<script>\n  var websocket = weex.requireModule('webSocket')\n  export default {\n    data() {\n      return {\n        connectinfo: '',\n        sendinfo: '',\n        onopeninfo: '',\n        onmessage: '',\n        oncloseinfo: '',\n        onerrorinfo: '',\n        closeinfo: '',\n        txtInput: '',\n        navBarHeight: 88,\n        title: 'Navigator',\n        dir: 'examples',\n        baseURL: ''\n      }\n    },\n    methods: {\n\n      connect: function() {\n        websocket.WebSocket('ws://echo.websocket.org', '');\n        var self = this;\n        self.onopeninfo = 'connecting...'\n        websocket.onopen = function(e) {\n          self.onopeninfo = 'websocket open';\n        }\n        websocket.onmessage = function(e) {\n          console.log(typeof(e.data));\n          if(typeof(e.data) === 'string'){\n            self.onmessage = e.data;\n          }else\n          {\n            var str = 'receive array buffer show with string:' +  String.fromCharCode.apply(null, new Float32Array(e.data));\n            self.onmessage = str;\n          }\n        }\n        websocket.onerror = function(e) {\n          self.onerrorinfo = e.data;\n        }\n        websocket.onclose = function(e) {\n          self.onopeninfo = '';\n          self.oncloseinfo = e.code;\n        }\n      },\n      send: function(e) {\n        var input = this.$refs.input;\n        input.blur();\n        websocket.send(this.txtInput);\n        this.sendinfo = this.txtInput;\n      },\n      sendArrayBuffer: function(e) {\n        var input = this.$refs.input;\n        input.blur();\n        var buffer = new ArrayBuffer(16)\n        var view = new Float32Array(buffer)\n        view.set([4,89,36.9,0.765])\n        console.log(buffer);\n        var str = 'send array buffer show with string:' +  String.fromCharCode.apply(null, new Float32Array(buffer));\n        this.sendinfo = str;\n        websocket.send(buffer);\n      },\n      oninput: function(event) {\n        this.txtInput = event.value;\n      },\n      close: function(e) {\n        this.closeinfo = 'close connect';\n        websocket.close();\n      },\n    },\n  }\n</script>"],"sourceRoot":""}]);

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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', [_c('div', [_c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "#286090"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "white"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("websocket")])]), _vm._v(" "), _c('input', {
    ref: "input",
    staticClass: "input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "type": "text",
      "placeholder": "please input message to send",
      "autofocus": "false",
      "value": ""
    },
    on: {
      "input": _vm.oninput
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "flex-direction": "row",
      "justify-content": "center"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.connect
    }
  }, [_vm._v("connect")]), _vm._v(" "), _c('text', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.send
    }
  }, [_vm._v("send")]), _vm._v(" "), _c('text', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.sendArrayBuffer
    }
  }, [_vm._v("sendArrayBuffer")]), _vm._v(" "), _c('text', {
    staticClass: "button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.close
    }
  }, [_vm._v("close")])]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = close")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "80px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.closeinfo))]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = send")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "80px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.sendinfo))]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = onopen")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "80px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.onopeninfo))]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = onmessage")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "400px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.onmessage))]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = onclose")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "80px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.oncloseinfo))]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "lightgray"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle({
      "height": "80px",
      "padding": "20px",
      "color": "black"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("method = onerror")])]), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle({
      "color": "black",
      "height": "80px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.onerrorinfo))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f3d9e8e4", module.exports)
  }
}

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0d0a3de2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f3d9e8e4\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./websocket.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.26.4@css-loader/index.js?sourceMap!../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f3d9e8e4\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./websocket.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=websocket.web.js.map