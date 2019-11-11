import Compose from 'koa-compose';
/**
 * 中间件栈
 * ctx 当前上下文
 */
// 打印接口返回时间
const logger = async (ctx, next) => {
    await next();
    const rt = ctx.response.get('x-response-time');
    console.log(`${ctx.method} ${ctx.url} = ${rt}`);
}

// 计算接口返回所用时间
const rrtime = async (ctx, next) => {
    // 当前时间的时间戳
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // 设置 x-response-time
    ctx.set('x-response-time', `${ms}ms`);
}

// 添加公用属性
const base = async (ctx, next) => {
    await next();
    ctx.response.type = 'json';
}

const middle_compose = Compose([logger, rrtime, base])

module.exports = middle_compose;
