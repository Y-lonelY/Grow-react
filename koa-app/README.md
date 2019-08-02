
## Start

在 package.json 文件内添加 `scripts` 配置项，用于执行对应的脚本

配置如下：

```json
"scripts": {
    "build": "npx babel src --out-dir dist",
    "start": "node dist/index.js",
    "server": "concurrently \"npx babel src --out-dir dist\" \"node dist/index.js\""
 },
```

关于 `npm run build & npm run start` 执行问题

问题：之前脚本版本为 `npm run build & npm run start` 希望能够先执行 babel 编译命令，再执行 node 命令，在系统的zsh内执行表现没问题，但是在 vscode 的 terminal 内执行，会优先执行 node command，再执行 babel 编译命令，且调整顺序后仍不能改变其执行顺序

方案一<br>
通过 concurrently 来封装命令，结果发现在控制台，命令虽然依次打印，但是实际上命令仍然是先启动服务再执行完编译
- `npm install --save concurrently` 安装 concurrently package
- `"concurrently \"npx babel src --out-dir dist\" \"node dist/index.js\""` 用来配置 server 脚本

方案二<br>
通过 `&&` 连接命令进行同步执行，结果可行，注意 `&` 表示异步执行，`&&` 表示同步执行

---
