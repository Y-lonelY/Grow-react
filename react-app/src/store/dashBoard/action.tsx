import * as Type from '@/store/dashBoard/actionType';

const changeChart: (dailyList: any, sumMap: any) => any  = (dailyList, sumMap) => {
    return {
        type: Type.dailyCharts,
        dailyList,
        sumMap,
    }
}

export { changeChart };