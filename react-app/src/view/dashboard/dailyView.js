import React from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, } from 'bizcharts';
import { Row, Col } from "antd";
import ChartBar from "../../components/chartBar/index";
import * as DailyService from "../../service/dailyService";

// 定义度量
const cols = {
    date: {
        // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示.
        alias: '日',
        // 数据类型，非连续的时间类型
        type: 'timeCat',
        // 坐标轴两端留白
        range: [0, 0.98]
    },
    number: {
        // 连续非线性数据
        type: 'pow'
    }
};


class DailyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dailyList: [],
            sumList: {},
        }
    }

    // api request
    async componentDidMount() {
        try {
            const res = await DailyService.getDailyExerciseList();

            if (res.success) {
                this.setState({
                    dailyList: res.list,
                    sumList: res.sum,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const sumListView = Object.entries(this.state.sumList).map(item => {
            return (
                <Row className='dailySumItem'>
                    <Col className='dailySumTitle' span={8}>{String(item[0]).toUpperCase()}</Col>
                    <Col className='dailySumLabel' span={16}>{item[1]}</Col>
                </Row>
            );
        });

        return (
            <div className='dailyChartView'>
                <Row>
                    <Col className='dailyListView' span={18}>
                        <ChartBar title='最近30次锻炼记录'></ChartBar>
                        <Chart
                            className='dailyChartBox'
                            padding="auto"
                            forceFit={true}
                            height={460}
                            data={this.state.dailyList}
                            scale={cols}>
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
                        {Object.keys(this.state.sumList).length &&
                            <div className="dailySumBox">{sumListView}</div>
                        }
                    </Col>
                </Row>

            </div>
        )
    }
}

export default DailyView