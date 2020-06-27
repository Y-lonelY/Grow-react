import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment'

interface AddListFormProps extends FormComponentProps {
  submit: (
    date: string,
    params: { leg: string; belly: string; chest: string }
  ) => void
  initValue: {
    leg: number | string
    belly: number | string
    chest: number | string
  }
}

class AddListForm extends React.Component<AddListFormProps, {}> {
  render() {
    const { getFieldDecorator } = this.props.form
    const defaultValue = {leg: undefined, belly: undefined, chest: undefined}
    const { leg, belly, chest } = this.props.initValue ? this.props.initValue : defaultValue
    // 这里的 initvalue 可以根据上一次的结果来进行初始化
    const initValue = {
      date: moment(),
      leg,
      belly,
      chest,
    }

    return (
      <div className="addPopoverDialog">
        <Form.Item>
          {getFieldDecorator('date', {
            initialValue: initValue.date,
          })(
            <DatePicker
              locale={locale}
              allowClear={false}
              showToday={false}
              disabledDate={(date) => {
                return date && date > moment().endOf('day')
              }}
              style={{ width: '100%' }}
            ></DatePicker>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('leg', {
            rules: [
              {
                required: true,
                pattern: /^\d*$/g,
                message: 'please input correct leg!',
              },
            ],
            initialValue: initValue.leg,
          })(<Input prefix="L" suffix="个" placeholder="Leg Nums" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('belly', {
            rules: [
              {
                required: true,
                pattern: /^\d*$/g,
                message: 'please input correct belly!',
              },
            ],
            initialValue: initValue.belly,
          })(<Input prefix="B" suffix="个" placeholder="Belly Nums" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('chest', {
            rules: [
              {
                required: true,
                pattern: /^\d*$/g,
                message: 'please input correct chest!',
              },
            ],
            initialValue: initValue.chest,
          })(<Input prefix="C" suffix="个" placeholder="Chest Nums" />)}
        </Form.Item>
        <Form.Item className="submitItem">
          <Button type="primary" size="small" onClick={this.check}>
            确认
          </Button>
        </Form.Item>
      </div>
    )
  }

  check = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.submit(moment(values.date).format('YYYY-MM-DD'), {
          ...values,
        })
      }
    })
  }
}

const AddListFormInstance = Form.create<AddListFormProps>({
  name: 'addListForm',
})(AddListForm)

export default AddListFormInstance
