import React from "react";
import { Row, Col } from "antd";
import { connect } from 'react-redux';
import { Polyline, Pie } from '@/components/Chart';
import { changeChart } from '@/store/Exercise/action';
import ChartBar from "@/components/ChartBar";
import { getDailyExerciseList } from "@/service/dailyService";
import { ExerciseProps } from '@/index.d.ts';

class DailyView extends React.Component<ExerciseProps, {}> {

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
                        <Polyline data={this.props.exerciseData}></Polyline>
                    </Col>
                    <Col className='dailySumView' span={6}>
                        {Object.keys(sumMap).length &&
                            <div>
                                <div className="dailySumBox">{sumListView}</div>
                                <Pie data={this.props.exerciseData}></Pie>
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
                this.props.changeChart(res.list, res.sum);
            }
        } catch (e) {
            throw e;
        }
    }

    switchChange = (checked) => {
        console.log(checked)
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