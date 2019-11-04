import { post, get } from '../cluster/Request';
import { exerciseList, addList, goalList, programOverview, wakaTimeData } from './mock/exerciseMock';
import { config } from '@/config/sysConfig';

const useMock = config.useMock === 'false' ? false : true;

async function getDailyExerciseList(params={}) {
    const request = useMock ? await exerciseList : await post("exercise/list", params);
    return request;
}

async function addExerciseList(params: {date: string, leg: number, belly: number, chest: number}) {
    try {
        const request = useMock ? await addList : await post("exercise/add", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

const getGoalList = async () => {
    try {
        const request = useMock ? await goalList : await get("exercise/goal/list");
        return request;
    } catch (e) {
        throw(e);
    }
}

const getProgramOverview = async (params) => {
    try {
        const request = useMock ? await programOverview : await post("program/overview", params);
        return request;
    } catch (e) {
        throw(e);
    }
}

const asyncWakatime = async () => {
    try {
        const request = useMock ? await wakaTimeData : await get("program/wakatime");
        return request;
    } catch (e) {
        console.log(e);
    }
}

export { getDailyExerciseList, addExerciseList, getGoalList, getProgramOverview, asyncWakatime }