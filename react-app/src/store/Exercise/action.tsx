import { 
    ExerciseChartAction, 
    ExerciseData, 
    GoalListAction, 
    GoalListItem,
    programOverviewAction,
    ProgramItem } from '@/index.d.ts';

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

const changeProgramOverview: (list: ProgramItem[], nameList: {name: string}[]) => programOverviewAction = (list, nameList) => {
    return {
        type: 'program-overview',
        list: list,
        nameList: nameList,
    }
} 

export { changeChart, changeGoalList, changeProgramOverview };