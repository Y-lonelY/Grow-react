import React from "react";
import { Row, Col, Table, message} from "antd";
import { SuperEmpty } from '@/components/Override';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'react-redux';
import GoalListView from './goalListView';
import { Polyline, Pie } from '@/components/Chart';
import { changeChart } from '@/store/Exercise/action';
import ChartBar from "@/components/ChartBar";
import { getDailyExerciseList, addExerciseList } from '@/service/exerciseService';
import { colors } from '@/config/bizchartTheme';
import { ExerciseProps, ExerciseState, PolylineData, ExerciseTableData, PieData } from '@/index.d.ts';
import moment from "moment";

class DailyView extends React.Component<ExerciseProps, ExerciseState> {

    // 查询参数
    params = {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    }

    constructor(props) {
        super(props)
        this.state = {
            showChart: true,
            normalize: false,
            chart: [],
            table: [],
            avgData: {}
        }
    }

    render() {
        const sumMap = this.props.exerciseData ? this.props.exerciseData.sumMap : {};
        // 注意添加 key
        const sumListView = Object.entries(sumMap).map((item, index) => {
            return (
                <Row className='dailySumItem' key={index}>
                    <Col className='dailySumTitle' span={8} style={{color: colors[index]}}>{String(item[0]).toUpperCase()}</Col>
                    <Col className='dailySumLabel' span={16}>{item[1] ? item[1] : '-'}</Col>
                </Row>
            );
        });

        const columns: ColumnProps<ExerciseTableData>[] = [{
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

        return (
            <div className='dailyChartView'>
                <Row>
                    <Col className='goalListView' span={4}>
                        <GoalListView />
                    </Col>
                    <Col className='dailyListView' span={14}>
                        <ChartBar
                            title={this.state.chart.length > 0 ?`共${this.state.chart.length}条锻炼记录` : ''}
                            switchChange={this.switchChange}
                            defaultDateRange={[moment(this.params.start), moment(this.params.end)]}
                            rangeDateChange={this.rangeDateChange}
                            addSubmit={this.addExercise}
                            normalizeEvent={this.chartNormalize}
                            showNormalize
                            showAddButton
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
                                locale={{emptyText: <SuperEmpty />}}
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
        try {
            const res = await getDailyExerciseList(this.params);
            if (res.success) {
                // 更新 redux store
                this.props.changeChart(res.list, res.sum);
                const polyData = this.handlePolylineData()
                this.setState(polyData)
            }
        } catch (e) {
            throw e;
        }
    }

    // 更新数据，在添加/筛选后执行
    async update() {
        try {
            const res = await getDailyExerciseList(this.params);
            if (res.success) {
                // 更新 redux store
                this.props.changeChart(res.list, res.sum);
                const polyData = this.handlePolylineData();
                this.setState(polyData)
            }
        } catch (e) {
            throw e;
        }
    }

    // 处理折线图数据
    handlePolylineData:() => {chart: PolylineData[], table: ExerciseTableData[]} = () => {
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
        this.update();
    }

    // add exercise record
    addExercise = async (date, leg, chest, belly) => {
        let params = {
            date: date,
            leg: Number(leg),
            belly: Number(belly),
            chest: Number(chest)
        };
        try {
            const res = await addExerciseList(params);

            if (res.success) {
                message.success('添加成功', 2, () => {this.update()});
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
    changeChart
})(DailyView);