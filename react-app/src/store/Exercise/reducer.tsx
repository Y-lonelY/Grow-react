import { DailyChartTypes, ExerciseChartAction, StoreState, ExerciseData } from '@/index.d.ts';

// default
let defaultState: ExerciseData = {
    dailyList: [],
    sumMap: {},
};

export const exerciseData: (state: StoreState, action: ExerciseChartAction) => StoreState = (state = defaultState, action) => {
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