import React from 'react';
import { Layout, Col, Row } from 'antd';
import Clock from '@/components/Clock';
import './index.scss';

const { Header } = Layout



class FlowHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTop: 0
        }
    }

    public render() {
        return(
            <div className='flow-header'>
                <Header className="main-header">
                    <Row type="flex" justify="start">
                        <Col span={6}>
                            <span className="header-label">GROWTH FLOW</span>
                        </Col>
                        <Col offset={12} span={6}>
                            <Clock />
                        </Col>
                    </Row>
                </Header>
                <Row className="sub-header" type="flex" justify="start">
                    <Col span={6}>
                        <span className="header-label">GROWTH FLOW</span>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandle.bind(this))
    }
    private scrollHandle() {
    }
}

export default FlowHeader