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
}

class ProgramView extends React.Component<programOverviewProps, programOverviewState> {
    params: ProgramQueryParams = {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
    };

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            type: 'lang',
            selectorValue: 0,
        };
    }

    render() {
        const selectorList = this.props.programOverviewData[this.state.type].name;
        return (
            <div className="programView">
                <Row>
                    <Col className='listView' span={18}>
                        <ChartBar
                            title={this.state.list.length > 0 ? `共${this.state.list.length}条编程${this.state.type === 'lang' ? '语言' : '项目'}记录` : ''}
                            defaultDateRange={[moment(this.params.start), moment(this.params.end)]}
                            rangeDateChange={this.rangeDateChange}
                            selectorList={selectorList}
                            selectorValue={this.state.selectorValue}
                            selectorChange={this.selectorChange}
                            programSwitchChange={this.programSwitchChange}
                            programSwitch
                            datePicker
                            selector />
                        <StackedColumn width={18 / 24} data={this.state.list} ></StackedColumn>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        );
    }

    componentDidMount() {
        this.initData();
    }

    initData = async () => {
        try {
            const res = await getProgramOverview(this.params);
            if (res.success) {
                this.props.changeProgramOverview(res.data);
                this.setState({
                    list: res.data[this.state.type].list
                });
            }
        } catch (e) {
            throw (e);
        }
    }

    // event: 下拉选择
    selectorChange = (value: string) => {
        const type = this.state.type;
        let list = this.props.programOverviewData[type].list;
        if (value !== '-127') {
            list = this.props.programOverviewData[type].list.filter(item => {
                return item.name.toLowerCase().includes(value.toLowerCase());
            });
        };
        this.setState({
            list: list,
            selectorValue: value
        });
    }

    // event: lang/project 切换
    programSwitchChange = (value: boolean) => {
        const type = value ? 'lang' : 'project';
        const list = this.props.programOverviewData[type].list;
        this.setState({
            type: type,
            list: list,
            selectorValue: 0
        });
    }

    // event: 时间选择
    rangeDateChange = (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => {
        this.params['start'] = dateStrings[0];
        this.params['end'] = dateStrings[1];
        this.initData();
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