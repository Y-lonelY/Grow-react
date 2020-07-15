import React from 'react'
import { WakatimeState, WakatimeContext } from './types'

export const initState: WakatimeState = {
  loading: true,
  wakatimes: []
}

export default React.createContext<WakatimeContext>({
  state: initState,
  dispatch: null,
})