import { post, get } from '@/cluster/request';
import { addData, focusData } from '../mock/homepage';
import { config } from '@/config/sysConfig';
import { message } from 'antd';

const useMock = config.useMock === 'false' ? false : true;

/**
 * Focus Moduel
 */
export const addFocusRecord = async (params) => {
    const res = useMock ? await addData : await post('focus/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}

export const editFocusRecord = async (params) => {
    const res = useMock ? await addData : await post('focus/update', params);
    if (!res.success) {
        message.error('更新失败！');
    }
    return res;
}

export const getFocusList = async (params) => {
    const res = useMock ? await focusData : await get('focus/list', { params: params });
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}