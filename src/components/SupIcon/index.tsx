import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import { IconType } from './types'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1509932_m6lq4l2p0dn.js',
})

const initStyle = {
  fontSize: '20px'
}

/**
 * manage icons in iconfont.cn
 * @param {String} type used to control the display
 */
export default React.memo(
  function SuperIcon(props: IconType) {
    const { type, style = {} } = props
    return (
      <IconFont
        type={`icon-${type}`}
        style={Object.assign({}, initStyle, style)}
      />
    )
  }
)