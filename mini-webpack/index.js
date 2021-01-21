const fs = require("fs")
const path = require("path")
const { parse } = require("@babel/parser")
const traverse = require("@babel/traverse").default
const fileToModule = function (_path) {
  const content = fs.readFileSync(_path).toString()
  return {
    id: _path,
    dependencies: getDependencies(_path),
    code: `function (require,exports){
         ${content}
    }`,
  }
}

function getDependencies(_path) {
  let dependencies = [];
  const content = fs.readFileSync(_path).toString()
  const ast = parse(content, { sourceType: "module" })
  traverse(ast, {
    enter: item => {
      if (item.node.type === "CallExpression" && item.node.callee.name === "require") {
        const dirname = path.dirname(_path);
        dependencies.push(path.join(dirname, item.node.arguments[0].value))
        console.log("dependencies", dependencies)
      }
    }
  })
  return dependencies
}

function createGraph(_path) {
  let module = fileToModule(_path);
  let queue = [module]
  for (let module of queue) {
    const dirname = path.dirname(module.id);
    module.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      const result = queue.every(item => {
        return item.id !== absolutePath
      })
      if (result) {
        const child = fileToModule(absolutePath)
        queue.push(child)
      } else {
        return false
      }
    })
  }
  let modules = {}
  queue.forEach(item => {
    modules[item.id] = item.code;
  })
  console.log("modules:", modules)
  return modules
}

function createBundle(modules) {
  let __modules = "";
  for (let attr in modules) {
    __modules += `"${attr}":${modules[attr]},`
  }
  const result = `(function(){
    const path = require("path")
    const modules = {${__modules}};
    const exec = function (moduleId) {
      const fn = modules[moduleId];
      let exports = {};
      const require = function (filename) {
        const dirname = path.dirname(moduleId);
        const absolutePath = path.join(dirname, filename);
        return exec(absolutePath);
      };
      fn(require, exports);
      return exports;
    };
    exec("./example/index.js");
  })()`;
  fs.writeFileSync("./bundle.js", result);
}

let modules = createGraph("./example/index.js")
createBundle(modules)
