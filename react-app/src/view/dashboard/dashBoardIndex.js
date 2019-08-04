import React, {Component} from "react";
import DailyView from "./dailyView"

class DashBoard extends Component {
    render() {
        return (
            <div className="dashboard">
                <DailyView></DailyView>
            </div>
        );
    }
}

export default DashBoard;