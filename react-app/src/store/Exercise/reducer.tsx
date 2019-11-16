import * as TS from '@/index.d.ts';

/**
 * exercise daily module
 */
let defaultExerciseState: TS.ExerciseData = {
    dailyList: [],
    sumMap: {},
};

export const exerciseData: (state: TS.ExerciseData, action: TS.ExerciseChartAction) => TS.ExerciseData = (state = defaultExerciseState, action) => {
    switch(action.type) {
        case TS.ExerciseTypes.DAILYCHARTS:
            return {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
        default:
            return state;
    };
}

/**
 * goal list module
 */
let defaultGoalListState: TS.GoalListItem[] = [];

export const goalListData: (state: TS.GoalListItem[], action: TS.GoalListAction) => TS.GoalListItem[] = (state = defaultGoalListState, action) => {
    switch(action.type) {
        case TS.ExerciseTypes.GOALLIST:
            return action.goalList;
        default:
            return state;
    };
}

/**
 * program module
 */
let defaultProgramState: TS.programOverviewTemplate = {
    lang: {
        list: [],
        name: []
    },
    project: {
        list: [],
        name: []
    },
};

export const programOverviewData = (state = defaultProgramState, action) => {
    if (action.type === TS.ExerciseTypes.PROGRAMOVERVIEW) {
        return {...state, 
            lang: action.lang,
            project: action.project
        };
    } else {
        return state;
    }
}

export const focusData = (state = { list: [], currentType: '' }, action) => {
    if (action.type === TS.ExerciseTypes.FOCUSLIST) {
        return {
            ...state,
            list: action.list
        };
    } else if (action.type === TS.ExerciseTypes.FOCUSTYPE) {
        return {
            ...state,
            currentType: action.currentType
        }
    } else {
        return state;
    }
}
