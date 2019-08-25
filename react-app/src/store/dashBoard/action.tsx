import {DailyChartTypes} from '@/store/dashBoard/types';

interface ChangeChart {
    type: string;
    dailyList: any;
    sumMap: any;
}

const changeChart: (dailyList: any, sumMap: any) => ChangeChart  = (dailyList, sumMap) => {
    return {
        type: DailyChartTypes.DAILYCHARTS,
        dailyList,
        sumMap,
    }
}

export { changeChart };