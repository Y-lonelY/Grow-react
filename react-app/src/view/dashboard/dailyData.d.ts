interface DashBoardData {
    sumMap: object;
    dailyList: object[];
}

export interface DashBoardProps {
    changeChart: (list, sum) => void;
    dashBoardData: DashBoardData;
}