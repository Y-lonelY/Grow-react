import React from "react";
import { Row, Col, Table, message } from "antd";
import { LocaleContext } from '@/cluster/context';
import { SuperEmpty, Header } from '@/components/Override';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'react-redux';
import { changeChart, changeGoalList } from '@/store/Exercise/action';
import GoalListView from './goalListView';
import { Polyline, Pie } from '@/components/Chart';
import ChartBar from "@/components/ChartBar";
import { getDailyExerciseList, addExerciseList, getGoalList } from '@/service/practice/service';
import { colors } from '@/config/colors';
import { ExerciseProps, PolylineData, ExerciseTableData, PieData } from '@/index.d.ts';
import moment from 'moment';

interface queryInterface {
    start: string;
    end: string;
}

interface ExerciseState {
    showChart: boolean;
    normalize: boolean;
    chart: PolylineData[];
    table: ExerciseTableData[];
    avgData: PieData;
    defaultDateRange: [moment.Moment, moment.Moment]
}

/**
 * Exercise daily Component
 * 通过 redux 来实现通信
 */
class DailyView extends React.PureComponent<ExerciseProps, ExerciseState> {

    // 查询参数
    params: queryInterface = {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    }

    static contextType = LocaleContext;

    constructor(props) {
        super(props)
        this.state = {
            showChart: true,
            normalize: false,
            chart: [],
            table: [],
            avgData: {},
            defaultDateRange: [moment(this.params.start), moment(this.params.end)],
        }
    }

    render() {
        const sumMap = this.props.exerciseData ? this.props.exerciseData.sumMap : {};
        // 注意添加 key
        const sumListView = Object.entries(sumMap).map((item, index) => {
            return (
                <Row className='dailySumItem' key={index}>
                    <Col className='dailySumTitle' span={8} style={{ color: colors[index] }}>{String(item[0]).toUpperCase()}</Col>
                    <Col className='dailySumLabel' span={16}>{item[1] ? item[1] : '-'}</Col>
                </Row>
            );
        });

        let columns: ColumnProps<ExerciseTableData>[] = [{
            key: 'date',
            title: '日期',
            dataIndex: 'date'
        }, {
            key: 'leg',
            title: 'Leg',
            dataIndex: 'leg'
        }, {
            key: 'belly',
            title: 'Belly',
            dataIndex: 'belly'
        }, {
            key: 'chest',
            title: 'Chest',
            dataIndex: 'chest'
        }];

        // 国际化内容
        const locale = this.context.locale;
        let title = '';

        if (locale === 'zh_cn') {
            columns[0].title = 'Date';
            title = this.state.chart.length > 0 ? `共${this.state.chart.length}条锻炼记录` : '';
        } else {
            title = this.state.chart.length > 0 ? `total ${this.state.chart.length} records` : '';
        }

        return (
            <div className='dailyChartView'>
                <Header {...this.props.head} />
                <Row>
                    <Col className='goalListView' span={4}>
                        <GoalListView updateDate={this.update.bind(this)} />
                    </Col>
                    <Col className='dailyListView' span={14}>
                        <ChartBar
                            title={title}
                            switchChange={this.switchChange}
                            defaultDateRange={this.state.defaultDateRange}
                            rangeDateChange={this.rangeDateChange}
                            addBox={{
                                showAddButton: true,
                                initValue: this.props.exerciseData.dailyList.slice(0, 1)[0],
                                addSubmit: this.addExercise
                            }}
                            normalizeEvent={this.chartNormalize}
                            showNormalize
                            datePicker
                            tableSwitch />
                        {this.state.showChart ?
                            <Polyline
                                className='dailyChartBox'
                                data={this.state.chart}
                                avgData={this.state.avgData}
                                normalize={this.state.normalize}></Polyline> :
                            <Table<ExerciseTableData>
                                className='dailyTableBox'
                                size='middle'
                                dataSource={this.state.table}
                                locale={{ emptyText: <SuperEmpty /> }}
                                columns={columns} />
                        }
                    </Col>
                    <Col className='dailySumView' span={6}>
                        {Object.keys(sumMap).length > 0 ?
                            <div>
                                <div className="dailySumBox">{sumListView}</div>
                                <Pie data={this.props.exerciseData ? this.props.exerciseData.sumMap : {}}></Pie>
                            </div> : <SuperEmpty mTop='294px' />
                        }
                    </Col>
                </Row>

            </div>
        )
    }

