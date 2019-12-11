import Koa from 'koa';
import Compose from 'koa-compose';
import BodyParser from 'koa-bodyparser';
import { listenError } from 'M/errors';
import compress from 'koa-compress';
import Homepage  from 'V/Homepage';
import Practice from 'V/Practice';
import SystemView from 'V/System';

// 声明一个 koa 实例
const app = new Koa();

// compress gzip 压缩
const compressInstance = compress({
    // 设置阈值，小于 10k 不进行压缩
    threshold: 1024 * 10,
    flush: require('zlib').Z_SYNC_FLUSH
});

// 合并中间件
app.use(Compose([
    compressInstance,
    BodyParser(), 
    Homepage, 
    Practice,
    SystemView
]));

// 添加错误监听
listenError(app);

// 监听端口 3000
app.listen(3000);