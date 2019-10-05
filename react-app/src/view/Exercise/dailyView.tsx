import React from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, Label } from 'bizcharts';
import { Row, Col } from "antd";
import DataSet from "@antv/data-set";
import { connect } from 'react-redux';
import { Polyline } from '@/components/Chart/polyline';
import { changeChart } from '@/store/Exercise/action';
import ChartBar from "@/components/ChartBar";
import * as DailyService from "@/service/dailyService";
import { dailyListChart, dailySumChart } from './config';
import { ExerciseProps } from '@/index.d.ts';

// 数据集视图构造函数
const { DataView } = DataSet;

class DailyView extends React.Component<ExerciseProps, {}> {

    // api request
    async componentDidMount() {
        try {
            const res = await DailyService.getDailyExerciseList();

            if (res.success) {
                this.props.changeChart(res.list, res.sum);
            }
        } catch (e) {
            throw e;
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
        let sumChartData = [];
        Object.entries(sumMap).forEach(item => {
            let currentObj = {};
            currentObj['item'] = item[0].toUpperCase();
            currentObj['count'] = item[1];
            sumChartData.push(currentObj);
        });
        // 声明一个数据视图实例
        const dv = new DataView();
        // source 载入数据
        // transform 根据配置项处理数据
        dv.source(sumChartData).transform({
            // 通过 type 指定总和百分比
            type: 'percent',
            // 每个 dimension 下，其 filed 占比
            field: 'count',
            dimension: 'item',
            // 将结果存储在 percent 字段
            as: 'percent',
        });

        return (
            <div className='dailyChartView'>
                <Row>
                    <Col className='dailyListView' span={18}>
                        <ChartBar title='最近30次锻炼记录'></ChartBar>
                        <Polyline data={this.props.exerciseData}></Polyline>
                    </Col>
                    <Col className='dailySumView' span={6}>
                        {Object.keys(sumMap).length &&
                            <div>
                                <div className="dailySumBox">{sumListView}</div>
                                <Chart data={dv} scale={dailySumChart.scale} height={320} padding={20} forceFit>
                                    <Coord type="theta" radius={0.65} />
                                    <Axis name="percent" />
                                    <Geom type="intervalStack" position="percent" color="item" style={{ lineWidth: 1, stroke: "#fff" }}>
                                        <Label
                                            content="percent"
                                            textStyle={{
                                                fontSize: '10'
                                            }}
                                            formatter={(val, item) => {
                                                const percent = (item.point.percent * 100).toFixed(2);
                                                return `${item.point.item}-${percent}%`;
                                            }}
                                        />
                                    </Geom>
                                </Chart>
                            </div>
                        }
                    </Col>
                </Row>

            </div>
        )
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