import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import middle_compose from 'M/logger';
import * as TriviaController from 'S/Homepage/triviaController';

const triviaRouter = new Router();
// trivia group 校验规则
const group_scheme = Joi.object({
    name: Joi.string().allow(''),
    status: Joi.number().integer().default(0),
});
// trivia 校验规则
const trivia_scheme = Joi.object({
    details: Joi.string().max(3000).required(),
    link: Joi.string().allow(''),
    status: Joi.number().integer().default(1),
    user: Joi.string().allow('').default('yh'),
    group: Joi.number().integer().required(),
});


triviaRouter.get('/group/list', async ctx => {
    let results = {
        success: true,
        data: {
            list: []
        }
    };
    const res = await TriviaController.getTriviaGroupList();

    results.data.list = res;
    ctx.response.body = results;
});


triviaRouter.post('/group/update', async ctx => {
    const scheme = group_scheme.keys({
        id: Joi.number().integer().required()
    });
    let results = {
        success: true,
    };
    const params = await scheme.validateAsync(ctx.request.body);
    const res = await TriviaController.updateTriviaGroupList(params);

    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.response.body = results;
});


triviaRouter.post('/group/add', async ctx => {
    let results = {
        success: true,
    };
    const params = await group_scheme.validateAsync(ctx.request.body);
    const res = await TriviaController.addTriviaGroupList(params);

    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.response.body = results;
});


triviaRouter.get('/list', async ctx => {
    const scheme = Joi.object({
        group: Joi.number().integer().default(-127)
    });
    let results = {
        success: true,
        data: {
            list: []
        }
    };
    const params = await scheme.validateAsync(ctx.request.query);
    const list = await TriviaController.getTriviaList(params);

    results.data.list = list;
    ctx.response.body = results;
});


triviaRouter.post('/add', async ctx => {
    let results = {
        success: true,
    };
    const params = await trivia_scheme.validateAsync(ctx.request.body);
    const res = await TriviaController.addTriviaList(params);

    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.response.body = results;
});


triviaRouter.post('/update', async ctx => {
    const scheme = trivia_scheme.keys({
        id: Joi.number().integer().required(),
    });
    let results = {
        success: true,
    };
    const params = await scheme.validateAsync(ctx.request.body);
    const res = await TriviaController.updateTriviaList(params);

    results['success'] = Array.isArray(res) && res.length > 0 ? true : false;
    ctx.response.body = results;
});

const router = new Router;
router.use('/service/trivia', triviaRouter.routes(), triviaRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const triviaCompose = Compose([middle_compose, router_routes, router_allow_methods]);

export default triviaCompose;