import React from "react";
import DailyView from "./dailyView"

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