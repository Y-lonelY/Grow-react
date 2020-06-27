import React from 'react'
import { Result } from 'antd'
import { ResultType } from './types'

export default function GrowResult(props: ResultType) {
  let result
  switch (props.status) {
    case 'self-404':
      const nodata = require('./result-nodata.gif')
      const icon = <img src={nodata} alt="no data" />
      result = Object.assign({}, props, {
        title: 'Empty',
        subTitle: 'Sorry, there is no data. Maybe change the query params!',
        icon,
        // cover default status, to control display color
        status: 'info'
      })
      break
    default:
      result = Object.assign({}, props)
  }

  return (
    <Result title={result.title} subTitle={result.subTitle} status={result.status} icon={result.icon} extra={result.extra} />
  )
}
