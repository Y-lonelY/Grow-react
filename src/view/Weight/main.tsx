import React, { useState, useContext } from 'react'
import { Button, Row, Col, Spin } from 'antd'
import { GrowResult } from '@/components'
import { Chart, Line, Point, Tooltip } from 'bizcharts'
import DataSet from '@antv/data-set'
import WeightContext from './context'

export default function WeightMain(props: {}) {
  const { state, dispatch } = useContext(WeightContext)
  // declare a data set
  const ds = new DataSet({
    state: {
      name: 'weight',
    },
  })
  const dv = ds.createView().source(state.weights)

  return (
    <div
      className="weight-main"
      style={{ width: '100%', minHeight: '500px', textAlign: 'center' }}
    >
      {state.loading ? (
        <Spin style={{ marginTop: '200px' }} />
      ) : dv.rows && dv.rows.length > 0 ? (
        <Row
          justify="space-between"
          align="top"
          gutter={6}
          style={{ padding: '20px 0' }}
        >
          <Col span={16}>
            <Row
              className="chart-filter-panel"
              style={{ fontSize: '12px' }}
              align="middle"
              justify="start"
            >
              <Col className="length" span={6}>
                <b>Totol {dv.rows.length} records</b>
              </Col>
              <Col className="handler" span={18}>
                <Button
                  className="create"
                  size="small"
                  onClick={() => {
                    dispatch({ type: 'updateDrawer', drawerDisplay: true })
                  }}
                >
                  Create
                </Button>
              </Col>
            </Row>
            <Chart
              data={dv.rows}
              height={500}
              padding={[10, 20, 50, 40]}
              autoFit
            >
              <Line shape="smooth" position="date*weight" color="user" />
              <Point position="date*weight" color="user" />
              <Tooltip shared={true} />
            </Chart>
          </Col>
          <Col span={8}>panel</Col>
        </Row>
      ) : (
        <GrowResult
          status="self-404"
          extra={<Button size="small">create a new record</Button>}
        />
      )}
    </div>
  )
}
