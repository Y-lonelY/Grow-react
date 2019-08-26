import { DailyChartTypes, ChangeChart, StoreState, DashBoardData } from '@/index.d.ts';

// default
let defaultState: DashBoardData = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData: (state: StoreState, action: ChangeChart) => StoreState = (state = defaultState, action) => {
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