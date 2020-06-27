import React from 'react'
import { WeightContext, WeightState } from './types'

export const initState: WeightState = {
  users: [],
  weights: []
}

export default React.createContext<WeightContext>({
  state: initState,
  dispatch: () => { return false }
})