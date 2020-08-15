import { post, get } from '@/cluster/request';
import { config } from '@/config/sysConfig';
import { message } from 'antd';

const useMock = config.useMock === 'false' ? false : true;

/**
 * 添加 trivia group record
 * @param {name} 记录名称
 * @param {status} 是否允许修改 0-允许修改 1-不允许修改
 */
export const addTriviaGroupItem = async (params) => {
    const res = await post('trivia/group/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}

export const updateTriviaGroupItem = async (params) => {
    const res = await post('trivia/group/update', params);
    if (!res.success) {
        message.error('修改失败！');
    }
    return res;
}

export const getTriviaGroupList = async () => {
    const res = await get('trivia/group/list');
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}

export const getTriviaList = async (params) => {
    const res = await get('trivia/list', {
        params: params
    });
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}

/**
 * 修改 trivia record
 * @id 记录 id
 * @details 详情
 * @link 相关连接
 * @status 是否展示
 * @user 最后修改者
 * @group 所在分组
 */
export const updateTrivia = async (params) => {
    const res = await post('trivia/update', params);
    if (!res.success) {
        message.error('修改失败！');
    }
    return res;
}

/**
 * 添加 trivia record
 * @details 详情
 * @link 相关连接
 * @status 是否展示
 * @user 最后修改者
 * @group 所在分组
 */
export const addTrivia = async (params) => {
    const res = await post('trivia/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}