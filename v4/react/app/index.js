/**
 * index.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// 我们是不是在 dev 环境 ？
if (module.hot) {
  // 当 App.js 更新了
  module.hot.accept('./App', function() {
    // require 进来更新的 App.js 重新render
    const NextApp = require('./App');
    ReactDOM.render(<NextApp />, rootEl);
  });
}