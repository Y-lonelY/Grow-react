"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var daliyController = _interopRequireWildcard(require("../../service/Exercise/exerciseDaliyController"));

var goalController = _interopRequireWildcard(require("../../service/Exercise/exerciseGoalController"));

var _error = _interopRequireDefault(require("../../../config/error"));

var _logger = require("../../components/logger");

// 引入 koa-router
// 引入 koa-compose
// 引入 joi，用来校验数据
// 声明一个 router 实例
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
    var scheme, results, params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * 参数校验规则
             * start "2019-10-17"
             * end "2019-10-17"
             */
            scheme = _joi["default"].object({
              start: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
              end: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
            });
            results = {
              success: false,
              message: '',
              list: [],
              sum: []
            };
            _context.prev = 2;
            _context.next = 5;
            return scheme.validateAsync(ctx.request.body);

          case 5:
            params = _context.sent;
            ctx.response.type = 'json';
            _context.prev = 7;
            _context.next = 10;
            return daliyController.getDailyLists(params);

          case 10:
            results['list'] = _context.sent;
            _context.next = 13;
            return daliyController.getDailySum(params);

          case 13:
            results['sum'] = _context.sent;
            results['success'] = true;
            ctx.body = results;
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            results['message'] = _error["default"][1002];
            ctx.body = results;

          case 23:
            _context.next = 30;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](2);
            console.log(_context.t1);
            results['message'] = _error["default"][1001];
            ctx.body = results;

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 25], [7, 18]]);
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
    var scheme, results, params, addList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 参数校验规则
            scheme = _joi["default"].object({
              date: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
              leg: _joi["default"].number().min(0).required(),
              belly: _joi["default"].number().min(0).required(),
              chest: _joi["default"].number().min(0).required()
            });
            results = {
              success: false,
              message: ''
            };
            _context2.prev = 2;
            _context2.next = 5;
            return scheme.validateAsync(ctx.request.body);

          case 5:
            params = _context2.sent;
            ctx.response.type = 'json';
            _context2.prev = 7;
            _context2.next = 10;
            return daliyController.addExerciseList(params);

          case 10:
            addList = _context2.sent;
            results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
            ctx.body = results;
            _context2.next = 20;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](7);
            console.log(_context2.t0);
            results['message'] = _error["default"][1002];
            ctx.body = results;

          case 20:
            _context2.next = 27;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t1 = _context2["catch"](2);
            console.log(_context2.t1);
            results['message'] = _error["default"][1001];
            ctx.body = results;

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 22], [7, 15]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * exercise/goal/list
 * 获取目标列表
 */

exerciseRouter.get('/exercise/goal/list',
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    var results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            results = {
              success: false
            };
            ctx.response.type = 'json';
            _context3.prev = 2;
            _context3.next = 5;
            return goalController.getGoalList();

          case 5:
            results['list'] = _context3.sent;
            results['success'] = true;
            ctx.response.body = results;
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            ctx.response.body = results;
            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()); // 装载所有路由

var router = new _koaRouter["default"]();
router.use('/service', exerciseRouter.routes(), exerciseRouter.allowedMethods()); // 生成路由中间件

var router_middle = router.routes();
var router_allow_methods = router.allowedMethods(); // 合并中间件

var exerciseCompose = (0, _koaCompose["default"])([_logger.logger, _logger.rrtime, router_middle, router_allow_methods]);
module.exports = exerciseCompose;