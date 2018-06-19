/*

   webpack 支持大多数模块系统包括：ES2015 import 语句，CommonJS require() 语句和 AMD define 和 require 语句
   webpack 对 commonjs 模块化的实现

   1.整个文件是一个IIFE立即执行函数表达式，
    传入参数是一个数组，数组首项包含一个函数，函数为 index.js 里的内容。
   2.IIFE里面有闭包，__webpack_require_是模块加载函数，接收模块id
    webpack中每个模块都会有不同的id，也就是 modules 数组中的 index 值（0，1，2.....）
   3.真正执行 index.js 的是 modules[moduleId].call()

   */

(function (modules) { // webpackBootstrap
                      // The module cache
                      // 模块缓存
  var installedModules = {}

  // The require function
  // webpack require 函数
  function __webpack_require__ (moduleId) {

    // Check if module is in cache
    // 检查模块是否被缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // Create a new module (and put it into the cache)
    // 创建一个新模块并放入缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }

    // Execute the module function
    // 执行模块函数
    // 此处可以看出直接使用 exports = xxx 将会失败，需使用 module.exports，这由 JS 的传值策略决定
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    // Flag the module as loaded
    // 标记模块为已加载
    module.l = true

    // Return the exports of the module
    // 返回模块的exports
    return module.exports
  }

  // expose the modules object (__webpack_modules__)
  // 暴露 modules 方法
  __webpack_require__.m = modules

  // expose the module cache
  // 暴露 modules 缓存
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
  // 加载入口模块
  return __webpack_require__(__webpack_require__.s = 0)
})
([
  /* 0 */
  (function (module, exports, __webpack_require__) {

    var other = __webpack_require__(1)
    console.log('index')
    other.f1()

  }),
  /* 1 */
  (function (module, exports) {

    exports.f1 = function () {
      console.log('f1')
    }

    exports.f2 = function () {
      console.log('f2')
    }

  })
])