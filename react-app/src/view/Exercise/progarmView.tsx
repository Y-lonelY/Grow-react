import React from 'react';
import { Row, Col, List, Avatar, message } from 'antd';
import { connect } from 'react-redux';
import { changeProgramOverview } from '@/store/Exercise/action';
import { StackedColumn } from '@/components/Chart';
import ChartBar from '@/components/ChartBar';
import { getProgramOverview, asyncWakatime } from '@/service/exerciseService';
import { rankBlueColor } from '@/config/bizchartTheme';
import { programOverviewProps, programOverviewState } from '@/index.d.ts';
import moment from 'moment';
import { SuperEmpty } from '@/components/Override';

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
            type: 'lang', // lang or project
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
                            asyncProgram={this.asyncProgram}
                            showUpdate
                            programSwitch
                            datePicker
                            selector />
                        <StackedColumn width={18 / 24} data={this.state.list} ></StackedColumn>
                    </Col>
                    <Col span={6}>
                        <div className="sumView">
                            {Array.isArray(this.props.programOverviewData[this.state.type].list) &&
                                this.props.programOverviewData[this.state.type].list.length > 0 ?
                                <List
                                    size='small'
                                    itemLayout='horizontal'
                                    dataSource={this.getDisplayList()}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    size='small'
                                                    alt='Y'
                                                    style={{ backgroundColor: item.backColor }}
                                                >{item.title.substr(0, 1).toUpperCase()}</Avatar>}
                                                title={item.title}
                                                description={item.desc} />
                                        </List.Item>
                                    )} /> : <SuperEmpty />
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    componentDidMount() {
        this.initData();
        setTimeout(async (value) => {
            try {
                await JSON.parse(JSON.parse(value));
            } catch (error) {
                // const e = new Error('www');
                throw(error);
            }
        }, 100)
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
    selectorChange = async (value: string) => {        
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

    /**
     * 同步编程参数
     */
    asyncProgram = async () => {
        try {
            const res = await asyncWakatime();
            if (res.success) {
                message.success(res.message, 2, () => {
                    this.initData();
                });
            } else {
                message.error('同步失败');
            }
        } catch (e) {
            throw(e);
        }
    }

    // event: 时间选择
    rangeDateChange = (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => {
        this.params['start'] = dateStrings[0];
        this.params['end'] = dateStrings[1];
        this.initData();
    }

    // 获取总和展示列表数据
    getDisplayList() {
        const type = this.state.type;
        const list = this.props.programOverviewData[type].list;
        const name = this.props.programOverviewData[type].name;
        let data = {};
        name.forEach(item => {
            data[item.name] = 0;
        });
        list.forEach(item => {
            data[item.name] += item.value;
        });
        let sum = 0;
        Object.values(data).forEach(item => {
            sum += Number(item);
        });
        // 优先排序，保证色值渐变
        let sumList =  Object.entries(data).sort((a, b) => {
            return Number(b[1]) - Number(a[1]);
        }).map((item, index) => {
            let desc = `${String(item[1]).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}-`
                + `${this.formatSeconds(item[1])}-`
                + `${(Number(item[1]) / sum * 100).toFixed(1)}%`;
            return {
                title: item[0],
                desc: desc,
                backColor: rankBlueColor[index]
            };
        });

        sumList.unshift({
            title: 'Total',
            desc: `${sum}-${this.formatSeconds(sum)}`,
            backColor: '#263238',
        });

        return sumList;
    }

    /**
     * 格式化时间展示
     */
    formatSeconds(value) {
        const h = Math.floor(value / 3600);
        const m = Math.floor((value - h * 3600) / 60);
        const s = value % 60;
        let date = '';
        if (h > 0) {
            date += `${h > 1 ? `${h}hrs` : `${h}hr`}`;
        }

        if (m > 0) {
            date += `${m > 1 ? `${m}mins` : `${m}min`}`;
        }

        if (s > 0) {
            date += `${s > 1 ? `${s}secs` : `${s}sec`}`;
        }
        return date;
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