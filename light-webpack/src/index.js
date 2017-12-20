var other = require('./other.js')
console.log('index')
other.f1()

import(/* webpackChunkName: "foo" */ './foo').then(bar => {
  console.log(foo())
})
