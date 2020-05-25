import React, { useState, useEffect } from "react"
import { Popover, Button } from "antd"
import { SuperIcon } from "@/components/Override"


export default function Treasure (props) {
  // 通过 useState 来定义 state 和 setState 对，这里定义 clicked 用于标识按钮当前状态
  const [clicked, setClicked] = useState<Boolean>(false)
  return (
    <div className="treasure-box">
      <Popover
        title=''
        content="content"
        placement="bottom"
        trigger="click"
        onVisibleChange={(visible) => { setClicked(visible) }}
      >
        <Button type="link" size="small">
          <SuperIcon className={`icon ${clicked ? 'clicked' : ''}`} type="icon-treasure" />
        </Button>
      </Popover>
    </div>
  )
}
