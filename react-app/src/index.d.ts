/**
 * redux
 */
export interface StoreState{
    dailyList?: any[];
    sumMap?: {};
}

/**
 * chart
 */
export interface PolylineData {
    type: string,
    date: string,
    number: string
}

export interface PieData {
    leg?: string,
    belly?: string,
    chest?: string
}

/**
 * DashBoard module declare
 */

export interface ExerciseData {
    sumMap?: {};
    dailyList?: {
        id: number,
        date: string,
        leg: string,
        belly: string,
        chest: string
    }[];
}

export interface ExerciseChartAction extends ExerciseData {
    type: string;
}

export type ExerciseProps = {
    changeChart: (...ExerciseData) => ExerciseChartAction;
    exerciseData: ExerciseData;
}

export type ExerciseState = {
    showChart: boolean,
    chart: PolylineData[],
    table: ExerciseTableData[]
}

export interface ExerciseTableData {
    key: string,
    date: string,
    leg: number,
    belly: number,
    chest: number
}

// 用于各个模块的action.type类型检查

export enum DailyChartTypes {
    DAILYCHARTS = "dailycharts"
}