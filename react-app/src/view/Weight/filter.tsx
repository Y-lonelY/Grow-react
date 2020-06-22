import React from 'react'
import { Select } from 'antd'

export default function WeightFilter() {
  return (
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
  )
}
