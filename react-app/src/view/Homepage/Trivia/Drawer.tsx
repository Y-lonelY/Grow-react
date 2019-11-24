import React, { useContext, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { LocaleContext } from '@/cluster/context';
import { TriviaContext } from './context';
import { TriviaState, TriviaData } from '@/index.d.ts';

interface TriviaDrawerProps extends FormComponentProps {
    className: string;
}

const { TextArea } = Input;

function Drawer(props) {
    const { assets } = useContext(LocaleContext);
    const trivia = assets.homepageConfig.trivia.title;
    const { state, dispatch } = useContext(TriviaContext);
    const [formData, setFormData] = useState<TriviaData>({
        details: '',
        link: '',
        user: 'yh',
        group: 1,
        name: 'unknown',
    });
    const col = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };
    const type = state.panelType;
    const { getFieldDecorator } = props.form;
    console.log(state);

    const initFormData = () => {
        state.triviaList.forEach(item => {
            if (item.id === state.current) {
                setFormData(item);
            }
        })
    };

    useEffect(() => {
        initFormData();
    }, []);
    return (
        <div className={props.className}>
            <div className="header">
                <div className="title">
                    {type === 'edit' ? `${assets.edit} ${trivia}` : `${assets.add} ${trivia}`}
                </div>
            </div>
            <Form className={`type-${type}`} {...col}>
                <Form.Item label={assets.details}>
                    {getFieldDecorator('details', {
                        initialValue: formData.details,
                        rules: [{
                            max: 600
                        }]
                    })(<TextArea rows={8} placeholder={`${assets.add}${assets.details}`}></TextArea>)}
                </Form.Item>
            </Form>
        </div>
    );
}

export const DrawerContent = Form.create<TriviaDrawerProps>({
    name: 'trivia'
})(Drawer);