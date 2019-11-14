// 引入 koa
import Koa from 'koa';
import Compose from 'koa-compose';
import BodyParser from 'koa-bodyparser';
import { listenError } from 'M/errors';
// exercise view
import focusView from 'V/Exercise/focus';
import exerciseView from 'V/Exercise/exercise';
import programView from 'V/Exercise/program';
// system view
import errorView from 'V/System/error';
import upload from 'V/System/upload';
// 声明一个 koa 实例
const app = new Koa();

const exerciseList = [focusView, exerciseView, programView];
const systemList = [errorView, upload];

// 合并中间件
app.use(Compose([BodyParser(), ...exerciseList, ...systemList]));

// 添加错误监听
listenError(app);

// 监听端口 3000
app.listen(3000);