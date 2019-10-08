"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDailySum = getDailySum;
exports.getDailyLists = getDailyLists;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../components/mysqlSequelize"));

// 引入 mysql
// sum(leg/belly/chest)
function getDailySum() {
  return _getDailySum.apply(this, arguments);
} // everyday lists of (leg/belly/chest)


function _getDailySum() {
  _getDailySum = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var sql, sumList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest " + "FROM `gro-up`.`exc_daily`";
            _context.next = 3;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: "select"
            });

          case 3:
            sumList = _context.sent;

            if (!(sumList.length > 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", sumList[0]);

          case 8:
            return _context.abrupt("return", {});

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getDailySum.apply(this, arguments);
}

function getDailyLists(_x) {
  return _getDailyLists.apply(this, arguments);
}

function _getDailyLists() {
  _getDailyLists = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(params) {
    var list, sql_daily_list, daily_list;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = [];
            sql_daily_list = "SELECT id, date, `leg-nums` AS leg, `belly-nums` AS belly, `chest-nums` AS chest" + " FROM `gro-up`.exc_daily" + " WHERE date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'") + " ORDER BY date DESC";
            _context2.next = 4;
            return _mysqlSequelize["default"].query({
              sql: sql_daily_list,
              queryType: "select"
            });

          case 4:
            daily_list = _context2.sent;
            list = daily_list;
            return _context2.abrupt("return", list);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getDailyLists.apply(this, arguments);
}