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
    leg?: string | number;
    belly?: string | number;
    chest?: string | number;
}

/**
 * DashBoard module declare
 */

export interface ExerciseData {
    sumMap?: PieData;
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

export interface ExerciseState {
    showChart: boolean;
    normalize: boolean;
    chart: PolylineData[];
    table: ExerciseTableData[];
    avgData: PieData;
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