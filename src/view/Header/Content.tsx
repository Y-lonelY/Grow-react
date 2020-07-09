import React from 'react'
import { Row, Col, Button } from 'antd'
import { SuperEmpty } from '@/components/Override'
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
            return (
              <Col key={item.id}>
                <Button type='link' size='small' onClick={() => { go('component', item.path) }}>{item.name}</Button>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}
