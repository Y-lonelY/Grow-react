import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Icon, Select, Divider, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { LocaleContext } from '@/cluster/context';
import { TriviaContext } from './context';
import { addTriviaGroupItem, updateTriviaGroupItem, addTrivia, updateTrivia } from '@/service/homepage/triviaService';
import { TriviaState, TriviaData } from '@/index.d.ts';

interface TriviaDrawerProps extends FormComponentProps {
    className: string;
    initTriviaGroup: () => void;
}

interface GroupData {
    show: boolean;
    name: string;
    current: number;
    // 触发方式
    trigger: string;
}

const { TextArea } = Input;
const { Option } = Select;

function Drawer(props) {
    const { assets } = useContext(LocaleContext);
    const trivia = assets.homepageConfig.trivia.title;
    const { state, dispatch } = useContext(TriviaContext);
    const initFormData = {
        id: -127,
        details: '',
        link: '',
        user: 'yh',
        group: 1,
        name: 'unknown',
    };
    const [formData, setFormData] = useState<TriviaData>(initFormData);
    const [groupData, setGroupData] = useState<GroupData>({
        show: false,
        name: '',
        current: 1,
        trigger: ''
    });
    const col = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };
    const type = state.panelType;
    const { getFieldDecorator, validateFields, resetFields } = props.form;
    const setInitFormData = () => {
        const list: TriviaData[] = state.triviaList;
        list.forEach(item => {
            if (item.id === state.current) {
                resetFields();
                setFormData(item);
            }
        })
    };
    const cancel = () => {
        dispatch({
            type: 'closePanel'
        });
    };
    const addGroupItem = () => {
        setGroupData({
            ...groupData,
            show: !groupData.show,
            name: '',
            trigger: 'add'
        });
    }
    const changeGroupValue = (e) => {
        const value = e.target.value;
        setGroupData({
            ...groupData,
            name: value
        });
    }
    const editGroupItem = () => {
        validateFields(['group'], (err, values) => {
            if (!err) {
                const id = values.group;
                state.groupList.forEach(item => {
                    if (item.id === id) {
                        setGroupData({
                            show: true,
                            name: item.name,
                            current: item.id,
                            trigger: 'edit'
                        });
                    }
                })
            }
        })
    }
    const submitGroup = async () => {
        const name = groupData.name;
        const trigger = groupData.trigger;
        if (name === '') {
            return;
        }
        let res = null;
        if (trigger === 'add') {
            res = await addTriviaGroupItem({
                name: name,
                status: 0
            });
        } else if (trigger === 'edit') {
            const id = groupData.current;
            res = await updateTriviaGroupItem({
                name: name,
                status: 0,
                id: Number(id),
            });
        }
        if (res.success) {
            await props.initTriviaGroup();
            addGroupItem();
        }
    }

    const submit = (e) => {
        validateFields(async (err, values) => {
            if (!err) {
                let params = {
                    status: 1,
                    user: 'yh',
                };
                console.log(state);
                if (state.panelType === 'add') {
                    params['details'] = values.details;
                    params['group'] = values.group;
                    params['link'] = values.link;
                    console.log(params);
                    const res = await addTrivia(params);
                    if (res.success) {
                        dispatch({
                            type: 'closePanel'
                        });
                        message.success('添加成功', 2);
                        dispatch({
                            type: 'groupChange',
                            group: values.group
                        });
                    }
                } else if (state.panelType === 'edit') {
                    params['details'] = values.details;
                    params['group'] = values.group;
                    params['link'] = values.link;
                    params['id'] = Number(state.current);
                    const res = await updateTrivia(params);
                    if (res.success) {
                        dispatch({
                            type: 'closePanel'
                        });
                        message.success('更新成功', 2);
                        dispatch({
                            type: 'groupChange',
                            group: values.group
                        });
                    }
                }
            }
        });
    };

    useEffect(() => {
        if (state.panelType === 'add') {
            setFormData(initFormData);
        } else {
            setInitFormData();
        }
    }, [state.current]);

    return (
        <div className={props.className}>
            <div className="header">
                <div className="title">
                    {type === 'edit' ? `${assets.edit} ${trivia}` : `${assets.add} ${trivia}`}
                </div>
            </div>
            {/* 设计成受控组件 */}
            {groupData.show &&
                <Row>
                    <Col offset={4}>
                        <Input
                            className='groupInput'
                            size='small'
                            allowClear={true}
                            value={groupData.name}
                            onChange={changeGroupValue}
                            placeholder={assets.placeholder.addGroup}
                            addonAfter={<Button onClick={submitGroup} style={{ height: '20px' }} size='small' type='link'>{assets.submit}</Button>} />
                    </Col>
                </Row>
            }
            <Form className={`type-${type}`} {...col}>
                <Form.Item label={assets.group}>
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('group', {
                                initialValue: formData.group
                            })(<Select className='groupSelect' size='small'>
                                {state.groupList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>
                                            {item.name}
                                        </Option>);
                                })}</Select>)}
                        </Col>
                        <Col span={6}>
                            <Button onClick={addGroupItem} size='small' type='link'>
                                <Icon type={groupData.show ? 'close' : 'plus'} />
                            </Button>
                            <Button onClick={editGroupItem} size='small' type='link'><Icon type='edit' /></Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label={assets.details}>
                    {getFieldDecorator('details', {
                        initialValue: formData.details,
                        rules: [{
                            max: 600
                        }]
                    })(<TextArea rows={8} placeholder={`${assets.add} ${assets.details}`}></TextArea>)}
                </Form.Item>
                <Form.Item label={assets.link}>
                    {getFieldDecorator('link', {
                        initialValue: formData.link,
                        rules: [{
                            max: 255
                        }]
                    })(<Input placeholder={assets.placeholder.link} size='small' />)}
                </Form.Item>
                <Row type='flex' justify='end'>
                    <Button type='default' onClick={cancel} size='small' style={{ marginRight: '12px' }}>
                        {assets.cancel}
                    </Button>
                    <Button type='primary' onClick={submit} size='small'>
                        {assets.submit}
                    </Button>
                </Row>
            </Form>
        </div>
    );
}

export const DrawerContent = Form.create<TriviaDrawerProps>({
    name: 'trivia'
})(Drawer);