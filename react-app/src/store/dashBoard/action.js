import * as Type from './actionType';

const changeChart = (dailyList, sumMap) => {
    return {
        type: Type.dailyCharts,
        dailyList,
        sumMap,
    }
}

export { changeChart };