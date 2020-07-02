import React, { useContext } from 'react'
import { Drawer, Form, Select, InputNumber, Button, message } from 'antd'
import WeightContext from '../context'
import { createWeight } from '@/service/Weight'

const { Option } = Select

export default function WeightDrawer() {
  const { state, dispatch, query } = useContext(WeightContext)
  const { users } = state
  const [form] = Form.useForm()

  async function submit () {
    try {
      const values = await form.validateFields()
      const success = await createWeight(values)
      dispatch({
        type: 'updateDrawer',
        drawerDisplay: false
      })
      if (success) {
        message.success('Created successfully!', 1)
      } else {
        message.success('Creation failed!🙈', 1)
      }
      // after created, refresh the weight record
      query(state.params)
    } catch (error) {
      console.log(error)
    }
  }

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
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ span: 6 }} labelAlign="right">
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
