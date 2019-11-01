"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _error = _interopRequireDefault(require("../../../config/error"));

var ProgramController = _interopRequireWildcard(require("../../service/Exercise/programController"));

var _logger = require("../../components/logger");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 声明一个 router 实例
var programRouter = new _koaRouter["default"]();
programRouter.post('/program/overview',
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
            scheme = _joi["default"].object({
              start: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
              end: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
            });
            results = {
              success: false,
              message: '',
              data: {
                lang: {
                  list: [],
                  name: []
                },
                project: {
                  list: [],
                  name: []
                }
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return scheme.validateAsync(ctx.request.body);

          case 5:
            params = _context.sent;
            ctx.response.type = 'json';
            _context.prev = 7;
            _context.next = 10;
            return ProgramController.getProgramList(_objectSpread({}, params, {
              type: 'lang'
            }));

          case 10:
            results['data']['lang']['list'] = _context.sent;
            _context.next = 13;
            return ProgramController.getProgramName(_objectSpread({}, params, {
              type: 'lang'
            }));

          case 13:
            results['data']['lang']['name'] = _context.sent;
            _context.next = 16;
            return ProgramController.getProgramList(_objectSpread({}, params, {
              type: 'project'
            }));

          case 16:
            results['data']['project']['list'] = _context.sent;
            _context.next = 19;
            return ProgramController.getProgramName(_objectSpread({}, params, {
              type: 'project'
            }));

          case 19:
            results['data']['project']['name'] = _context.sent;
            results['success'] = true;
            ctx.body = results;
            _context.next = 29;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            results['message'] = _error["default"][1002];
            ctx.body = results;

          case 29:
            _context.next = 36;
            break;

          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](2);
            console.log(_context.t1);
            results['message'] = _error["default"][1001];
            ctx.body = results;

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 31], [7, 24]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
programRouter.get('/program/wakatime',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var results, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = {
              success: false,
              message: '',
              data: {}
            };
            ctx.response.type = 'json';
            _context2.prev = 2;
            _context2.next = 5;
            return ProgramController.setWakaTime();

          case 5:
            res = _context2.sent;
            results['success'] = res.label;
            results['message'] = res.msg;
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            results['message'] = _error["default"][1002];

          case 14:
            _context2.prev = 14;
            ctx.body = results;
            return _context2.finish(14);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10, 14, 17]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var router = new _koaRouter["default"]();
router.use('/service', programRouter.routes(), programRouter.allowedMethods());
var router_middle = router.routes();
var router_allow_methods = router.allowedMethods();
var programCompose = (0, _koaCompose["default"])([_logger.logger, _logger.rrtime, router_middle, router_allow_methods]);
module.exports = programCompose;