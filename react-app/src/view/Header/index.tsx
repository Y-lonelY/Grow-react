import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
import Clock from '@/components/Clock';
import { flowItems, linkItems } from './config';
import './index.scss';

const { Header } = Layout

interface FlowHeaderProps {
    history: any
};

interface FlowHeaderState {
    currentTop: number,
    currentItem: string
};

class FlowHeader extends React.Component<FlowHeaderProps, FlowHeaderState> {
    
    constructor(props) {
        super(props)
        this.state = {
            currentTop: 0,
            currentItem: 'Exercise'
        }
    }

    public render() {
        return(
            <div className='flow-header'>
                <Header className="main-header">
                    <Row type="flex" justify="start">
                        <Col span={3}>
                            <span className="header-label">GROWTH FLOW</span>
                        </Col>
                        <Col className="header-flow-list" span={12}>
                            {flowItems.map((item,index) => {
                                return (
                                <div   
                                    className={`${item.class} ${item.label === this.state.currentItem ? 'active' : ''}`}
                                    key={item.label}
                                    onClick={this.handleRouter.bind(this, index)}>{item.label}</div>)
                            })
                            }
                            <div className="seperator"></div>
                        </Col>
                        <Col className="header-link-list" span={5}>
                            {linkItems.map((item,index) => {
                                return (
                                <div   
                                    className={`${item.class} ${item.label === this.state.currentItem ? 'active' : ''}`}
                                    key={item.label}>
                                        <a href={item.target} target="blank">{item.label}</a>
                                        <i></i>
                                    </div>)
                            })
                            }
                        </Col>
                        <Col span={4}>
                            <Clock />
                        </Col>
                    </Row>
                </Header>
            </div>
        )
    }

    componentDidMount() {
    }

    handleRouter = (index) => {
        const selectedItem = flowItems[index];
        if (selectedItem.label === this.state.currentItem) {
            return;
        } else {
            this.setState({
                currentItem: selectedItem.label
            });
            this.props.history.push('/');
        }
    }
}

export default withRouter(FlowHeader);