/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import _ from 'lodash';
	import './style.css';
	import Icon from './icon.png';
	import Data from './data.xml';

	function component () {
	  var element = document.createElement('div');

	  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	  // https://doc.webpack-china.org/guides/asset-management/#-css
	  element.classList.add('hello');

	  // https://doc.webpack-china.org/guides/asset-management/#-
	  // 将图像添加到我们现有的 div。
	  var myIcon = new Image();
	  myIcon.src = Icon;
	  element.appendChild(myIcon);

	  console.log(Data);

	  // - |- /assets
	  // + |– /components
	  // + |  |– /my-component
	  // + |  |  |– index.jsx
	  // + |  |  |– index.css
	  // + |  |  |– icon.svg
	  // + |  |  |– img.png

	  // 这种配置方式会使你的代码更具备可移植性，因为现有的统一放置的方式会造成所有资源紧密耦合在一起。
	  // 假如你想在另一个项目中使用 /my-component，只需将其复制或移动到 /components 目录下

	  return element;
	}

	document.body.appendChild(component());

/***/ }
/******/ ]);