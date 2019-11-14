import React from 'react';
import { Form, Input, DatePicker, Switch, Radio, Upload, Button, Icon, message, Row, Col } from 'antd';
import { formatSeconds } from '@/components/Utils';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'react-redux';
import { changeFocusList } from '@/store/Exercise/action';
import { focusProps, focusItem } from '@/index.d.ts';
import { addFocusRecord, getFocusList } from '@/service/exerciseService';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';

interface DrawerViewProps extends FormComponentProps, focusProps {
    type: string;
    className?: string;
    current?: number;
    drawerClose: () => void;
}

interface DrawerViewState {
    data: focusItem
}

class DrawerForm extends React.Component<DrawerViewProps, DrawerViewState> {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    render() {
        const type = this.props.type;
        const data = this.state.data;
        const { getFieldDecorator } = this.props.form;
        const col = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };

        return (
            <div className={this.props.className}>
                <div className="header">
                    <div className="title">{this.renderTitle()}</div>
                </div>
                {type === 'add' &&
                    <Form className={`type-${type}`} {...col} onSubmit={this.submit}>
                        <Form.Item label='title'>
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
                        <Form.Item label='start'>
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
                        <Form.Item label='details'>
                            {getFieldDecorator('details')
                                (<Input placeholder='添加细节信息' size='small' />)
                            }
                        </Form.Item>
                        <Form.Item label='end'>
                            {getFieldDecorator('end_date')
                                (<DatePicker
                                    size='small'
                                    locale={locale}
                                    allowClear={true}
                                />)
                            }
                        </Form.Item>
                        <Form.Item label='status'>
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
                        <Form.Item label='priority'>
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
                        <Form.Item label='pistures'>
                            {getFieldDecorator('pictures', {
                                valuePropName: 'fielList',
                                getValueFromEvent: this.normFile,
                            })
                                (<Upload action='/service/upload' listType='picture'>
                                    <Button size='small'>
                                        <Icon type='upload' />Upload
                                    </Button>
                                </Upload>)
                            }
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
                            <Button type='primary' htmlType='submit' size='small'>
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                }
                {type === 'show' &&
                    <div>
                        <Row>
                            <p>始于{data.start_date}</p>
                            <p>{this.renderEndDate()}</p>
                        </Row>
                        <Row>{data.details}</Row>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        if (this.props.type === 'show' || this.props.type === 'edit') {
            const list = this.props.focusData.list;
            list.forEach(item => {
                if (item.id === this.props.current) {
                    this.setState({
                        data: item
                    });
                }
            })
        }
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    // 渲染标题
    renderTitle = () => {
        let title = '-';
        const type = this.props.type
        if (type === 'add') {
            title = '添加 Focus';
        } else if (type === 'edit') {
            title = '编辑 Focus';
        } else if (type === 'show') {
            title = this.state.data.title;
        }
        return title;
    }

    // 渲染 show 结束时间
    renderEndDate = () => {
        const data = this.state.data;
        const label = data.end_date && data.end_date !== '';
        const end_date = label ? moment(data.end_date) : moment();
        const diffSeconds = end_date.diff(moment(data.start_date), 'seconds');
        const diffStr = formatSeconds(diffSeconds);
        console.log(end_date.diff(moment(data.start_date)));
        console.log(diffSeconds);
        const str = `距${label ? data.end_date : '今'}已执行${diffStr}`;
        return str;
    }

    // 添加 focus 记录回调
    addForm = async (params) => {
        const res = await addFocusRecord(params);
        if (res.success) {
            // 关闭阴影遮罩
            this.props.drawerClose();
            message.success('添加成功！', 2);
            this.freshList();
        } else {
            message.error('添加失败！');
        }
    }

    // 刷新 focus list
    // 可以直接从父组件通过通信获得，这里是为了锻炼 redux 能力
    freshList = async () => {
        const res = await getFocusList({ status: 1 });
        this.props.changeFocusList(res.data.list);
    }

    // 提交表单事件
    submit = (e) => {
        e.preventDefault();
        let params = {};
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 处理文件列表
                if (values.pictures && values.pictures.fileList.length > 0) {
                    const list = values.pictures.fileList.map(item => {
                        return item.response.url
                    });
                    // 文件数组转字符串
                    params['pictures'] = list.join('^^');
                } else {
                    params['pictures'] = '';
                }
                params['title'] = values.title;
                params['details'] = values.details ? values.details : '';
                params['start_date'] = moment(values.start_date).format('YYYY-MM-DD HH:mm:ss');
                params['end_date'] = values.end_date ? moment(values.end_date).format('YYYY-MM-DD HH:mm:ss') : '';
                params['priority'] = values.priority;
                params['status'] = values.status ? 1 : 0;
                console.log(params);
                if (this.props.type === 'add') {
                    this.addForm(params);
                }
            } else {
                throw (err);
            }
        });
    }
}

const DrawerView = Form.create<DrawerViewProps>({
    name: 'drawerForm',
})(DrawerForm);

function mapStateToProps({ focusData }) {
    return {
        focusData,
    }
}

export default connect(mapStateToProps, {
    changeFocusList
})(DrawerView);