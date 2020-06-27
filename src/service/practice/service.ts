import { post, get } from '@/cluster/request';
import { exerciseList, addData, goalList, programOverview, wakaTimeData } from '../mock/practice';
import { config } from '@/config/sysConfig';
import { message } from 'antd';

const useMock = config.useMock === 'false' ? false : true;


/**
 * Exercise Module
 */
export async function getDailyExerciseList(params = {}) {
    const res = useMock ? await exerciseList : await post("exercise/list", params);
    if (!res.success) {
        message.error('获取失败');
    }
    return res;
}

export async function addExerciseList(params: { date: string, leg: number, belly: number, chest: number }) {
    const res = useMock ? await addData : await post("exercise/add", params);
    if (!res.success) {
        message.error('添加失败');
    }
    return res;
}

/**
 * Goal Module
 */
export async function getGoalList() {
    const res = useMock ? await goalList : await get("exercise/goal/list");
    if (!res.success) {
        message.error('获取失败');
    }
    return res;
}

/**
 * Program Module
 */
export async function getProgramOverview(params) {
    const res = useMock ? await programOverview : await post("program/overview", params);
    if (!res.success) {
        message.error('获取失败');
    }
    return res;
}

// 同步 wakatime 数据，设置用不超时
// 如果返回500，则 res === undefined
export async function asyncWakatime() {
    const res = useMock ? await wakaTimeData : await get("program/wakatime", { timeout: 0 });
    if (!res.success) {
        message.error('同步失败');
    }
    return res;
}
