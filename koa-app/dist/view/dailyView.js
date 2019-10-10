"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var daliyController = _interopRequireWildcard(require("../service/daliyController"));

// 引入 koa-router
// 引入 koa-compose
// data handle
function dataHandle(data, ctx) {
  var results = {};

  if (data && data !== null) {
    results['results'] = data;
    results['success'] = true;
  } else {
    results['results'] = null;
    results['success'] = false;
  }

  ctx.response.type = 'json';
  ctx.body = results;
} // 中间件栈
// 打印接口返回时间


var logger =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx, next) {
    var rt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return next();

          case 2:
            rt = ctx.response.get('x-response-time');
            console.log("".concat(ctx.method, " ").concat(ctx.url, " = ").concat(rt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logger(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // 计算接口返回所用时间


var rrtime =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx, next) {
    var start, ms;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 当前时间的时间戳
            start = Date.now();
            _context2.next = 3;
            return next();

          case 3:
            ms = Date.now() - start; // 设置 x-response-time

            ctx.set('x-response-time', "".concat(ms, "ms"));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function rrtime(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // 声明一个 router 实例


var daily = new _koaRouter["default"]();
daily.post('/daily',
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    var results, params;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            results = {
              success: false,
              list: [],
              sum: []
            };
            params = ctx.request.body;
            ctx.response.type = 'json';
            _context3.prev = 3;
            _context3.next = 6;
            return daliyController.getDailyLists(params);

          case 6:
            results['list'] = _context3.sent;
            _context3.next = 9;
            return daliyController.getDailySum(params);

          case 9:
            results['sum'] = _context3.sent;
            results['success'] = true;
            ctx.body = results; // catch await error

            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            ctx.body = results;

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 14]]);
  }));

  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}()); // 装载所有路由

var router = new _koaRouter["default"]();
router.use('/service', daily.routes(), daily.allowedMethods()); // 生成路由中间件

var router_middle = router.routes();
var router_allow_methods = router.allowedMethods(); // 合并中间件

var dailyCompose = (0, _koaCompose["default"])([logger, rrtime, router_middle, router_allow_methods]);
module.exports = dailyCompose;