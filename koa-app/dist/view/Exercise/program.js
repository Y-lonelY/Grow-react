"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _error = _interopRequireDefault(require("../../../config/error"));

var ProgramController = _interopRequireWildcard(require("../../service/Exercise/programController"));

var _logger = require("../../components/logger");

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
              end: _joi["default"].string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
              type: _joi["default"].string().required(),
              name: _joi["default"].string().required()
            });
            results = {
              success: false,
              message: '',
              list: [],
              nameList: []
            };
            _context.prev = 2;
            _context.next = 5;
            return scheme.validateAsync(ctx.request.body);

          case 5:
            params = _context.sent;
            ctx.response.type = 'json';
            _context.prev = 7;
            _context.next = 10;
            return ProgramController.getProgramList(params);

          case 10:
            results['list'] = _context.sent;
            _context.next = 13;
            return ProgramController.getProgramName(params);

          case 13:
            results['nameList'] = _context.sent;
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
var router = new _koaRouter["default"]();
router.use('/service', programRouter.routes(), programRouter.allowedMethods());
var router_middle = router.routes();
var router_allow_methods = router.allowedMethods();
var programCompose = (0, _koaCompose["default"])([_logger.logger, _logger.rrtime, router_middle, router_allow_methods]);
module.exports = programCompose;