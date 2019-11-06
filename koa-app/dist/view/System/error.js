"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _error = _interopRequireDefault(require("../../../config/error"));

var _errorController = require("../../service/System/errorController");

var _logger = require("../../components/logger");

var errorRouter = new _koaRouter["default"]();
/**
 * 捕获错误，插入数据库
 */

errorRouter.post('/catchErrors',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var scheme, results, params, addList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            scheme = _joi["default"].object({
              username: _joi["default"].string().required(),
              project: _joi["default"].string().required(),
              path: _joi["default"].string(),
              referrer: _joi["default"].string(),
              event: _joi["default"].string(),
              type: _joi["default"].string(),
              level: _joi["default"].number(),
              stack: _joi["default"].string(),
              message: _joi["default"].string(),
              origin: _joi["default"].string(),
              useragent: _joi["default"].string(),
              network: _joi["default"].string(),
              appversion: _joi["default"].string()
            });
            results = {
              success: false,
              message: '',
              data: {}
            };
            _context.prev = 2;
            _context.next = 5;
            return scheme.validateAsync(ctx.request.body);

          case 5:
            params = _context.sent;
            ctx.response.type = 'json';
            _context.prev = 7;
            _context.next = 10;
            return (0, _errorController.addErrorsRecord)(params);

          case 10:
            addList = _context.sent;
            results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
            ctx.body = results;
            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            results['message'] = _error["default"][1002];
            ctx.body = results;

          case 20:
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](2);
            console.log(_context.t1);
            results['message'] = _error["default"][1001];
            ctx.body = results;

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 22], [7, 15]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var router = new _koaRouter["default"]();
router.use('/service/system', errorRouter.routes(), errorRouter.allowedMethods());
var router_middle = router.routes();
var router_allow_methods = router.allowedMethods();
var errorCompose = (0, _koaCompose["default"])([_logger.logger, _logger.rrtime, router_middle, router_allow_methods]);
module.exports = errorCompose;