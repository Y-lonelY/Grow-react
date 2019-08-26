import React from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, Label } from 'bizcharts';
import { Row, Col } from "antd";
import DataSet from "@antv/data-set";
import { connect } from 'react-redux';
import { changeChart } from '@/store/dashBoard/action';
import ChartBar from "@/components/ChartBar";
import * as DailyService from "@/service/dailyService";
import { dailyListChart, dailySumChart } from './config';
import { DashBoardProps } from '@/index.d.ts';

// 数据集视图构造函数
const { DataView } = DataSet;

class DailyView extends React.Component<DashBoardProps> {

    // api request
    async componentWillMount() {
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
        const sumMap = this.props.dashBoardData ? this.props.dashBoardData.sumMap : {};
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
                        <Chart
                            className='dailyChartBox'
                            padding="auto"
                            height={460}
                            data={this.props.dashBoardData ? this.props.dashBoardData.dailyList : []}
                            scale={dailyListChart.scale}
                            forceFit>
                            {/* 图例 */}
                            <Legend></Legend>
                            {/* Axis 通过 name 来指定坐标轴 */}
                            {/* position 控制当前坐标轴展示位置 */}
                            <Axis name="date" position="bottom"></Axis>
                            <Axis name="number" position="left"></Axis>
                            {/* 点，线，面几何图形 */}
                            {/* position 位置属性的映射，表示标记位置是由哪些数据控制，即（x,y） */}
                            {/* 对于 line 来说，size表示线的宽度 */}
                            <Geom type="line" position="date*number" size={2} color={"type"}></Geom>
                            {/* 'shapeType'，指定常量，将所有数据值映射到固定的 shape */}
                            {/* 对于 point 来说，size表示点的半径 */}
                            {/* style 作用于点样式 */}
                            <Geom
                                type="point"
                                position="date*number"
                                size={4}
                                shape={'circle'}
                                color={"type"}
                                style={{ stroke: '#fff', lineWidth: 1 }}
                            />
                            {/* 设置y:垂直辅助线 */}
                            <Tooltip crosshairs={{ type: 'y' }} />
                        </Chart>
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

// 建立 state.dashBoardData 和 this.props.dashBoardData 的对应关系
function mapStateToProps({ dashBoardData }: any) {
    return {
        dashBoardData,
    }
}

export default connect(mapStateToProps, {
    changeChart
})(DailyView);