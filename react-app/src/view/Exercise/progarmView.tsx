import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { StackedColumn } from '@/components/Chart';
import { getProgramOverview } from '@/service/exerciseService';
import { programOverviewProps, programOverviewState, ProgramItem } from '@/index.d.ts';
import moment from 'moment';

interface ProgramQueryParams {
    start: string;
    end: string;
    type: string;
    name: string;
}

class ProgramView extends React.Component<programOverviewProps, programOverviewState> {
    params: ProgramQueryParams = {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
        type: 'project',
        name: '-127',
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="program-view">
                <StackedColumn></StackedColumn>
            </div>
        );
    }

    async componentDidMount() {
        try {
            const res = await getProgramOverview(this.params);
            if (res.success) {
                const list: ProgramItem[] = res.list;
                const nameList: {name: string}[] = res.nameList;
            }
        } catch (e) {
            throw(e);
        }
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps, {

})(ProgramView);