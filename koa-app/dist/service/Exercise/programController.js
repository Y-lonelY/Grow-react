"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProgramList = getProgramList;
exports.getProgramName = getProgramName;
exports.setWakaTime = setWakaTime;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../../components/mysqlSequelize"));

var _util = _interopRequireDefault(require("util"));

var _moment = _interopRequireDefault(require("moment"));

var exec = _util["default"].promisify(require('child_process').exec);
/**
 * 执行 python 脚本，更新 wakatime
 * 同步逻辑：从上次同步日期 + 1 < 昨天，则进行同步
 * 从上次同步日期 + 1 = 昨天，则返回相应信息
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */


function setWakaTime() {
  return _setWakaTime.apply(this, arguments);
}

function _setWakaTime() {
  _setWakaTime = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var res, params, cmd, _ref, stdout, stderr;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = {
              label: true,
              msg: '同步完成'
            };
            _context.prev = 1;
            _context.next = 4;
            return getDateRange();

          case 4:
            params = _context.sent;

            if (params && (0, _moment["default"])(params.end).isBefore(params.start)) {
              res.label = true;
              res.msg = '已同步';
            }

            cmd = "python3 scripts/wakatime/wakatime.py ".concat(params.start, " ").concat(params.end, " True");
            _context.next = 9;
            return exec(cmd);

          case 9:
            _ref = _context.sent;
            stdout = _ref.stdout;
            stderr = _ref.stderr;

            if (stderr !== '') {
              console.log("stderr: ".concat(stderr));
              res.label = false;
            }

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.label = false;

          case 19:
            _context.prev = 19;
            return _context.abrupt("return", res);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15, 19, 22]]);
  }));
  return _setWakaTime.apply(this, arguments);
}

function getDateRange() {
  return _getDateRange.apply(this, arguments);
}
/**
 * 获取时间段内类型列表
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 * @param {type} params 查询类型 project or languages
 */


function _getDateRange() {
  _getDateRange = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var list, values, params, index, item, sql, max_date;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = ['lang', 'project'];
            values = []; // end date

            params = {
              end: (0, _moment["default"])().subtract(1, 'days').format('YYYY-MM-DD')
            };
            index = 0;

          case 4:
            if (!(index < list.length)) {
              _context2.next = 24;
              break;
            }

            item = list[index];
            sql = "SELECT MAX(date) AS date FROM waka_".concat(item);
            _context2.prev = 7;
            _context2.next = 10;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: 'select'
            });

          case 10:
            max_date = _context2.sent;

            if (!(Array.isArray(max_date) && max_date.length > 0)) {
              _context2.next = 16;
              break;
            }

            values.push((0, _moment["default"])(max_date[0]['date'])); // 拿到所有数据之后进行处理

            if (!(index === list.length - 1)) {
              _context2.next = 16;
              break;
            }

            params['start'] = _moment["default"].max(values).add(1, 'days').format('YYYY-MM-DD');
            return _context2.abrupt("return", params);

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](7);
            console.log(_context2.t0);

          case 21:
            index++;
            _context2.next = 4;
            break;

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 18]]);
  }));
  return _getDateRange.apply(this, arguments);
}

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
  _regenerator["default"].mark(function _callee3(params) {
    var list, sql, nameList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            list = [];
            sql = "SELECT DISTINCT `name` FROM `gro-up`." + "".concat(params.type === 'project' ? 'waka_project' : 'waka_lang') + " WHERE date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'") + " ORDER BY name";
            _context3.prev = 2;
            _context3.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: 'select'
            });

          case 5:
            nameList = _context3.sent;
            list = nameList;
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);

          case 12:
            return _context3.abrupt("return", list);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));
  return _getProgramName.apply(this, arguments);
}

function getProgramList(_x2) {
  return _getProgramList.apply(this, arguments);
}

function _getProgramList() {
  _getProgramList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(params) {
    var list, sql, recordList;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            list = [];
            sql = "SELECT id, date, `name`, total_seconds AS value" + " FROM `gro-up`.".concat(params.type === 'project' ? 'waka_project' : 'waka_lang') + " WHERE" + " date BETWEEN '".concat(params.start, "' AND '").concat(params.end, "'") + " ORDER BY date";
            _context4.prev = 2;
            _context4.next = 5;
            return _mysqlSequelize["default"].query({
              sql: sql,
              queryType: 'select'
            });

          case 5:
            recordList = _context4.sent;
            list = recordList;
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0);

          case 12:
            return _context4.abrupt("return", list);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return _getProgramList.apply(this, arguments);
}