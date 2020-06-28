import React, { useState, useContext, useEffect } from 'react'
import { Button, Row, Col, Spin } from 'antd'
import { GrowResult } from '@/components'
import WeightContext from './context'
import { GrowPolyline } from '@/components/GrowChart'

export default function WeightMain(props: {}) {
  const [chartList, setChartList] = useState([])
  const { state, dispatch } = useContext(WeightContext)

  useEffect(() => {
    const list = state.weights.map(({ date, user, weight }) => {
      return {
        x: date,
        y: weight,
        value: user
      }
    })
    setChartList(list)
  }, [state.weights])

  return (
    <div
      className="weight-main"
      style={{ width: '100%', minHeight: '500px', textAlign: 'center' }}
    >
      {state.loading ? (
        <Spin style={{ marginTop: '200px' }} />
      ) : chartList && chartList.length > 0 ? (
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
                <b>Totol {chartList.length} records</b>
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
            <GrowPolyline data={chartList}  height={500} padding={[50]} yLabel="kg"  />
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
