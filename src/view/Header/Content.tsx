import React from 'react'
import { Row, Col, Button } from 'antd'
import { SuperEmpty } from '@/components/Override'
import SuperIcon from '@/components/SupIcon'
import { useHistory } from 'react-router'
import { TreasureState } from './types'

export default function RenderContent({
  metadata,
}: Pick<TreasureState, 'metadata'>) {
  const { links, components } = metadata
  const count = links.length + components.length
  const history = useHistory()

  function go(type, path) {
    if (type === 'component') {
      history.push(path)
    } else {
      window.open(path, 'blank')
    }
  }

  return (
    <div>
      {/* components render content */}
      {components.length > 0 && (
        <Row>
          {components.map((item) => {
            const { name, id, path, status } = item
            return (
              <Col key={id}>
                <Button type='link' size='small' onClick={() => { go('component', path) }}>
                  {name}
                  {status === 1 &&
                  <sup>
                    <SuperIcon type="new" size={14} />
                  </sup>
                  }
                </Button>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}
