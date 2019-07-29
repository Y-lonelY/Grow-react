<!-- MarkdownTOC levels="2,3" -->

- [nginx](#nginx)
	- [Config](#config)
	- [Command](#command)

<!-- /MarkdownTOC -->


> YlonelY-GrowingUp is The Project To Record The Growth


## nginx

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

`nginx` 启动 nginx 服务
`nginx -s stop` 停止 nginx 服务
`nginx -s reload` 重启 nginx 服务