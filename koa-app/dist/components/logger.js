"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rrtime = exports.logger = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// 中间件栈
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


exports.logger = logger;

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
}();

exports.rrtime = rrtime;