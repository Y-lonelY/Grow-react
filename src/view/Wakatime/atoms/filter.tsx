import React, { useContext, useEffect, useState} from 'react'
import moment from 'moment'
import { GrowDatePicker } from '@/components'

export default function Filter() {
  const [params, setParams] = useState({
    type: 'project',
    start: moment().subtract(30, 'days'),
    end: moment()
  })

  return (
    <div>
      <GrowDatePicker value={[params.start, params.end]} />
    </div>
  )
}