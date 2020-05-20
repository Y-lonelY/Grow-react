import React, { useState, useEffect } from "react"
import { Popover, Button } from "antd"
import { SuperIcon } from "@/components/Override"


export default function Treasure(props) {
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
