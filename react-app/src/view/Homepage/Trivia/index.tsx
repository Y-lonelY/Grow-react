import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Drawer, List, Card, Typography, Icon, Col, Row, Select } from 'antd';
import { TriviaContext } from './context';
import { DrawerContent } from './Drawer';
import { LocaleContext } from '@/cluster/context';
import { Header } from '@/components/Override';
import { getTriviaList, getTriviaGroupList, updateTrivia } from '@/service/homepage/triviaService';
import { languageColors } from '@/config/bizchartTheme';
import { TriviaState } from '@/index.d.ts';

const { Option } = Select;

function RenderEmpty(props) {
    return (
        <div className='trivia-empty'>
            <p>“伏久者飞必高，开先者谢独早，知此，可以免蹭蹬之忧，可以消躁之念”</p>
            <p>
                <Button
                    className='add'
                    type='default'
                    size='small'
                    onClick={props.event.bind(this, 'add')}>添加</Button>
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
        case 'groupList':
            return {
                ...state,
                groupList: action.groupList
            };
        case 'groupChange':
            return {
                ...state,
                group: action.group
            };
        case 'setGroupMap':
            return {
                ...state,
                groupMap: action.groupMap
            };
        default:
            break;
    }
}

function TriviaView(props) {
    const { assets } = useContext(LocaleContext);
    let headConfig = props.head;
    const initState = {
        triviaList: [],
        groupList: [],
        group: -127,
        groupMap: {},
        panelType: 'add',
        current: -127,
        visible: false
    };
    const [state, dispatch] = useReducer(reducer, initState)
    const { Paragraph } = Typography;
    const initTriviaList = async () => {
        const params = {
            group: state.group
        };
        const res = await getTriviaList(params);
        if (res.success) {
            dispatch({
                type: 'triviaList',
                triviaList: res.data.list
            });
        }
    };
    const initTriviaGroup = async () => {
        const res = await getTriviaGroupList();
        if (res.success) {
            dispatch({
                groupList: res.data.list,
                type: 'groupList'
            });
            initGroupMap(res.data.list);
        }
    };
    const initGroupMap = (list) => {
        let map = {
            '-127': assets.all,
        };
        list.forEach(item => {
            map[String(item.id)] = item.name;
        })
        dispatch({
            type: 'setGroupMap',
            groupMap: map
        });
    }
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
    const selectTrivia = (value: string) => {
        dispatch({
            type: 'groupChange',
            group: Number(value)
        });
    }
    const jumpLink = (link: string): void => {
        window.open(link, 'blank');
    }
    const deleteTrivia = async (item) => {
        const params = Object.assign({}, item);
        params.status = 0;
        delete params.last_update;
        delete params.name;

        const res = await updateTrivia(params);
        if (res.success) {
            initTriviaList();
        }
    }

    useEffect(() => {
        initTriviaGroup();
    }, []);

    useEffect(() => {
        initTriviaList();
    }, [state.group]);

    if (state.triviaList.length > 0) {
        headConfig.showAddBtn = true;
        headConfig.addEvent = showPannel;
    }

    return (
        <TriviaContext.Provider value={{ state, dispatch }}>
            <div className='triviaView'>
                <Header {...headConfig} />
                <Row>
                    <Col className='headerBar'>
                        <Select
                            className='triviaSelect'
                            value={state.groupMap[String(state.group)]}
                            size='small'
                            onChange={selectTrivia}
                            showSearch>
                            <Option value='-127'>{assets.all}</Option>
                            {state.groupList.map((item, index) => {
                                return (
                                    <Option value={item.id} key={index}>{item.name}</Option>
                                );
                            })}
                        </Select>
                    </Col>
                </Row>
                {state.triviaList.length > 0 ?
                    <Row>
                        <Col>
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
                                                    <span className='label' style={{ backgroundColor: languageColors[item.name.toLocaleLowerCase()]}}>{item.name}</span>
                                                </Col>
                                                <Col className='btn-box' span={8}>
                                                    {(item.link && item.link.length > 0) &&
                                                        <Button className='button' size='small' type='link' onClick={jumpLink.bind(this, item.link)}>
                                                            <Icon type='link' />
                                                        </Button>
                                                    }
                                                    <Button className='button' size='small' type='link' onClick={showPannel.bind(this, 'edit', item.id)}>
                                                        <Icon type='form' />
                                                    </Button>
                                                    <Button className='button' size='small' type='link' onClick={deleteTrivia.bind(this, item)}>
                                                        <Icon type='delete' />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Paragraph className='details' copyable>{item.details}</Paragraph>
                                            <Row className='footer' type='flex' justify='end'>
                                                <Col className='message'>{item.user} 创建于 {item.last_update}</Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )} /></Col>
                    </Row>
                    : <RenderEmpty event={showPannel} />
                }
                <Drawer
                    className='triviaDrawer'
                    width={400}
                    closable={false}
                    visible={state.visible}
                    onClose={drawerClose}>
                    <DrawerContent
                        className='content'
                        initTriviaGroup={initTriviaGroup} />
                </Drawer>
            </div>
        </TriviaContext.Provider>
    );
}

export default TriviaView;