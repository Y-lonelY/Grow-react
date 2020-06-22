import React, { useState, useEffect } from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { getUsers } from '@/service/Weight'
import { Select } from 'antd'
import Skeleton from '@/components/Skeleton'

const { Option } = Select

const skeleton = {
    icon: {
      type: 'header-weight'
    },
    label: 'weight'
}

export default function WeightView() {
  const [users, setUsers] = useState([])

  async function init() {
    const res = await getUsers()
    setUsers(res)
  }

  useEffect(() => {
    // init()
  }, [])

  return (
    <div className="weight-content">
      <Skeleton header={skeleton}></Skeleton>
    </div>
  )
}
