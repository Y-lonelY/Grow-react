import React, {Component} from "react";
import DailyView from "./DailyView"

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