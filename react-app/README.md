This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Cluster

在 create 内尝试许久不能实现 @ 替代 scr/ 作为绝对路径，通过 github's issues 发现作者关闭了该问题，发现可以通过 `view/` 来直接访问 `src/view/` 的内容

`import` 和 `export` 用来取代 `require` 和 `module.exports`

发现一个奇怪的问题，import 进来的配置文件，在 class 外调值为 undefined，在 class 内调用能够正常拿到值，如果将 import 方式转换为 require 方式获取值，则两个地方都可以拿到值，基于此，进行了一些研究

一个可能的原因是，在引入的文件内，有 `import` 其他模块，最终重新 import 该模块，从而陷入死循环，由于 import 的是值的引用，从而在值真正被调用时才会去从引用中取值，而该模块 export 的是一个类，所以在该类中使用 config 内容没问题，在其外使用则会为 undefined 

### ES6 Module

ES6 Module 用来解决模块化的问题，即将一个大文件拆分成互相依赖的小文件，再将其进行拼接

ES6 之前的 `require` 方法和 ES6 的 `module` 简单比较
- `require` 是**运行时加载**，获取的是值的拷贝，这意味着一旦 require 成功，模块更改也不会影响已经 require 的模块
- `module` 是**编译时加载**（或者说静态加载），ES6 可以在编译时就完成模块的加载，效率更高，获取的是文件


`export` 基础
- 注意 `export` 命令规定是一个接口（简单理解为变量），不可以是一个常量，或者常量的引用
- `export` 的本质是在接口名和内部变量之间建立一一对应关系
- `export` 命令需要置于文件顶层，可以是任意位置
- `export default` 用于指定默认接口，在引入时会指向该接口，此时不使用大括号，其本质是将接口赋值给 default 变量

```javascript
var firstName = 'Michael';
function v1 {...}
function v2 {...}

export { firstName, v1, v2 as func2};
```

`import` 基础
- import 输出的接口是只读的，如果输出对象则可以更改，但是最好不要这么做，会影响其他引入该模块的文件
- import 命令会自动提升到文件顶部，优先执行，本质是 import 命令会在编译阶段就执行，优先于调用，因此 import 命令不支持通过表达式或者变量，因为编译优先
- import 规范，对引入文件使用单引号进行包裹

```javascript
import * as a from './a';
import {b,c as func} from './b'; 
```


## file structure

### structure

`assets` 存放静态资源，图片，测试文件等
`cluster` 模块化函数方法，工具函数方法，命名区别于 `../scripts`
`components` 存放自定义组件
`style` 存放项目中用到的样式
	- `variable.scss` 基础变量
`view` 存放业务相关的文件

### import packages

moment.js

`npm install moment --save`




## Bizcharts

通过 `npm install bizcharts --save` 安装[Bizcharts](https://bizcharts.net/products/bizCharts/docs/start)

### 图表类型

[数据可视化之图表类型](https://bizcharts.net/products/bizCharts/docs/chartType)

数据可视化的核心在于**可视化编码**，而可视化编码由几何标记和视觉通道组成，图表类型一般指的就是几何标记

几何标记可以根据数据维度来划分

图形空间的自由度指在不改变图形性质的基础上可以自由扩展的维度，自由度 = 空间维度 - 几何标记的维度



## webpack

[webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) 用来为路径设置别名，从而在 `import` 或者 `require` 时更加轻松



















## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
