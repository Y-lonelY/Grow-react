import * as Type from './actionType';

// default
let defaultState = {
    dailyList: [],
    sumMap: {},
};

const dashBoardData = (state = defaultState, action = {}) => {
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

export default dashBoardData;