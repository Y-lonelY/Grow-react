// 引入 koa-router
import Router from "koa-router"
// 引入 koa-compose
import Compose from "koa-compose"
import * as daliyController from "../service/daliyController";
import { logger, rrtime } from '../components/logger';

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


// 声明一个 router 实例
const exerciseRouter = new Router();

/**
 * exercise/list
 * 用来查询锻炼记录
 * body-parser 将 params 挂载至 ctx.request.body
 */
exerciseRouter.post('/exercise/list', async ctx => {
    let results = {
        success: false,
        list: [],
        sum: [],
    };
    const params = ctx.request.body;

    ctx.response.type = 'json';
    try {
        results['list'] = await daliyController.getDailyLists(params);
        results['sum'] = await daliyController.getDailySum(params);
        results['success'] = true;
        ctx.body = results;
    // catch await error
    } catch (e) {
        ctx.body = results;
        console.log(e);
    }
});

/**
 * exercise/add
 * 添加记录
 */
exerciseRouter.post('/exercise/add', async ctx => {
    const params = ctx.request.body;
    let results = {
        success: false
    };

    ctx.response.type = 'json';

    try {
        const addList = await daliyController.addExerciseList(params);

        results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
        ctx.body = results;
    } catch (e) {
        throw e;
    }
});


// 装载所有路由
const router = new Router;
router.use('/service', exerciseRouter.routes(), exerciseRouter.allowedMethods());

// 生成路由中间件
const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

// 合并中间件
const exerciseCompose = Compose([logger, rrtime, router_middle, router_allow_methods]);

module.exports = exerciseCompose;