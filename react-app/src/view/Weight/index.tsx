import React, { useEffect, useReducer } from 'react'
import { getUsers } from '@/service/Weight'
import Skeleton from '@/components/Skeleton'
import WeightFilter from './filter'
import WeightMain from './main'
import WeightContext, { initState } from './context'
import { WeightState } from './types'

const skeleton = {
    icon: {
      type: 'header-weight'
    },
    label: 'weight'
}

function reducer (state: WeightState, action): WeightState {
  switch (action.type) {
    case 'updateUsers':
      return {
        ...state,
        users: action.users
      }
    case 'queryWeight':
      return {
        ...state,
        weights: action.weights
      }
    default:
      return state
  }
}

export default function WeightView() {
  const [state, dispatch] = useReducer(reducer, initState)

  async function init() {
    // get current users for select options
    const users = await getUsers()
    dispatch({
      type: 'updateUsers',
      users
    })
  }

  // maps to componentMounted
  useEffect(() => {
    init()
  }, [])

  return (
    <WeightContext.Provider value={{ state, dispatch }}>
      <div className="weight-content">
      <Skeleton header={skeleton} filter={<WeightFilter />}>
        <WeightMain weights={state.weights} />
      </Skeleton>
    </div>
    </WeightContext.Provider>
  )
}
