"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDailyLists = getDailyLists;
exports.getDailySum = getDailySum;

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
    var list, sql_leg, sql_belly, sql_chest, leg_list, belly_list, chest_list;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            list = [];
            sql_leg = "SELECT `leg-nums` AS leg, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            sql_belly = "SELECT `belly-nums` AS belly, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            sql_chest = "SELECT `chest-nums` AS chest, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            _context.next = 6;
            return _mysqlSequelize["default"].query({
              sql: sql_leg,
              queryType: "select"
            });

          case 6:
            leg_list = _context.sent;
            _context.next = 9;
            return _mysqlSequelize["default"].query({
              sql: sql_belly,
              queryType: "select"
            });

          case 9:
            belly_list = _context.sent;
            _context.next = 12;
            return _mysqlSequelize["default"].query({
              sql: sql_chest,
              queryType: "select"
            });

          case 12:
            chest_list = _context.sent;
            leg_list = leg_list.map(function (item) {
              return {
                type: 'leg',
                date: item.date,
                number: item.leg
              };
            });
            belly_list = belly_list.map(function (item) {
              return {
                type: 'belly',
                date: item.date,
                number: item.belly
              };
            });
            chest_list = chest_list.map(function (item) {
              return {
                type: 'chest',
                date: item.date,
                number: item.chest
              };
            });
            list = list.concat(leg_list, belly_list, chest_list);
            return _context.abrupt("return", list);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getDailyLists.apply(this, arguments);
}

function getDailySum() {
  return _getDailySum.apply(this, arguments);
}

function _getDailySum() {
  _getDailySum = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var sql;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest " + "FROM `gro-up`.`exc_daily` LIMIT 30";
            _context2.next = 3;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: "select"
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getDailySum.apply(this, arguments);
}