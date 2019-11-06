"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _exercise = _interopRequireDefault(require("./view/Exercise/exercise"));

var _program = _interopRequireDefault(require("./view/Exercise/program"));

var _error = _interopRequireDefault(require("./view/System/error"));

// 引入 koa
// exercise view
// system view
// 声明一个 koa 实例
var app = new _koa["default"](); // 加载路由中间件
// app.use(BodyParser())
// app.use(exerciseView)

app.use((0, _koaCompose["default"])([(0, _koaBodyparser["default"])(), _exercise["default"], _program["default"], _error["default"]])); // 监听端口 3000

app.listen(3000);