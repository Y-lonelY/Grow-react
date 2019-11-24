import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Drawer } from 'antd';
import { TriviaContext } from './context';
import { DrawerContent } from './Drawer';
import { LocaleContext } from '@/cluster/context';
import { Header } from '@/components/Override';
import { getTriviaList } from '@/service/homepage/triviaService';

function RenderEmpty(props) {
    return (
        <div className='trivia-empty'>
            <p>“伏久者飞必高，开先者谢独早，知此，可以免蹭蹬之忧，可以消躁之念”</p>
            <p>
                <Button
                    className='add'
                    type='default'
                    size='small'
                    onClick={props.close.bind('add')}>添加</Button>
                知识碎片，但是切忌知识焦虑！
            </p>
        </div>
    )
}

function reducer(state, action) {
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
    const initState = {
        triviaList: [],
        type: 'add',
        current: -127,
        visible: false
    };
    const [state, dispatch] = useReducer(reducer, initState)

    const initTriviaList = async (params = { group: -127 }) => {
        const res = await getTriviaList(params);
        if (res.success) {
            dispatch({
                type: 'triviaList',
                triviaList: res.data.list
            });
        }
    }

    const drawerClose = () => {
        dispatch({
            type: 'closePanel'
        });
    }

    const showPannel = (type: string) => {
        dispatch({
            type: 'showPanel',
            panelType: 'add',
            current: -127
        });
    }

    useEffect(() => {
        initTriviaList();
    }, []);

    return (
        <TriviaContext.Provider value={{ state, dispatch }}>
            <div className='triviaView'>
                <Header {...props.head} />
                {state.triviaList.length > 0 ?
                    <div>111</div> : <RenderEmpty close={showPannel} />
                }
                <Drawer
                    className='triviaDrawer'
                    width={400}
                    closable={false}
                    visible={state.visible}
                    onClose={drawerClose}>
                    <DrawerContent />
                </Drawer>
            </div>
        </TriviaContext.Provider>
    );
}

export default TriviaView;