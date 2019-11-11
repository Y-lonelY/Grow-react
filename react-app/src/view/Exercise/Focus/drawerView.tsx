import React from 'react';
import { Form, Input, DatePicker, Switch, Radio, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';

interface DrawerViewProps extends FormComponentProps {
    type: string;
    className?: string;
}

class DrawerForm extends React.Component<DrawerViewProps, {}> {
    constructor(props) {
        super(props);

    }

    render() {
        const type = this.props.type;
        const { getFieldDecorator } = this.props.form;
        const col = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };
        return (
            <div className={this.props.className}>
                {type === 'add' &&
                    <div className={`type-${type}`}>
                        <Form.Item label='title' {...col}>
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: 'title is required!',
                                    min: 1,
                                    max: 255
                                }]
                            })(<Input placeholder='添加标题' size='small' />)
                            }
                        </Form.Item>
                        <Form.Item label='start' {...col}>
                            {getFieldDecorator('start_date', {
                                initialValue: moment(),
                                rules: [{
                                    required: true,
                                    message: 'start date is required!',
                                }]
                            })(<DatePicker
                                size='small'
                                locale={locale}
                                allowClear={false}
                                showToday={false}
                                disabledDate={(date) => { return date && date > moment().endOf('days') }}
                            />)
                            }
                        </Form.Item>
                        <Form.Item label='details' {...col}>
                            {getFieldDecorator('details')
                            (<Input placeholder='添加细节信息' size='small' />)
                            }
                        </Form.Item>
                        <Form.Item label='end' {...col}>
                            {getFieldDecorator('end_date')
                            (<DatePicker
                                size='small'
                                locale={locale}
                                allowClear={true}
                            />)
                            }
                        </Form.Item>
                        <Form.Item label='status' {...col}>
                            {getFieldDecorator('status', {
                                valuePropName: 'checked',
                                initialValue: true
                            })
                            (<Switch
                                size='small'
                                checkedChildren={<Icon type='check' />}
                                unCheckedChildren={<Icon type='close' />}
                            />)
                            }
                        </Form.Item>
                        <Form.Item label='priority' {...col}>
                            {getFieldDecorator('priority', {
                                initialValue: 1
                            })
                            (<Radio.Group>
                                <Radio value={1}>极高</Radio>
                                <Radio value={2}>较高</Radio>
                                <Radio value={3}>较低</Radio>
                                <Radio value={4}>极低</Radio>
                            </Radio.Group>)
                            }
                        </Form.Item>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {

    }
}

const DrawerView = Form.create<DrawerViewProps>({
    name: 'drawerForm',
})(DrawerForm);

export default DrawerView;