    // api request
    async componentDidMount() {
        const res = await getDailyExerciseList(this.params);

        if (res.success) {
            // 更新 redux store
            this.props.changeChart(res.list, res.sum);
            const polyData = Object.assign({}, this.handlePolylineData());
            this.setState(polyData)
        }
    }

    /**
     * 更新数据，在添加/筛选后执行
     * @param params 筛选参数
     * @param changeDateLabel 标记是否需要更新时间空间范围
     * @param updateGoal 标记是否同步 goal list
     */
    public async update(params: queryInterface = this.params, changeDateLabel?: boolean, updateGoal?: boolean) {
        const res = await getDailyExerciseList(params);
        if (res.success) {
            // 更新 redux store
            this.props.changeChart(res.list, res.sum);
            const polyData = Object.assign({}, this.handlePolylineData());
            this.setState(polyData);

            if (changeDateLabel) {
                this.setState({
                    defaultDateRange: [moment(params.start), moment(params.end)]
                });
            }

            if (updateGoal) {
                const res = await getGoalList();
                if (res.success) {
                    this.props.changeGoalList(res.list);
                }
            }
        }
    }

    // 处理折线图数据
    handlePolylineData: () => { chart: PolylineData[], table: ExerciseTableData[] } = () => {
        let chartList: PolylineData[] = [];
        let tableList: ExerciseTableData[] = [];
        let avgData: PieData = {};

        // 处理列表数据
        if (this.props.exerciseData && this.props.exerciseData.dailyList && this.props.exerciseData.dailyList.length > 0) {
            const len = this.props.exerciseData.dailyList.length;

            this.props.exerciseData.dailyList.forEach(item => {
                chartList.push({
                    type: 'leg',
                    date: item.date,
                    number: item.leg,
                }, {
                    type: 'belly',
                    date: item.date,
                    number: item.belly,
                }, {
                    type: 'chest',
                    date: item.date,
                    number: item.chest,
                });

                tableList.push({
                    key: String(item.id),
                    date: item.date,
                    leg: Number(item.leg),
                    belly: Number(item.belly),
                    chest: Number(item.chest)
                });
            });

            // 平均值获取
            avgData['leg'] = this.props.exerciseData.sumMap.leg ? Number(this.props.exerciseData.sumMap.leg) / len : 0;
            avgData['belly'] = this.props.exerciseData.sumMap.belly ? Number(this.props.exerciseData.sumMap.belly) / len : 0;
            avgData['chest'] = this.props.exerciseData.sumMap.chest ? Number(this.props.exerciseData.sumMap.chest) / len : 0;
        }

        return {
            chart: chartList,
            table: tableList,
            avgData: avgData
        };
    }

    // chart/table switch
    switchChange = (checked) => {
        this.setState({
            showChart: checked
        });
    }

    // range date selected
    rangeDateChange = (dates, dateStrings) => {
        this.params.start = dateStrings[0];
        this.params.end = dateStrings[1];
        this.update(this.params, true, false);
    }

    // add exercise record
    addExercise = async (date, {leg, chest, belly}) => {
        let params = {
            date: date,
            leg: Number(leg),
            belly: Number(belly),
            chest: Number(chest)
        };
        try {
            const res = await addExerciseList(params);

            if (res.success) {
                this.update(this.params, false, true);
                message.success('添加成功', 2);
            } else {
                message.error('添加失败');
            }
        } catch (e) {
            throw e;
        }
    }

    // 归一化处理
    chartNormalize = (value) => {
        this.setState({
            normalize: value
        });
    }
}

// 建立 this.state.exerciseData 和 this.props.exerciseData 的对应关系
function mapStateToProps({ exerciseData }: any) {
    return {
        exerciseData,
    }
}

export default connect(mapStateToProps, {
    changeChart,
    changeGoalList
})(DailyView);