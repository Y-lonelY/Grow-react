import React from 'react';
import { Form, Input, DatePicker, Switch, Radio, Upload, Button, Icon, message, Row, Divider, Carousel } from 'antd';
import { formatSeconds } from '@/components/Utils';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'react-redux';
import { changeFocusList, changeFocusType } from '@/store/Exercise/action';
import { focusProps, focusItem } from '@/index.d.ts';
import { addFocusRecord, getFocusList, editFocusRecord } from '@/service/exerciseService';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';

interface DrawerViewProps extends FormComponentProps, focusProps {
    className?: string;
    current?: number;
    drawerClose: () => void;
}

interface DrawerViewState {
    data: focusItem
}

const { TextArea } = Input;

class DrawerForm extends React.Component<DrawerViewProps, DrawerViewState> {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    priority = {
        1: '极高',
        2: '较高',
        3: '较低',
        4: '极低',
    }

    render() {
        const type = this.props.focusData.currentType;
        const data = this.state.data;
        const { getFieldDecorator } = this.props.form;
        const col = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };

        let initValues = {
            title: '',
            start: moment(),
            details: '',
            end: null,
            status: true,
            priority: 1,
            pictures: null
        };

        if (type === 'edit' || type === 'show') {
            const end = this.state.data.end_date && this.state.data.end_date !== '' ? moment(this.state.data.end_date) : null;
            const pics = this.state.data.pictures;
            initValues.title = this.state.data.title;
            initValues.start = moment(this.state.data.start_date);
            initValues.details = this.state.data.details;
            initValues.end = end;
            initValues.status = this.state.data.status === 1 ? true : false;
            initValues.priority = this.state.data.priority;
            if (pics && pics !== '') {
                const list = pics.split('^^');
                initValues.pictures = list.map((item, index) => {
                    return {
                        uid: String(index - 10),
                        name: item,
                        status: 'done',
                        url: item,
                        response: {
                            url: item
                        }
                    };
                })
            }
        }

        return (
            <div className={this.props.className}>
                <div className="header">
                    {this.renderTitle()}
                </div>
                {(type === 'add' || type === 'edit') &&
                    <Form className={`type-${type}`} {...col}>
                        <Form.Item label='title'>
                            {getFieldDecorator('title', {
                                initialValue: initValues.title,
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
                                initialValue: initValues.start,
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
                            {getFieldDecorator('details', {
                                initialValue: initValues.details
                            })(<TextArea rows={3} placeholder='添加细节信息' />)
                            }
                        </Form.Item>
                        <Form.Item label='end'>
                            {getFieldDecorator('end_date', {
                                initialValue: initValues.end,
                            })(<DatePicker
                                size='small'
                                locale={locale}
                                allowClear={true}
                            />)
                            }
                        </Form.Item>
                        <Form.Item label='status'>
                            {getFieldDecorator('status', {
                                initialValue: initValues.status,
                                valuePropName: 'checked'
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
                                initialValue: initValues.priority
                            })
                                (<Radio.Group>{
                                    Object.entries(this.priority).map((item, index) => {
                                        return (
                                            <Radio key={index} value={Number(item[0])}>{item[1]}</Radio>
                                        );
                                    })
                                }
                                </Radio.Group>)
                            }
                        </Form.Item>
                        <Form.Item label='pistures'>
                            {getFieldDecorator('pictures', {
                                initialValue: initValues.pictures,
                                valuePropName: 'fileList',
                            })
                                (<Upload action='/service/upload' listType='picture'>
                                    <Button size='small'>
                                        <Icon type='upload' />Upload
                                    </Button>
                                </Upload>)
                            }
                        </Form.Item>
                        <Row type='flex' justify='end'>
                            {type === 'edit' &&
                                <Button type='default' onClick={this.cancel} size='small' style={{ marginRight: '12px' }}>
                                    取消
                                </Button>
                            }
                            <Button type='primary' onClick={this.submit} size='small'>
                                确认
                            </Button>
                        </Row>
                    </Form>
                }
                {type === 'show' &&
                    <div className='show'>
                        <Row>
                            <p>创建于 {data.start_date}</p>
                            <p>{this.renderEndDate()}</p>
                        </Row>
                        <Divider dashed={true}></Divider>
                        {data.details !== '' &&
                            <div>
                                <Row>{data.details}</Row>
                                <Divider dashed={true}></Divider>
                            </div>
                        }
                        {initValues.pictures &&
                            <Carousel className='carousel' autoplay>
                                {initValues.pictures.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img className='display-image' src={item.url} />
                                        </div>
                                    );
                                })
                                }
                            </Carousel>
                        }
                        <Row className='func-box' type='flex' justify='end'>
                            <Button type='primary' size='small' onClick={this.editPanel}>
                                编辑
                            </Button>
                        </Row>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.initCurrentData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current) {
            this.initCurrentData();
        }
    }

