import * as Type from './actionType';

// default
let defaultState = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData = (state = defaultState as any, action = {} as any) => {
    switch(action.type) {
        case Type.dailyCharts:
            return {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
        default:
            return state;
    }
}