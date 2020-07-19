import React from 'react'
import { WakatimeState, WakatimeContext } from './types'
import moment from 'moment'

export const initState: WakatimeState = {
  loading: true,
  wakatimes: [],
  statistics: [],
  params: {
    type: 'project',
    start: moment().subtract(30, 'days'),
    end: moment(),
  }
}

export default React.createContext<WakatimeContext>({
  state: initState,
  dispatch: null,
  query: null
})