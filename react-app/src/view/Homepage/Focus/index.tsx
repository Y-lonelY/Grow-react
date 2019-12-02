import React from 'react';
import { Button, Drawer, List, Card, Icon } from 'antd';
import { Header } from '@/components/Override';
import { connect } from 'react-redux';
import { changeFocusList, changeFocusType } from '@/store/Exercise/action';
import { getFocusList } from '@/service/homepage/focusService';
import DrawerView from './drawerView';
import { priorityColors } from '@/config/colors';
import { focusProps } from '@/index.d.ts';

interface focusState {
    visible: boolean;
    // 当前选中 id
    current: number;
}

class FocusView extends React.Component<focusProps, focusState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            current: -1,
        };
    }

    render() {
        const list = this.props.focusData.list;
        const RenderEmpty = () => {
            return (
                <div className='focus-empty'>
                    <p>
                        脑海里充斥着各种想法的状态，被称为<span className='bold'>猴子思维</span>
                        ，一旦杂念占据大脑，会导致大脑极易疲劳！
                    </p>
                    <p>
                        <Button className='add' onClick={this.showPannel.bind(this, 'add')} type='default' size='small'>专注</Button>
                        就是要驯服这只猴子!
                    </p>
                </div>
            );
        };
        let headConfig = this.props.head;

        if (list.length > 0) {
            headConfig.showAddBtn = true;
            headConfig.addEvent = this.showPannel;
        }

        return (
            <div className='focusView'>
                <Header {...headConfig} />
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
                                    extra={<Button className='dark' size='small' onClick={this.showPannel.bind(this, 'show', item.id)} type='link'><Icon type="form" /></Button>}
                                    headStyle={{ color: priorityColors[item.priority - 1] }}
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
                    placement='right'
                    visible={this.state.visible}
                    onClose={this.drawerClose}>
                    <DrawerView className='content' current={this.state.current} drawerClose={this.drawerClose}></DrawerView>
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

    // 展示面板
    showPannel = (type?: string, id?: number) => {
        this.props.changeFocusType(type);
        this.setState({
            current: Number(id),
            visible: true,
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
    changeFocusList,
    changeFocusType
})(FocusView);