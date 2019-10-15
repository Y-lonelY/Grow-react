import { post } from '../cluster/Request';
import { exerciseList, addList } from './mock/exerciseMock';
import { config } from '@/config/sysConfig';

const useMock = config.useMock === 'false' ? false : true;

async function getDailyExerciseList(params={}) {
    try {
        const request = useMock ? await exerciseList : await post("exercise/list", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

async function addExerciseList(params) {
    try {
        const request = useMock ? await addList : await post("exercise/add", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

export { getDailyExerciseList, addExerciseList }