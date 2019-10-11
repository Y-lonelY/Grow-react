import React from "react";
import { Row, Col, Table, message } from "antd";
import { ColumnProps } from 'antd/es/table';
import { connect } from 'react-redux';
import { Polyline, Pie } from '@/components/Chart';
import { changeChart } from '@/store/Exercise/action';
import ChartBar from "@/components/ChartBar";
import { getDailyExerciseList, addExerciseList } from "@/service/dailyService";
import { colors } from '@/config/bizchartTheme';
import { ExerciseProps, ExerciseState, PolylineData, ExerciseTableData } from '@/index.d.ts';
import moment from "moment";
import { normalize } from "path";

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
            chart: [],
            table: []
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
                    <Col className='dailyListView' span={18}>
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
                            <Polyline className='dailyChartBox' data={this.state.chart}></Polyline> :
                            <Table<ExerciseTableData> className='dailyTableBox' size='middle' dataSource={this.state.table} columns={columns} />
                        }
                    </Col>
                    <Col className='dailySumView' span={6}>
                        {Object.keys(sumMap).length &&
                            <div>
                                <div className="dailySumBox">{sumListView}</div>
                                <Pie data={this.props.exerciseData ? this.props.exerciseData.sumMap : {}}></Pie>
                            </div>
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

        if (this.props.exerciseData && this.props.exerciseData.dailyList && this.props.exerciseData.dailyList.length > 0) {
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
        }

        return {
            chart: chartList,
            table: tableList
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
            leg: leg,
            belly: belly,
            chest: chest
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
    chartNormalize = (normalize) => {
        console.log(normalize);
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