import React from 'react'
import { LocaleContext } from '@/cluster/context'
import { Col, Row } from 'antd'
import SuperIcon from '@/components/SupIcon'
import { HeaderType } from './types'

/**
 * header
 * 对于 function 组件通过 LocaleContext.Consumer 来获取 context
 */
export default React.memo(function HeaderMemo(props: HeaderType) {
  const { icon, label, subLabel, children } = props
  return (
    <LocaleContext.Consumer>
      {/* value 在这里代表 this.context */}
      {({ assets }) => (
        <Row
          className="h-skeleton"
          justify="space-between"
          align="top"
          style={{
            borderBottom: '1px solid #',
          }}
        >
          <Col className="title">
            <SuperIcon type={icon.type} style={icon.style} />
            <span className="label">
              {label}
              {subLabel && <span className="sub">{subLabel}</span>}
            </span>
          </Col>
          <Col>{children}</Col>
        </Row>
      )}
    </LocaleContext.Consumer>
  )
})
