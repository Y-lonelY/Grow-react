/**
 * react hook
 * bizcharts
 */
import React from 'react'
import DataSet from '@antv/data-set'
import { Chart, Line, Point, Tooltip, Axis } from 'bizcharts'
import { PolylineType } from './type.d'
export default function GrowPolyline(props: PolylineType) {
  const {
    data,
    width = null,
    height = 500,
    padding = 'auto',
    yLabel = null,
  } = props
  // declare a data set
  const ds = new DataSet({
    state: {
      name: 'weight',
    },
  })
  const dv = ds.createView().source(data)
  return (
    <Chart
      data={dv.rows}
      height={height}
      width={width}
      padding={padding}
      autoFit
    >
      {yLabel && (
        <Axis name="y" label={{ formatter: (val) => `${val}${yLabel}` }} />
      )}
      <Line shape="smooth" position="x*y" color="value" />
      <Point position="x*y" color="value" />
      <Tooltip shared={true} />
    </Chart>
  )
}
