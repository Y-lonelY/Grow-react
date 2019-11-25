import moment from 'moment';

/**
 * errorParams
 */
export interface ErrorParams {
    readonly project: string;
    id?: number;
    username?: string;
    path?: string;
    referrer?: string;
    event?: string;
    type?: string;
    level?: number;
    stack?: string;
    message?: string;
    origin?: string;
    useragent?: string;
    network?: string;
    appversion?: string;
}

/**
 * redux
 */
export interface StoreState{
    dailyList?: any[];
    sumMap?: {};
}

/**
 * header config
 */
export interface HeaderData {
    icon: {
        type: string,
        style?: {}
    };
    title: string;
    showAddBtn?: boolean;
    addEvent?: () => void;
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
    head: HeaderData;
    exerciseData: ExerciseData;
    changeChart: (...ExerciseData) => ExerciseChartAction;
    changeGoalList: (goalList: GoalListItem[]) => GoalListAction;
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

export interface programOverviewTemplate {
    lang: {
        list: ProgramItem[];
        name: {name: string, value?: string}[];
    },
    project: {
        list: ProgramItem[];
        name: {name: string, value?: string}[];
    }
}

export interface programOverviewAction {
    lang: {
        list: ProgramItem[];
        name: {name: string, value?: string}[];
    };
    project: {
        list: ProgramItem[];
        name: {name: string, value?: string}[];
    };
    type: string;
}

export interface programOverviewProps {
    head: HeaderData;
    programOverviewData: programOverviewTemplate;
    changeProgramOverview: (params: programOverviewTemplate) => programOverviewAction;
}

export interface programOverviewState {
    list: ProgramItem[];
    type: string;
    selectorValue: string | number;
}


// focus module
export interface focusItem {
    id?: number;
    title?: string;
    details?: string;
    start_date?: string;
    end_date?: string;
    pictures?: string;
    status?: number;
    priority?: number;
}

export interface focusAction {
    list?: focusItem[];
    currentType?: string;
    type: string;
}

// 这里设置 head 为可选是因为 drawerView 模块需要继承该 interface
export interface focusProps {
    head?: HeaderData;
    focusData: {
        list: focusItem[],
        currentType: string
    };
    changeFocusList: (list: focusItem[]) => focusAction;
    changeFocusType: (type: string) => focusAction;
}

// trivia module
export interface TriviaData {
    id: number;
    details: string;
    link: string;
    user: string;
    group: number;
    name: string;
    last_update?: string;
}

export interface TriviaGroupData {
    id?: number;
    name?: string;
    status?: number;
}

export interface TriviaState {
    triviaList: TriviaData[] | [];
    groupList: TriviaGroupData[];
    group: number;
    panelType: string;
    current: number;
    visible: boolean;
}

// 用于各个模块的action.type类型检查

export enum ExerciseTypes {
    DAILYCHARTS = 'dailycharts',
    GOALLIST = 'goalList',
    PROGRAMOVERVIEW = 'program-overview',
    FOCUSLIST = 'focusList',
    FOCUSTYPE = 'focusType',
}