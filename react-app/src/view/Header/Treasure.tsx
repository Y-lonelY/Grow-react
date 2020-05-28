import React, { useState, useEffect, useContext } from 'react'
import { Popover, Button, Input } from 'antd'
import { LocaleContext } from '@/cluster/context'

const { Search } = Input

export default function Treasure(props) {
  // 通过 useState 来定义 state 和 setState 对，这里定义 clicked 用于标识按钮当前状态
  const [clicked, setClicked] = useState<boolean>(false)
  const { assets: { headerItems } } = useContext(LocaleContext)
  console.log(headerItems)
  return (
    <div className="treasure-box">
      <Popover
        title=""
        content="content"
        placement="bottom"
        trigger="click"
        onVisibleChange={(visible) => {
          setClicked(visible)
        }}
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
