// 引入 koa
import Koa from "koa"
// daily view
import dailyView from "./view/dailyView"
// 声明一个 koa 实例
const app = new Koa();

// 加载路由中间件
app.use(dailyView);

// 监听端口 3000
app.listen(3000);