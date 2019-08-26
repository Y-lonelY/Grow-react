import {ChangeChart, DashBoardData} from '@/index.d.ts';

const changeChart: (...DashBoardData) => ChangeChart  = (dailyList, sumMap) => {
    return {
        type: 'dailycharts',
        dailyList,
        sumMap,
    }
}

export { changeChart };