import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import Clock from '../components/clock/index';
import DashBoard from "./dashboard/DashBoardIndex";
import "./style/mainView.scss";

const {
    Header, Footer, Content
} = Layout;

class Home extends Component {
    render() {
        return (
            <div className="homeBox">
                <Layout className="home-con">
                    <Header className="dash-header">
                        <Row type="flex" justify="start">
                            <Col offset={18} span={6}>
                                <Clock />
                            </Col>
                        </Row>
                    </Header>
                    <Content className='dash-content'>
                        <DashBoard></DashBoard>
                    </Content>
                    <Footer style={{
                        textAlign: 'center'
                    }}>"hell is other people!"</Footer>
                </Layout>
            </div>
        );
    }
}

export default Home;