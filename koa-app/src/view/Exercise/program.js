import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import ErrorMessage from 'config/error';
import * as ProgramController from 'S/Exercise/programController';
import { logger, rrtime } from 'C/logger';

// 声明一个 router 实例
const programRouter = new Router();

programRouter.post('/program/overview', async ctx => {
    const scheme = Joi.object({
        start: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        end: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        type: Joi.string().required(),
        name: Joi.string().required(),
    });
    let results = {
        success: false,
        message: '',
        list: [],
        nameList: [],
    };

    try {
        const params = await scheme.validateAsync(ctx.request.body);
        ctx.response.type = 'json';
        try {
            results['list'] = await ProgramController.getProgramList(params);
            results['nameList'] = await ProgramController.getProgramName(params);
            results['success'] = true;
            ctx.body = results;
        } catch (e) {
            console.log(e);
            results['message'] = ErrorMessage[1002];
            ctx.body = results;
        }
    } catch (e) {
        console.log(e);
        results['message'] = ErrorMessage[1001];
        ctx.body = results;
    }
});

const router = new Router;
router.use('/service', programRouter.routes(), programRouter.allowedMethods());

const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

const programCompose = Compose([logger, rrtime, router_middle, router_allow_methods]);

module.exports = programCompose;