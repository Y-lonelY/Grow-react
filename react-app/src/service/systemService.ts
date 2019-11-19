import { post } from '../cluster/request';
import { config } from '@/config/sysConfig';
import { ErrorParams } from '@/index.d.ts';

/**
 * 添加错误日志，用于捕获生产环境的错误
 * @param params 错误参数
 * @param label 标记，用来控制是否继续发送请求，用于处理该请求本身错误，false 代表继续发送
 */
async function addErrorRecord(params: ErrorParams, stop: boolean = false) {
    if (stop || config.isdevelop) {
        return;
    }

    await post('system/catchErrors', params);
}

export { addErrorRecord };