import { ExerciseTypes, ExerciseChartAction, StoreState, ExerciseData, GoalListAction, GoalListItem } from '@/index.d.ts';

/**
 * exercise daily module
 */
let defaultExerciseState: ExerciseData = {
    dailyList: [],
    sumMap: {},
};

const exerciseData: (state: ExerciseData, action: ExerciseChartAction) => ExerciseData = (state = defaultExerciseState, action) => {
    switch(action.type) {
        case ExerciseTypes.DAILYCHARTS:
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
let defaultGoalListState: GoalListItem[] = [];

const goalListData: (state: GoalListItem[], action: GoalListAction) => GoalListItem[] = (state = defaultGoalListState, action) => {
    switch(action.type) {
        case ExerciseTypes.GOALLIST:
            return action.goalList;
        default:
            return state;
    };
}

export { exerciseData, goalListData }