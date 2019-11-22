import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import middle_compose from 'M/logger';
import * as TriviaController from 'S/Homepage/triviaController';

const triviaRouter = new Router();
// group scheme
const group_scheme = Joi.object({
    name: Joi.string().allow(''),
    status: Joi.number().integer().default(0),
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
    const update_scheme = Joi.object({
        id: Joi.number().integer().required(),
    });
    const scheme = group_scheme.keys(update_scheme);
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

const router = new Router;
router.use('/service/trivia', triviaRouter.routes(), triviaRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const triviaCompose = Compose([middle_compose, router_routes, router_allow_methods]);

export default triviaCompose;