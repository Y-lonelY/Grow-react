import React from "react";
import { Divider } from 'antd';
import DailyView from "./dailyView";
import ProgramView from './progarmView';
import './index.scss';

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
                <ProgramView />
            </div>
        );
    }
}

export default DashBoard;