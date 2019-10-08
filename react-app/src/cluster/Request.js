import Axios from "axios";

// 请求列表
let requestList = [];

// 通过工厂方法创建 canceltoken，用于取消用户请求
let CancelToken = Axios.CancelToken;
let source = CancelToken.source();

// axios 实例
let service = Axios.create({
    baseURL: "/service/",
    timeout: 4000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});

// 设置请求拦截器
service.interceptors.request.use(config => {
    // 用请求 url 和 请求data 来判断是否是同一次请求
    const currentReques = config.method + config.url + JSON.stringify(config.data);
    // add cancel token
    config['cancelToken'] = source.token;

    if (requestList.includes(currentReques)) {
        source.cancel('Repeat Request Canceled');
    } else {
        requestList.push(currentReques);
    }
    return config;
}, error => {
    console.log(error);
});

// 设置响应拦截器
service.interceptors.response.use(response => {
    const currentReques = response.config.method + response.config.url + JSON.stringify(response.config.data);
    requestList.splice(requestList.indexOf(currentReques), 1);

    return response;
}, error => {
    if (Axios.isCancel(error)) {
        requestList.length = 0;
        // 再次尝试 cancel
        throw new Axios.Cancel('Repeat Request Canceled');
    }
    return Promise.reject(error);
})


/**
 * config.params 用来接受查询参数
 */
async function get(url, config = {}) {
    try {
        const response =  await service.get(url, config);
        // 返回服务器传值
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

/**
 * params 用来接收查询参数
 */
async function post(url, params, config={}) {
    try {
        const response =  await service.post(url, params, config);
        // 返回服务器传值
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export { get, post };