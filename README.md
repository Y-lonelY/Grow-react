<!-- MarkdownTOC levels="2,3" -->

- [front](#front)
- [Usage](#usage)
- [Nginx](#nginx)
	- [Config](#config)
	- [Command](#command)
- [Develop Flows](#develop-flows)
	- [2019-08-04](#2019-08-04)
	- [2019-08-03](#2019-08-03)
	- [2019-08-02](#2019-08-02)

<!-- /MarkdownTOC -->


> YlonelY-GrowingUp is The Project To Record The Growth

## front

这个项目用来记录 Grow，采用前后端分离的方式进行开发，因为流程的增加可以获得更多的知识累积


## Usage

**basic Usage**

1. 在 terminal 内 `cd ~` 进入根目录
2. `nginx` 启动 nginx service
3. `cd /Users/yango/YlonelY-GrowingUp/koa-app` 进入 node 根目录
4. `npm run start` 开启 node 服务

**shell usage**

1. 在项目根目录下，`./start.sh` 启动 shell script
2. list 展示当前占有 3000(node service) 和 7177(nginx) 端口的进程
3. start 启动 nginx 和 node service
4. stop 终止 nginx，同时输入 node 的 pid 来终止 node service


## Nginx

`brew update` 查看 brew 安装是否成功<br>
`brew search nginx` 查看 nginx 信息<br>
`brew install nginx` 安装 nginx<br>

==== 安装成功之后 ====

在 `/usr/local/var/www` 查看主页内容<br>
在 `/usr/local/etc/nginx/nginx.conf` 修改配置文件<br>

### Config

在本项目内，koa 在3000端口上运行，react-app 在 7177端口上运行，需要：

1. 将react工程内的 build/index.html 代理到 127.0.0.1:7177/ 路径下
2. 将koa启动之后，即后台服务启动之后，将其代理到 127.0.0.1:7177/service 路径下

具体配置如下：

```
server {
    listen       7177;
    server_name  127.0.0.1;
    location / {
            root   /Users/yango/YlonelY-GrowingUp/react-app/build/;
            index  index.html index.htm;
        }

	location /service {
	    proxy_pass http://localhost:3000/service;
	}
}
``` 

### Command

`nginx` 启动 nginx 服务<br>
`nginx -s stop` 停止 nginx 服务<br>
`nginx -s reload` 重启 nginx 服务


## Develop Flows

至2019-08-02，前后端+Nginx转发的基本框架已经搭建完成，开始进入实质性开发工作，之后以2周为单位进行总结

已经做的工作：
1. react 框架，路由，请求接口封装
2. koa-node 框架，路由，数据库连接封装
3. Nginx配置
4. shell script 开发

待完成工作
1. redux 集成
2. typescript 集成
3. think flow 搭建
4. log 日志集成
5. mock data 集成

### 2019-08-04

在 window 下运行项目

`npm install @antv/data-set --save` 添加对数据集处理

[@antv/data-set](https://www.yuque.com/antv/g2-docs/api-data-set#1976bl) 类似之前做玩家级想要的，将数据转换成类似数据库表的形式进行处理的一种实现

添加饼图展示锻炼情况分布



### 2019-08-03

进一步封装 Axios，添加请求/响应拦截器和重复请求处理

添加.json假数据处理

添加总数统计

对象遍历不建议使用 `for...in...`，用 `Object.enteries()` 或者 `Object.keys()` 代替

### 2019-08-02

`await/async` 的异常捕获

之前是 `await a().then().catch()` 的写法，因为 await 实际返回就是一个 Promise Object，所以沿用了其写法<br>
之后发现，有更好的写法，就是通过 `try catch` 来进行，Promise 的 reject 异常通常能够被 catch 捕获到





