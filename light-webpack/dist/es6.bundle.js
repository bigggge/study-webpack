/*
   webpack 对 es6 模块化的实现
   */
(function (modules) { // webpackBootstrap
                      // The module cache
  var installedModules = {}

  // The require function
  function __webpack_require__ (moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    // Flag the module as loaded
    module.l = true

    // Return the exports of the module
    return module.exports
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules

  // expose the module cache
  __webpack_require__.c = installedModules

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      })
    }
  }

  // getDefaultExport function for compatibility with non-harmony modules
  // 如果遇到 commonjs 和 es6 模块混用时，这段代码将发生作用
  // __webpack_require__.n 会判断 module 是否为 es6 模块，
  // 当 __esModule 为 true 的时候，那么 module.a 默认返回 module.default，否则返回 module
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule
      ? function getDefault () { return module['default'] }
      : function getModuleExports () { return module }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  __webpack_require__.p = ''

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = 0)
})
([
  /* 0 */
  (function (module, __webpack_exports__, __webpack_require__) {

    'use strict'
    Object.defineProperty(__webpack_exports__, '__esModule', {value: true})
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__other_js__ = __webpack_require__(1)

    console.log('index')
    Object(__WEBPACK_IMPORTED_MODULE_0__other_js__['a' /* default */])()
    Object(__WEBPACK_IMPORTED_MODULE_0__other_js__['b' /* f2 */])()

  }),
  /* 1 */
  (function (module, __webpack_exports__, __webpack_require__) {

    'use strict'
    /* harmony export (immutable) */
    __webpack_exports__['a'] = f1
    /* harmony export (immutable) */
    __webpack_exports__['b'] = f2

    function f1 () {
      console.log('f1')
    }

    function f2 () {
      console.log('f2')
    }
  })
])