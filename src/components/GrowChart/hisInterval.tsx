/**
 * 柱状堆叠图
 * Histogram Interval
 */
import React from 'react'
import DataSet from '@antv/data-set'
import { Chart, Interval, Tooltip, Axis } from 'bizcharts'
import { HisInterval } from './type.d'

export default function GrowHisInterval(props: HisInterval) {
  const { data, width = null, height = 500, padding = 'auto' } = props
  const ds = new DataSet({
    state: {
      name: 'wakatime',
    },
  })
  const dv = ds.createView().source(data)
  console.log(dv)
  return (
      <Chart
        data={dv.rows}
        height={height}
        width={width}
        padding={padding}
        forceFit
        autoFit
      >
        <Interval
          adjust={[
            {
              type: 'stack',
            },
          ]}
          color="name"
          position="date*seconds"
        />
        <Axis name="y" label={{ formatter: (val) => `${val}` }} />
        <Tooltip shared />
      </Chart>
  )
}
