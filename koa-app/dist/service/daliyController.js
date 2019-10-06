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
    var sql;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest " + "FROM `gro-up`.`exc_daily` LIMIT 30";
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
  return _getDailySum.apply(this, arguments);
}

function getDailyLists() {
  return _getDailyLists.apply(this, arguments);
}

function _getDailyLists() {
  _getDailyLists = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var list, sql_leg, sql_belly, sql_chest, sql_daily_list, daily_list;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = [];
            sql_leg = "SELECT `leg-nums` AS leg, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            sql_belly = "SELECT `belly-nums` AS belly, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            sql_chest = "SELECT `chest-nums` AS chest, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
            sql_daily_list = "SELECT id, date, `leg-nums` AS leg, `belly-nums` AS belly, `chest-nums` AS chest FROM " + "`gro-up`.exc_daily ORDER BY date DESC LIMIT 30"; // let leg_list = await sequelizeCase.query({ sql: sql_leg, queryType: "select" });
            // let belly_list = await sequelizeCase.query({ sql: sql_belly, queryType: "select" });
            // let chest_list = await sequelizeCase.query({ sql: sql_chest, queryType: "select" });

            _context2.next = 7;
            return _mysqlSequelize["default"].query({
              sql: sql_daily_list,
              queryType: "select"
            });

          case 7:
            daily_list = _context2.sent;
            // map() create a new array
            // leg_list = leg_list.map(item => {
            //     return {
            //         type: 'leg',
            //         date: item.date,
            //         number: item.leg
            //     }
            // })
            // belly_list = belly_list.map(item => {
            //     return {
            //         type: 'belly',
            //         date: item.date,
            //         number: item.belly
            //     }
            // })
            // chest_list = chest_list.map(item => {
            //     return {
            //         type: 'chest',
            //         date: item.date,
            //         number: item.chest
            //     }
            // })
            list = daily_list;
            return _context2.abrupt("return", list);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getDailyLists.apply(this, arguments);
}