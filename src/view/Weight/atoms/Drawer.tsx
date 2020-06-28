import React, { useContext, useState } from 'react'
import { Drawer, Form, Select, InputNumber, Button } from 'antd'
import WeightContext from '../context'

const { Option } = Select

export default function WeightDrawer() {
  const [params, setParams] = useState({ user: '', weight: 0 })
  const { state, dispatch } = useContext(WeightContext)
  const { users } = state
  return (
    <Drawer
      title="Create a new weight record"
      placement="right"
      width={360}
      closable={false}
      onClose={() => {
        dispatch({ type: 'updateDrawer', drawerDisplay: false })
      }}
      visible={state.drawerDisplay}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form>
        <Form.Item
          label="user"
          name="user"
          hasFeedback
          rules={[{ required: true, message: 'Please select a user!' }]}
        >
          <Select placeholder="Select a user" showSearch>
            {users.map(({ value, label }) => {
              return (
                <Option key={value} value={value}>
                  {label}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="weight"
          name="weight"
          hasFeedback
          rules={[
            {
              required: true,
              type: 'number',
              min: 0,
              max: 70,
              message: 'Please input correct weight!',
            },
          ]}
        >
          <InputNumber step={0.5} precision={2} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
