import {ExerciseChartAction, ExerciseData} from '@/index.d.ts';

const changeChart: (...ExerciseData) => ExerciseChartAction  = (dailyList, sumMap) => {
    return {
        type: 'dailycharts',
        dailyList,
        sumMap,
    }
}

export { changeChart };