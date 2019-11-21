// 引入 koa
import Koa from 'koa';
import Compose from 'koa-compose';
import BodyParser from 'koa-bodyparser';
import { listenError } from 'M/errors';
import Homepage  from 'V/Homepage';
import Practice from 'V/Practice';
import SystemView from 'V/System';

// 声明一个 koa 实例
const app = new Koa();

// 合并中间件
app.use(Compose([
    BodyParser(), 
    Homepage, 
    Practice,
    SystemView
]));

// 添加错误监听
listenError(app);

// 监听端口 3000
app.listen(3000);