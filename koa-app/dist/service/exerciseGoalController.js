"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoalList = getGoalList;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../components/mysqlSequelize"));

var _moment = _interopRequireDefault(require("moment"));

/**
 * 获取 goal 列表
 */
function getGoalList() {
  return _getGoalList.apply(this, arguments);
}

function _getGoalList() {
  _getGoalList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var list, sql_goal_list, goal_list;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            list = [];
            sql_goal_list = "SELECT id, start_date, end_date, reward, type, total_price, goal, summary, remark" + " FROM exc_goal WHERE `status` > 0 ORDER BY start_date DESC";
            _context.prev = 2;
            _context.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql_goal_list,
              queryType: "select"
            });

          case 5:
            goal_list = _context.sent;
            list = goal_list.map(function (item) {
              // 处理 DATETIME 类型数据
              if (item.start_date !== null) {
                item.start_date = _moment["default"].utc(item.start_date).format('YYYY-MM-DD HH:mm:ss');
              }

              if (item.end_date !== null) {
                item.end_date = _moment["default"].utc(item.end_date).format('YYYY-MM-DD HH:mm:ss');
              }

              return item;
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 12:
            return _context.abrupt("return", list);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _getGoalList.apply(this, arguments);
}