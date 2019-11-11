// 引入 koa-router
import Router from "koa-router";
// 引入 koa-compose
import Compose from "koa-compose";
// 引入 joi，用来校验数据
import Joi from "@hapi/joi";
import * as daliyController from "S/Exercise/exerciseDaliyController";
import * as goalController from 'S/Exercise/exerciseGoalController';
import middle_compose from 'C/logger';


// 声明一个 router 实例
const exerciseRouter = new Router();

/**
 * exercise/list
 * 用来查询锻炼记录
 * body-parser 将 params 挂载至 ctx.request.body
 */
exerciseRouter.post('/list', async ctx => {
    /**
     * 参数校验规则
     * start "2019-10-17"
     * end "2019-10-17"
     */
    const scheme = Joi.object({
        start: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        end: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    });
    let results = {
        success: false,
        message: '',
        list: [],
        sum: [],
    };

    const params = await scheme.validateAsync(ctx.request.body);
    results['list'] = await daliyController.getDailyLists(params);
    results['sum'] = await daliyController.getDailySum(params);
    results['success'] = true;
    ctx.body = results;
});

/**
 * exercise/add
 * 添加记录
 */
exerciseRouter.post('/add', async ctx => {
    // 参数校验规则
    const scheme = Joi.object({
        date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        leg: Joi.number().min(0).required(),
        belly: Joi.number().min(0).required(),
        chest: Joi.number().min(0).required()
    });
    let results = {
        success: false,
        message: ''
    };

    const params = await scheme.validateAsync(ctx.request.body);
    const addList = await daliyController.addExerciseList(params);
    results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
    ctx.body = results;
});

/**
 * exercise/goal/list
 * 获取目标列表
 */
exerciseRouter.get('/goal/list', async ctx => {
    const scheme = Joi.object({
        status: Joi.number().integer().default(3)
    });
    let results = {
        success: false,
        list: []
    };
    const params = await scheme.validateAsync(ctx.request.query);
    results['list'] = await goalController.getGoalList(params);
    results['success'] = true;
    ctx.response.body = results;
});

// 装载所有路由
const router = new Router;
router.use('/service/exercise', exerciseRouter.routes(), exerciseRouter.allowedMethods());

// 生成路由中间件
const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

// 合并中间件
const exerciseCompose = Compose([middle_compose, router_middle, router_allow_methods]);

module.exports = exerciseCompose;