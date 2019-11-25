import { post, get } from '@/cluster/request';
import { addData, triviaGroup, triviaList } from '../mock/homepage';
import { config } from '@/config/sysConfig';
import { message } from 'antd';

const useMock = config.useMock === 'false' ? false : true;

/**
 * 添加 trivia group record
 * @param {name} 记录名称
 * @param {status} 是否允许修改 0-允许修改 1-不允许修改
 */
export const addTriviaGroupItem = async (params) => {
    const res = useMock ? await addData : await post('trivia/group/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}

export const updateTriviaGroupItem = async (params) => {
    const res = useMock ? await addData : await post('trivia/group/update', params);
    if (!res.success) {
        message.error('修改失败！');
    }
    return res;
}

export const getTriviaGroupList = async () => {
    const res = useMock ? await triviaGroup : await get('trivia/group/list');
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}

export const getTriviaList = async (params) => {
    const res = useMock ? await triviaList : await get('trivia/list', {
        params: params
    });
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}

export const updateTrivia = async (params) => {
    const res = useMock ? await addData : await post('trivia/update', params);
    if (!res.success) {
        message.error('修改失败！');
    }
    return res;
}

export const addTrivia = async (params) => {
    const res = useMock ? await addData : await post('trivia/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}