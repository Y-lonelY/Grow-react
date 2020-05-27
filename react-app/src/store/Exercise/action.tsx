import {
  ExerciseChartAction,
  ExerciseData,
  GoalListAction,
  GoalListItem,
  ProgramOverviewAction,
  ProgramOverviewTemplate,
  FocusItem,
  FocusAction,
} from '@/index.d.ts'

export const changeChart: (...ExerciseData) => ExerciseChartAction = (
  dailyList,
  sumMap
) => {
  return {
    type: 'dailycharts',
    dailyList,
    sumMap,
  }
}

export const changeGoalList: (goalList: GoalListItem[]) => GoalListAction = (
  goalList
) => {
  return {
    type: 'goalList',
    goalList,
  }
}

export const changeProgramOverview: (
  params: ProgramOverviewTemplate
) => ProgramOverviewAction = (data) => {
  return {
    type: 'program-overview',
    ...data,
  }
}

export const changeFocusList: (list: FocusItem[]) => FocusAction = (data) => {
  return {
    list: data,
    type: 'focusList',
  }
}

export const changeFocusType: (type: string) => FocusAction = (data) => {
  return {
    currentType: data,
    type: 'focusType',
  }
}
