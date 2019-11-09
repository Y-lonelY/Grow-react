import React from "react";
import { Divider } from 'antd';
import FocusView from './focusView';
import DailyView from "./dailyView";
import ProgramView from './progarmView';
import './index.scss';

class DashBoard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Divider orientation='left'>Focus</Divider>
                <FocusView></FocusView>
                <Divider orientation='left'>Exercise Records</Divider>
                <DailyView></DailyView>
                <Divider orientation='left'>Programming Records</Divider>
                <ProgramView></ProgramView>
            </div>
        );
    }
}

export default DashBoard;