import React from 'react';
import { Layout, Col, Row, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { SuperIcon } from '@/components/Override';
import { LocaleContext } from '@/cluster/context';
import Clock from '@/components/Clock';
import './index.scss';

const { Header } = Layout

interface FlowHeaderProps {
    history: any
};

interface FlowHeaderState {
    current: number;
    currentTop: number,
    currentItem: string,
};

class FlowHeader extends React.Component<FlowHeaderProps, FlowHeaderState> {

    static contextType = LocaleContext

    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            currentTop: 0,
            currentItem: 'Exercise'
        }
    }

    public render() {
        const locale = this.context.locale;
        const assets = this.context.assets;
        const headerItems = assets.headerItems;
        return (
            <div className='flow-header'>
                <Header className="header">
                    <Row className='main-row' type="flex" justify="start">
                        <Col span={2}>
                            <span className="label">{assets.mainTitle}</span>
                        </Col>
                        <Col className='list' span={16}>
                            {headerItems.map((item, index) => {
                                if (item.type === 'item') {
                                    return (
                                        <div
                                            className={`${item.type} ${item.id === this.state.current ? 'active' : ''}`}
                                            key={index}
                                            onClick={this.handleRouter.bind(this, item.id)}>
                                            {item.label}
                                            {item.icon &&
                                                <SuperIcon type={`icon-${item.icon}`} style={{ fontSize: '14px', paddingLeft: '2px' }} />
                                            }
                                        </div>)
                                } else if (item.type === 'seperator') {
                                    return (<div key={index} className="seperator"></div>);
                                }
                            })}
                        </Col>
                        <Col span={4}>
                            <Clock />
                        </Col>
                        <Col className='func-box' span={2}>
                            <Button className='locale' size='small' type='link' onClick={this.toggleLocale}>
                                <SuperIcon className='icon' type={`icon-${locale === 'zh_cn' ? 'en_us' : 'zh_cn'}`} />
                            </Button>
                        </Col>
                    </Row>
                </Header>
            </div>
        )
    }

    componentDidMount() {
    }

    // 控制路由跳转
    handleRouter = (id) => {
        const assets = this.context.assets;
        const headerItems = assets.headerItems;

        if (id === this.state.current) {
            return;
        } else {
            headerItems.forEach(item => {
                if (item.id === id) {
                    this.setState({
                        current: id
                    });
                    if (item.target) {
                        window.open(item.target, '_blank');
                    } else {
                        this.props.history.push('/');
                    }
                }
            });
        }
    }

    toggleLocale = () => {
        const toggle = this.context.toggleLocale;
        const locale = this.context.locale;
        let type = 'zh_cn';
        if (locale === 'zh_cn') {
            type = 'en_us';
        }
        toggle(type);
    }
}

export default withRouter(FlowHeader);