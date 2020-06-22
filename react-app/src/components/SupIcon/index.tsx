import React from 'react'
import { Icon } from 'antd'
import { IconType } from './types'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1509932_h3mvm2g1zm9.js',
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