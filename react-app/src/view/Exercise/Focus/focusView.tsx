import React from 'react';
import { Button, Drawer, List, Card, Icon } from 'antd';
import { Header } from '@/components/Override';
import { connect } from 'react-redux';
import { focusProps } from '@/index.d.ts';
import { changeFocusList } from '@/store/Exercise/action';
import { getFocusList } from '@/service/exerciseService';
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

    // Drawer Titles
    drawerTitle = {
        add: '添加 Focus',
        edit: '编辑 Focus',
        show: '展示 Focus',
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

        if (list.length > 0) {
            this.props.head.showAddBtn = true;
            this.props.head.addEvent = this.showPannel;
        }

        return (
            <div className='focusView'>
                <Header {...this.props.head} />
                {list.length > 0 ?
                    <List
                        grid={{ gutter: 16, column: 6 }}
                        dataSource={this.props.focusData.list}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    size='small'
                                    className='card'
                                    hoverable={true}
                                    extra={<Button size='small' type='link'><Icon type="form" /></Button>}
                                    title={item.title}>
                                    <p className='start'>{item.start_date}</p>
                                    <p className='details'>{item.details}</p>
                                </Card>
                            </List.Item>
                        )}
                    /> : <RenderEmpty />
                }
                <Drawer
                    className='drawer'
                    width={400}
                    closable={false}
                    title={this.drawerTitle[this.state.type]}
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
        // 获取处于激活状态的 list
        const res = await getFocusList({ status: 1 });
        this.props.changeFocusList(res.data.list);
    }

    // 展示添加面板
    showPannel = (type?: string) => {
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