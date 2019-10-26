import moment from 'moment';

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
 * Exercise module declare
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
    defaultDateRange: [moment.Moment, moment.Moment]
}

export interface ExerciseTableData {
    key: string;
    date: string;
    leg: number;
    belly: number;
    chest: number;
}

/**
 * GoalList Module Declare
 */

export interface GoalListItem {
    id: number;
    start_date: string;
    end_date: string | null;
    reward: string;
    type: string;
    total_price: string;
    goal: string;
    summary: string;
    remark: string | null;
}

export interface GoalListAction {
    goalList: GoalListItem[];
    type: string;
}

export interface GoalListProps {
    goalListData: GoalListItem[];
    changeGoalList: (goalList: GoalListItem[]) => GoalListAction;
    updateDate: (params: { start: string, end: string}, changeDateLabel?: boolean) => void
}

export interface GoalListState {
    expandIndex: string
}

/**
 * program module
 */
export interface ProgramItem {
    id: number;
    date: string;
    name: string;
    value: number;
}

export interface programOverviewAction {
    list: ProgramItem[];
    nameList: {name: string}[];
    type: string;
}

export interface programOverviewProps {
    list: ProgramItem[];
    nameList: {name: string}[];
    changeProgramOverview: (param: {list: ProgramItem[], nameList: {name: string}[]}) => programOverviewAction;
}

export interface programOverviewState {
    
}



// 用于各个模块的action.type类型检查

export enum ExerciseTypes {
    DAILYCHARTS = 'dailycharts',
    GOALLIST = 'goalList',
    PROGRAMOVERVIEW = 'program-overview',
}