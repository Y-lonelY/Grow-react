import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { changeProgramOverview } from '@/store/Exercise/action';
import { StackedColumn } from '@/components/Chart';
import ChartBar from '@/components/ChartBar';
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
            defaultDateRange: [moment(this.params.start), moment(this.params.end)],
        };
    }

    render() {
        return (
            <div className="programView">
                <Row>
                    <Col className='listView' span={18}>
                        <ChartBar
                            title={this.props.programOverviewData.list.length > 0 ? `共${this.props.programOverviewData.list.length}条编程记录` : ''}
                            defaultDateRange={this.state.defaultDateRange}
                            datePicker />
                        <StackedColumn width={18 / 24} data={this.props.programOverviewData.list} ></StackedColumn>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        );
    }

    async componentDidMount() {
        try {
            const res = await getProgramOverview(this.params);
            if (res.success) {
                this.props.changeProgramOverview(res.list, res.nameList);
                console.log(this.props);
            }
        } catch (e) {
            throw (e);
        }
    }
}

function mapStateToProps({ programOverviewData }: any) {
    return {
        programOverviewData
    };
}

export default connect(mapStateToProps, {
    changeProgramOverview
})(ProgramView);