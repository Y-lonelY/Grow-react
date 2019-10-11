"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var daliyController = _interopRequireWildcard(require("../service/daliyController"));

var _logger = require("../components/logger");

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
} // 声明一个 router 实例


var exerciseRouter = new _koaRouter["default"]();
/**
 * exercise/list
 * 用来查询锻炼记录
 * body-parser 将 params 挂载至 ctx.request.body
 */

exerciseRouter.post('/exercise/list',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var results, params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            results = {
              success: false,
              list: [],
              sum: []
            };
            params = ctx.request.body;
            ctx.response.type = 'json';
            _context.prev = 3;
            _context.next = 6;
            return daliyController.getDailyLists(params);

          case 6:
            results['list'] = _context.sent;
            _context.next = 9;
            return daliyController.getDailySum(params);

          case 9:
            results['sum'] = _context.sent;
            results['success'] = true;
            ctx.body = results; // catch await error

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            ctx.body = results;
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * exercise/add
 * 添加记录
 */

exerciseRouter.post('/exercise/add',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var params, results, addList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = ctx.request.body;
            results = {
              success: false
            };
            ctx.response.type = 'json';
            _context2.prev = 3;
            _context2.next = 6;
            return daliyController.addExerciseList(params);

          case 6:
            addList = _context2.sent;
            results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
            ctx.body = results;
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            throw _context2.t0;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()); // 装载所有路由

var router = new _koaRouter["default"]();
router.use('/service', exerciseRouter.routes(), exerciseRouter.allowedMethods()); // 生成路由中间件

var router_middle = router.routes();
var router_allow_methods = router.allowedMethods(); // 合并中间件

var exerciseCompose = (0, _koaCompose["default"])([_logger.logger, _logger.rrtime, router_middle, router_allow_methods]);
module.exports = exerciseCompose;