import React, { useContext } from 'react'
import { GrowResult, Utility } from '@/components'
import { Spin, Row, Col, Statistic, Popover, Divider } from 'antd'
import { GrowHisInterval } from '@/components/GrowChart'
import WakatimeContext from '../context'

const { formatSeconds } = Utility

function RenderCard(props) {
  const { name, count, total, average } = props.data
  const index = props.index + 1
  const range = props.range || 1
  const dayAvg = total / range

  return (
    <Row className="statistic-item" gutter={16} align="bottom" justify="start">
      <Col className="header" span={24}>
        <p className="title">
          <span className="index">No.{index}</span>
          {name}
          <span className="record">（{count} records）</span>
        </p>
      </Col>
      <Col span={12}>
        <Popover content={<b>{formatSeconds(total)}</b>}>
          <Statistic
            className="statistic"
            title="Total seconds"
            value={total}
          />
        </Popover>
      </Col>
      <Col span={12}>
        <Popover
          content={
            <React.Fragment>
              <b>Times: {formatSeconds(average)}</b>
              <br />
              <b>Days({range}): {formatSeconds(dayAvg)}</b>
            </React.Fragment>
          }
        >
          <Statistic
            className="statistic"
            title="Average"
            value={average}
            precision={2}
          />
        </Popover>
      </Col>
    </Row>
  )
}

export default function WakatimeMain() {
  const { state } = useContext(WakatimeContext)
  const {
    loading,
    wakatimes,
    statistics,
    params: { start, end },
  } = state
  const range = end.diff(start, 'days')

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
          gutter={18}
          style={{ padding: '10px 0 20px 0' }}
        >
          <Col span={18}>
            <GrowHisInterval data={wakatimes} height={500} padding={[50]} />
          </Col>
          <Col span={6} className="p-list">
            {statistics && statistics.length > 0 && (
              <div>
                {statistics.map((item, index) => {
                  const { name } = item
                  return (
                    <RenderCard
                      key={name}
                      data={item}
                      index={index}
                      range={range}
                    />
                  )
                })}
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <GrowResult status="self-404" />
      )}
    </div>
  )
}
