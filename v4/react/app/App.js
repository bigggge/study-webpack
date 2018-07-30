/**
 * App.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

import React from 'react';
import { hot } from 'react-hot-loader';
import base from './base.css';
import custom from './custom.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'world!',
      show: true
    };

    setTimeout(() => {
      this.setState({ name: 'peter!' });
    }, 3000);
  }

  render() {
    return <div className={custom.main}>
      {this.state.show && <button onClick={() => this.setState({ name: '123' })}>button</button>}
      <h1 className={base.title}>Hello, {this.state.name}</h1>
      <h1 className={custom.title}>Hello, {this.state.name}</h1>
    </div>;
  }
}

// export default hot(module)(App);
export default hot(module)(App);