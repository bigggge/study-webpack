/**
 * test.js
 *
 * @author bigggge
 * 2017/12/20.
 */

function change (exports) {
  exports = 2
  console.log('change', exports)
}

var e = {
  exports: {}
}

var x = {}
change(e.exports)
change(x)

console.log(e)
console.log(x)