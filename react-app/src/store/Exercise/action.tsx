import { 
    ExerciseChartAction, 
    ExerciseData, 
    GoalListAction, 
    GoalListItem,
    programOverviewAction,
    programOverviewTemplate,
    focusItem,
    focusAction } from '@/index.d.ts';

export const changeChart: (...ExerciseData) => ExerciseChartAction = (dailyList, sumMap) => {
    return {
        type: 'dailycharts',
        dailyList,
        sumMap,
    }
}

export const changeGoalList: (goalList: GoalListItem[]) => GoalListAction = (goalList) => {
    return {
        type: 'goalList',
        goalList,
    }
}

export const changeProgramOverview: (params: programOverviewTemplate) => programOverviewAction = (data) => {
    return {
        type: 'program-overview',
        ...data
    }
}

export const changeFocusList: (list: focusItem[]) => focusAction = (data) => {
    return {
        list: data,
        type: 'focusList'
    }
}
