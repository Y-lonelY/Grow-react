import React from "react";
import { SuperEmpty } from '@/components/Override';
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, View, Label } from 'bizcharts';
import DataSet from "@antv/data-set";
import { ExercisePolyline, ExercisePie, ProgramColumn } from './config';
import { config as SystemConfig } from '@/config/sysConfig';
import { PieData, PolylineData } from '@/index.d.ts';

interface PolylineProps {
    data: PolylineData[];
    avgData: PieData;
    className: string;
    normalize?: boolean;
}

interface PieProps {
    data: PieData;
}

// 数据集视图构造函数
const { DataView } = DataSet;

/**
 * 考虑到图表实际是一个纯函数，输入数据和输出保持一致，所以将 class 写法改写为 function
 */

/**
 * 折线图
 * width 根据dom结构计算，防止其渲染有闪动
 * forceFit 根据父节点的宽度进行定位
 * placeholder 处理无数据时提示
 */
function Polyline(props: PolylineProps) {
    // 归一化
    const normalize = (data) => {
        let list = [];
        data.forEach(item => {
            const avgValue = props.avgData[item.type];
            let currentItem = {};
            currentItem["type"] = item.type;
            currentItem["date"] = item.date;
            currentItem["number"] = (item.number / avgValue).toFixed(2);
            list.push(currentItem);
        });
        return list;
    }

    return (
        <div>
            {Array.isArray(props.data) && props.data.length > 0 ?
                <Chart
                    className={props.className}
                    padding="auto"
                    height={500}
                    width={(window.innerWidth - 100) * 14 / 24}
                    data={props.normalize ? normalize(props.data) : props.data}
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
                        color="type"
                        style={{ stroke: '#fff', lineWidth: 1 }}
                    />
                    {/* 设置y:垂直辅助线 */}
                    <Tooltip crosshairs={{ type: 'y' }} />
                </Chart> :
                <SuperEmpty mTop='250px' />
            }
        </div>
    )
}

/**
 * 饼图
 * sumItem 用于判断每项是否全为 null
 */
function Pie(props: PieProps) {
    const sumMap = props.data;
    let sumChartData = [];
    let sumItem: number = 0;

    Object.entries(sumMap).forEach(item => {
        let currentObj = {};
        currentObj['item'] = item[0].toUpperCase();

        if (item[1] !== null) {
            currentObj['count'] = item[1];
        } else {
            currentObj['count'] = 0;
        }

        sumItem += Number(currentObj['count']);

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
            data={sumItem === 0 ? {} : dv}
            scale={ExercisePie.scale}
            height={320}
            width={(window.innerWidth - 100) * 6 / 24}
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

/**
 * 堆叠柱状图
 * 
 */
function StackedColumn(props) {
    const data = [
        {name: 'js', date: '2019-10-09', value: 123},
        {name: 'js', date: '2019-10-10', value: 1232},
        {name: 'ts', date: '2019-10-09', value: 123},
        {name: 'ts', date: '2019-10-10', value: 123},
        {name: 'js', date: '2019-10-11', value: 123},
        {name: 'js', date: '2019-10-12', value: 1232},
        {name: 'ts', date: '2019-10-11', value: 123},
        {name: 'ts', date: '2019-10-12', value: 123},
    ];
    return (
        <Chart scale={ProgramColumn.scale} width={(window.innerWidth - 100) * 14 / 24} height={400} data={data}>
            <Legend />
            <Axis name="date" position='bottom' />
            <Axis name="value" position='left' />
            <Tooltip />
            <Geom
                type="intervalStack"
                position="date*value"
                color={"name"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
        </Chart>
    );
}


export { Polyline, Pie, StackedColumn }