/*
   webpack 对基于 import() 动态导入进行代码分离的实现，分离代码为 0.0.bundle.js
   */
(function (modules) { // webpackBootstrap
                      // install a JSONP callback for chunk loading
  var parentJsonpFunction = window['webpackJsonp']
  window['webpackJsonp'] = function webpackJsonpCallback (chunkIds, moreModules, executeModules) {
    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [], result
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i]
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0])
      }
      installedChunks[chunkId] = 0
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId]
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules)
    while (resolves.length) {
      resolves.shift()()
    }

  }

  // The module cache
  var installedModules = {}

  // objects to store loaded and loading chunks
  var installedChunks = {
    1: 0
  }

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

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // 对于 code splitting 的支持，webpack 使用 __webpack_require__.e 实现基于 promise 的动态加载
  __webpack_require__.e = function requireEnsure (chunkId) {
    var installedChunkData = installedChunks[chunkId]
    // 当请求同一脚本文件时，由于对应的 module 已经被加载，因而直接返回一个成功的 promise 即可
    if (installedChunkData === 0) {
      return new Promise(function (resolve) { resolve() })
    }

    // a Promise means "currently loading".
    // 取缓存的 promise
    if (installedChunkData) {
      return installedChunkData[2]
    }

    // setup Promise in chunk cache
    var promise = new Promise(function (resolve, reject) {
      installedChunkData = installedChunks[chunkId] = [resolve, reject]
    })
    // 将数组的第三项赋值为这个 promise,用于缓存 promise
    installedChunkData[2] = promise

    // start chunk loading
    // 创建一个 script 标签动态加载脚本
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.timeout = 120000

    if (__webpack_require__.nc) {
      script.setAttribute('nonce', __webpack_require__.nc)
    }
    script.src = __webpack_require__.p + '' + chunkId + '.' + chunkId + '.bundle.js'
    var timeout = setTimeout(onScriptComplete, 120000)
    script.onerror = script.onload = onScriptComplete

    function onScriptComplete () {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null
      clearTimeout(timeout)
      var chunk = installedChunks[chunkId]
      // 由 webpackJsonpCallback 方法得知脚本文件下载成功后，installedChunks[chunkId] = 0
      // 脚本下载失败的情况
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'))
        }
        installedChunks[chunkId] = undefined
      }
    }

    head.appendChild(script)

    return promise
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

  // on error function for async loading
  __webpack_require__.oe = function (err) {
    console.error(err)
    throw err
  }

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

    __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 2)).then(foo => {
      console.log(foo.fa())
    })

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