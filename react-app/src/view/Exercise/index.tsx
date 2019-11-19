import React from "react";
import { LocaleContext } from '@/cluster/context';
import FocusView from './Focus/focusView';
import DailyView from "./dailyView";
import ProgramView from './progarmView';
import './index.scss';

class DashBoard extends React.Component {
    static contextType = LocaleContext;

    render() {
        const practiceConfig = this.context.assets.practiceConfig;
        return (
            <div className="dashboard">
                <FocusView head={ practiceConfig.focus }></FocusView>
                <DailyView head={ practiceConfig.exercise }></DailyView>
                <ProgramView head={ practiceConfig.program }></ProgramView>
            </div>
        );
    }
}

export default DashBoard;