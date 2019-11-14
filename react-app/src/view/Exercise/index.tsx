import React from "react";
import { Divider } from 'antd';
import FocusView from './Focus/focusView';
import DailyView from "./dailyView";
import ProgramView from './progarmView';
import './index.scss';

class DashBoard extends React.Component {
    config = {
        focus: {
            icon: {
                type: 'icon-mubiao',
                style: {
                    fontSize: '18px'
                }
            },
            title: 'focus',
            showAddBtn: false,
        },
        exercise: {
            icon: {
                type: 'icon-jianshen',
                style: {
                    fontSize: '18px'
                }
            },
            title: 'exercise',
        },
        program: {
            icon: {
                type: 'icon-code',
                style: {
                    fontSize: '16px'
                }
            },
            title: 'program',
        }
    }

    render() {
        return (
            <div className="dashboard">
                <FocusView head={this.config.focus}></FocusView>
                <DailyView head={this.config.exercise}></DailyView>
                <ProgramView head={this.config.program}></ProgramView>
            </div>
        );
    }
}

export default DashBoard;