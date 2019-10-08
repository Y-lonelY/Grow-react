// 引入 koa-router
import Router from "koa-router"
// 引入 koa-compose
import Compose from "koa-compose"
import * as daliyController from "../service/daliyController"

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
daily.post('/daily', async ctx => {
    let results = {
        success: false,
        list: [],
        sum: [],
    };
    const params = ctx.request.body;

    ctx.response.type = 'json';
    try {
        results['list'] = await daliyController.getDailyLists(params);
        results['sum'] = await daliyController.getDailySum();
        results['success'] = true;
        ctx.body = results;
    // catch await error
    } catch (e) {
        ctx.body = results;
    }
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