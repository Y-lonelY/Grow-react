import React, { useState, useReducer, useEffect } from 'react'
import { Popover, Input, Row, Col, Button } from 'antd'
import { SuperEmpty } from '@/components/Override'
import { getHeaderMetadata } from '@/service/Header'
import {} from 'react-router-dom'

const { Search } = Input

interface MetaAtom {
  id: number
  label: string
  type: string
  target: string
  icon?: string
}

interface TreasureState {
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

function RenderContent ({ metadata }: Pick<TreasureState, 'metadata'>) {
  const { links, components } = metadata
  const count = links.length + components.length
  return (
    <div>
      {count > 0 ? (
        <React.Fragment>
          {Object.entries(metadata).map((item) => {
            const [key, value] = item
            return (
              value && (
                <Row key={key} type="flex" justify="space-between">
                  <Col span={24}>{key}</Col>
                  <React.Fragment>
                    {value.map((v) => {
                      const { label, id } = v
                      return (
                        <Col key={id} span={6}>
                          <Button size="small" type="link">
                            {label}
                          </Button>
                        </Col>
                      )
                    })}
                  </React.Fragment>
                </Row>
              )
            )
          })}
        </React.Fragment>
      ) : (
        <SuperEmpty />
      )}
    </div>
  )
}

function Treasure() {
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

export default Treasure
