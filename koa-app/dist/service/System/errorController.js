"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addErrorsRecord = addErrorsRecord;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysqlSequelize = _interopRequireDefault(require("../../components/mysqlSequelize"));

/**
 * 插入错误记录
 */
function addErrorsRecord(_x) {
  return _addErrorsRecord.apply(this, arguments);
}

function _addErrorsRecord() {
  _addErrorsRecord = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var add_sql, add_record;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            add_sql = "INSERT INTO `gro-up`.`gu_errors` " + "( `username`, `project`, `path`, " + "`referrer`, `event`, `type`, `level`, " + "`stack`, `message`, `origin`, `useragent`, " + "`network`, `appversion` )" + " VALUES " + "( '".concat(params.username, "', '").concat(params.project, "', '").concat(params.path, "', ") + "'".concat(params.referrer, "', '").concat(params.event, "', '").concat(params.type, "', ") + "".concat(params.level, ", '").concat(params.stack, "', '").concat(params.message, "', ") + "'".concat(params.origin, "', '").concat(params.useragent, "', '").concat(params.network, "', '").concat(params.appversion, "' );");
            _context.prev = 1;
            _context.next = 4;
            return _mysqlSequelize["default"].query({
              sql: add_sql,
              queryType: 'insert'
            });

          case 4:
            add_record = _context.sent;
            return _context.abrupt("return", add_record);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _addErrorsRecord.apply(this, arguments);
}