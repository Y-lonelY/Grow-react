import Router from 'koa-router';
import Compose from 'koa-compose';
import Joi from '@hapi/joi';
import ErrorMessage from 'config/error';
import { addErrorsRecord } from 'S/System/errorController';
import { logger, rrtime } from 'C/logger';

const errorRouter = new Router();

/**
 * 捕获错误，插入数据库
 */
errorRouter.post('/catchErrors', async ctx => {
    const scheme = Joi.object({
        username: Joi.string().required(),
        project: Joi.string().required(),
        path: Joi.string(),
        referrer: Joi.string(),
        event: Joi.string(),
        type: Joi.string(),
        level: Joi.number(),
        stack: Joi.string(),
        message: Joi.string(),
        origin: Joi.string(),
        useragent: Joi.string(),
        network: Joi.string(),
        appversion: Joi.string(),
    });
    let results = {
        success: false,
        message: '',
        data: {}
    };

    const params = await scheme.validateAsync(ctx.request.body);
    ctx.response.type = 'json';
    try {
        const addList = await addErrorsRecord(params);
        results['success'] = Array.isArray(addList) && addList.length > 0 ? true : false;
        ctx.body = results;
    } catch (e) {
        ctx.app.emit('error', e, ctx);
        ctx.throw(500, ErrorMessage[1002]);
    }
});

const router = new Router;
router.use('/service/system', errorRouter.routes(), errorRouter.allowedMethods());

const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();

const errorCompose = Compose([logger, rrtime, router_middle, router_allow_methods]);

module.exports = errorCompose;