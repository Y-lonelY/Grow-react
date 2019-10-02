import React from "react";
import DailyView from "./dailyView"
import './index.scss'

class DashBoard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <DailyView></DailyView>
            </div>
        );
    }
}

export default DashBoard;