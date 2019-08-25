import {DailyChartTypes} from '@/store/dashBoard/types';

interface StoreState{
    dailyList?: any[];
    sumMap?: object;
}

// default
let defaultState = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData: (state: StoreState, action: any) => StoreState = (state = defaultState, action) => {
    switch(action.type) {
        case DailyChartTypes.DAILYCHARTS:
            return {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
        default:
            return state;
    }
}