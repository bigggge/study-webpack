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