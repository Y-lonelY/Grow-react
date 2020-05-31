import React, { useReducer, useEffect } from 'react'
import { Popover, Input } from 'antd'
import { getHeaderMetadata } from '@/service/Header'
import RenderContent from './Content'

const { Search } = Input

interface MetaAtom {
  id: number
  label: string
  type: string
  target: string
  icon?: string
}

export interface TreasureState {
  expanded?: boolean
  metadata: {
    links: MetaAtom[]
    components: MetaAtom[]
  }
}

// current state and in actions
function reducer(state: TreasureState, action): Partial<TreasureState> {
  switch (action.type) {
    case 'metadata':
      return {
        metadata: Object.assign({}, action.metadata),
      }
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

  // init component, get metadata
  async function init() {
    const data = await getHeaderMetadata()
    const links = []
    const components = []
    data.forEach((item) => {
      if (item.type === 'link') {
        links.push(item)
      } else if (item.type === 'component') {
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
        content={<RenderContent metadata={state.metadata} />}
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
