import React, { useEffect, useReducer } from 'react'
import { Skeleton } from '@/components'
import { WakatimeState } from './types'
import Filter from './atoms/filter'
import WakatimeContext, { initState } from './context'

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
    case 'query':
      return {
        ...state,
        wakatimes: action.wakatimes,
      }
    default:
      return state
  }
}

// Output the display view
export default function WakaTimeView() {
  const [state, dispatch] = useReducer(reducer, initState)

  // Init
  useEffect(() => {

  }, [])

  return (
    <WakatimeContext.Provider value={{ state, dispatch }}>
      <div className="wakatime-content">
        <Skeleton header={headerConfig} filter={<Filter />}></Skeleton>
      </div>
    </WakatimeContext.Provider>
  )
}
