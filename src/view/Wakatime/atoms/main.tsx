import React, { useContext } from 'react'
import { GrowResult } from '@/components'
import { Spin, Row, Col } from 'antd'
import { GrowHisInterval } from '@/components/GrowChart'
import WakatimeContext from '../context'

export default function WakatimeMain() {
  const { state } = useContext(WakatimeContext)
  const { loading, wakatimes } = state

  return (
    <div
      className="wakatime-main"
      style={{ width: '100%', textAlign: 'center' }}
    >
      {loading ? (
        <Spin style={{ marginTop: '200px' }} />
      ) : wakatimes && wakatimes.length > 0 ? (
        <Row
          justify="space-between"
          align="top"
          gutter={6}
          style={{ padding: '20px 0' }}
        >
          <Col span={18}>
            <Row>
              <GrowHisInterval data={wakatimes} height={500} padding={[50]} />
            </Row>
          </Col>
        </Row>
      ) : (
        <GrowResult status="self-404" />
      )}
    </div>
  )
}
