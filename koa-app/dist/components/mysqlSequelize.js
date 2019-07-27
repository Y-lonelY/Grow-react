"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db_config = _interopRequireDefault(require("../../config/db_config"));

// 引入 mysql
// 引入 mysql 设置
// mysql 连接实例类
var Mysql =
/*#__PURE__*/
function () {
  function Mysql() {
    (0, _classCallCheck2["default"])(this, Mysql);
  } // creat connection
  // 建立连接实例
  // 数据库操作流程：先创建连接，执行sql，关闭连接


  (0, _createClass2["default"])(Mysql, [{
    key: "createConnection",
    value: function createConnection() {
      return new _sequelize["default"](_db_config["default"].database, _db_config["default"].username, _db_config["default"].password, {
        host: _db_config["default"].host,
        dialect: "mysql"
      });
    } // close connection

  }, {
    key: "closeConnection",
    value: function closeConnection() {
      var sequelizeCase = this.createConnection();
      sequelizeCase.close().then(function () {
        console.log("Connection has been closed successfully!");
      })["catch"](function (err) {
        console.error('Unable to close the database:', err);
      });
    } // test connection

  }, {
    key: "testConnection",
    value: function testConnection() {
      var _this = this;

      var sequelizeCase = this.createConnection();
      sequelizeCase.authenticate().then(function () {
        console.log('Connection has been established successfully.');
      })["catch"](function (err) {
        console.error('Unable to connect to the database:', err);
      })["finally"](function () {
        _this.closeConnection();
      });
    } // raw query

  }, {
    key: "query",
    value: function query(_ref) {
      var _this2 = this;

      var sql = _ref.sql,
          queryType = _ref.queryType;
      var sequelizeCase = this.createConnection();
      var type = _sequelize["default"].QueryTypes.SELECT;

      if (queryType && _sequelize["default"].QueryTypes[queryType.toUpperCase()]) {
        type = _sequelize["default"].QueryTypes[queryType.toUpperCase()];
      }

      return sequelizeCase.query(sql, {
        type: _sequelize["default"].QueryTypes[type],
        plain: false
      })["finally"](function () {
        _this2.closeConnection();
      });
    }
  }]);
  return Mysql;
}();

module.exports = new Mysql();