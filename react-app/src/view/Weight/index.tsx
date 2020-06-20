import React, { useState, useEffect } from 'react'
import { getUsers } from '@/service/Weight'
import { Select } from 'antd'

const { Option } = Select

export default function WeightView() {
  const [users, setUsers] = useState([])

  async function init() {
    const res = await getUsers()
    console.log(res)
    setUsers(res)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="weight-content">
      <div>
        <Select
          mode="multiple"
          style={{ width: '200px' }}
          maxTagCount={2}
          placeholder="select a user"
          showSearch
        >
          {users.length > 0 &&
            users.map(({ value, label }) => {
              return (
                <Option key={value} value={value}>
                  {label}
                </Option>
              )
            })}
        </Select>
      </div>
    </div>
  )
}
