import React, { useState, useEffect, useReducer } from 'react'
import { getUsers } from '@/service/Weight'
import { Select } from 'antd'
import Skeleton from '@/components/Skeleton'
import Filter from './filter'
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
    console.log(state)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <WeightContext.Provider value={{ state, dispatch }}>
      <div className="weight-content">
      <Skeleton header={skeleton} filter={<Filter />}></Skeleton>
    </div>
    </WeightContext.Provider>
  )
}
