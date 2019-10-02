import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
import Clock from '@/components/Clock';
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
    FlowItems: {label: string, type: string}[] = [{
        label: 'Exercise',
        type: 'current'
    },{
        label: 'Work',
        type: 'current'
    }, {
        label: 'BloG',
        type: 'other'
    }]
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
                        <Col offset={15} span={6}>
                            <Clock />
                        </Col>
                    </Row>
                </Header>
                <Row className="sub-header" type="flex" justify="start">
                    <Col span={3}>
                        <span className="header-label">GROWTH FLOW</span>
                    </Col>
                    <Col className='list-content'>
                        {this.FlowItems.map((item, index) => {
                            if (item.type === 'current') {
                                return (<div 
                                    className={item.label === this.state.currentItem ? 'active item' : 'item'} 
                                    key={item.label}
                                    onClick={this.handleRouter.bind(this, index)}>{item.label}</div>)
                            } else if (item.type === 'other') {
                                return (<div className='other-item' key={item.label}>{item.label}</div>)
                            }
                        })
                        }
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
    }

    handleRouter = (index) => {
        const selectedItem = this.FlowItems[index];
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