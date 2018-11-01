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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(arr){\n    this.htmlElements = arr;\n  }\n\n  html(str) {\n    if (str === undefined) {\n      return this.htmlElements[0].innerHTML;\n    }\n    this.htmlElements.forEach((htmlNode) => htmlNode.innerHTML = str);\n  }\n\n  empty() {\n    this.html(\"\");\n  }\n\n  append(node) {\n    this.htmlElements.forEach((htmlNode) => {\n      node.htmlElements.forEach((element) => {\n        htmlNode.innerHTML += element.outerHTML;\n        }\n      );\n    });\n  }\n\n  attr(key, value){\n    if (value) {\n      this.htmlElements.forEach(( htmlNode ) => { htmlNode.setAttribute( key, value ); });\n    } else {\n      const attr_vals = this.htmlElements.map(( node ) => {\n        return node.getAttribute( key );\n      });\n      return attr_vals;\n    }\n  }\n\n  addClass(newClass) {\n    this.htmlElements.forEach((htmlNode) => {\n      htmlNode.className += \" \" + newClass;\n      htmlNode.className = htmlNode.className.trim();\n   });\n  }\n\n  removeClass(oldClass) {\n    this.htmlElements.forEach((htmlNode) => {\n      const indx = htmlNode.className.split(\" \").indexOf(oldClass);\n      let classArr = htmlNode.className.split(\" \");\n      classArr.splice(indx, 1);\n      htmlNode.className = classArr.join(\" \");\n    });\n  }\n\n  children(){\n    let childrenDOMNodeCollection = [];\n    this.htmlElements.forEach( htmlNode => {\n      let childrenArr = Array.from(htmlNode.children);\n\n      const nodeArr = childrenArr.map((htmlEl) => {\n        return new DOMNodeCollection([htmlEl]);\n      });\n      childrenDOMNodeCollection = childrenDOMNodeCollection.concat(nodeArr);\n    });\n\n    return childrenDOMNodeCollection;\n  }\n\n  parent() {\n    let parentsArr = this.htmlElements.map(htmlNode => htmlNode.parentElement);\n    parentsArr = [...new Set(parentsArr)];\n\n    return parentsArr.map((htmlNodeParent) => new DOMNodeCollection([htmlNodeParent]));\n  }\n\n  find(selector) {\n    // const theObeARr = [];\n    // this.htmlElements.querySelectorAll(selector).map\n\n    let selectedDOMNodeCollection = [];\n    this.htmlElements.forEach( htmlNode => {\n      let childrenArr = Array.from(htmlNode.querySelectorAll(selector));\n\n      const nodeArr = childrenArr.map((htmlEl) => {\n        return new DOMNodeCollection([htmlEl]);\n      });\n      selectedDOMNodeCollection = selectedDOMNodeCollection.concat(nodeArr);\n    });\n\n    return selectedDOMNodeCollection;\n  }\n\n  remove(){\n    // this.parent().forEach( parent => parent.empty());\n    this.htmlElements.forEach(htmlNode => htmlNode.outerHTML = \"\")\n  }\n}\n\n\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n\nwindow.$l = (selector) => {\n  if (selector instanceof HTMLElement) {\n    return new DOMNodeCollection([selector]);\n  }\n\n  const nodeList = document.querySelectorAll(selector);\n  const nodeArr = Array.from(nodeList);\n  return new DOMNodeCollection(nodeArr);\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });