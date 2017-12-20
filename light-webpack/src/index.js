import other, {f2} from './other.js'

console.log('index')
other()
f2()

import(/* webpackChunkName: "foo" */ './foo').then(foo => {
  console.log(foo.fa())
})