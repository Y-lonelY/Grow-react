"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _dailyView = _interopRequireDefault(require("./view/dailyView"));

// 引入 koa
// daily view
// 声明一个 koa 实例
var app = new _koa["default"](); // 加载路由中间件

app.use(_dailyView["default"]); // 监听端口

app.listen(7177);