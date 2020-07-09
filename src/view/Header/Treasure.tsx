import React, { useReducer, useEffect } from 'react'
import { Popover, Input } from 'antd'
import { getModules } from '@/service/Header'
import TreasureContent from './Content'
import { TreasureState } from './types'

const { Search } = Input

// current state and in actions
function reducer(state: TreasureState, action): Partial<TreasureState> {
  switch (action.type) {
    case 'metadata':
      return {
        ...state,
        metadata: Object.assign({}, action.metadata),
      }
    default:
      return state
  }
}

export default function Treasure() {
  const initState = {
    expanded: false,
    metadata: {
      links: [],
      components: [],
    },
  }
  const [state, dispatch] = useReducer(reducer, initState)

  // Group the modules by [param path] in order to render link or components
  async function init() {
    const list = await getModules()
    const links = []
    const components = []

    list.forEach(item => {
      const { path } = item
      if (path.includes('http')) {
        links.push(item)
      } else {
        components.push(item)
      }
    })

    dispatch({
      type: 'metadata',
      metadata: {
        links,
        components,
      },
    })
  }

  // useEffect 内不能使用其他 hook
  useEffect(() => {
    init()
  }, [])

  return (
    <div className="treasure-box">
      <Popover
        title=""
        content={<TreasureContent metadata={state.metadata} />}
        placement="bottom"
        trigger="click"
      >
        <Search
          placeholder="input search component"
          style={{ width: '200px' }}
          onSearch={(value) => {
            console.log(value)
          }}
        />
      </Popover>
    </div>
  )
}
