"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDailySum = getDailySum;
exports.getDailyLists = getDailyLists;
exports.addExerciseList = addExerciseList;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../components/mysqlSequelize"));

// 引入 mysql

/**
 * (leg/belly/chest) 数据总和
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
function getDailySum(_x) {
  return _getDailySum.apply(this, arguments);
}
/**
 * everyday lists of (leg/belly/chest)
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */


function _getDailySum() {
  _getDailySum = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var dailyObj, sql, sumList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dailyObj = {};
            sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest" + " FROM `gro-up`.`exc_daily`" + " WHERE date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'");
            _context.prev = 2;
            _context.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: "select"
            });

          case 5:
            sumList = _context.sent;

            if (sumList.length > 0) {
              dailyObj = sumList[0];
            }

            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 12:
            return _context.abrupt("return", dailyObj);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _getDailySum.apply(this, arguments);
}

function getDailyLists(_x2) {
  return _getDailyLists.apply(this, arguments);
}
/**
 * add exercise list
 * 对于类型为 date 的必须以 ‘’ 包裹
 * 返回值为一个数组 - (当前所有记录数，受影响的行数)
 */


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
            _context2.prev = 2;
            _context2.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql_daily_list,
              queryType: "select"
            });

          case 5:
            daily_list = _context2.sent;
            list = daily_list;
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 12:
            return _context2.abrupt("return", list);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));
  return _getDailyLists.apply(this, arguments);
}

function addExerciseList(_x3) {
  return _addExerciseList.apply(this, arguments);
}

function _addExerciseList() {
  _addExerciseList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(params) {
    var sql_add_list, add_list;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sql_add_list = "INSERT INTO exc_daily ( date, `leg-nums`, `belly-nums`, `chest-nums` )" + " VALUES  ( '".concat(params.date, "', '").concat(params.leg, "', '").concat(params.belly, "', '").concat(params.chest, "' )");
            _context3.prev = 1;
            _context3.next = 4;
            return _mysqlSequelize["default"].query({
              sql: sql_add_list,
              queryType: 'insert'
            });

          case 4:
            add_list = _context3.sent;
            return _context3.abrupt("return", add_list);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _addExerciseList.apply(this, arguments);
}