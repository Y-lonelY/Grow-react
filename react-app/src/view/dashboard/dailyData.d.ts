interface DashBoardData {
    sumMap: object;
    dailyList: object[];
}

export interface DashBoardProps {
    changeChart: (list: any, sum: any) => void;
    dashBoardData: DashBoardData;
}