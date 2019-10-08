import { post } from '../cluster/Request'
import { daily } from './mock/dailyMock'
import config from '../config/sysConfig'

const useMock = config.useMock;

async function getDailyExerciseList(params={}) {
    try {
        const request = useMock ? await daily : await post("daily", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

export { getDailyExerciseList }