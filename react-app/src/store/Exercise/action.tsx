import { 
    ExerciseChartAction, 
    ExerciseData, 
    GoalListAction, 
    GoalListItem,
    programOverviewAction,
    programOverviewTemplate } from '@/index.d.ts';

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

const changeProgramOverview: (params: programOverviewTemplate) => programOverviewAction = (data) => {
    return {
        type: 'program-overview',
        ...data
    }
} 

export { changeChart, changeGoalList, changeProgramOverview };