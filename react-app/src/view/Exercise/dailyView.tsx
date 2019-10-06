import React from "react";
import { Row, Col, Table } from "antd";
import { ColumnProps } from 'antd/es/table';
import { connect } from 'react-redux';
import { Polyline, Pie } from '@/components/Chart';
import { changeChart } from '@/store/Exercise/action';
import ChartBar from "@/components/ChartBar";
import { getDailyExerciseList } from "@/service/dailyService";
import { ExerciseProps, ExerciseState, PolylineData, ExerciseTableData } from '@/index.d.ts';

class DailyView extends React.Component<ExerciseProps, ExerciseState> {

    constructor(props) {
        super(props)
        this.state = {
            showChart: false
        }
    }

    render() {
        const sumMap = this.props.exerciseData ? this.props.exerciseData.sumMap : {};
        // 注意添加 key
        const sumListView = Object.entries(sumMap).map((item, index) => {
            return (
                <Row className='dailySumItem' key={index}>
                    <Col className='dailySumTitle' span={8}>{String(item[0]).toUpperCase()}</Col>
                    <Col className='dailySumLabel' span={16}>{item[1]}</Col>
                </Row>
            );
        });


        return (
            <div className='dailyChartView'>
                <Row>
                    <Col className='dailyListView' span={18}>
                        <ChartBar
                            title='最近30次锻炼记录'
                            switchChange={this.switchChange}
                            tableSwitch></ChartBar>
                        {this.state.showChart ?
                            <Polyline data={this.handlePolylineData()}></Polyline> :
                            <Table dataSource={dataSource} columns={columns} />
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
            const res = await getDailyExerciseList();
            if (res.success) {
                // 更新 redux store
                this.props.changeChart(res.list, res.sum);
            }
        } catch (e) {
            throw e;
        }
    }

    // 处理折线图数据
    handlePolylineData:() => PolylineData[] = () => {
        let list = [];

        if (this.props.exerciseData && this.props.exerciseData.dailyList && this.props.exerciseData.dailyList.length > 0) {
            this.props.exerciseData.dailyList.forEach(item => {
                list.push({
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
                })
            });
        }

        return list;
    }

    // 处理表格数据
    handleTableData:() => ExerciseTableData[] = () => {
        let list = [];

        if (this.props.exerciseData && this.props.exerciseData.dailyList && this.props.exerciseData.dailyList.length > 0) {
            this.props.exerciseData.dailyList.map((item,index) => {
                return {
                    key: String(item.id),
                    date: item.date,
                    leg: Number(item.leg),
                    belly: Number(item.belly),
                    chest: Number(item.chest)
                };
            })
        }

        return list;
    }

    switchChange = (checked) => {
        this.setState({
            showChart: checked
        });
        console.log(this.props.exerciseData)
    }
}

// 建立 this.state.dashBoardData 和 this.props.dashBoardData 的对应关系
function mapStateToProps({ exerciseData }: any) {
    return {
        exerciseData,
    }
}

export default connect(mapStateToProps, {
    changeChart
})(DailyView);