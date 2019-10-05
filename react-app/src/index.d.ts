/**
 * redux
 */
export interface StoreState{
    dailyList?: any[];
    sumMap?: {};
}


/**
 * DashBoard module declare
 */

export interface ExerciseData {
    sumMap?: {};
    dailyList?: {}[];
}

export interface ExerciseChartAction extends ExerciseData {
    type: string;
}

export type ExerciseProps = {
    changeChart: (...DashBoardData) => ExerciseChartAction;
    exerciseData: ExerciseData;
}

// 用于各个模块的action.type类型检查

export enum DailyChartTypes {
    DAILYCHARTS = "dailycharts"
}