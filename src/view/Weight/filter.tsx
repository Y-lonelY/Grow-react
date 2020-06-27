import React, { useState, useContext, useEffect } from 'react'
import { queryWeights } from '@/service/Weight'
import { Select } from 'antd'
import moment from 'moment'
import { GrowDatePicker } from '@/components'
import WeightContext from './context'
import { QueryParams } from './types'

const { Option } = Select

export default function WeightFilter() {
  const { state, dispatch } = useContext(WeightContext)
  // query params
  const [params, setParams] = useState<QueryParams>({
    user: '',
    start: moment().subtract(30, 'days'),
    end: moment(),
  })

  async function query() {
    // format date params, from moment.Moment to string
    const data = Object.assign({}, params, {
      start: params.start.format('YYYY-MM-DD'),
      end: params.end.format('YYYY-MM-DD'),
    })
    // loadding true
    dispatch({ type: 'updateLoading', loading: true })
    // get weight list
    const weights = await queryWeights(data)
    // trigger to update
    dispatch({ type: 'queryWeight', weights })
    // cancel loading
    dispatch({ type: 'updateLoading', loading: false })
  }

  function userSelect(user) {
    setParams({
      ...params,
      user,
    })
  }

  function dateRangeChange(dates, dateStrings) {
    const [start, end] = dates
    setParams({
      ...params,
      start,
      end,
    })
  }

  // watch params change then to query
  useEffect(() => {
    query()
  }, [params])

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
          All Users
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
