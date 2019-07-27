<!-- MarkdownTOC -->

- [Resource](#resource)
- [Koa environment install](#koa-environment-install)
- [Koa Basic Apis](#koa-basic-apis)
	- [Cluster](#cluster)
	- [app.context](#appcontext)
	- [ctx.response](#ctxresponse)
	- [koa route](#koa-route)
	- [error handle](#error-handle)
- [middleware](#middleware)
	- [basic](#basic)

<!-- /MarkdownTOC -->

## Resource

koa 是一个 Web 框架，相比 express 框架，其通过利用 async 函数，能够有效解决 “回调地狱” 问题

[官方链接](https://koa.bootcss.com/#application)


## Koa environment install

依赖 **node v7.6.0**，且对 async 函数方法支持，对于兼容问题可以通过 Babel 来实现 async 方法

`npm i koa` 安装 koa 框架

`npm init` 用来初始化项目，生成 package.json 文件


## Koa Basic Apis

### Cluster

1. `app.use(function)` 用来将中间件方法添加到应用程序

2. `next` 是中间件流程关键标志变量，`yeild next` 表示执行下一个中间件

3. koa 最大的特色，就是中间件的设计

### app.context

Koa 提供一个 context 对象，用来装载请求的上下文，包括http请求和http回复，即 ctx.request, ctx.response

`app.context` 为 ctx 创建的原形，可以通过编辑 `app.context` 来为 ctx 添加其他属性

### ctx.response

Koa 默认返回类型是 `text/plain`

1. 返回之前通过 `ctx.request.accepts` 判断客户端接受类型
2. 然后通过 `ctx.response.type` 来指定返回类型
3. 可选的 type 有：xml, json, html, text

### koa route

如果原生的 node，可以通过判断 `ctx.path` 来控制路由，进行不同的处理，但是，koa提供了一个更好的方式：通过 koa 封装的路由中间件来实现路由

通过 `const Router = require('koa-router')` 来引入koa路由中间件，其方法包括：get, post, del, put, all

`all()` 表示适用所有的动词方法

通过 `'/details/:id'` 这样的通配规则来匹配 get 请求， `ctx.params` 来获取路由参数

通过 `app.params()` 方法可以讲参数的处理给抽象出来，起到一定的安全防范作用

### error handle

Koa 提供 `ctx.throw()` 或者 `ctx.response.status = 400` 用来抛出错误


## middleware

> koa app 是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的

### basic

中间件可以简单看作是一个函数对象，被用在两个执行步骤之间，达到某种中间功能

中间件默认接受两个参数：Context对象，next函数，只要调用 `next()` 就表示将执行权**暂时**传递给下一个middleware

中间件更多的使用方式是**级连**，即中间件栈，当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为，类似**先进后出**的处理机制

1. 最外层中间件首先执行
2. 调用 next 函数，将执行权暂时交给下一个中间件
3. ...
4. 最内层的中间件开始执行，其下游没有更多的中间件
5. 执行结束后，将执行权交回给上一层中间件
6. ...
7. 最外层的中间件回收到执行权之后，执行 next 之后的方法







