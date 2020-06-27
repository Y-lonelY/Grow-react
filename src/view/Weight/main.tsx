import React, { useState } from 'react'
import { Chart, Line } from 'bizcharts'
import DataSet from '@antv/data-set'
import { WeightState } from './types'

export default function WeightMain(props: Pick<WeightState, 'weights'>) {
  // declare a data set
  const ds = new DataSet({
    state: {
      name: 'weight',
    },
  })
  const data = [{
    user: '1',
    weight: 2,
    date: '2020-06-12'
  }]
  const dv = ds.createView().source(props.weights)
  return (
    <div className="weight-main">
      <Chart data={dv.rows} height={500} padding={[10, 20, 50, 40]} autoFit>
        <Line shape="smooth" position="date*weight" color="user" />
      </Chart>
    </div>
  )
}
