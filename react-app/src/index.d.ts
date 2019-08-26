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

export interface DashBoardData {
    sumMap?: {};
    dailyList?: {}[];
}

export interface ChangeChart extends DashBoardData{
    type: string;
}

export type DashBoardProps = {
    changeChart: (...DashBoardData) => ChangeChart;
    dashBoardData: DashBoardData;
}

// 用于各个模块的action.type类型检查

export enum DailyChartTypes {
    DAILYCHARTS = "dailycharts"
}