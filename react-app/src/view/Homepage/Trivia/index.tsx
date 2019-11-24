import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Drawer, List, Card, Typography, Icon, Col, Row } from 'antd';
import { TriviaContext } from './context';
import { DrawerContent } from './Drawer';
import { LocaleContext } from '@/cluster/context';
import { Header } from '@/components/Override';
import { getTriviaList } from '@/service/homepage/triviaService';
import { TriviaState } from '@/index.d.ts';

function RenderEmpty(props) {
    return (
        <div className='trivia-empty'>
            <p>“伏久者飞必高，开先者谢独早，知此，可以免蹭蹬之忧，可以消躁之念”</p>
            <p>
                <Button
                    className='add'
                    type='default'
                    size='small'
                    onClick={props.event.bind('add')}>添加</Button>
                知识碎片，但是切忌知识焦虑！
            </p>
        </div>
    )
}

function reducer(state: TriviaState, action): TriviaState {
    switch (action.type) {
        case 'showPanel':
            return {
                ...state,
                visible: true,
                panelType: action.panelType,
                current: action.current ? action.current : -127
            };
        case 'triviaList':
            return {
                ...state,
                triviaList: action.triviaList
            };
        case 'closePanel':
            return {
                ...state,
                visible: false
            };
        default:
            break;
    }
}

function TriviaView(props) {
    const { locale, assets } = useContext(LocaleContext);
    let headConfig = props.head;
    const initState = {
        triviaList: [],
        panelType: 'add',
        current: -127,
        visible: false
    };
    const [state, dispatch] = useReducer(reducer, initState)
    const { Paragraph } = Typography;
    const initTriviaList = async (params = { group: -127 }) => {
        const res = await getTriviaList(params);
        if (res.success) {
            dispatch({
                type: 'triviaList',
                triviaList: res.data.list
            });
        }
    };

    const drawerClose = () => {
        dispatch({
            type: 'closePanel'
        });
    };

    const showPannel = (type?: string, id = -127) => {
        dispatch({
            type: 'showPanel',
            panelType: type,
            current: id
        });
    };

    const jumpLink = (link: string): void => {
        window.open(link, 'blank');
    }

    useEffect(() => {
        initTriviaList();
    }, []);

    if (state.triviaList.length > 0) {
        headConfig.showAddBtn = true;
        headConfig.addEvent = showPannel;
    }

    return (
        <TriviaContext.Provider value={{ state, dispatch }}>
            <div className='triviaView'>
                <Header {...headConfig} />
                {state.triviaList.length > 0 ?
                    <List
                        className='list'
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={state.triviaList}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    className='card'
                                    size='small'
                                    hoverable={true}>
                                    <Row className='name' type='flex' justify='space-between'>
                                        <Col span={16}>
                                            <span className='label'>{item.name}</span>
                                        </Col>
                                        <Col className='btn-box' span={8}>
                                            {(item.link && item.link.length > 0) &&
                                                <Button size='small' type='link' onClick={jumpLink.bind(this, item.link)}>
                                                    <Icon type='link' />
                                                </Button>
                                            }
                                            <Button size='small' type='link' onClick={showPannel.bind(this, 'edit', item.id)}>
                                                <Icon type='form' />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Paragraph className='details' copyable>{item.details}</Paragraph>
                                    <Row className='footer' type='flex' justify='end'>
                                        <Col className='message'>{item.user} 创建于 {item.last_update}</Col>
                                    </Row>
                                </Card>
                            </List.Item>
                        )} /> : <RenderEmpty event={showPannel} />
                }
                <Drawer
                    className='triviaDrawer'
                    width={400}
                    closable={false}
                    visible={state.visible}
                    onClose={drawerClose}>
                    <DrawerContent className='content' />
                </Drawer>
            </div>
        </TriviaContext.Provider>
    );
}

export default TriviaView;