import Router from 'koa-router';
import Compose from 'koa-compose';
import Joi from '@hapi/joi';
import ErrorMessage from 'config/error';
import { addErrorsRecord } from 'S/System/errorController';
import middle_compose from 'C/logger';

const errorRouter = new Router();

/**
 * 捕获错误，插入数据库
 */
errorRouter.post('/catchErrors', async ctx => {
    const scheme = Joi.object({
        username: Joi.string().required(),
        project: Joi.string().required(),
        path: Joi.string(),
        referrer: Joi.string().allow(''),
        event: Joi.string(),
        type: Joi.string().allow(''),
        level: Joi.number(),
        stack: Joi.string().allow(''),
        message: Joi.string(),
        origin: Joi.string().allow(''),
        useragent: Joi.string(),
        network: Joi.string().allow(''),
        appversion: Joi.string().allow(''),
    });
    let results = {
        success: false,
        message: '',
        data: {}
    };

    const params = await scheme.validateAsync(ctx.request.body);
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

const errorCompose = Compose([middle_compose, router_middle, router_allow_methods]);

module.exports = errorCompose;