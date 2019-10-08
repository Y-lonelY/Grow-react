// 引入 koa
import Koa from "koa"
import Compose from "koa-compose"
import BodyParser from "koa-bodyparser"
// daily view
import dailyView from "./view/dailyView"
// 声明一个 koa 实例
const app = new Koa();

// 加载路由中间件
app.use(BodyParser())
app.use(dailyView)
// app.use(Compose([BodyParser(), dailyView]));

// 监听端口 3000
app.listen(3000);