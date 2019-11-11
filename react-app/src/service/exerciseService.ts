import { post, get } from '../cluster/Request';
import { exerciseList, addData, goalList, programOverview, wakaTimeData, focusData } from './mock/exerciseMock';
import { config } from '@/config/sysConfig';
import { message } from 'antd';

const useMock = config.useMock === 'false' ? false : true;


/**
 * Exercise Module
 */
async function getDailyExerciseList(params = {}) {
    const res = useMock ? await exerciseList : await post("exercise/list", params);
    return res;
}

async function addExerciseList(params: { date: string, leg: number, belly: number, chest: number }) {
    const res = useMock ? await addData : await post("exercise/add", params);
    return res;
}

/**
 * Goal Module
 */
const getGoalList = async () => {
    const res = useMock ? await goalList : await get("exercise/goal/list");
    return res;
}

/**
 * Program Module
 */
const getProgramOverview = async (params) => {
    const res = useMock ? await programOverview : await post("program/overview", params);
    return res;
}

// 同步 wakatime 数据，设置用不超时
const asyncWakatime = async () => {
    const res = useMock ? await wakaTimeData : await get("program/wakatime", { timeout: 0 });
    return res;
}

/**
 * Focus Moduel
 */
const addFocusRecord = async (params) => {
    const res = useMock ? await addData : await post('focus/add', params);
    if (!res.success) {
        message.error('添加失败！');
    }
    return res;
}

const getFocusList = async (params) => {
    const res = useMock ? await focusData : await get('focus/list', { params: params });
    if (!res.success) {
        message.error('获取列表失败！');
    }
    return res;
}
export { getDailyExerciseList, addExerciseList, getGoalList, getProgramOverview, asyncWakatime, addFocusRecord, getFocusList }