import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Row, Button, Icon, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { LocaleContext } from '@/cluster/context';
import { TriviaContext } from './context';
import { TriviaState, TriviaData } from '@/index.d.ts';

interface TriviaDrawerProps extends FormComponentProps {
    className: string;
}

const { TextArea } = Input;
const { Option } = Select;

function Drawer(props) {
    const { assets } = useContext(LocaleContext);
    const trivia = assets.homepageConfig.trivia.title;
    const { state, dispatch } = useContext(TriviaContext);
    const initFormData = {
        details: '',
        link: '',
        user: 'yh',
        group: 1,
        name: 'unknown',
    };
    const [formData, setFormData] = useState<TriviaData>(initFormData);
    const col = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };
    const type = state.panelType;
    const { getFieldDecorator } = props.form;
    const setInitFormData = () => {
        state.triviaList.forEach(item => {
            if (item.id === state.current) {
                setFormData(item);
            }
        })
    };
    const cancel = () => {
        dispatch({
            type: 'closePanel'
        });
    };

    const submit = (e) => {
        let params = {};
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
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
            <Form className={`type-${type}`} {...col}>
                <Form.Item label={assets.group}>
                    {getFieldDecorator('group', {
                        initialValue: formData.group
                    })(<Select size='small'>{state.groupList.map((item, index) => {
                        return (<Option key={index} value={item.id}>{item.name}</Option>);
                    })}</Select>)}
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