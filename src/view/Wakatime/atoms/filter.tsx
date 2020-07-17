import React, { useContext, useEffect, useState } from 'react'
import { Radio, Row, Col } from 'antd'
import moment from 'moment'
import { GrowDatePicker } from '@/components'
import wakatimeContext from '../context'

const radios = [
  {
    label: 'project',
    value: 'project',
  },
  {
    label: 'language',
    value: 'language',
  },
]

export default function Filter() {
  const { query, dispatch, state } = useContext(wakatimeContext)

  function changeType(e) {
    const type = e.target.value
    const params = { ...state.params, type }
    dispatch({
      type: 'updateParams',
      params,
    })
  }

  return (
    <Row gutter={16} align="middle">
      <Col>
        <Radio.Group
          options={radios}
          value={state.params.type}
          onChange={changeType}
          size="small"
          optionType="button"
          buttonStyle="solid"
        />
      </Col>
      <Col>
        <GrowDatePicker value={[state.params.start, state.params.end]} />
      </Col>
    </Row>
  )
}
