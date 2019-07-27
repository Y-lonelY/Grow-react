<!-- MarkdownTOC -->

- [Dependencies](#dependencies)
- [Connect To Mysql](#connect-to-mysql)
	- [Basic](#basic)

<!-- /MarkdownTOC -->


## Dependencies

`npm install koa-router` 安装路由中间件，注意 npm 内有多种 router，选择适用的即可

`npm install koa-compose` 用来合并中间件

`npm install mysql` 用来连接数据库

## Connect To Mysql

这里选择 [Sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md) 来作为数据库连接库

> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Sequelize 是基于 promise 的 Node.js ORM，它具有可靠的事务支持，关系，渴望，延迟加载，读取复制等

### Basic

`npm install --save sequelize` 安装 sequelize

`npm install --save mysql2` 安装 mysql 驱动程序

[sequelize实例](../components/mysqlSequelize.js)


