import React from 'react'
import { Row, Col, Button } from 'antd'
import { SuperEmpty } from '@/components/Override'
import { useHistory } from 'react-router'
import { TreasureState } from './Treasure'

export default function RenderContent ({ metadata }: Pick<TreasureState, 'metadata'>) {
  const { links, components } = metadata
  const count = links.length + components.length
  const history = useHistory()

  function go ({ type, target }) {
    if (type === 'component') {
      history.push(target)
    } else {
      window.open(target, 'blank')
    }
  }

  return (
    <div>
      {count > 0 ? (
        <React.Fragment>
          {Object.entries(metadata).map((item) => {
            const [key, value] = item
            return (
              value && (
                <Row key={key} justify="space-between">
                  <Col span={24}>{key}</Col>
                  <React.Fragment>
                    {value.map((v) => {
                      const { label, id } = v
                      return (
                        <Col key={id} span={6}>
                          <Button size="small" type="link" onClick={go.bind(this, v)}>
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