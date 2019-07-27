"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDailyLists = getDailyLists;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../components/mysqlSequelize"));

// 引入 mysql
function getDailyLists() {
  return _getDailyLists.apply(this, arguments);
}

function _getDailyLists() {
  _getDailyLists = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var sql;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT * FROM `gro-up`.`exc_daily`";
            _context.next = 3;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: "select"
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getDailyLists.apply(this, arguments);
}