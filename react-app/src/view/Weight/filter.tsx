import React, { useState, useContext } from 'react'
import { Select } from 'antd'
import moment from 'moment'
import GrowDatePicker from '@/components/GrowDatePicker'
import WeightContext from './context'
import { QueryParams } from './types'

const { Option } = Select

export default function WeightFilter() {
  const { state, dispatch } = useContext(WeightContext)
  // query params
  const [params, setParams] = useState<QueryParams>({
    user: '',
    start: moment().subtract(7, 'days'),
    end: moment(),
  })

  function query() {
    console.log(params)
  }

  function userSelect(user) {
    setParams({
      ...params,
      user,
    })
  }

  function dateRangeChange(dates, dateStrings) {
    const [start, end] = dateStrings
    setParams({
      ...params,
      start,
      end
    })
  }

  return (
    <div>
      {/* data picker */}
      <GrowDatePicker
        value={[params.start, params.end]}
        change={dateRangeChange}
      />
      {/* users select */}
      <Select
        style={{ width: '200px', marginLeft: '20px' }}
        placeholder="select a user"
        value={params.user}
        onSelect={userSelect}
        showSearch
      >
        <Option key="all" value="">
          全部
        </Option>
        {state.users.length > 0 &&
          state.users.map(({ value, label }) => {
            return (
              <Option key={value} value={value}>
                {label}
              </Option>
            )
          })}
      </Select>
    </div>
  )
}
