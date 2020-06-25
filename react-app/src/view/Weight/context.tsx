import React from 'react'
import { WeightContext, WeightState } from './types'

export const initState: WeightState = {
  users: []
}

export default React.createContext<WeightContext>({
  state: initState,
  dispatch: () => { return false }
})