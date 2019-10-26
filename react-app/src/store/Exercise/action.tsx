import { 
    ExerciseChartAction, 
    ExerciseData, 
    GoalListAction, 
    GoalListItem } from '@/index.d.ts';

const changeChart: (...ExerciseData) => ExerciseChartAction = (dailyList, sumMap) => {
    return {
        type: 'dailycharts',
        dailyList,
        sumMap,
    }
}

const changeGoalList: (goalList: GoalListItem[]) => GoalListAction = (goalList) => {
    return {
        type: 'goalList',
        goalList,
    }
}

export { changeChart, changeGoalList };