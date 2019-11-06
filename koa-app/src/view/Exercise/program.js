import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import ErrorMessage from 'config/error';
import * as ProgramController from 'S/Exercise/programController';
import { logger, rrtime } from 'C/logger';

// 声明一个 router 实例
const programRouter = new Router();

programRouter.post('/overview', async ctx => {
    const scheme = Joi.object({
        start: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        end: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    });
    let results = {
        success: false,
        message: '',
        data: {
            lang: {
                list: [],
                name: []
            },
            project: {
                list: [],
                name: []
            },
        },
    };

    try {
        const params = await scheme.validateAsync(ctx.request.body);
        ctx.response.type = 'json';
        try {
            results['data']['lang']['list'] = await ProgramController.getProgramList({...params, type: 'lang'});
            results['data']['lang']['name'] = await ProgramController.getProgramName({...params, type: 'lang'});
            results['data']['project']['list'] = await ProgramController.getProgramList({...params, type: 'project'});
            results['data']['project']['name'] = await ProgramController.getProgramName({...params, type: 'project'});
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

programRouter.get('/wakatime', async ctx => {
    let results = {
        success: false,
        message: '',
        data: {},
    };
    ctx.response.type = 'json';

    try {
        const res = await ProgramController.setWakaTime();
        results['success'] = res.label;
        results['message'] = res.msg;
    } catch (e) {
        console.log(e);
        results['message'] = ErrorMessage[1002];
    } finally {
        ctx.body = results;
    }
});

const router = new Router;
router.use('/service/program', programRouter.routes(), programRouter.allowedMethods());

const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

const programCompose = Compose([logger, rrtime, router_middle, router_allow_methods]);

module.exports = programCompose;