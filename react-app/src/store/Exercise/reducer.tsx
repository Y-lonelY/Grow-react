import * as TS from '@/index.d.ts';

/**
 * exercise daily module
 */
let defaultExerciseState: TS.ExerciseData = {
    dailyList: [],
    sumMap: {},
};

const exerciseData: (state: TS.ExerciseData, action: TS.ExerciseChartAction) => TS.ExerciseData = (state = defaultExerciseState, action) => {
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

const goalListData: (state: TS.GoalListItem[], action: TS.GoalListAction) => TS.GoalListItem[] = (state = defaultGoalListState, action) => {
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
let defaultProgramState: {list: TS.ProgramItem[], nameList: {name: string}[]} = {
    list: [],
    nameList: []
};

const programOverviewData = (state = defaultProgramState, action) => {
    if (action.type === TS.ExerciseTypes.PROGRAMOVERVIEW) {
        return {...state, ...{
            list: action.list,
            nameList: action.nameList,
        }};
    } else {
        return state;
    }
}

export { exerciseData, goalListData, programOverviewData }