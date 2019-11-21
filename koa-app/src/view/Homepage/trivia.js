import Router from "koa-router";
import Compose from "koa-compose";
import Joi from "@hapi/joi";
import middle_compose from 'M/logger';
import * as FocusController from 'S/Exercise/focusController';

const triviaRouter = new Router();

triviaRouter.post('/list', async ctx => {

});

const router = new Router;
router.use('/service/trivia', triviaRouter.routes(), triviaRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const triviaCompose = Compose([middle_compose, router_routes, router_allow_methods]);

export default triviaCompose;