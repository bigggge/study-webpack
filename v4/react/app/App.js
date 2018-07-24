/**
 * App.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'world',
      show: true
    };
  }

  render() {
    return <div>
      {this.state.show && <button>button</button>}
      <h1>Hello, {this.state.name}</h1>
    </div>;
  }
}

export default hot(module)(App);