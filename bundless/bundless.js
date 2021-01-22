const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const app = new Koa();

function rewriteImport(content) {
  const ast = parse(content, { sourceType: 'module', });
  traverse(ast, {
    ImportDeclaration: (path) => {
      const source = path.node.source.value
      if (source[0] !== "/" && source[0] !== ".") {
        path.node.source.value = "/@modules/" + source;
      }
    },
  });
  const { code } = generate(ast, { /* options */ });
  return code
}

app.use(async (ctx) => {
  const { request: { url } } = ctx;

  if (url === '/') {
    let content = fs.readFileSync('./index.html', 'utf-8');
    ctx.type = 'text/html';
    ctx.body = content;
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(file);
  } else if (url.startsWith('/@modules/')) {
    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
    const packageJson = require(prefix + '/package.json')
    const module = packageJson.module || packageJson.main;
    const p = path.resolve(prefix, module);
    const file = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(file);
  } else if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    const content = `
      const css = '${file.replace(/\n/g, '')}'
      let style = document.createElement('style');
      document.head.appendChild(style);
      style.innerHTML = css;
      export default css;
    `;
    ctx.type = 'application/javascript';
    ctx.body = content;
  } else {
    ctx.body = 'body';
  }
});

app.listen(9000, () => {
  console.log(`服务已经启动, 请访问 http://localhost:9000`)
});
