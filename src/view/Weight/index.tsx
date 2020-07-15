import React, { useEffect, useReducer } from 'react'
import { getUsers, queryWeights } from '@/service/Weight'
import { Skeleton } from '@/components'
import WeightFilter from './atoms/filter'
import WeightMain from './atoms/main'
import WeightDrawer from './atoms/Drawer'
import WeightContext, { initState } from './context'
import { WeightState } from './types'
import './index.scss'

const headerConfig = {
  icon: {
    type: 'header-weight',
  },
  label: 'weight',
}

function reducer(state: WeightState, action): WeightState {
  switch (action.type) {
    case 'updateUsers':
      return {
        ...state,
        users: action.users,
      }
    case 'queryWeight':
      return {
        ...state,
        weights: action.weights,
      }
    case 'updateLoading':
      return {
        ...state,
        loading: action.loading,
      }
    case 'updateDrawer':
      return {
        ...state,
        drawerDisplay: action.drawerDisplay,
      }
      case 'storeParams':
        return {
          ...state,
          params: action.data,
        }
    default:
      return state
  }
}


export default function WeightView() {
  const [state, dispatch] = useReducer(reducer, initState)

  async function query(data) {
    // loadding true
    dispatch({ type: 'updateLoading', loading: true })
    // get weight list
    const weights = await queryWeights(data)
    // trigger to update
    dispatch({ type: 'queryWeight', weights })
    // store current query params
    dispatch({ type: 'storeParams', data })
    // cancel loading
    dispatch({ type: 'updateLoading', loading: false })
  }

  async function init() {
    // get current users for select options
    const users = await getUsers()
    dispatch({
      type: 'updateUsers',
      users,
    })
  }

  // maps to componentMounted
  useEffect(() => {
    init()
  }, [])

  return (
    <WeightContext.Provider value={{ state, dispatch, query }}>
      <div className="weight-content">
        <Skeleton header={headerConfig} filter={<WeightFilter />}>
          <WeightMain />
        </Skeleton>
        <WeightDrawer />
      </div>
    </WeightContext.Provider>
  )
}
