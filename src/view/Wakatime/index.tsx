import React, { useEffect, useReducer } from 'react'
import { Skeleton } from '@/components'
import { WakatimeState } from './types'
import WakatimeFilter from './atoms/filter'
import WakatimeMain from './atoms/main'
import WakatimeContext, { initState } from './context'
import { queryWakatimes, queryStatistics } from '@/service/Wakatime'
import moment from 'moment'
import './index.scss'

const headerConfig = {
  icon: {
    type: 'header-wakatime',
  },
  label: 'wakatime',
  subLabel: '*data from wakatime api',
}

function reducer(state: WakatimeState, action): WakatimeState {
  const { type } = action
  switch (type) {
    case 'putWakatimes':
      return {
        ...state,
        wakatimes: action.wakatimes,
      }
    case 'putStatistics':
      return {
        ...state,
        statistics: action.statistics,
      }
    case 'updateParams':
      return {
        ...state,
        params: action.params,
      }
    case 'updateLoading':
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state
  }
}

// Output the display view
export default function WakaTimeView() {
  const [state, dispatch] = useReducer(reducer, initState)
  const { params } = state

  // query
  async function query() {
    dispatch({ type: 'updateLoading', loading: true })
    const { start, end } = params
    const queryParmas = Object.assign({}, params, {
      start: moment(start).format('YYYY-MM-DD'),
      end: moment(end).format('YYYY-MM-DD')
    }) 
    const [wakatimes, statistics] = await Promise.all([
      await queryWakatimes(queryParmas),
      await queryStatistics(queryParmas),
    ])
    dispatch({
      type: 'putWakatimes',
      wakatimes,
    })
    dispatch({
      type: 'putStatistics',
      statistics,
    })
    dispatch({ type: 'updateLoading', loading: false })
  }

  useEffect(() => {
    dispatch({
      type: 'updateParams',
      params: initState.params,
    })
  }, [])

  useEffect(() => {
    query()
  }, [state.params])

  return (
    <WakatimeContext.Provider value={{ state, dispatch, query }}>
      <div className="wakatime-content">
        <Skeleton header={headerConfig} filter={<WakatimeFilter />}>
          <WakatimeMain />
        </Skeleton>
      </div>
    </WakatimeContext.Provider>
  )
}
