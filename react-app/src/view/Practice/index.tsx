import React from "react";
import { LocaleContext } from '@/cluster/context';
import DailyView from "./dailyView";
import ProgramView from './progarmView';
import './index.scss';

class PracticeView extends React.Component {
    static contextType = LocaleContext;

    render() {
        const practiceConfig = this.context.assets.practiceConfig;
        return (
            <div className="dashboard">
                <DailyView head={ practiceConfig.exercise }></DailyView>
                <ProgramView head={ practiceConfig.program }></ProgramView>
            </div>
        );
    }
}

export default PracticeView;