<!-- MarkdownTOC levels="2,3" -->

- [front](#front)
- [Usage](#usage)
- [Nginx](#nginx)
	- [Config](#config)
	- [Command](#command)
- [Develop Flows](#develop-flows)
	- [2019-08-27](#2019-08-27)
	- [2019-08-26](#2019-08-26)
	- [2019-08-22](#2019-08-22)
	- [2019-08-21](#2019-08-21)
	- [2019-08-20](#2019-08-20)
	- [2019-08-19](#2019-08-19)
	- [2019-08-13](#2019-08-13)
	- [2019-08-12](#2019-08-12)
	- [2019-08-11](#2019-08-11)
	- [2019-08-08](#2019-08-08)
	- [2019-08-07](#2019-08-07)
	- [2019-08-06](#2019-08-06)
	- [2019-08-05](#2019-08-05)
	- [2019-08-04](#2019-08-04)
	- [2019-08-03](#2019-08-03)
	- [2019-08-02](#2019-08-02)

<!-- /MarkdownTOC -->


> YlonelY-GrowingUp is The Project To Record The Growth

## front

这个项目用来记录 Grow，采用前后端分离的方式进行开发，因为流程的增加可以获得更多的知识累积


## Usage

**basic Usage**

1. 在 terminal 内 `cd ~` 进入根目录
2. `nginx` 启动 nginx service
3. `cd /Users/yango/YlonelY-GrowingUp/koa-app` 进入 node 根目录
4. `npm run start` 开启 node 服务
5. `cd /Users/yango/YlonelY-GrowingUp/react-app` 进入 react 根目录
6. 修改 `src/sysConfig.js` 文件内，不使用虚拟数据
7. 执行 `npm run build` 编译文件

**shell usage**

1. 在项目根目录下，`./start.sh` 启动 shell script
2. list 展示当前占有 3000(node service) 和 7177(nginx) 端口的进程
3. start 启动 nginx 和 node service
4. stop 终止 nginx，同时输入 node 的 pid 来终止 node service
5. 也可以直接 `ctrl-c` 来终止 node service，然后重新执行脚本，选择 start，因为每次 start 之前都会先尝试终止 nginx 服务


## Nginx

`brew update` 查看 brew 安装是否成功<br>
`brew search nginx` 查看 nginx 信息<br>
`brew install nginx` 安装 nginx<br>

==== 安装成功之后 ====

在 `/usr/local/var/www` 查看主页内容<br>
在 `/usr/local/etc/nginx/nginx.conf` 修改配置文件<br>

### Config

在本项目内，koa 在3000端口上运行，react-app 在 7177端口上运行，需要：

1. 将react工程内的 build/index.html 代理到 127.0.0.1:7177/ 路径下
2. 将koa启动之后，即后台服务启动之后，将其代理到 127.0.0.1:7177/service 路径下

具体配置如下：

```
server {
    listen       7177;
    server_name  127.0.0.1;
    location / {
            root   /Users/yango/YlonelY-GrowingUp/react-app/build/;
            index  index.html index.htm;
        }

	location /service {
	    proxy_pass http://localhost:3000/service;
	}
}
``` 

### Command

`nginx` 启动 nginx 服务<br>
`nginx -s stop` 停止 nginx 服务<br>
`nginx -s reload` 重启 nginx 服务


## Develop Flows

截止到 2019-10-12，进行了一次比较集中的开发，在 exercise flow 方面功能逐渐完善，同时萌生出一些比较新颖的想法，为此做记录

展望了以下，做了几个 growup 的映射：

- localtion -> growup 以地点为维度，记录自己在不同地方的不同经历，出生，求学，工作，朋友，在每个地方的记录
- work -> growup 以工作经历（公司）为维度，记录在公司的经历，项目情况
- project -> growup 以项目（通常为自主项目）为维度，记录项目每天的进度和完成情况，每一个迭代点的总结等
- exercise -> growup 将能力提升量化，主要是锻炼和code情况，code 情况通过 wakatime 获取

已经做的工作

1. 图表切换
2. 数据筛选，归一化，添加功能开发
3. header 设计和开发

待完成工作

1. 页面性能监控
2. 新模块思维导图的设计和样式规划（mapflow）
3. exercise 奖励信息展示，新增，修改
4. exercise list 信息的删除和修改

至2019-09-30，工作期间进行了为期一个月的swift开发，所以当前项目停滞了一段时间，但是期间内项目内技术有一定的突破性进展，表现在typescript和redux的集成，业务方面几乎停滞

已经做的工作

1. redux 集成
2. typescript 集成
3. mockData 放弃，直接利用 json 文件进行

待完成工作

1. header 设计
2. 待办事宜实现
3. 表格数据归一化和实现筛选实现
4. log 日志集成
5. 页面性能监控

至2019-08-02，前后端+Nginx转发的基本框架已经搭建完成，开始进入实质性开发工作，之后以2周为单位进行总结

已经做的工作

1. react 框架，路由，请求接口封装
2. koa-node 框架，路由，数据库连接封装
3. Nginx配置
4. shell script 开发

待完成工作

1. redux 集成
2. typescript 集成
3. think flow 搭建
4. log 日志集成
5. mock data 集成，目前直接引入 json 文件作为假数据


### 2019-10-17

koa 项目内引入 joi，用来校验 request 数据，修改 exercise/list && exercise/add 接口

koa 添加错误信息map

修改 react 内添加锻炼记录的数据格式校验




### 2019-10-15

学习 react hook，将其列入开发计划中

预备学习 context，将其列入开发计划中，比如国际化/换肤

添加 flowfooter 组件，用于展示底部

添加是否使用虚拟数据开关，通过 sessionStorage 来进行控制

koa 添加获取 goallist 的方法

koa 准备接入 [joi](https://github.com/hapijs/joi/tree/v8.0.5) 用于必要的参数验证

### 2019-10-12

添加归一化处理

### 2019-10-11

koa 修改接口名称

koa 添加 addList 接口

添加归一化按钮

### 2019-10-10

添加 exercise add form

### 2019-10-09

在引入代码块时，忽略 ts 类型检测

```js
// @ts-ignore
import { setTheme } from 'bizcharts';
```

配置 bizcharts 主题配色，保持饼图和其他图配色一致

bizcharts 无数据时展示“暂无数据”提示

### 2019-10-08

修改 koa daily 接口，支持 日期范围筛选

koa 添加 post 方法，添加 body-parser，从 body 内获取 post 查询数据

完善 rangeDatePicker 组件

模版字符串内有 ` ，使用 `\`` 来对其进行转义

### 2019-10-07

ChartBar 添加时间范围选择插件

```js
// typescript 结合 moment.js
import moment from 'moment';

// 一个 moment 对象的数组
interface ChartBarProps {
    defaultDateRange?: moment.Moment[]
}
```

### 2019-10-06

修改 service/daily 数据格式，兼容表格和图

添加切换表格/图功能

以 TypeScript 方式引入 antd Table

修改页面样式使其能够避免模块抖动

### 2019-10-05

引入 antd Table

进一步封装 ChartBar，添加切换按钮和事件

封装 Chart 组件，添加 Pie 饼图组件

### 2019-10-04

封装折线图组件

修改模块名称 DashBoard -> Exercise，在定义模块名称时要想清楚架构，修改模块名是一件很麻烦的事情

梳理 redux && typescript 的实现思路

### 2019-10-02

react 内多个 className可以通过模板字符串来实现

✅封装header组件，实现spa跳转和link跳转

```js
className={`${item.class} ${item.label === this.state.currentItem ? 'active' : ''}`}
```

### 2019-08-27

调整 react-router ，使其合理组织

重新组织样式引入

对已完成的内容进行审阅，一些跟进点：

1. logo
2. nav menu
3. 关键地方的字体自适应
4. 锻炼情况的添加和范围选择


### 2019-08-26

TypeScript && redux 判断类型引入 enum 检查

重新梳理项目内 typescript 写法，新建 index.d.ts 用于全局类型检查

### 2019-08-22

解决 redux 和 TypeScript 兼容问题

关键在 `connect()` 组件方式时，将 `mapStateToProps` 提出来，作为一个命名函数传入，从而对参数进行检查

### 2019-08-21

兼容 TypeScript

引入 `@types/react-redux` && `@types/react-router-dom` 文件

配置 @ 作为 src 路径

### 2019-08-20

改写项目内文件为 tsx，解决产生的问题

### 2019-08-19

通过 `npm install --save typescript @types/node @types/react @types/react-dom @types/jest` 在已有项目内引入 TypeScript

重新入口命名文件，`.js/.jsx -> .tsx`，解决产生的问题

新建 `tsconfig.json`，并初始化相应配置

### 2019-08-13

对文档内容进行整理

学习 typescript

### 2019-08-12

解决之前遗留的 redux 问题

原因: export 的是一个函数，所以数据没有被装载在 `dashBoardData` 字段内<br>
解决: `export const dashBoardData = () => {return obj}` 形式来返回一个对象，通过 `combineReducers` 来封装对象，注意如果不用 `combineReducers`，而直接使用原始方法承接 reducer，则该 reducer 必须是一个函数

通过 `await data` 获取数据，如果 data 不是 Promise，则直接获取返回值，如果是一个 Promise，则获取其 `resolve(res)` 传递的 res

### 2019-08-11

尝试接入 redux

### 2019-08-08

规范文件命名和引入

合并入口文件 `index.js` 和 `app.js`，采用函数组件来创建 App Components

注意，根据官方建议，**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数**

在 `constructor()` 函数中不要调用 `setState()` 方法，直接使用 `this.state` 进行赋值

在 react 内的执行顺序，`constructor()` > `render()` > `componentDidMounted()`

如果在构造函数内需要使用 `props`，要使用 `super(props)`，否则 `this.props` 在构造函数内可能会出现为定义的bug

### 2019-08-07

引入 `react-hot-loader` 来实现局部热加载

开始尝试接入 redux

根据[Airbnb React/JSX 编码规范](https://github.com/JasonBoy/javascript/tree/master/react) 对项目进行规范化除了入口文件

react-pxq 项目学习
- asyncComponent 的理解
- class-static 学习
- [使用 PropTypes 进行类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html)

Class 通过 static 关键字来定义静态方法，通过类本身来调用，而不是通过类的实例，结合 prototypes 使用：

```javascript
import Test from 'prop-types';
class Test {
	static proptypes = {
		// 通过 isRequired 确保这个 props 没有被提供时，会打印警告信息
		testa: PropTypes.Object.isRequired,
	}
}

// 不利用 static 写法
Test.proptypes = {
	testa: PropTypes.Object.isRequired,
}
```

**根据官方文档，推荐使用 typescript 来执行静态类型检查，它们支持代码自动补全，同时可以在运行前识别某些类型的问题**

### 2019-08-06

继续学习 redux

[一个 redux 学习demo](https://github.com/bailicangdu/react-pxq)

### 2019-08-05

开始学习 redux
- [阮一峰:redux入门](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [官方中文文档](http://cn.redux.js.org/docs/advanced/Middleware.html)

新建 redux 学习 note

### 2019-08-04

在 window 下运行项目

`npm install @antv/data-set --save` 添加对数据集处理

[@antv/data-set](https://www.yuque.com/antv/g2-docs/api-data-set#1976bl) 类似之前做玩家级想要的，将数据转换成类似数据库表的形式进行处理的一种实现

添加饼图展示锻炼情况分布

### 2019-08-03

进一步封装 Axios，添加请求/响应拦截器和重复请求处理

添加.json假数据处理

添加总数统计

对象遍历不建议使用 `for...in...`，用 `Object.enteries()` 或者 `Object.keys()` 代替

### 2019-08-02

`await/async` 的异常捕获

之前是 `await a().then().catch()` 的写法，因为 await 实际返回就是一个 Promise Object，所以沿用了其写法<br>
之后发现，有更好的写法，就是通过 `try catch` 来进行，Promise 的 reject 异常通常能够被 catch 捕获到





