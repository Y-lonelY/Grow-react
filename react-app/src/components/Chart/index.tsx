import React from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, Label } from 'bizcharts';
import DataSet from "@antv/data-set";
import { ExercisePolyline, ExercisePie } from './config';
import SystemConfig from '@/config/sysConfig';
import { PieData, PolylineData } from '@/index.d.ts';

interface PolylineProps {
    data: PolylineData[],
    className: string
}

interface PieProps {
    data: PieData
}

// 数据集视图构造函数
const { DataView } = DataSet;

/**
 * 折线图
 * width 根据dom结构计算，防止其渲染有闪动
 * forceFit 根据父节点的宽度进行定位
 * placeholder 处理无数据时提示
 */
class Polyline extends React.Component<PolylineProps, {}> {
    public render() {
        return (
            <Chart
                className={this.props.className}
                padding="auto"
                height={500}
                width={window.innerWidth * 0.9 * 0.75}
                data={this.props.data}
                scale={ExercisePolyline.scale}
                forceFit
                placeholder>
                {/* 图例 */}
                <Legend></Legend>
                {/* Axis 通过 name 来指定坐标轴 */}
                {/* position 控制当前坐标轴展示位置 */}
                <Axis name="date" position="bottom"></Axis>
                <Axis name="number" position="left"></Axis>
                {/* 点，线，面几何图形 */}
                {/* position 位置属性的映射，表示标记位置是由哪些数据控制，即（x,y） */}
                {/* 对于 line 来说，size表示线的宽度 */}
                <Geom type="line" position="date*number" size={2} color="type"></Geom>
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

/**
 * 饼图
 */
class Pie extends React.Component<PieProps, {}> {
    public render() {
        const sumMap = this.props.data;
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

        const spe = {
            fontSize: SystemConfig.hugeScreen ? '12' : '10'
        }

        return (
            <Chart
                data={dv}
                scale={ExercisePie.scale}
                height={320}
                width={window.innerWidth * 0.9 * 0.25}
                padding="auto"
                forceFit
                placeholder>
                <Coord type="theta" radius={0.65} />
                <Axis name="percent" />
                <Geom type="intervalStack" position="percent" color="item" style={{ lineWidth: 1, stroke: "#fff" }}>
                    <Label
                        content="percent"
                        textStyle={{
                            fontSize: spe.fontSize
                        }}
                        formatter={(val, item) => {
                            const percent = (item.point.percent * 100).toFixed(2);
                            return `${percent}%`;
                        }}
                    />
                </Geom>
            </Chart>
        )
    }
}



export { Polyline, Pie }