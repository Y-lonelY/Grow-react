import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import { IconType } from './types'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1509932_rgauvila6w.js',
})

/**
 * manage icons in iconfont.cn
 * @param {String} type used to control the display
 */
export default React.memo(
  function SuperIcon(props: IconType) {
    const { type, size = 20,  style = {} } = props
    const fontStyle = {
      fontSize: `${size}px`
    }
    return (
      <IconFont
        type={`icon-${type}`}
        style={Object.assign({}, fontStyle, style)}
      />
    )
  }
)