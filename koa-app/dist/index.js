"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _dailyView = _interopRequireDefault(require("./view/dailyView"));

// 引入 koa
// daily view
// 声明一个 koa 实例
var app = new _koa["default"](); // 加载路由中间件

app.use((0, _koaBodyparser["default"])());
app.use(_dailyView["default"]); // app.use(Compose([BodyParser(), dailyView]));
// 监听端口 3000

app.listen(3000);