    // 根据 id 来更新 data
    initCurrentData = () => {
        const type = this.props.focusData.currentType;
        if (type === 'show' || type === 'edit') {
            const list = this.props.focusData.list;
            list.forEach(item => {
                if (item.id === this.props.current) {
                    this.setState({
                        data: item
                    });
                }
            });
        }
    }

    // 渲染标题
    renderTitle = () => {
        const type = this.props.focusData.currentType;
        if (type === 'add') {
            return (
                <div className="title">添加 Focus</div>
            );
        } else if (type === 'edit') {
            return (
                <div className="title">编辑 Focus</div>
            );
        } else if (type === 'show') {
            const priority = this.state.data.priority;
            const title = this.state.data.title;
            return (
                <Row type='flex'>
                    <div className={`priority type-${priority}`}>{this.priority[priority]}</div>
                    <div className="title">{title}</div>
                </Row>
            );
        }
    }

    // 渲染 show 结束时间
    renderEndDate = () => {
        const data = this.state.data;
        const label = data.end_date && data.end_date !== '';
        const end_date = label ? moment(data.end_date) : moment();
        const diffSeconds = end_date.diff(moment(data.start_date), 'seconds');
        const diffStr = formatSeconds(diffSeconds);
        const str = `距${label ? data.end_date : '今'}已执行 ${diffStr}`;
        return str;
    }

    // 添加 focus 记录回调
    addForm = async (params) => {
        const res = await addFocusRecord(params);
        if (res.success) {
            // 关闭阴影遮罩
            await this.freshList();
            this.props.drawerClose();
            message.success('添加成功！', 2);
        }
    }

    // 修改 focus 记录回调
    editForm = async (params) => {
        const res = await editFocusRecord(params);
        if (res.success) {
            await this.freshList();
            this.props.drawerClose();
            message.success('更新成功！', 2);
        }
    }

    // 刷新 focus list
    // 可以直接从父组件通过通信获得，这里是为了锻炼 redux 能力
    freshList = async () => {
        const res = await getFocusList({ status: 1 });
        this.props.changeFocusList(res.data.list);
    }

    // 取消编辑
    cancel = () => {
        this.props.changeFocusType('show');
    }

    // 提交表单事件
    submit = (e) => {
        let params = {};
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                // 处理文件列表
                if (values.pictures && values.pictures.fileList.length > 0) {
                    let list = values.pictures.fileList.map(item => {
                        return item.response.url;
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
                if (this.props.focusData.currentType === 'add') {
                    this.addForm(params);
                } else if (this.props.focusData.currentType === 'edit') {
                    params['id'] = Number(this.props.current);
                    this.editForm(params);
                }
            } else {
                throw (err);
            }
        });
    }

    // 展示编辑页面
    editPanel = () => {
        this.props.changeFocusType('edit');
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
    changeFocusList,
    changeFocusType
})(DrawerView);