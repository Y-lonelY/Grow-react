import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import * as FocusController from 'S/Exercise/focusController';
import middle_compose from 'C/logger';

const focusRouter = new Router();

/**
 * 公用验证字段
 */
const base_scheme = Joi.object({
    title: Joi.string().required(),
    details: Joi.string().allow(''),
    start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    end_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).allow(''),
    pictures: Joi.string().allow(''),
    priority: Joi.number().integer().required(),
    status: Joi.number().integer().required()
});

focusRouter.post('/add', async ctx => {
    let results = {
        success: false,
    };
    const params = await base_scheme.validateAsync(ctx.request.body);
    const res = await FocusController.addFocuxRecord(params);
    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.response.type = 'json';
    ctx.body = results;

});

focusRouter.get('/list', async ctx => {
    let results = {
        success: true,
        data: {
            list: []
        },
    };
    const res = await FocusController.getFocusRecord();
    results['data']['list'] = res;
    ctx.response.type = 'json';
    ctx.body = results;
});

focusRouter.post('/update', async ctx => {
    const update_scheme = {
        id: Joi.number().integer().required()
    };
    const scheme = base_scheme.keys(update_scheme);
    let results = {
        success: false,
    };
    const params = await scheme.validateAsync(ctx.request.body);
    const res = await FocusController.updateFocusRecord(params);
    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.body = results;
});

const router = new Router;
router.use('/service/focus', focusRouter.routes(), focusRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const focusCompose = Compose([middle_compose, router_routes, router_allow_methods]);

module.exports = focusCompose;
