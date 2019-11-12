import React from 'react';
import { Button, Drawer } from 'antd';
import { connect } from 'react-redux';
import { focusProps } from '@/index.d.ts';
import { changeFocusList } from '@/store/Exercise/action';
import { addFocusRecord, getFocusList } from '@/service/exerciseService';
import DrawerView from './drawerView';

interface focusState {
    visible: boolean;
    type: string;
}

class FocusView extends React.Component<focusProps, focusState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'add',
        };
    }

    render() {
        const list = this.props.focusData.list;
        const RenderEmpty = () => {
            return (
                <div className='focus-empty'>
                    <p>
                        脑海里充斥着各种想法的状态，被称为<span className='bold'>猴子思维</span>
                        ，一旦杂念占据大脑，会导致大脑极易疲劳
                    </p>
                    <p>
                        <Button className='add' onClick={this.showPannel.bind(this, 'add')} type='default' size='small'>专注</Button>
                        就是要驯服这只猴子!
                    </p>
                </div>
            );
        };
        let title = 'Focus';
        if (this.state.type === 'add') {
            title = '添加 Focus';
        } else if (this.state.type === 'edit') {
            title = '编辑 Focus';
        }
        return (
            <div className='focusView'>
                {list.length > 0 ?
                    <div></div> : <RenderEmpty />
                }
                <Drawer
                 className='drawer'
                 width={400}
                 closable={false}
                 title={title}
                 placement='right'
                 visible={this.state.visible}
                 onClose={this.drawerClose}>
                    <DrawerView className='content' type={this.state.type} drawerClose={this.drawerClose}></DrawerView>
                </Drawer>
            </div>
        );
    }

    // 初始化阶段，render() 完成之后
    componentDidMount() {
        this.initData();
    }

    initData = async () => {
        const res = await getFocusList({ status: 1 });
        this.props.changeFocusList([]);
        console.log(this.props);
    }

    // 展示添加面板
    showPannel = (type) => {
        this.setState({
            visible: true,
            type: type
        });
    }

    // 点击阴影遮罩关闭
    drawerClose = () => {
        this.setState({
            visible: false
        });
    }
}

function mapStateToProps({ focusData }) {
    return {
        focusData
    };
}

export default connect(mapStateToProps, {
    changeFocusList
})(FocusView);