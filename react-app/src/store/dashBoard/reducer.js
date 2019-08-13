import * as Type from './actionType';

// default
let defaultState = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData = (state = defaultState, action = {}) => {
    switch(action.type) {
        case Type.dailyCharts:
            const a = {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
            console.log(a)
            return a;
        default:
            return state;
    }
}