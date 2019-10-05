import React from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, Label } from 'bizcharts';
import { dailyListChart } from './config';
import { ExerciseData } from '@/index.d.ts';

interface polylineProps {
    data: ExerciseData
}

class Polyline extends React.Component<polylineProps, {}> {
    render() {
        return (
            <Chart
                className='dailyChartBox'
                padding="auto"
                height={460}
                data={this.props.data ? this.props.data.dailyList : []}
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
        )
    }
}

export { Polyline }