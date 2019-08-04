import { get } from '../cluster/Request'
import { daily } from './mock/dailyMock'
import config from '../config/sysConfig'

const useMock = config.useMock;

async function getDailyExerciseList() {
    try {
        const request = useMock ? await daily : await get("daily");
        return request;
    } catch (e) {
        console.log(e);
    }
}

export { getDailyExerciseList }