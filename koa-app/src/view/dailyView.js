// 引入 koa-router
import Router from "koa-router"
// 引入 koa-compose
import Compose from "koa-compose"
// 引入 mysql
import sequelizeCase from "../components/mysqlSequelize"
import {getDailyLists} from "../service/daliyController"

// data handle
function dataHandle(data, ctx) {
    let results = {};
    if (data && data !== null) {
        results['results'] = data;
        results['success'] = true;
    } else {
        results['results'] = null;
        results['success'] = false;
    }

    ctx.response.type = 'json';
    ctx.body = results;
}

// 中间件栈
// 打印接口返回时间
const logger = async (ctx, next) => {
    await next();
    sequelizeCase.testConnection()
    const rt = ctx.response.get('x-response-time');
    console.log(`${ctx.method} ${ctx.url} = ${rt}`);
}

// 计算接口返回所用时间
const rrtime = async (ctx, next) => {
    // 当前时间的时间戳
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // 设置 x-response-time
    ctx.set('x-response-time', `${ms}ms`);
}

// 声明一个 router 实例
const daily = new Router();
daily.get('/daily', async ctx => {
    // 设置返回类型
    await getDailyLists()
    .then(results => {
        dataHandle(results, ctx);
    })
    .catch(err => {
        dataHandle(null, ctx);
    })
});

// 装载所有路由
const router = new Router;
router.use('/service', daily.routes(), daily.allowedMethods());

// 生成路由中间件
const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

// 合并中间件
const dailyCompose = Compose([logger, rrtime, router_middle, router_allow_methods]);

module.exports = dailyCompose