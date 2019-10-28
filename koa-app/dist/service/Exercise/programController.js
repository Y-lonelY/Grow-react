"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProgramList = getProgramList;
exports.getProgramName = getProgramName;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../../components/mysqlSequelize"));

/**
 * 获取时间段内类型列表
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 * @param {type} params 查询类型 project or languages
 */
function getProgramName(_x) {
  return _getProgramName.apply(this, arguments);
}
/**
 * 获取时间段内编程记录
 * @params {start} params 开始时间
 * @params {end} params 结束时间
 * @params {type} params 查询类型
 */


function _getProgramName() {
  _getProgramName = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var list, sql, nameList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            list = [];
            sql = "SELECT DISTINCT `name` FROM `gro-up`." + "".concat(params.type === 'project' ? 'waka_project' : 'waka_lang') + " WHERE date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'") + " ORDER BY name";
            _context.prev = 2;
            _context.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: 'select'
            });

          case 5:
            nameList = _context.sent;
            list = nameList;
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
  return _getProgramName.apply(this, arguments);
}

function getProgramList(_x2) {
  return _getProgramList.apply(this, arguments);
}

function _getProgramList() {
  _getProgramList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(params) {
    var list, sql, recordList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = [];
            sql = "SELECT id, date, `name`, total_seconds AS value" + " FROM `gro-up`.".concat(params.type === 'project' ? 'waka_project' : 'waka_lang') + " WHERE" + " date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'") + " ORDER BY date";
            _context2.prev = 2;
            _context2.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: 'select'
            });

          case 5:
            recordList = _context2.sent;
            list = recordList;
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
  return _getProgramList.apply(this, arguments);
}