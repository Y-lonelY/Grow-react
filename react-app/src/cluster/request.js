import Axios from 'axios'
import { message } from 'antd'

// 声明一个 Map 用于存储每个**请求**的标识和取消方法
const pending = new Map()

// axios 实例
const service = Axios.create({
  baseURL: '/grow',
  timeout: 60000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

// 在 pending 内添加请求对
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  // current request config params
  // 通过工厂方法创建 canceltoken，用于取消用户请求
  config.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

/**
 * 在 pending 内删除请求对
 * 取消当前请求
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

// 清除所有的请求
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 设置请求拦截器
service.interceptors.request.use(
  (config) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 设置响应拦截器，这里拦截网络请求本身的错误
service.interceptors.response.use(
  (response) => {
    removePending(response.config) // 在请求结束后，移除本次请求
    return response
  },
  (error) => {
    // 如果是 cancel 引起的错误，则再次进行尝试
    if (Axios.isCancel(error)) {
      // 再次尝试 cancel
      console.error(error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * config.params 用来接受查询参数
 * config: { params: {}} 放在 header 内
 * config: { data: {}} 放在 request body 内
 */
export const get = async (url, config = {}) => {
  try {
    const res = await service.get(url, config)
    // 返回服务器传值
    return res.data
  } catch (error) {
    message.error(String(error))
  }
}

/**
 * data 用来接收查询参数，放在 request body 内
 */
export const post =  async (url, data, config = {}) => {
  try {
    const res = await service.post(url, data, config)
    return res.data
  } catch (error) {
    message.error(String(error))
  }
}


export const del = async (url, config = {}) => {
  try {
    const res = await service.delete(url, config)
    return res.data
  } catch (error) {
    message.error(String(error))
  }
}

export const patch = async (url, data, config = {}) => {
  try {
    const res = await service.patch(url, data, config)
    return res.data
  } catch (error) {
    message.error(String(error))
  }
}
