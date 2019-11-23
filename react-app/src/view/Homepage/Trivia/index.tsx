import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer } from 'antd';
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

function TriviaView(props) {
    const { locale, assets } = useContext(LocaleContext);
    const [visible, setVisible] = useState(false);
    const [triviaList, setTriviaList] = useState([]);

    const initTriviaList = async (params = { group: -127 }) => {
        const res = await getTriviaList(params);
        if (res.success) {
            setTriviaList(res.data.list);
        }
    }

    const drawerClose = () => {
        setVisible(false);
    }

    const showPannel = (type: string) => {
        setVisible(true);
    }

    useEffect(() => {
        initTriviaList();
    }, []);

    return (
        <div className='triviaView'>
            <Header {...props.head} />
            <RenderEmpty close={showPannel} />
            <Drawer
                className='triviaDrawer'
                width={400}
                closable={false}
                visible={visible}
                onClose={drawerClose}>

            </Drawer>
        </div>
    );
}

export default TriviaView;