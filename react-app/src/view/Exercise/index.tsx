import React from "react";
import { Divider } from 'antd';
import DailyView from "./dailyView"
import './index.scss'

class DashBoard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Divider orientation='left'>
                    Exercise Records
                </Divider>
                <DailyView></DailyView>
                <Divider orientation='left'>
                    Programming Records
                </Divider>
            </div>
        );
    }
}

export default DashBoard;